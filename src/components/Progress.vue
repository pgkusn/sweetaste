<template>
    <ul :class="['progress', { success: $props.now === 4 }]">
        <li v-for="n in 3" :key="n" :class="getItemStyle(n)">
            {{ ($props.now - 2 === n || $props.now - 1 === n || $props.now === 4) ? 'check' : '' }}
        </li>
    </ul>
</template>

<script>
export default {
    name: 'Progress',
    props: {
        now: {
            type: Number,
            default: 1
        }
    },
    setup (props) {
        const getItemStyle = n => {
            if (props.now - 2 === n || props.now - 1 === n || props.now === 4) {
                return 'material-icons';
            }
            if (props.now === n) {
                return 'now';
            }
        };
        return {
            getItemStyle
        };
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common.scss';
$next-color: #8da291;
.progress {
    display: inline-flex;
    align-items: center;
    > li {
        box-sizing: content-box;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        + li {
            position: relative;
            margin-left: 47px;
            border: 1px solid $next-color;
            @media (min-width: #{$tablet-width + 1}px) {
                margin-left: 65px;
            }
            &::before {
                position: absolute;
                top: 50%;
                right: 100%;
                width: 47px;
                height: 1px;
                background-color: $next-color;
                content: '';
                @media (min-width: #{$tablet-width + 1}px) {
                    width: 65px;
                }
                @at-root {
                    .success > li + li::before {
                        background-color: $dark-color;
                    }
                }
            }
        }
        &.material-icons {
            border: none;
            background-color: $light-color;
            color: $dark-color;
            text-align: center;
            font-size: 18px;
            line-height: 20px;
            @at-root {
                .success > li.material-icons {
                    background-color: $dark-color;
                    color: $light-color;
                }
            }
            &::before {
                background-color: $light-color;
                @at-root {
                    .success > li.material-icons::before {
                        background-color: $dark-color;
                    }
                }
            }
        }
        &.now {
            width: 16px;
            height: 16px;
            border: none;
            background-color: $light-color;
            box-shadow: 0 0 0 2px #{$dark-color}, 0 0 0 3px #{$light-color};
            &::before {
                right: calc(100% + 3px);
                width: 44px;
                background-color: $light-color;
                @media (min-width: #{$tablet-width + 1}px) {
                    width: 62px;
                }
            }
            + li::before {
                width: 44px;
                @media (min-width: #{$tablet-width + 1}px) {
                    width: 62px;
                }
            }
        }
    }
}
</style>
