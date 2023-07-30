<script lang="ts">
	import { messages } from '$lib/stores/chatInterface/chatInputStore';
	import ChatMessages from '$lib/Components/ChatMessages.svelte';
</script>

<svelte:head>
	<title>InfernoChat</title>
</svelte:head>

<div class="card p-4 mb-5 {$messages.length > 0 ? 'hidden' : ''}">
	<h1 class="text-3xl font-bold mb-4">InfernoChat</h1>
	<p class="mb-4">Welcome to InfernoChat, an ai chat application</p>
</div>
<ChatMessages messages={$messages} />
