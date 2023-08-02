import type { RequestHandler } from './$types';
import { getAiProvider } from '$lib/server/aiProviderActions/getAiProviders';
import { updateAiProvider, deleteAiProvider } from '$lib/server/aiProviderActions/saveAiProviders';

export const GET: RequestHandler = async ({ params }) => {
	const { id } = params;
	const provider = await getAiProvider(Number(id)); // convert id to number

	return new Response(JSON.stringify(provider), {
		headers: { 'content-type': 'application/json' }
	});
};

export const PUT: RequestHandler = async ({ request, params }) => {
	const body = await request.json();
	const { id } = params;
	const provider = await updateAiProvider(Number(id), body); // convert id to number

	return new Response(JSON.stringify(provider), {
		headers: { 'content-type': 'application/json' },
		status: 200
	});
};

export const DELETE: RequestHandler = async ({ params }) => {
	const { id } = params;
	const provider = await deleteAiProvider(Number(id)); // convert id to number

	return new Response(JSON.stringify(provider), {
		headers: { 'content-type': 'application/json' },
		status: 200
	});
};
