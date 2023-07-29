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
		<li><a href="/?test=0" on:click={drawerClose}>New Chat</a></li>
		{#each messages as { id, text }}
			<li><a href="/?test={id}" on:click={drawerClose}>{text}</a></li>
		{/each}
	</ul>
</nav>
