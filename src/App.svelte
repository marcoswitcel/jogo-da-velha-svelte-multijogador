<script>
	// https://www.npmjs.com/package/svelte-routing
	import { Router, Route, Link } from 'svelte-routing';
	import Grid from './Grid.svelte';
	import Menu from './Menu.svelte';
	import Choosing from './Choosing.svelte';
</script>

<Router>
	<Route path="/">
		<Menu></Menu>
	</Route>
	<Route path="playing/:mode" let:params>
		<Grid mode={params.mode}></Grid>
	</Route>
	<Route path="choosing">
		<Choosing></Choosing>
	</Route>
</Router>
