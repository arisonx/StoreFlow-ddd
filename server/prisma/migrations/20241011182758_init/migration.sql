-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Signature" (
    "end_date" DATETIME NOT NULL,
    "start_date" DATETIME NOT NULL,
    "plan" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "usuario_id" TEXT NOT NULL,
    CONSTRAINT "Signature_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Contract" (
    "end_date" DATETIME NOT NULL,
    "start_date" DATETIME NOT NULL,
    "value" REAL NOT NULL,
    "usuario_id" TEXT NOT NULL,
    CONSTRAINT "Contract_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_rg_key" ON "User"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "User_cpf_key" ON "User"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Signature_usuario_id_key" ON "Signature"("usuario_id");

-- CreateIndex
CREATE UNIQUE INDEX "Contract_usuario_id_key" ON "Contract"("usuario_id");
