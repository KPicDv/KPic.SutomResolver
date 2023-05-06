<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Keyboard from "./Keyboard.svelte";
 
  export let contains: Array<string>
  
  const dispatch = createEventDispatcher();

  const handleLetterClick = (e: CustomEvent<{ letter: string }>) => {
    dispatch('click', { letter: e.detail.letter})
  }

  const handleValidate = () => {
    dispatch('validate')
  }
</script>

<div>
  <h3>Lettres à replacer</h3>
  <Keyboard yellow={contains} on:click={handleLetterClick} />

  <button class="action" on:click={handleValidate}>VALIDER</button>
</div>

<style>
  .action {
    margin-top: 12px;
  }
</style>