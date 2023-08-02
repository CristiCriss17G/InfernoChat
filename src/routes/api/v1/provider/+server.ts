import type { RequestHandler } from './$types';
import { getAiProviders } from '$lib/server/aiProviderActions/getAiProviders';
import { saveAiProvider } from '$lib/server/aiProviderActions/saveAiProviders';

export const GET: RequestHandler = async () => {
	const providers = await getAiProviders();
	return new Response(JSON.stringify(providers), {
		headers: { 'content-type': 'application/json' }
	});
};

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.json();

	const provider = await saveAiProvider(body);

	console.log({ provider });
	return new Response(JSON.stringify(provider), {
		headers: { 'content-type': 'application/json' },
		status: 201
	});
};
