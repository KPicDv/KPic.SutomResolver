<script lang="ts">
  import FirstLetterInput from './components/FirstLetterInput.svelte';
  import LettersCountInput from "./components/LettersCountInput.svelte";

  let step = 0
  let lettersCount = null
  let pattern = null
  
  const handleLettersCountInputChange = (e: CustomEvent<{ value: number }>) => {
    lettersCount = e.detail.value
    step = 1
  }

  const handleFirstLetterInputChange = (e: CustomEvent<{ letter: string}>) => {
    pattern = [e.detail.letter, ...Array(lettersCount - 1).fill('.')].join('')
    step = 2
  }
</script>

<main>
  {#if step === 0}
    <LettersCountInput on:change={handleLettersCountInputChange} />
  {/if}
  {#if step === 1}
    <FirstLetterInput on:change={handleFirstLetterInputChange} />
  {/if}
</main>

<style>
 main {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
 }
</style>
