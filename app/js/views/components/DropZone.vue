<template>
    <section class="drop-zone">
        <form action="/api/image/upload" enctype="multipart/form-data" method="post" id="image-upload-form" class="image-upload">
            <img src="img/icons/icon-image.svg" alt="Picture icon" class="image-upload__icon">
            <h1 class="image-upload__heading">Slap your pictures here</h1>
            <div class="image-upload__divider">or</div>
            <label for="image-upload-input" class="image-upload__button">Upload image</label>
            <input v-on:change="submitForm()" id="image-upload-input" name="image" type="file" accept="image/*" class="hidden">
        </form>
    </section>
</template>

<script>
  export default {
    methods: {
      submitForm: () => {
        document.getElementById('image-upload-form').submit();
      }
    }
  }
</script>

<style scoped lang="scss">
    .drop-zone {
        border: rem(2) dashed $secondary-color;
        border-radius: rem(20);
        padding: rem(65) rem(35);

        @media (max-width: 640px) {
            border: none;
        }
    }

    .image-upload {
        align-items: center;
        display: flex;
        flex-direction: column;

        &__icon {
            margin-bottom: rem(25);
            max-width: rem(114);

            @media (max-width: 640px) {
                margin-bottom: rem(40);
            }
        }

        &__heading {
            margin-bottom: 0;

            @media (max-width: 640px) {
                display: none;
            }
        }

        &__divider {
            font-weight: $wbook;
            font-size: rem(14);
            margin: rem(25) 0;

            @media (max-width: 640px) {
                display: none;
            }
        }

        &__button {
            @extend .button;
        }
    }

    .button {
        background: $secondary-color;
        border-radius: rem(2);
        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
        color: $primary-color;
        cursor: pointer;
        display: block;
        font-size: rem(14);
        font-weight: $wmedium;
        height: rem(36);
        line-height: rem(36);
        padding: 0 rem(16);
        text-align: center;
        text-transform: uppercase;
        transition: box-shadow 280ms cubic-bezier(0.4, 0, 0.2, 1);
        vertical-align: middle;
        -moz-osx-font-smoothing: grayscale;
        -webkit-font-smoothing: antialiased;

        &:hover {
            box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12);
        }

        &:active {
            box-shadow: none;
            transform: translateY(1px);
        }

        @media (max-width: 640px) {
            font-size: rem(16);
            height: 43px;
            line-height: 43px;
            padding: 0 rem(19);
        }
    }
</style>
