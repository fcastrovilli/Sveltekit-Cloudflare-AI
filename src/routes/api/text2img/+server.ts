import { run } from '$lib';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { prompt } = await request.json();
	let result = await run('@cf/stabilityai/stable-diffusion-xl-base-1.0', {
		prompt: prompt
	});
	return new Response(result, {
		headers: {
			'content-type': 'image/png'
		}
	});
};
