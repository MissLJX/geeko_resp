<template>
    <div class="el-address-list-element">
        <common-address :address="address"/>
        <div class="el-address-btns st-table">
            <div class="st-cell">
                <span class="__check st-v-m" @click.prevent="makeDefaultHandle" :class="{'active' : address.isDefaultAddress}"></span>
                <span class="__default st-v-m">{{$t('label.default')}}</span>
            </div>
            <div class="st-cell st-t-r">

                <span class="iconfont el-address-edit" @click.prevent="editHandle">&#xe641;</span>
                <span class="iconfont el-address-delete" @click.prevent="deleteHandle">&#xe777;</span>
            </div>

            <div class="border-active" v-if="address.isDefaultAddress"></div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .el-address-list-element{
        padding: 10px;
        border: 1px solid #e6e6e6;
        position: relative;
    }

    .el-address-btns{
        margin-top: 10px;
        width: 100%;
        // & > div:first-child{
        //     width: 40%;
        // }

        // & > div:last-child{
        //     width: 60%;
        //     text-align: right;
        // }

        .el-address-default{
            width: 160px;
            height: 30px;
            line-height: 30px;
            padding: 0;
        }

        .el-address-op{
            width: 60px;
            height: 30px;
            line-height: 30px;
            padding: 0;
        }

        .el-address-edit{
            color: #999999;
            font-size: 20px;
            vertical-align: middle;
            margin-right: 25px;
            cursor: pointer;
        }

        .el-address-delete{
            color: #999999;
            font-size: 18px;
            vertical-align: middle;
            cursor: pointer;
        }

        .__check{
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 1px solid #e6e6e6;
            cursor: pointer;
            background-size: 100%;
            background-color: transparent;
            background-position: center;
            background-repeat: no-repeat;
            display: inline-block;
            position: relative;

            &.active{
                border: none;
                &:after{
                    font-family: "iconfont";
                    content: '\e65b';
                    position: absolute;
                    top: 0;
                    left: 0;
                    display: inline-block;
                    color: #222222;
                    font-size: 22px;
                }
            }
        }

        .__default{
            font-family: SlatePro;
            font-size: 14px;
            color: #222222;
            margin-left: 5px;
        }

        .border-active{
            height: 1.8px;
            transform: skew(20deg, 0deg);
            position: absolute;
            width: 100%;
            bottom: -1px;
            left: 0px;
            background: linear-gradient(to right, rgb(221, 116, 125) 35%, 
                            transparent 25%, 
                            transparent 50%, rgb(98, 110, 148) 50%, rgb(98, 110, 148) 85%, transparent 75%) 0% 0% / 35px 1px;
        }
    }
</style>
<script type="text/ecmascript-6">

    import CommonAddress from '../../components/address.vue'
    import Btn from '../../components/btn.vue'
    import _ from 'lodash'

    export default{
        props: {
            address: {
                type: Object,
                required: true
            }
        },
        methods:{
            editHandle(){
                var _address = _.cloneDeep(this.address)
                this.$emit('list-address-edit', _address)
            },
            makeDefaultHandle(){
                this.$emit('make-default', this.address.id)
            },
            deleteHandle(){
                this.$emit('delete', this.address.id)
            }
        },
        components: {
            'common-address': CommonAddress,
            'btn': Btn
        }

    }
</script>