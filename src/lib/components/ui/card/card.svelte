<script>
	import { cn } from '$lib/utils.js';
	let className = undefined;
	export { className as class };
</script>

<div
	class={cn('rounded-xl border bg-card text-card-foreground shadow', className)}
	{...$$restProps}
	on:click
	on:focusin
	on:focusout
	on:mouseenter
	on:mouseleave
>
	<slot />
</div>
