-- CreateEnum
CREATE TYPE "RegistrationGrantType" AS ENUM ('INVITATION', 'ATTACHMENT');

-- CreateEnum
CREATE TYPE "RegistrationGrantStatus" AS ENUM ('PENDING', 'CONSUMED', 'REVOKED');

-- AlterTable
ALTER TABLE "users" ADD COLUMN "member_id" TEXT;

-- CreateTable
CREATE TABLE "members" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "registration_grants" (
    "id" TEXT NOT NULL,
    "member_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token_hash" TEXT NOT NULL,
    "type" "RegistrationGrantType" NOT NULL,
    "status" "RegistrationGrantStatus" NOT NULL DEFAULT 'PENDING',
    "expires_at" TIMESTAMP(3) NOT NULL,
    "consumed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "registration_grants_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "idx_users_member_id" ON "users"("member_id");

-- CreateIndex
CREATE UNIQUE INDEX "idx_members_email" ON "members"("email");

-- CreateIndex
CREATE UNIQUE INDEX "idx_registration_grants_token_hash" ON "registration_grants"("token_hash");

-- CreateIndex
CREATE INDEX "idx_registration_grants_email_status" ON "registration_grants"("email", "status");

-- CreateIndex
CREATE INDEX "idx_registration_grants_member_id" ON "registration_grants"("member_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "registration_grants" ADD CONSTRAINT "registration_grants_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "members"("id") ON DELETE CASCADE ON UPDATE CASCADE;
