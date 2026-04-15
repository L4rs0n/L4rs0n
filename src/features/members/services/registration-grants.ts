import {
  RegistrationGrantStatus,
  RegistrationGrantType,
  type Prisma,
  type PrismaClient,
} from "@prisma/client";

import { prisma } from "@/lib/db/client";
import {
  createRegistrationToken,
  hashRegistrationToken,
  normalizeRegistrationEmail,
  normalizeRegistrationToken,
  REGISTRATION_TOKEN_HEADER,
} from "@/features/members/services/registration-grants.shared";

type DatabaseClient = PrismaClient | Prisma.TransactionClient;

type RegistrationGrantRecord = Prisma.RegistrationGrantGetPayload<{
  include: {
    member: {
      include: {
        user: true;
      };
    };
  };
}>;

export type RegistrationGrantPageState =
  | {
      status: "valid";
      email: string;
      memberName: string;
      memberId: string;
      type: RegistrationGrantType;
    }
  | {
      status:
        | "missing-token"
        | "invalid-token"
        | "expired-token"
        | "consumed-token"
        | "revoked-token"
        | "already-linked";
    };

export async function createRegistrationGrant(
  {
    email,
    expiresAt,
    memberId,
    type,
  }: {
    email: string;
    expiresAt: Date;
    memberId: string;
    type: RegistrationGrantType;
  },
  db: DatabaseClient = prisma,
) {
  const token = createRegistrationToken();

  const grant = await db.registrationGrant.create({
    data: {
      email: normalizeRegistrationEmail(email),
      expiresAt,
      memberId,
      tokenHash: hashRegistrationToken(token),
      type,
    },
  });

  return {
    grant,
    token,
  };
}

export function extractRegistrationTokenFromHeaders(headers: Headers) {
  return normalizeRegistrationToken(headers.get(REGISTRATION_TOKEN_HEADER));
}

function getRegistrationGrantState(
  grant: RegistrationGrantRecord | null,
  now = new Date(),
): RegistrationGrantPageState {
  if (!grant) {
    return {
      status: "invalid-token",
    };
  }

  if (grant.member.user) {
    return {
      status: "already-linked",
    };
  }

  if (grant.status === RegistrationGrantStatus.CONSUMED) {
    return {
      status: "consumed-token",
    };
  }

  if (grant.status === RegistrationGrantStatus.REVOKED) {
    return {
      status: "revoked-token",
    };
  }

  if (grant.expiresAt <= now) {
    return {
      status: "expired-token",
    };
  }

  return {
    status: "valid",
    email: grant.email,
    memberId: grant.memberId,
    memberName: `${grant.member.firstName} ${grant.member.lastName}`.trim(),
    type: grant.type,
  };
}

async function findRegistrationGrantByToken(
  token: string,
  db: DatabaseClient = prisma,
) {
  return db.registrationGrant.findUnique({
    where: {
      tokenHash: hashRegistrationToken(token),
    },
    include: {
      member: {
        include: {
          user: true,
        },
      },
    },
  });
}

export async function getRegistrationGrantPageState(token?: string | null) {
  const normalizedToken = normalizeRegistrationToken(token);

  if (!normalizedToken) {
    return {
      status: "missing-token",
    } satisfies RegistrationGrantPageState;
  }

  const grant = await findRegistrationGrantByToken(normalizedToken);

  return getRegistrationGrantState(grant);
}

export async function assertRegistrationGrantForSignUp({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  const normalizedToken = normalizeRegistrationToken(token);

  if (!normalizedToken) {
    return null;
  }

  const normalizedEmail = normalizeRegistrationEmail(email);
  const grant = await findRegistrationGrantByToken(normalizedToken);
  const state = getRegistrationGrantState(grant);

  if (state.status !== "valid") {
    return null;
  }

  if (state.email !== normalizedEmail) {
    return null;
  }

  return {
    email: state.email,
    memberId: state.memberId,
    token: normalizedToken,
  };
}

export async function consumeRegistrationGrant({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  const normalizedToken = normalizeRegistrationToken(token);

  if (!normalizedToken) {
    return;
  }

  const normalizedEmail = normalizeRegistrationEmail(email);

  await prisma.$transaction(async (tx) => {
    const grant = await findRegistrationGrantByToken(normalizedToken, tx);

    if (!grant || grant.email !== normalizedEmail) {
      return;
    }

    if (grant.status !== RegistrationGrantStatus.PENDING) {
      return;
    }

    if (grant.expiresAt <= new Date()) {
      return;
    }

    await tx.registrationGrant.update({
      where: {
        id: grant.id,
      },
      data: {
        consumedAt: new Date(),
        status: RegistrationGrantStatus.CONSUMED,
      },
    });
  });
}
