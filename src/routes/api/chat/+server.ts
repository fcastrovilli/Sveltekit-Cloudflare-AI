import { run } from '$lib';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { messages } = await request.json();

	const stream = await run('@cf/meta/llama-2-7b-chat-int8', {
		messages,
		stream: true
	});

	return new Response(stream.body, { headers: { 'content-type': 'text/event-stream' } });
};
