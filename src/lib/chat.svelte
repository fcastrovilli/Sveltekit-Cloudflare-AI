<script lang="ts">
	import { SSE } from 'sse.js';
	let prompt: string = '';
	let loading = false;
	let answer: string = '';
	let character: string =
		'You are a sad assistant, you are concise and use only few selected emojis.';
	let chatMessages: { role: string; content: string }[] = [];
	$: chatMessages;
	$: console.log(chatMessages);
	const handleSubmit = async () => {
		loading = true;
		chatMessages = [...chatMessages, { role: 'user', content: prompt }];
		const newMessage = [
			{ role: 'user', content: prompt }
			// { role: 'system', content: character }
		];

		const eventSource = new SSE('/api/chat', {
			headers: {
				'Content-Type': 'application/json'
			},
			payload: JSON.stringify({ messages: newMessage })
		});

		prompt = '';

		eventSource.addEventListener('error', handleError);

		eventSource.addEventListener('message', (e) => {
			try {
				loading = false;
				if (e.data === '[DONE]') {
					chatMessages = [...chatMessages, { role: 'assistant', content: answer }];
					answer = '';
					return;
				}
				answer += JSON.parse(e.data).response;
			} catch (err) {
				handleError(err);
			}
		});
		eventSource.stream();
	};

	function handleError<T>(err: T) {
		loading = false;
		prompt = '';
		answer = '';
		console.error(err);
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="mb-40 space-y-5 w-full h-full">
		<h1 class="h1 text-center">Llama</h1>
		{#each chatMessages as message}
			{#if message.role === 'user'}
				<div class="card variant-outline-primary p-4 w-3/4 float-right">
					<p>{message.content}</p>
				</div>
			{:else if message.role === 'assistant'}
				<div class="card variant-outline-success p-4 w-3/4 float-left">
					<p>{message.content}</p>
				</div>
			{/if}
		{/each}

		{#if !loading && answer !== ''}
			<div class="card variant-outline-success p-4 w-3/4 float-left">
				<p>{answer}</p>
			</div>
		{:else if loading}
			<p class="card variant-outline-success p-4 w-3/4 float-left">Loading...</p>
		{/if}
	</div>
	<div class="w-full fixed left-0 bottom-0">
		<form
			method="post"
			class="flex justify-between m-4"
			action="?/chat"
			on:submit|preventDefault={() => handleSubmit()}
		>
			<input bind:value={prompt} type="text" name="prompt" class="input mx-2" />
			<button type="submit" class="btn variant-filled py-2 mx-2">✈️</button>
		</form>
	</div>
</div>
