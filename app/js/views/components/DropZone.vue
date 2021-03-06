<template>
    <section class="drop-zone" id="dropZone">
        <form ref="imageUploadForm" v-on:submit.prevent="onFormSubmit" action="/api/image/upload" enctype="multipart/form-data" method="post" id="image-upload-form" class="image-upload">
            <img src="img/icons/icon-image.svg" alt="Picture icon" class="image-upload__icon">
            <h1 class="image-upload__heading">Slap your pictures here</h1>
            <div class="image-upload__divider">or</div>
            <label for="image-upload-input" class="image-upload__button">Upload image</label>
            <input v-on:change="submitForm" id="image-upload-input" name="image" type="file" accept="image/*" class="hidden">
            <input type="submit" hidden="hidden">
        </form>
        <img src="img/icons/icon-arrow.svg" alt="Arrow icon" class="drop-zone__arrow">
    </section>
</template>

<script>
  import axios from 'axios';

  export default {
    mounted() {
      const target = document.getElementById('dropZone');
      const fileInput = document.getElementById('image-upload-input');

      target.addEventListener('dragover', (e) => {
        e.preventDefault();
        target.classList.add('drag');
      });

      target.addEventListener('dragleave', () => {
        target.classList.remove('drag');
      });

      target.addEventListener('drop', (e) => {
        e.preventDefault();
        target.classList.remove('drag');

        fileInput.files = e.dataTransfer.files;
      });
    },
    methods: {
      submitForm() {
        this.$refs.imageUploadForm.dispatchEvent(new Event('submit', {
          'bubbles': true,
          'cancelable': true
        }));
      },
      onFormSubmit(e) {
        const form = e.target;
        axios({
          url: form.getAttribute('action'),
          method: form.getAttribute('method'),
          responseType: 'json',
          headers: {
            'Content-Type': form.getAttribute('enctype')
          },
          data: new FormData(form),
          onUploadProgress: this.onUploadProgress
        }).then((res) => {
          console.log(res.data);
          this.$router.replace({
            name: 'upload',
            params: res.data
          });
        }).catch((err) => {
          alert('Error in image submission ');
        });
      },
      onUploadProgress(event) {
        console.log('progress');
        if (event.lengthComputable) {
          event.percent = (event.loaded / event.total) * 100;
          console.log(event.percent);
        }
      }
    }
  }
</script>

<style scoped lang="scss">
    .drop-zone {
        border: rem(2) dashed $secondary-color;
        border-radius: rem(20);
        padding: rem(65) rem(35);
        position: relative;
        transition: background 250ms ease;

        &__arrow {
            left: 50%;
            opacity: 0;
            pointer-events: none;
            position: absolute;
            top: 50%;
            transform: translate3d(-50%, -50%, 0) scale(0.75);
            transition: opacity 250ms ease, transform 250ms ease;
            width: rem(50);
        }

        @media (max-width: 640px) {
            border: none;
        }

        &.drag {
            background: $secondary-color;

            .drop-zone__arrow {
                opacity: 1;
                transform: translate3d(-50%, -50%, 0) scale(1);
            }

            .image-upload {
                transform: scale(0.75);
                opacity: 0;
            }
        }
    }

    .image-upload {
        align-items: center;
        backface-visibility: hidden;
        display: flex;
        flex-direction: column;
        transition: opacity 250ms ease, transform 250ms ease;

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
