<template>
    <div>
        <ul>
            <slot v-for="item in items" name="li" :item="item"></slot>
        </ul>
        <div v-show="loading">loading</div>
    </div>
</template>

<style type="scss/text" lang="scss">

</style>

<script type="text/ecmascript-6">
    export default{
        props: {
            items: {
                type: Array,
                required: true
            },
            loading: {
                type: Boolean,
                default: false
            },
            scrollable: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            scrollHandle(evt){
                evt.preventDefault()
                let [scrollTop, documentHeight, windowHeight] = [
                    document.documentElement.scrollTop || document.body.scrollTop,
                    document.body.clientHeight,
                    window.screen.height
                ]


                if (scrollTop + windowHeight >= documentHeight - 100) {
                    if (!this.loading) {
                        this.$emit('listing')
                    }
                }
            }
        },
        mounted(){
            if (this.scrollable)
                window.addEventListener('scroll', this.scrollHandle)
        },
        destroyed(){
            window.removeEventListener('scroll', this.scrollHandle)
        },
        activated(){
            if (this.scrollable)
                window.addEventListener('scroll', this.scrollHandle)
        },
        deactivated(){
            window.removeEventListener('scroll', this.scrollHandle)
        }
    }
</script>