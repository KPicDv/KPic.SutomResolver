<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const firstRowLetters = 'AZERTYUIOP'
  const secondRowLetters = 'QSDFGHJKLM'
  const thirdRowLetters = 'WXCVBN'

  const dispatch = createEventDispatcher();

  const handleClick = (letter: string) => {
    dispatch('click', { letter });
  }
</script>

<div>
  <div class="row">
    {#each firstRowLetters as letter}
      <button on:click={() => handleClick(letter)}>{letter}</button>
    {/each}
  </div>
  <div class="row">
    {#each secondRowLetters as letter}
      <button on:click={() => handleClick(letter)}>{letter}</button>
    {/each}
  </div>
  <div class="row">
    {#each thirdRowLetters as letter}
      <button on:click={() => handleClick(letter)}>{letter}</button>
    {/each}
  </div>
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
