<template>
    <footer>
        <div class="container">
            <div class="title">
                <img src="@/assets/images/logo-m.svg" alt="Sweetaste">
            </div>
            <div class="info">
                07-1234-5678<br>
                sweetaste@email.com<br>
                800 高雄市新興區幸福路 520 號
            </div>
            <div class="social">
                <a href=""><img src="@/assets/images/ic-facebook.svg" alt=""></a>
                <a href=""><img src="@/assets/images/ic-line.svg" alt=""></a>
            </div>
            <div class="copyright">
                © {{ new Date().getFullYear() }} Sweetaste* All Rights Reserved
            </div>
            <div class="subtitle">
                今天是個——<br>吃水果的好日子。
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'PageFooter'
};
</script>

<style lang="scss" scoped>
@import '@/assets/sass/common.scss';
footer {
    background-color: $light-color;
}
.container {
    display: grid;
    padding-top: 40px;
    padding-bottom: 30px;
    color: #3f5d45;
    grid-template-areas: 'title'
    'info'
    'social'
    'copyright';
    grid-template-rows: auto 108px 69px 39px;
    grid-template-columns: 1fr;
    @media (min-width: #{$tablet-width + 1}px) {
        padding-right: 122px;
        padding-left: 122px;
        grid-template-areas: 'title subtitle'
        'info subtitle'
        'social copyright';
        grid-template-rows: auto 184px 62px;
        grid-template-columns: 4fr 5fr;
    }
}
.title {
    width: 170px;
    grid-area: title;
}
.info {
    line-height: 1.5;
    grid-area: info;
    align-self: end;
}
.social {
    display: flex;
    grid-area: social;
    align-self: end;
    > a {
        width: 32px;
        height: 32px;
        + a {
            margin-left: 8px;
        }
    }
}
.copyright {
    grid-area: copyright;
    align-self: end;
    @media (min-width: #{$tablet-width + 1}px) {
        justify-self: end;
    }
}
.subtitle {
    display: none;
    text-indent: -.5em;
    letter-spacing: 4.8px;
    font-size: 24px;
    line-height: 1.5;
    grid-area: subtitle;
    writing-mode: vertical-rl;
    @media (min-width: #{$tablet-width + 1}px) {
        display: block;
        justify-self: end;
    }
}
</style>
