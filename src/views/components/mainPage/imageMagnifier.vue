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
                    backgroundImage: "",
                    backgroundSize: "200",
                    backgroundPosition: "center",
                    width: "300px",
                    height: "300px",
                    position: "absolute",
                    border: "1px solid #ccc",
                    borderRadius: "50%",
                    display: "none"
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

                const magnifierWidth = 300;
                const magnifierHeight = 300;

                this.magnifiedStyle.backgroundImage = `url(${this.src})`;
                this.magnifiedStyle.backgroundRepeat = "no-repeat";
                this.magnifiedStyle.display = "block";

                let left = event.clientX - parentRect.left - (magnifierWidth / 2);
                let top = event.clientY - parentRect.top - (magnifierHeight / 2);

                if (left < 0) {
                    left = 0;
                } else if (left + magnifierWidth > parentRect.width) {
                    left = parentRect.width - magnifierWidth;
                }

                if (top < 0) {
                    top = 0;
                } else if (top + magnifierHeight > parentRect.height) {
                    top = parentRect.height - magnifierHeight;
                }

                this.magnifiedStyle.left = left + "px";
                this.magnifiedStyle.top = top + "px";

                this.magnifiedStyle.backgroundPosition = `${(x / rect.width) * 100}% ${(y / rect.height) * 100}%`;

                this.magnifiedStyle.backgroundSize = `${rect.width * 2}px ${rect.height * 2}px`;
            },

            reset() {
                this.isMagnifying = false;
                this.magnifiedStyle.display = "none";
            }
        }
    };
</script>

<style lang="scss" scoped>
    .image-magnifier {
        padding: 30px;
        position: relative;
        display: inline-block;
        cursor: none;

        @media (max-width: 768px) {
            padding: 0;
        }

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
  