<style>
	@import "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";

    .cell {
        height: 110px;
        line-height: 100px;
        font-size: 100px;
        user-select: none;
    }

    .cell.blue {
        color: blue;
    }

    .cell.red {
        color: red;
    }
</style>

<script>
	import Popup from './Popup.svelte';
    import NavigationMenu from './NavigationMenu.svelte';
	import GameState, { CellState } from './GameState';
	import handleChoiceFactory from './handleChoiceFactory.js';
	

	export let mode = 'two-player';
	let game = new GameState();
	let cells = game.cells;
	
	let alertMessage = "";

	const reset = () => {
		game.reset();
		cells = game.cells;
	}

	function showAlertMessage(message) {
		alertMessage = message;
	}

	const handleChoice = handleChoiceFactory(game, mode, () => {
		cells = game.cells;
			
		switch (game.checkForWinState()) {
			case 'ganhou': showAlertMessage(`"${game.getCurrentPlayer()}" venceu esta partida!`); break;
			case 'empatou': showAlertMessage(`Empatou!`); break;
			// Continuar
			default: game.changeTurn(); break;
		}	
	});
</script>

<section class="game">
	<div class="container">
		<div class="row">
			<div class="col-12">
				<h1 class="text-center">Jogo da velha</h1>
				<h2 class="text-center">{`Vez do jogador "${game.getCurrentPlayer()}"`}</h2>
				<hr class="mb-5">
			</div>
		</div>
		{#each cells as row, rowIndex }
		<div class="row text-center">
			{#each row as cell, cellIndex}
			<div class="col-4 border cell" class:blue="{cell === CellState.Player01}" class:red="{cell === CellState.Player02}" on:click={() => handleChoice(rowIndex, cellIndex)}>
				{cell}
			</div>
			{/each}
		</div>
		{/each}
	</div>
</section>

<NavigationMenu></NavigationMenu>

{#if alertMessage}
	<Popup message={alertMessage} onClose={reset}/>
{/if}

