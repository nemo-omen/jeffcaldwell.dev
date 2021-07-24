<script context="module">
  export const load = ({error, status}) => {
    return {
      props: {
        status,
        error
      }
    }
  };
</script>
<script>
  export let status;
  export let error;
  console.log(error);
</script>

<div class="error-page">
  <h2 class="error-heading">OOPS!</h2>
  
  <h3 class="status">{status}</h3>
  
  <p class="message">{error.message}</p>
</div>

<style>
  .error-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-small);
    margin-block: var(--space);
  }

  .error-heading {
    font-size: var(--font-size-xxl);
  }

  .status{ 
    font-size: var(--font-size-xxl);
    font-weight: 900;
    text-decoration: underline;
    text-decoration-color: var(--red);
    text-decoration-thickness: 0.25rem;
    text-underline-offset: 0.5rem;
  }
</style>