import prisma from '$lib/server/prisma';
import type { AiProvider } from '@prisma/client';

export const getAiProviders = async (): Promise<AiProvider[]> => {
	const providers = await prisma.aiProvider.findMany({});

	return providers;
};

export const getAiProvider = async (id: number): Promise<AiProvider> => {
	const provider = await prisma.aiProvider.findUnique({
		where: {
			id: id
		}
	});

	return provider as AiProvider;
};
