-- CreateTable
CREATE TABLE "Identity" (
    "uuid" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "age" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Identity_pkey" PRIMARY KEY ("uuid")
);

-- CreateTable
CREATE TABLE "Jwt" (
    "id" SERIAL NOT NULL,
    "jwt" TEXT NOT NULL,
    "identityId" TEXT NOT NULL,

    CONSTRAINT "Jwt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Otp" (
    "id" SERIAL NOT NULL,
    "otp" TEXT NOT NULL,
    "identityId" TEXT NOT NULL,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Identity_uuid_key" ON "Identity"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Identity_phone_key" ON "Identity"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Identity_email_key" ON "Identity"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Identity_username_key" ON "Identity"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Jwt_jwt_key" ON "Jwt"("jwt");

-- AddForeignKey
ALTER TABLE "Jwt" ADD CONSTRAINT "Jwt_identityId_fkey" FOREIGN KEY ("identityId") REFERENCES "Identity"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Otp" ADD CONSTRAINT "Otp_identityId_fkey" FOREIGN KEY ("identityId") REFERENCES "Identity"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
