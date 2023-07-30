<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import {
		AppShell,
		AppBar,
		Avatar,
		Drawer,
		drawerStore,
		LightSwitch
	} from '@skeletonlabs/skeleton';
	import ChatHistory from '$lib/Components/ChatHistory.svelte';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faBars } from '@fortawesome/free-solid-svg-icons';
	import ChatInput from '$lib/Components/ChatInput.svelte';

	function drawerOpen() {
		drawerStore.open();
	}
</script>

<Drawer>
	<ChatHistory />
</Drawer>

<!-- App Shell -->
<AppShell slotSidebarLeft="w-0 md:w-52 bg-surface-500/10">
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<button class="md:hidden btn btn-sm mr-4" on:click={drawerOpen}>
					<Fa icon={faBars} />
				</button>
				<strong class="text-xl uppercase">InfernoChat</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<LightSwitch />
				<Avatar
					border="border-4 border-surface-300-600-token hover:!border-primary-500"
					cursor="cursor-pointer"
					initials="CI"
					width="w-10 md:w-12"
				/>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/skeletonlabs/skeleton"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<ChatHistory />
	</svelte:fragment>
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<div class="container p-10 mx-auto">
		<slot />
	</div>
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter"><ChatInput /></svelte:fragment>
	<!-- (footer) -->
</AppShell>
