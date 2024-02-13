<script lang="ts">
	import '../app.pcss';
	import { file, type IFile } from '$lib/stores/FileStore';
	import { open } from '@tauri-apps/api/dialog';
	import { readTextFile } from '@tauri-apps/api/fs';
	import { LightSwitch, AppShell, RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

	let files: IFile[] = [];
	let selectedFileId = 0;

	function fileCreate() {
		files = [{ path: 'Untitled', data: '' }, ...files];
	}

	async function fileOpen() {
		const path = (await open({
			multiple: false,
			filters: [
				{
					name: 'Markdown',
					extensions: ['md']
				}
			]
		})) as string;
		const data = await readTextFile(path);

		files = [{ path, data }, ...files];
	}

	function fileSelect() {
		$file = files[selectedFileId];
	}
</script>

<AppShell>
	<svelte:fragment slot="header">
		<RadioGroup
			active="variant-filled-primary"
			hover="hover:variant-ghost-primary"
			border="border-none"
			background="bg-transparent"
			display="flex"
		>
			{#each files as file, index}
				<RadioItem
					bind:group={selectedFileId}
					name="justify"
					value={index}
					class="h-full py-2"
					on:change={fileSelect}
				>
					{file.path}
				</RadioItem>
			{/each}
			<button type="button" class="variant-filled-tertiary btn" on:click={fileCreate}>+</button>
		</RadioGroup>
	</svelte:fragment>

	<!-- (sidebarLeft) -->
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<svelte:fragment slot="footer">
		<LightSwitch />
		<button class="variant-filled-primary btn" on:click={fileOpen}>Open</button>
	</svelte:fragment>
</AppShell>
