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
  import { slide } from 'svelte/transition';
  export let status;
  export let error;

  let formVisible = false;
  
  let message = `Hey Jeff,
It looks like you have a problem on your site!
Here's the error message:
Status: ${status}
Message: ${error?.message}

Good luck fixing it!
`;

  const toggleForm = () => {
    formVisible = !formVisible;
  }

  const sendErrorReport = async() => {
    // do something to send the message!
  };
</script>

<div class="error-page">
  <h2 class="error-heading">OOPS!</h2>
  
  <h3 class="status">{status}</h3>
  
  <p class="message">{error.message}</p>
  <button on:click={toggleForm}>
    {formVisible ?  'Nevermind' : 'Let Jeff Know'}
  </button>
</div>

{#if formVisible}
<div class="form-section" transition:slide>
  <form on:submit|preventDefault={sendErrorReport}>
    <textarea bind:value={message} rows="8"/>
    <input type="submit" value="Send">
  </form>
</div>
{/if}

<style>
  .error-page {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space);
    margin-block: var(--space);
    text-align: center;
  }

  .error-page * {
    text-align: center;
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
  .form-section {
    display: flex;
    justify-content: center;
  }
  button {
    justify-self: center;
  }
  form {
    display: flex;
    flex-direction: column;
    gap: var(--space-small);
    min-width: 50vw;
  }
  textarea {
    text-align: left;
    padding: 0.5rem 1rem;
  }

  @media screen and (max-width: 550px) {
    form {
      max-width: 100%;
    }
  }
</style>