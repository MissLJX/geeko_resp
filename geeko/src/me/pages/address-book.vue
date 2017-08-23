<template>
    <div>
        <address-list :addresses="addresses" :loading="false" @listing="listing"/>

        <button  @click="showeditor = !showeditor">Test</button>

        <transition name="uper">
            <div class="el-address-editor" v-if="showeditor">
                <span @click="showeditor = !showeditor">close</span>
            </div>
        </transition>
    </div>
</template>

<style scoped lang="scss">

    .el-address-editor{
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: #fff;
        top:0;
    }

    .uper-enter-active, .uper-leave-to{
        top:0;
    }

    .uper-enter-active , .uper-leave-active{
        transition: top .5s;
    }

    .uper-leave-active , .uper-enter{
        top: 100%;
    }
</style>

<script type="text/ecmascript-6">
    import AddressList from '../components/address-list.vue'
    import store from '../../store'
    import {mapGetters} from 'vuex'

    export default{
        data(){
            return {
                loading: false,
                showeditor: false
            }
        },
        computed: {
            ...mapGetters('me',['addresses'])
        },
        methods: {
            listing(){
                console.log('listing....')
            },
            testHandle(){
                this.showeditor = true
                alert(this.showeditor)
            }
        },
        components: {
            'address-list': AddressList,
        },
        beforeRouteEnter(to, from, next){
            store.dispatch('me/getAddresses').then(() => {
                next()
            }).catch((e) => {
                console.error(e)
                next(false)
            })
        }
    }
</script>