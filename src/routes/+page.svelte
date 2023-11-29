<script lang="ts">
	import Text2image from '$lib/text2image.svelte';
	import Chat from '$lib/chat.svelte';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import { writable, type Writable } from 'svelte/store';

	const tabSet: Writable<number> = writable(0);
</script>

<TabGroup justify="justify-center">
	<Tab bind:group={$tabSet} name="text2img" value={0}>Text2Image</Tab>
	<Tab bind:group={$tabSet} name="tab2" value={1}>Chat</Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if $tabSet === 0}
			<Text2image />
		{:else if $tabSet === 1}
			<Chat />
		{/if}
	</svelte:fragment>
</TabGroup>
