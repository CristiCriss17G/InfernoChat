import prisma from '$lib/server/prisma';
import type { ChatConversations } from '@prisma/client';

export const getConversations = async (): Promise<ChatConversations[]> => {
	const providers = await prisma.chatConversations.findMany({});

	return providers;
};

export const getConversation = async (id: number): Promise<ChatConversations> => {
	const provider = await prisma.chatConversations.findUnique({
		where: {
			id: id
		}
	});

	return provider as ChatConversations;
};
