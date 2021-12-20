<template>
    <div class="el-address-book-body">
        <!--   <span @click="addAddressHandle" slot="oplabel">{{$t('label.add')}}</span> -->
        <page-header><span>{{$t('label.addressBook')}}</span></page-header>

        <address-list :addresses="addresses" :finished="finished" :loading="false" @listing="listing" @delete="deleteHandle" @list-address-edit="listEditHandle" @make-default="makeDefaultHandle"/>


        <div class="sett-address-footer">
            <div class="add-address"  @click="addAddressHandle">Add New Address</div>
        </div>

        <transition name="uper">
            <address-editor v-if="showeditor" :showLabel="true" :address="editing" @close="close"/>
        </transition>

        <loadding v-show="loading"></loadding>
    </div>
</template>

<style scoped lang="scss">

    .el-address-book-body{
        background-color: #fff;
    }

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

    .sett-address-footer{
        width: 100%;
        position: fixed;
        bottom: 51px;
        left: 0px;
        right: 0px;
        text-align: center;
        padding: 0px 13px 20px 13px;
        background-color: #fff;

        .add-address{
            height: 42px;
            line-height: 42px;
            background-color: #222222;
            font-family: SlatePro-Medium;
            font-size: 17px;
            color: #ffffff;
        }
    }
</style>

<script type="text/ecmascript-6">
    import AddressList from '../components/address-list.vue'
    import AddressEditor from '../../components/address-editor.vue'
    import store from '../../store'
    import {mapGetters} from 'vuex'
    import PageHeader from '../components/page-header.vue'

    import Loading from '../../components/loading.vue'

    export default{
        data(){
            return {
                loading: false,
                showeditor: false,
                editing:null,
                finished:false
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
                this.loading = true;
                store.dispatch('me/makeDefault', id).then(() => {
                    this.loading = false;
                })
            },
            deleteHandle(id){
                store.dispatch('me/deleteAddress', {id})
            },
            addAddressHandle(){
                this.editing = null
                this.showeditor = true
            }
        },
        components: {
            'address-list': AddressList,
            'address-editor': AddressEditor,
            'page-header': PageHeader,
            'loadding' : Loading
        },
        beforeRouteEnter(to, from, next){
            store.dispatch('me/getAddresses').then(() => {
                next();
            }).catch((e) => {
                console.error(e)
                next(false)
            })
        }
    }
</script>