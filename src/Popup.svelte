<style>
.popup--container {
    position: fixed;
    background-color: rgba(0,0,0,.05);
    top: 0;
    left: 0;
    display: none;
    width: 100vw;
    height: 100vh;
}
.popup--visible {
    display: block;
}
.popup-window {
    position: absolute;
    border-radius: 5px;
    background-color: white;
    font-size: 16px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 300px;
    height: fit-content;
    padding: 2em;
    text-align: center;
}
.button {
    background-color: dodgerblue;
    border-radius: 5px;
    color: white;
    display: block;
    margin: .5em auto 0;
    padding: .4em 1em;
    transition: all .1s ease-in;
}
.button:hover {
    background-color: rgb(26, 114, 201);
}
</style>

<script>
    export let visible = false;
    export let message = "";
    export let onClose = () => {};

    function handleClick() {
        visible = false;
        onClose();
    }

    $: visible = !!message;
</script>


<div class="popup--container" class:popup--visible={visible}>
    <div class="popup-window">
        {message}
        <button class="button" type="button" on:click={handleClick} >
            Ok
        </button>
    </div>
</div>