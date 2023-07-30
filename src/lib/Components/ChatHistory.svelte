<script lang="ts">
	import { drawerStore } from '@skeletonlabs/skeleton';

	const messages = [
		{ id: 1, text: 'Hello World' },
		{ id: 2, text: 'Hello World' },
		{ id: 3, text: 'Hello World' }
	];

	function drawerClose() {
		drawerStore.close();
	}
</script>

<nav class="list-nav p-4">
	<ul>
		<li>
			<a href="/?test=0" class="btn variant-filled-primary my-2" on:click={drawerClose}>New Chat</a>
		</li>
		{#each messages as { id, text }}
			<li><a class="my-1" href="/?test={id}" on:click={drawerClose}>{text}</a></li>
		{/each}
		<li>
			<a href="/?test=-1" class="btn variant-ghost-secondary my-2" on:click={drawerClose}
				>Delete chat history</a
			>
		</li>
	</ul>
</nav>
