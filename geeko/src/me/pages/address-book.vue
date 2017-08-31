<template>
    <div>

        <page-header><span>{{$t('label.addressBook')}}</span>  <span slot="oplabel">{{$t('label.add')}}</span></page-header>

        <address-list :addresses="addresses" :loading="false" @listing="listing" @list-address-edit="listEditHandle" @make-default="makeDefaultHandle"/>


        <transition name="uper">
            <address-editor v-if="showeditor" :address="editing" @close="close"/>
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
        transition: top .3s;
    }

    .uper-leave-active , .uper-enter{
        top: 100%;
    }
</style>

<script type="text/ecmascript-6">
    import AddressList from '../components/address-list.vue'
    import AddressEditor from '../../components/address-editor.vue'
    import store from '../../store'
    import {mapGetters} from 'vuex'
    import PageHeader from '../components/page-header.vue'

    export default{
        data(){
            return {
                loading: false,
                showeditor: false,
                editing:null
            }
        },
        computed: {
            ...mapGetters('me',['addresses'])
        },
        methods: {
            listing(){
                console.log('listing....')
            },
            listEditHandle(address){
                this.editing = address
                this.showeditor = true
            },
            close(){
                this.showeditor = false
            },
            makeDefaultHandle(id){
                store.dispatch('me/makeDefault', id).then(() => {

                })
            }
        },
        components: {
            'address-list': AddressList,
            'address-editor': AddressEditor,
            'page-header': PageHeader
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