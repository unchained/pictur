<template>
    <section class="section--success">
        <h1>URL to your image:</h1>
        <label for="generated-url" class="hidden">Your generated URL:</label>
        <input name="url" id="generated-url" class="section--success__url" type="url" autocomplete="off" autofocus="autofocus" v-bind:value="url" readonly="readonly">
        <img v-bind:src="url" alt="Your image">
        <div class="section--success__actions">
            <router-link to="/">Upload another</router-link>
        </div>
    </section>
</template>

<script>
  export default {
    props: ['url']
  }
</script>

<style scoped lang="scss">
    .section--success {
        align-items: center;
        display: flex;
        flex-flow: column;
        justify-content: center;

        &__url {
            animation: shake 0.4s ease-out 0.1s;
            border-radius: rem(2);
            margin-bottom: rem(34);
            margin-top: rem(10);
            padding: rem(10) rem(15);
        }

        &__actions {
            margin: rem(32) 0 0 0;
            text-decoration: underline;
        }

        img {
            border-radius: rem(2);
            box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
            display: block;
            max-width: 50%;
            max-height: 150px;
        }
    }

    @keyframes shake {
        0% {
            transform: translateY(0);
        }

        25% {
            transform: translateY(7%);
        }

        50% {
            transform: translateY(-7%);
        }

        75% {
            transform: translateY(7%);
        }

        100% {
            transform: translateY(0);
        }
    }
</style>
