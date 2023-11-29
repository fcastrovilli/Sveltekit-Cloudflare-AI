<script lang="ts">
	let prompt: string = '';
	let image: HTMLImageElement;
	function text2image() {
		fetch('/api/text2img', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				prompt: prompt
			})
		})
			.then((res) => res.blob())
			.then((blob) => {
				const url = URL.createObjectURL(blob);
				image.src = url;
			});
	}
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-5">
		<h1 class="h1">Stable Diffusion XL</h1>
		<label for="prompt" class="font-bold">Prompt</label>
		<input bind:value={prompt} type="text" name="prompt" class="input mb-4" />
		<button type="submit" class="btn variant-filled" on:click={text2image}>Text2Image</button>
		<img bind:this={image} alt="" />
	</div>
</div>
