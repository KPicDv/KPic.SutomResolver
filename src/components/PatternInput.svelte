<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Position } from '../models/Position';

  export let word: string
  export let positions: Array<Position>
  
  const dispatch = createEventDispatcher();

  const handleValidate = () => {
    let invalidLetters = word.split('').filter((letter, index) => !positions.some((p) => p.index === index && p.letter === letter))
    dispatch('validate', { positions, invalidLetters })
  }

  const handleChange = (index: number) => {
    const position = positions.find((p) => p.index === index)
    if (position) {
      if (position.isValid) {
        positions = positions.filter((p) => p !== position)
      } else {
        position.isValid = true
        positions = [...positions]
      }
    } else {
      positions = [...positions, { index, letter: word[index], isValid: false }]
    }
  }
</script>

<div>
  <h3>Sélection des lettres valides</h3>
  <div class="letters">
    {#each word as letter, index (index)}
      <button
        class:yellow={positions.some((p) => p.index === index && !p.isValid)}
        class:red={positions.some((p) => p.index === index && p.isValid)}
        on:click={() => handleChange(index)}
      >{letter}</button>
    {/each}
  </div>

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
    padding: 4px 24px;
  }
 </style>