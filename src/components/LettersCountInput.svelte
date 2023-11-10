<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  const handleClick = (value: number) => {
    dispatch('change', { value });
  }
</script>

<div>
  <h3>Nombre de lettres</h3>
  <div class="buttons">
    <button class="large" on:click={() => handleClick(5)}>5</button>
    <button class="large" on:click={() => handleClick(6)}>6</button>
    <button class="large" on:click={() => handleClick(7)}>7</button>
    <button class="large" on:click={() => handleClick(8)}>8</button>
    <button class="large" on:click={() => handleClick(9)}>9</button>
    <button class="large" on:click={() => handleClick(10)}>10</button>
    <button class="large" on:click={() => handleClick(11)}>11</button>
    <button class="large" on:click={() => handleClick(12)}>12</button>
  </div>
</div>

<style>
  .buttons {
    display: flex;
    justify-content: center;
    gap: 12px;
  }
</style>