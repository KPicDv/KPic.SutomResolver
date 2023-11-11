<script lang="ts">
  import axios from 'axios';
  import FirstLetterInput from './components/FirstLetterInput.svelte';
  import LettersCountInput from "./components/LettersCountInput.svelte";
  import WordInput from './components/WordInput.svelte';
  import WordsList from './components/WordsList.svelte';
  import type { Position } from './models/Position';

  let step = 0
  let size: number = null
  let remainingWordsCount: number = null
  let positions: Array<Position> = []
  let words: Array<string> = null
  let currentWord = ''
  let invalidLetters: Array<string> = []

  const getWords = async () => {
    const response = await axios.post('https://api.game-resolver.kpic.dev/sutom/resolve', {
      size: size,
      positions,
      invalidLetters,
    })
    words = response.data.words
    remainingWordsCount = response.data.total
    step = 2
  }
  
  const handleLettersCountInputChange = (e: CustomEvent<{ value: number }>) => {
    size = e.detail.value
    step = 1
  }

  const handleFirstLetterInputChange = (e: CustomEvent<{ letter: string}>) => {
    positions = [...positions, { index: 0, letter: e.detail.letter, isValid: true }]
    getWords()
  }

  const handleTryWord = (e: CustomEvent<{word: string }>) => {
    currentWord = e.detail.word
    step = 3
  }

  const handleValidatePattern = (e: CustomEvent<{ positions: Array<Position>, invalidLetters: Array<string> }>) => {
    positions = e.detail.positions
    invalidLetters = [...invalidLetters, ...e.detail.invalidLetters]
    getWords()
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
    <WordInput word={currentWord} positions={positions} on:validate={handleValidatePattern} />
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
