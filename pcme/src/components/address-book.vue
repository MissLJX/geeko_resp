<template>
    <div class="address-book">
        <span class="add-new" @click="addNewAdd">+  {{$t('addnewaddress')}}</span>
        <div class="add-block">
            <div class="address" v-for="address in addresses">
                <div class="address-info">
                    <p><strong>{{addressName(address)}}</strong>({{address.phoneNumber}})</p>
                    <p class="mt-20">{{address.streetAddress1}} , {{address.unit}}</p>
                    <!--<p>{{address.zipCode}} , {{address.city}} , {{address.state.label ? address.state.label :address.state.value}} , {{address.country.label}}</p>-->
                    <p>{{addressStr(address)}}</p>
                </div>
                <div class="add-default">
                    <span :class="{'default':address.isDefaultAddress,'no-default':!address.isDefaultAddress}"  @click="makedefault(address.id)"><i v-if="address.isDefaultAddress" class="iconfont">&#xe638;</i></span>
                    <span>{{$t('default')}}</span>
                </div>
                <div class="add-edit-del">
                    <span class="add-edit" @click="editAdd(address.id)"><i class="iconfont" >&#xe61f;</i>{{$t('edit')}}</span>
                    <span class="add-del" @click="addId=address.id;isAlert=true"><i class="iconfont">&#xe629;</i>{{$t('delete')}}</span>
                </div>
                <div v-if="address.isDefaultAddress" class="bgline"></div>
            </div>
        </div>
        <div class="mask" v-if="isAlert">
            <div class="confirm-con">
                <p class="cancel-btn" @click="delAdd(0)"><i class="iconfont">&#xe69a;</i></p>
                <p>{{$t('deleteAddress')}}?</p>
                <div class="btn-arr">
                    <div class="n-btn" @click="delAdd(0)">{{$t('no')}}</div>
                    <div class="y-btn" @click="delAdd('1')">{{$t('yes')}}</div>
                </div>
            </div>
        </div>
        <div class="mask" v-if="isEdit">
            
            <address-editor :address="editing" @close="close"/>
        </div>
        <loding v-if="isloding"></loding>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import AddressEditor from './address-editor.vue'
    import _ from 'lodash'
    import loding from './loding.vue'

    export default {
        data(){
            return {
                isAlert:false,
                isEdit:false,
                addId:'',
                editing:null,
                isloding:false,
            }
        },
        components: {
            'address-editor': AddressEditor,
            'loding':loding
        },
        computed: {
            ...mapGetters(['addresses','countries','states']),
        },
        created(){
            this.$store.dispatch('getAddresses');
            this.$store.dispatch('getCountries');
        },
        watch:{
            addresses(nV, oV){
                console.log('addresses: ',nV, oV)
            }
        },
        methods:{
            makedefault(id){
                this.isloding = true;
                this.$store.dispatch('makeDefault',id).then(()=> {
                    this.isloding =false
                });
            },
            delAdd(flag){
                this.isAlert = false;
                if(flag === '1' && this.addId){
                    this.isloding = true;
                    this.$store.dispatch('deleteAddress',{id:this.addId}).then(()=>{
                        this.isloding = false;
                    });
                }
            },
            addNewAdd(){
                this.editing = null
                this.isEdit = true
            },
            editAdd(id){
                for(let i =0;i<this.addresses.length;i++){
                    if(this.addresses[i].id === id){
                        this.editing = _.cloneDeep(this.addresses[i])
                        this.isEdit = true
                        return
                    }
                }
            },
            close(){
                this.isEdit = false
            },
            addressStr(address){
                let state = address.state.label ? address.state.label :address.state.value;
                if(state){
                    return address.zipCode+','+address.city+','+state+','+address.country.label
                }else{
                    return address.zipCode+','+address.city+','+address.country.label
                }
            },
            addressName(address){
                if(address.firstName){
                    return `${address.firstName} ${address.lastName}`;
                }

                return address.name;
            }
        },
    }
</script>

