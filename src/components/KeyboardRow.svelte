<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let letters: Array<string>
  export let yellow: Array<string>
  export let red: Array<string>

  const dispatch = createEventDispatcher();

  const handleClick = (letter: string) => {
    dispatch('click', { letter });
  }
</script>

<div class="row">
  {#each letters as letter, index (index)}
    <button
      class:yellow={yellow.includes(letter)}
      class:red={red.includes(letter)}
      class="small"
      on:click={() => handleClick(letter)}
    >{letter}</button>
  {/each}
</div>

<style>
 .row {
  display: flex;
  justify-content: center;
  text-align: center;
  gap: 4px;
  margin-bottom: 4px;
 }
</style>