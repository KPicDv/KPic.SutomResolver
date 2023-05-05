<script lang="ts">
  import LettersCountInput from "./components/LettersCountInput.svelte";

  let step = 0
  let lettersCount = null
  
  const handleLettersCountInputChange = (value: number) => {
    lettersCount = value
    step = 1
  }
</script>

<main>
  {#if step === 0}
    <LettersCountInput on:change={handleLettersCountInputChange} />
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
