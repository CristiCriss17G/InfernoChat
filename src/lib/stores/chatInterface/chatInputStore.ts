import { writable } from 'svelte/store';
import type { ChatMessage } from '$lib/types/ChatMessage';

export const messages = writable<ChatMessage[]>([]);
