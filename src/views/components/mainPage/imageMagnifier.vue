<template>
    <div class="image-magnifier" @mousemove="magnify" @mouseleave="reset">
        <img :src="src" :alt="alt" class="top-section__img-block" />
        <div v-if="isMagnifying" class="magnified" :style="magnifiedStyle"></div>
    </div>
</template>

<script>
    export default {
        name: "imageMagnifier",

        props: {
            src: {
                type: String,
                required: true
            },

            alt: {
                type: String,
                required: true
            }
        },

        data() {
            return {
                isMagnifying: false,

                magnifiedStyle: {
                    backgroundImage: '',
                    backgroundSize: '700%',
                    backgroundPosition: 'center',
                    width: '200px',
                    height: '200px',
                    position: 'absolute',
                    border: '1px solid #ccc',
                    borderRadius: '50%',
                    display: 'none'
                }
            };
        },

        methods: {
            magnify(event) {
                this.isMagnifying = true;
                const img = event.currentTarget.querySelector('img');
                const rect = img.getBoundingClientRect();

                const parent = event.currentTarget;
                const parentRect = parent.getBoundingClientRect();

                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;

                const magnifierWidth = 200;
                const magnifierHeight = 200;

                this.magnifiedStyle.backgroundImage = `url(${this.src})`;
                this.magnifiedStyle.display = 'block';

                this.magnifiedStyle.left = (event.clientX - parentRect.left - (magnifierWidth / 2)) + 'px';
                this.magnifiedStyle.top = (event.clientY - parentRect.top - (magnifierHeight / 2)) + 'px';

                this.magnifiedStyle.backgroundPosition = `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`;

                this.magnifiedStyle.backgroundSize = `${rect.width * 2}px ${rect.height * 2}px`;
            },

            reset() {
                this.isMagnifying = false;
                this.magnifiedStyle.display = 'none';
            }
        }
    };
</script>

<style lang="scss" scoped>
    .image-magnifier {
        position: relative;
        display: inline-block;
        cursor: none;

        img {
            width: 100%;
            height: auto;
        }
    }

    .magnified {
        background: #fff;
        position: absolute;
        pointer-events: none;
        z-index: 5;
    }
</style>
  