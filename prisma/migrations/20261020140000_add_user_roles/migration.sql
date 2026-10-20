-- Existing and future accounts receive MEMBER only: no inferred privileges.
CREATE TYPE "Role" AS ENUM ('MEMBER', 'ADMIN', 'TREASURER', 'EVENT_MANAGER', 'COACH');
ALTER TABLE "users" ADD COLUMN "roles" "Role"[] NOT NULL DEFAULT ARRAY['MEMBER']::"Role"[];
-- NULL selects the default assigned role; an explicit selection is session-local.
ALTER TABLE "sessions" ADD COLUMN "active_role" "Role";
