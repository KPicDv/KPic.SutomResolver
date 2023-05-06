<script lang="ts">
  import FirstLetterInput from './components/FirstLetterInput.svelte'
  import LettersCountInput from "./components/LettersCountInput.svelte"
  import WordsList from './components/WordsList.svelte'
  import Resolver from './lib/Resolver'

  let step = 0
  let lettersCount: number = null
  let pattern: string = null
  let remainingWordsCount: number = null
  let words: Array<string> = null
  let resolver: Resolver = null
  
  const handleLettersCountInputChange = (e: CustomEvent<{ value: number }>) => {
    lettersCount = e.detail.value
    step = 1
  }

  const handleFirstLetterInputChange = (e: CustomEvent<{ letter: string}>) => {
    pattern = [e.detail.letter, ...Array(lettersCount - 1).fill('.')].join('')
    resolver = new Resolver(pattern)
    words = resolver.getWords()
    remainingWordsCount = resolver.getRemainingWordsCount()
    step = 2
  }

  const handleTryWord = (e: CustomEvent<{word: string }>) => {
    resolver.addTry(e.detail.word)
    step = 3
  }
</script>

<main>
  {#if step === 0}
    <LettersCountInput on:change={handleLettersCountInputChange} />
  {/if}
  {#if step === 1}
    <FirstLetterInput on:change={handleFirstLetterInputChange} />
  {/if}
  {#if step === 2}
    <WordsList words={words} remainingWordsCount={remainingWordsCount} on:change={handleTryWord}/>
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
