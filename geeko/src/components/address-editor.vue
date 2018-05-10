<template>
    <div class="el-address-editor">
        <div class="hd">
            <strong>{{$t('label.editAddress')}}</strong>
            <i class="iconfont el-address-close" @click="closeHandle">&#xe69a;</i>
        </div>

        <div class="el-media-size">
            <p class="el-address-tip">{{$t('message.addressTip')}}</p>
            <form @submit.prevent="validateBeforeSubmit">
                <div class="el-address-elements">

                    <div>
                        <label v-if="showLabel" :class="{'el-label':true}">{{$t('label.fullName')}}</label>
                        <p class="st-control">
                            <input name="name" v-model="shipping.name" v-validate="'required'"
                                   :class="{'st-input':true, 'st-input-danger':errors.has('name')}" type="text"
                                   :placeholder="$t('label.fullName') + ' *'"/>
                            <span v-show="errors.has('name')" class="st-is-danger">{{errors.first('name')}}</span>
                        </p>
                    </div>

                    <div>
                        <label v-if="showLabel" :class="{'el-label':true}">{{$t('label.streetAddress')}}</label>
                        <p class="st-control">
                            <input name="streetAddress" v-model="shipping.streetAddress1" v-validate="'required'"
                                   :class="{'st-input':true, 'st-input-danger':errors.has('streetAddress')}" type="text"
                                   :placeholder="$t('label.streetAddress')+' *'"/>
                            <span v-show="errors.has('streetAddress')"
                                  class="st-is-danger">{{errors.first('streetAddress')}}</span>
                        </p>
                    </div>

                    <div>
                        <label v-if="showLabel" :class="{'el-label':true}">{{$t('label.unit')}}</label>
                        <p class="st-control">
                            <input name="unit" v-model="shipping.unit"
                                   :class="{'st-input':true}" type="text"
                                   :placeholder="$t('label.unit')"/>
                        </p>
                    </div>


                    <div class="st-flex st-justify-b el-double-item-container">
                        <div>
                            <label v-if="showLabel" :class="{'el-label':true}">{{$t('label.country')}}</label>
                            <p class="st-control">
                                <select ref="country" class="st-select" v-model="countrySelected"
                                        @change="changeCountry">
                                    <option disabled value="-1">Country</option>
                                    <option v-for="c in countries" :value="c.value">{{c.label}}</option>
                                </select>
                                <span v-show="countrySelected == '-1'"
                                      class="st-is-danger">Please select a country</span>
                            </p>
                        </div>

                        <div>
                            <label v-if="showLabel" :class="{'el-label':true}">{{$t('label.state')}}</label>


                            <p class="st-control" v-if="hasStates">
                                <select ref="state" class="st-select" v-model="stateSelected">
                                    <option disabled value="-1">State *</option>
                                    <option v-for="s in states" :value="s.value">{{s.label}}</option>
                                </select>
                                <span v-show="stateSelected == '-1'" class="st-is-danger">Please select a state</span>
                            </p>

                            <p class="st-control" v-else>
                                <input ref="state" placeholder="State" name="state" v-model="stateInputed"/>
                            </p>
                        </div>
                    </div>

                    <div>
                        <label v-if="showLabel" :class="{'el-label':true}">{{$t('label.city')}}</label>
                        <p class="st-control">
                            <input name="city" v-model="shipping.city" v-validate="'required'"
                                   :class="{'st-input':true, 'st-input-danger':errors.has('city')}" type="text"
                                   :placeholder="$t('label.city')+' *'"/>
                            <span v-show="errors.has('city')" class="st-is-danger">{{errors.first('city')}}</span>
                        </p>
                    </div>

                    <div class="st-flex st-justify-b el-double-item-container">
                        <div>
                            <p class="st-control">
                                <label v-if="showLabel" :class="{'el-label':true}">{{$t('label.zipCode')}}</label>
                                <input name="zipCode" v-model="shipping.zipCode" v-validate="'required'"
                                       :class="{'st-input':true, 'st-input-danger':errors.has('zipCode')}" type="text"
                                       :placeholder="$t('label.zipCode')+' *'"/>
                                <span v-show="errors.has('zipCode')"
                                      class="st-is-danger">{{errors.first('zipCode')}}</span>
                            </p>
                        </div>

                        <div>
                            <p class="st-control">
                                <label v-if="showLabel" :class="{'el-label':true}">{{$t('label.phoneNumber')}}</label>
                                <input name="phoneNumber" v-model="shipping.phoneNumber" v-validate="'required'"
                                       :class="{'st-input':true, 'st-input-danger':errors.has('phoneNumber')}"
                                       type="text"
                                       :placeholder="$t('label.phoneNumber')+' *'"/>
                                <span v-show="errors.has('phoneNumber')"
                                      class="st-is-danger">{{errors.first('phoneNumber')}}</span>
                            </p>
                        </div>
                    </div>

                    <div>
                        <btn v-if="!submiting" class="fill el-address-submit" type="submit">{{$t('label.submit')}}</btn>
                        <btn class="dis el-address-submit" disabled="true" v-else>{{$t('label.submit')}}</btn>
                    </div>
                </div>
            </form>

        </div>
    </div>
