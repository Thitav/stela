<script lang="ts">
	import { file } from '$lib/stores/FileStore';
	import { marked } from 'marked';

	let md = '';

	file.subscribe((value) => {
		md = value.data;
	});
</script>

<div class="grid size-full grid-cols-2 gap-2">
	<textarea bind:value={md} class="textarea resize-none border-0 p-4 font-mono outline-none" />

	<article class="prose border-0 p-4 dark:prose-invert">
		{@html marked(md, { breaks: true })}
	</article>
</div>
