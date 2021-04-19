<script>
    import NavigationMenu from './NavigationMenu.svelte';
    import { Link } from 'svelte-routing';
    import { sendEvent, listenEvent, removeListenEvent } from './WebSocketCon';
    import { onMount, onDestroy } from 'svelte';

    let listOfUsers = [];

	sendEvent('list-users', null);


    onMount(() => {
        listenEvent('list-users-update', (messageEvent) => {
            listOfUsers = messageEvent.data;
        });
    })

    onDestroy(() => {
        removeListenEvent('list-users-update');
    })

</script>

<section>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-7 text-center">
                {#each listOfUsers as userUUID, index}
                    <Link class="btn btn-primary mb-3 d-inline-block" to="playing/online">Jogar com {userUUID}</Link>
                {/each}
            </div>
        </div>
    </div>
    
    <NavigationMenu></NavigationMenu>
</section>