</template>

<style scoped lang="scss">
    .el-address-editor {
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        input, select {
            width: 100%;
            height: 30px;
            padding: 0 10px;
        }

        .el-label{
            margin-bottom: 20px;
            position: relative;
            bottom: 3px;
            left: 1px;
            font-size: 12px;
        }

        .hd {
            height: 50px;
            line-height: 50px;
            font-size: 16px;
            position: relative;
            .el-address-close {
                font-size: 25px;
                position: absolute;
                right: 10px;
                cursor: pointer;
            }
        }

        padding: 0 10px;
    }

    .el-address-tip {
        font-size: 12px;
    }

    .el-media-size {
        max-width: 300px;
        margin: 0 auto;
    }

    .el-address-elements {
        & > div {
            margin-top: 15px;
        }
    }

    .el-double-item-container {
        & > div {
            width: calc(50% - 5px);
        }
    }

    .el-address-submit {
        width: 200px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        margin: 25px auto 15px auto;
        display: block !important;
        padding: 0 !important;
    }


</style>

<script type="text/ecmascript-6">

    import _ from 'lodash'
    import Btn from '../components/btn.vue'

    export default{
        data(){
            var initCountry = this.address && this.address.country ? this.address.country.value : '-1'
            var initState = this.address && this.address.state ? this.address.state.value : '-1'
            return {
                shipping: this.address ? _.cloneDeep(this.address) : {
                    name: null,
                    streetAddress1: null,
                    unit: null,
                    country: null,
                    state: null,
                    city: null,
                    zipCode: null,
                    phoneNumber: null
                },
                countrySelected: initCountry,
                stateSelected: initState,
                stateInputed: this.address && this.address.state ? this.address.state.value : '',
                initCountry,
                initState,
                submiting: false
            }
        },
        props: {
            address: {
                type: Object
            },
            showLabel: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        computed: {
            countries(){
                return this.$store.getters.countries
            },
            states(){
                return this.$store.getters.states
            },
            hasStates(){
                return this.$store.getters.states && this.$store.getters.states.length
            }
        },
        methods: {
            closeHandle(){
                this.$emit('close')
            },
            validateBeforeSubmit(){
                this.$validator.validateAll().then((result) => {

                    if (result && (this.stateSelected != '-1' || !this.hasStates) && this.countrySelected != '-1') {
                        this.shipping.country = this.$refs.country.value
                        this.shipping.state = this.$refs.state.value

                        this.submiting = true
                        this.$store.dispatch('screenLoading', {loading: true})
                        if (this.shipping.id) {
                            this.$store.dispatch('me/updateAddress', this.shipping).then(() => {
                                this.submiting = false
                                this.$store.dispatch('screenLoading', {loading: false})
                                this.$emit('close')
                            }).catch((r) => {
                                alert(r.result)
                                this.$store.dispatch('screenLoading', {loading: false})
                                this.submiting = false
                            })
                        } else {
                            this.$store.dispatch('me/addAddress', this.shipping).then(() => {
                                this.submiting = false
                                this.$store.dispatch('screenLoading', {loading: false})
                                this.$emit('close')
                            }).catch((r) => {
                                alert(r.result)
                                this.$store.dispatch('screenLoading', {loading: false})
                                this.submiting = false
                            })
                        }


                        return;
                    }
                });
            },
            getStates(isSelect){

                if (isSelect) {
                    this.stateSelected = '-1'
                    this.stateInputed = ''
                }

                if (this.countrySelected && this.countrySelected != '-1') {
                    this.$store.dispatch('getStates', {country: this.countrySelected})
                } else {

                }


            },
            changeCountry(evt){
                evt.preventDefault()
                this.stateSelected = '-1'
                this.getStates(true)
            }
        },
        components: {
            'btn': Btn
        },
        created(){
            this.getStates(false)
        }


    }
</script>