<style scoped lang="scss">
    @font-face {
        font-family: 'iconfont';  /* project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_m72f720tkb.eot');
        src: url('//at.alicdn.com/t/font_384296_m72f720tkb.eot?#iefix') format('embedded-opentype'),
        url('//at.alicdn.com/t/font_384296_m72f720tkb.woff') format('woff'),
        url('//at.alicdn.com/t/font_384296_m72f720tkb.ttf') format('truetype'),
        url('//at.alicdn.com/t/font_384296_m72f720tkb.svg#iconfont') format('svg');
    }
    .iconfont{
        font-family:"iconfont" !important;
        font-size:16px;font-style:normal;
        -webkit-font-smoothing: antialiased;
        -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
	}
    .mt-20{
        // margin-top: 20px;
        line-height: 25px;
        word-break: break-all;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .address-book{
        .add-new{
            display: inline-block;
            background-color: #222;
            text-align: center;
            line-height: 40px;
            padding: 0 45px;
            color: #fff;
            border-radius: 2px;
            margin-bottom: 24px;
            cursor: pointer;
        }
        .add-block{
            .address{
                width: 447px;
                height: 170px;
                border: 1px solid #e6e6e6;
                color: #666;
                float: left;
                padding: 20px 20px 15px 20px;
                margin-bottom: 20px;
                position: relative;
                strong{
                    color: #222;
                    margin-right: 10px;
                }
                &:nth-child(2n+1){
                    margin-right: 20px;
                }
                .bgline{
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 3px;
                    transform: skew(20deg, 0deg);
                    background: linear-gradient(to right, rgb(221, 116, 125) 35%, transparent 25%, transparent 50%, rgb(98, 110, 148) 50%, rgb(98, 110, 148) 85%, transparent 75%) 0% 0% / 56px 1px;
                }
                .add-default{
                    position: absolute;
                    bottom: 14px;
                    cursor: pointer;
                    &:hover{
                        opacity: .8;
                    }
                    .default,.no-default{
                        display: inline-block;
                        width: 18px;
                        height: 18px;
                        background-color: #222;
                        color: #fff;
                        text-align: center;
                        line-height: 18px;
                        border-radius: 50%;
                        margin-right: 5px;
                        i{
                            font-size: 10px;
                        }
                    }
                    .no-default{
                        width: 19px;
                        height: 19px;
                        position: relative;
                        bottom: -4px;
                        background-color: #fff;
                        border: 1px solid #cacaca;
                    }
                    
                }
                .address-info{
                    display: flex;
                    align-items: flex-start;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 110px;

                    & > p{
                        word-break: normal;
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }

                    & > p:last-child {
                        -webkit-line-clamp: 1;
                    }
                }
                .add-edit-del{
                    position: absolute;
                    bottom: 14px;
                    right: 20px;

                    span{
                        cursor: pointer;
                    }
                    span:nth-child(1){
                        margin-right: 20px;
                    }
                    i{
                        margin-right: 7px;
                    }
                    .add-edit{
                        &:hover{
                            opacity: .8;
                        }
                    }
                    .add-del{
                        i{
                            font-size: 18px;
                        }
                        &:hover{
                            opacity: .8;
                        }
                    }
                }
            }
            &:after{
                display: block;
                clear: both;
                content: '';
            }
        }
    }
    .mask{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.4);
        text-align: center;
        overflow-y: auto;
        z-index: 999;
        .confirm-con{
            width: 485px;
            height: 175px;
            margin:0 auto;
            position: relative;
            top: calc(50% - 82px);
            background-color: white;
            color: #222;
            font-size: 14px;
            padding: 20px;
            .cancel-btn{
                font-size: 18px;
                color: #666666;
                text-align: right;
                cursor: pointer;
                margin-bottom: 15px;
            }
            .btn-arr{
                padding-top: 25px;
                width: 355px;
                margin: 0 auto;
                .n-btn, .y-btn{
                    width: 170px;
                    line-height: 32px;
                    text-align: center;
                    color: #fff;
                    float: left;
                    cursor: pointer;
                }
                .n-btn{
                    background-color: #222;
                }
                .y-btn{
                    background-color: #cacaca;
                    margin-left: 15px;
                }
                &:after{
                    display: block;
                    content: '';
                    clear: both;
                }
            }
        }

    }
</style>