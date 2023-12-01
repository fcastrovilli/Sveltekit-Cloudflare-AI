import { run } from '$lib';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const { prompt } = await request.json();
	console.log(prompt);
	let result = await run('@cf/stabilityai/stable-diffusion-xl-base-1.0', {
		prompt: prompt
	});
	console.log(result);
	return new Response(result, {
		headers: {
			'content-type': 'image/png'
		}
	});
};
