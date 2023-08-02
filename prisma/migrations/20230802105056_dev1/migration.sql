/*
  Warnings:

  - You are about to drop the column `openAiModel` on the `AiProvider` table. All the data in the column will be lost.
  - You are about to drop the column `payload` on the `AiProvider` table. All the data in the column will be lost.
  - You are about to drop the `ChatInteraction` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `options` to the `AiProvider` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerType` to the `AiProvider` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ChatInteraction" DROP CONSTRAINT "ChatInteraction_providerId_fkey";

-- AlterTable
ALTER TABLE "AiProvider" DROP COLUMN "openAiModel",
DROP COLUMN "payload",
ADD COLUMN     "options" JSONB NOT NULL,
ADD COLUMN     "providerType" VARCHAR(50) NOT NULL;

-- DropTable
DROP TABLE "ChatInteraction";

-- CreateTable
CREATE TABLE "ChatConversations" (
    "id" SERIAL NOT NULL,
    "providerId" INTEGER NOT NULL,
    "options" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatConversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMessages" (
    "id" SERIAL NOT NULL,
    "conversationId" INTEGER NOT NULL,
    "role" VARCHAR(50) NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ChatMessages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ChatConversations" ADD CONSTRAINT "ChatConversations_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "AiProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessages" ADD CONSTRAINT "ChatMessages_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "ChatConversations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
