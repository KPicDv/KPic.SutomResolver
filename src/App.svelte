<script lang="ts">
  import ContainedLettersInput from './components/ContainedLettersInput.svelte';
  import FirstLetterInput from './components/FirstLetterInput.svelte'
  import LettersCountInput from "./components/LettersCountInput.svelte"
  import PatternInput from './components/PatternInput.svelte';
  import WordsList from './components/WordsList.svelte'
  import Resolver from './lib/Resolver'

  let step = 0
  let lettersCount: number = null
  let pattern: string = null
  let remainingWordsCount: number = null
  let words: Array<string> = null
  let tries: Array<string> = []
  let contains: Array<string> = []
  let resolver: Resolver = null
  
  const handleLettersCountInputChange = (e: CustomEvent<{ value: number }>) => {
    lettersCount = e.detail.value
    step = 1
  }

  const handleFirstLetterInputChange = (e: CustomEvent<{ letter: string}>) => {
    pattern = [e.detail.letter, ...Array(lettersCount - 1).fill('.')].join('')
    resolver = new Resolver()
    words = resolver.getWords(pattern.toLowerCase(), contains, tries)
    remainingWordsCount = resolver.getRemainingWordsCount()
    step = 2
  }

  const handleTryWord = (e: CustomEvent<{word: string }>) => {
    tries.push(e.detail.word)
    step = 3
  }

  const handlePatternChange = (e: CustomEvent<{ pattern: string }>) => {
    pattern = e.detail.pattern
  }

  const handleValidatePattern = () => {
    step = 4
  }

  const handleValidateContainedLetters = () => {
    words = resolver.getWords(pattern.toLowerCase(), contains, tries)
    remainingWordsCount = resolver.getRemainingWordsCount()
    step = 2
  }

  const handleContainedLetterClick = (e: CustomEvent<{ letter: string }>) => {
    const index = contains.indexOf(e.detail.letter)
  
    if (index === -1) {
      contains = [...contains, e.detail.letter]
    } else {
      contains = contains.filter((l) => l != e.detail.letter)
    }
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
    <WordsList words={words} remainingWordsCount={remainingWordsCount} on:change={handleTryWord} />
  {/if}
  {#if step === 3}
    <PatternInput pattern={pattern} on:change={handlePatternChange} on:validate={handleValidatePattern} />
  {/if}
  {#if step === 4}
    <ContainedLettersInput contains={contains} on:click={handleContainedLetterClick} on:validate={handleValidateContainedLetters}/>
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
