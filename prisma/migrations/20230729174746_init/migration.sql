-- CreateTable
CREATE TABLE "AiProvider" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "endpoint" VARCHAR(100) NOT NULL,
    "openAiModel" BOOLEAN NOT NULL DEFAULT false,
    "model" VARCHAR(50),
    "stream" BOOLEAN NOT NULL DEFAULT false,
    "payload" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AiProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatInteraction" (
    "id" SERIAL NOT NULL,
    "providerId" INTEGER NOT NULL,
    "userRequest" TEXT NOT NULL,
    "botResponse" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatInteraction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AiProvider_name_key" ON "AiProvider"("name");

-- CreateIndex
CREATE INDEX "AiProvider_id_name_idx" ON "AiProvider"("id", "name");

-- AddForeignKey
ALTER TABLE "ChatInteraction" ADD CONSTRAINT "ChatInteraction_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "AiProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
