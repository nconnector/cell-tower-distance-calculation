<template>
    <div id="overlay" @click="closeModal">
        <div id="modal" @click.stop="null">
            <slot />
            <div class="btn" @click="closeModal" />
        </div>
    </div>
</template>

<script>
export default {
    name: "ModalComponent",
    props: {
        msg: String,
    },
    methods: {
        closeModal() {
            this.$emit("close-modal");
        },
    },
};
</script>

<style scoped lang="scss">
#overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.035);
    display: flex;
    align-items: flex-start;
    justify-content: center;
}
#modal {
    $border-color: rgba(0, 0, 0, 0.2);
    position: relative;
    margin-top: 10em;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3em;
    gap: 1em;
    border: 1px solid $border-color;
    box-shadow: 0.2em 0.2em 0.8em 0.2em $border-color;
    background: white;
}
.btn {
    position: absolute;
    right: 1em;
    top: 1em;
    cursor: pointer;

    height: 1.5em;
    width: 1.5em;
    // mask-image: url(icon.svg);
    mask-image: url("https://img.icons8.com/ios-glyphs/30/000000/delete-sign.png");
    mask-size: cover;
    background: rgba(0, 0, 0, 0.4);
    &:hover {
        background: rgba(0, 0, 0, 0.8);
    }
}
</style>
