<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let words: Array<string>
  export let remainingWordsCount: number

  const dispatch = createEventDispatcher();

  const handleClick = (word: string) => {
    dispatch('change', { word });
  }
</script>

<div>
  <h3>{remainingWordsCount} mots restants</h3>
  {#each words as word}
    <div class="word" on:click={() => handleClick(word)} on:keydown={() => handleClick(word)}>{word}</div>
  {/each}
</div>

<style>
  .word {
    background: #045e9b;
    width: calc(100vw - 50px);
    height: 28px;
    padding: 8px;
    border: 2px solid #303436;
    cursor: pointer;
    text-transform: uppercase;
    margin-bottom: 12px;
    line-height: 25px;
  }
 </style>