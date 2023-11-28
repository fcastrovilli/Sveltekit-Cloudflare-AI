import { CF_API_TOKEN, CF_USER_ID } from '$env/static/private';

export async function run(model: string, input: any) {
	const response = await fetch(
		`https://api.cloudflare.com/client/v4/accounts/${CF_USER_ID}/ai/run/${model}`,
		{
			headers: { Authorization: 'Bearer ' + CF_API_TOKEN },
			method: 'POST',
			body: JSON.stringify(input)
		}
	);
	if (response.headers.get('content-type')?.includes('image/png')) {
		const result = await response.blob();

		return result;
	} else {
		const result = await response.json();
		return result;
	}
}
