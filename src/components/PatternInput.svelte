<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Keyboard from './Keyboard.svelte';

  export let pattern: string
  let selectedIndex: number = null
  
  const dispatch = createEventDispatcher();

  const handleLetterClick = (e: CustomEvent<{ letter: string }>) => {
    const paternParts = pattern.split('')
    paternParts[selectedIndex] = e.detail.letter
    
    dispatch('change', { pattern: paternParts.join('') });
    selectedIndex = null
  }

  const handleValidate = () => {
    dispatch('validate')
  }
</script>

<div>
  <h3>Sélection des lettres valides</h3>
  <div class="letters">
    {#each pattern as letter, index (index)}
      {#if letter === '.'}
        <button class:yellow={selectedIndex === index} on:click={() => selectedIndex = index}>{letter}</button>
      {:else}
        <button disabled>{letter}</button>
      {/if}
    {/each}
  </div>

  {#if selectedIndex}
    <Keyboard on:click={handleLetterClick} />
  {/if}

  <button class="action" on:click={handleValidate}>VALIDER</button>
</div>

<style>
  .letters {
    display: flex;
    justify-content: center;
    gap: 4px;
    margin-bottom: 12px;
  }

  .action {
    margin-top: 12px;
  }
 </style>