<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';
	import type { ChatMessage } from '$lib/types/ChatMessage';
	import ChatMessageComponent from '$lib/Components/ChatMessage.svelte';
	export let messages: ChatMessage[];

	let messagesContainer: HTMLDivElement;

	onMount(scrollToBottom);

	afterUpdate(scrollToBottom);

	function scrollToBottom() {
		const { scrollTop, scrollHeight, clientHeight } = messagesContainer;
		const maxScrollTop = scrollHeight - clientHeight;
		if (scrollTop < maxScrollTop) {
			messagesContainer.scrollTo({
				top: maxScrollTop,
				behavior: 'smooth'
			});
		}
	}
</script>

<div bind:this={messagesContainer} class="chat-messages-box {messages.length <= 0 ? 'hidden' : ''}">
	<!-- Render user input and chatbot responses -->
	{#each messages as message}
		<ChatMessageComponent {message} />
	{/each}
</div>

<style lang="postcss">
	.chat-messages-box {
		@apply mb-2 p-2 h-[70vh] overflow-y-scroll;
	}
</style>
