<script>
    import NavigationMenu from './NavigationMenu.svelte';
    import { link } from 'svelte-routing';
</script>
<style>
    .bb { transform: scale(1.2);}
</style>
<section class="menu">
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-7 text-center">
                <a use:link class="bb btn btn-primary d-block mb-3" href="playing/two-players">
                    Jogar em dois
                </a>
                <a use:link class="bb btn btn-primary d-block mb-3" href="choosing">
                    Jogar com outra pessoa
                </a>
            </div>
        </div>
    </div>
</section>