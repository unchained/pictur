<template>
    <section class="dropzone">
        <form action="/upload" method="post" class="image-upload">
            <img src="img/icons/icon-image.svg" alt="Picture icon" class="image-upload__icon">
            <h1 class="image-upload__heading">Slap your pictures here</h1>
            <div class="image-upload__divider">or</div>
            <router-link to="/upload">
                <label for="image-upload" class="image-upload__button">Choose a file</label>
            </router-link>
            <input id="image-upload" name="image" type="file" accept="image/*" class="hidden">
        </form>
    </section>
</template>

<script>
  export default {
    name: 'index'
  }
</script>

<style scoped lang="scss">

</style>
