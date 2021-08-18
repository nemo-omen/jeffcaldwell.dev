<script>
  export let title;
  $: count = 0;

  function addOne() {
    count = count +1;
  }
</script>

<div class="example">
  <p>You have clicked the button {count} times.</p>

  <button on:click={addOne}>{title}</button>
</div>

<style>
  .example {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }
  button {
    line-height: 0.5;
    color: #fff;
    background-color: tomato;
    padding: 1rem;
    box-shadow: 5px 5px 10px rgb(0, 0, 0, 0.3);
  }
</style>