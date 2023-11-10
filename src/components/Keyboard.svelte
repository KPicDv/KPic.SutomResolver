<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import KeyboardRow from './KeyboardRow.svelte';

  export let yellow: Array<string> = []
  export let red: Array<string> = []

  const firstRowLetters = 'azertyuiop'.split('')
  const secondRowLetters = 'qsdfghjklm'.split('')
  const thirdRowLetters = 'wxcvbn'.split('')

  console.log(yellow);

  const dispatch = createEventDispatcher();

  const handleClick = (e: CustomEvent<{ letter: string }>) => {
    dispatch('click', { letter: e.detail.letter });
  }
</script>

<div>
  <KeyboardRow letters={firstRowLetters} yellow={yellow} red={red} on:click={handleClick} />
  <KeyboardRow letters={secondRowLetters} yellow={yellow} red={red} on:click={handleClick} />
  <KeyboardRow letters={thirdRowLetters} yellow={yellow} red={red} on:click={handleClick} />
</div>
