<template>
    <div class="subscription">
        <div class="container">
            <p class="subscription__title">
                訂閱你我的甜蜜郵件
            </p>
            <form>
                <span class="material-icons">email</span>
                <input type="text">
                <button><span class="material-icons">arrow_forward</span></button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Subscription'
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common.scss';
.subscription {
    background-color: $dark-color;
    > .container {
        display: flex;
        flex-direction: column;
        padding-top: 30px;
        padding-bottom: 30px;
        justify-content: center;
        align-items: center;
        @media (min-width: #{$tablet-width + 1}px) {
            flex-direction: row;
            padding-right: 30px;
            padding-left: 30px;
            max-width: 840px;
            justify-content: space-between;
        }
    }
    &__title {
        display: flex;
        margin-bottom: 30px;
        color: $light-color;
        font-size: 24px;
        align-items: center;
        flex-shrink: 0;
        @media (min-width: #{$tablet-width + 1}px) {
            margin-right: 1em;
            margin-bottom: 0;
        }
        &::before {
            margin-right: 20px;
            width: 40px;
            height: 40px;
            background: url('~@/assets/images/logo-s-light.svg') 50%/contain;
            content: '';
        }
    }
    form {
        position: relative;
        display: flex;
        width: 100%;
        height: 56px;
        @media (min-width: #{$tablet-width + 1}px) {
            width: 380px;
        }
        > span {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 20px;
            margin: auto 0;
            width: 24px;
            height: 24px;
            color: $dark-color;
        }
        > [type=text] {
            padding: 0 1em 0 4em;
            border: none;
            background-color: $light-color;
            flex-grow: 1;
            &:focus {
                outline: none;
            }
        }
        > button {
            width: 64px;
            background-color: #ffe180;
            color: $dark-color;
        }
    }
}
</style>
