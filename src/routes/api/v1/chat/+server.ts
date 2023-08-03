import type { RequestHandler } from './$types';
import { getConversations } from '$lib/server/chatActions/getConversations';

export const GET: RequestHandler = async () => {
	const conversations = await getConversations();
	return new Response(JSON.stringify(conversations), {
		headers: { 'content-type': 'application/json' }
	});
};
