<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Keyboard from './Keyboard.svelte';
  
  const dispatch = createEventDispatcher();

  const handleClick = (e: CustomEvent<{ letter: string }>) => {
    dispatch('change', { letter: e.detail.letter });
  }
</script>

<div>
  <h3>Première lettre</h3>
  <Keyboard on:click={handleClick} />
</div>