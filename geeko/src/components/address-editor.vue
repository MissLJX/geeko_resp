<template>
    <div class="el-address-editor">
        <div class="hd">
            <strong>{{$t('label.editAddress')}}</strong>
            <i class="iconfont el-address-close" @click="closeHandle">&#xe69a;</i>
        </div>

        <div class="el-media-size">
            <p class="el-address-tip">{{$t('message.addressTip')}}</p>
            <form @submit.prevent="submit">
                <div class="el-address-elements">

                    <div class="st-flex st-justify-b el-double-item-container">
                        <div>
                            <label v-if="showLabel" :class="{'el-label':true}">{{$t('label.firstName')}}</label>
                            <p class="st-control">
                                <input name="firstName" v-model="shipping.firstName" v-validate="'required'"
                                    :class="{'st-input':true, 'st-input-danger':errors.has('firstName')}" type="text"
                                    :placeholder="$t('label.firstName') + ' *'"/>
                                <span v-show="errors.has('firstName')" class="st-is-danger">{{errors.first('firstName')}}</span>
                            </p>
                        </div>

                        <div>
                            <label v-if="showLabel" :class="{'el-label':true}">{{$t('label.lastName')}}</label>
                            <p class="st-control">
                                <input name="lastName" v-model="shipping.lastName" v-validate="'required'"
                                    :class="{'st-input':true, 'st-input-danger':errors.has('lastName')}" type="text"
                                    :placeholder="$t('label.lastName') + ' *'"/>
                                <span v-show="errors.has('lastName')" class="st-is-danger">{{errors.first('lastName')}}</span>
                            </p>
                        </div>
                    </div>
                    

                    <div>
                        <label v-if="showLabel" :class="{'el-label':true}">{{$t('label.streetAddress')}}</label>
                        <p class="st-control">
                            <input name="streetAddress" v-model="shipping.streetAddress1" v-validate="'required'"
                                   :class="{'st-input':true, 'st-input-danger':errors.has('streetAddress')}" type="text"
                                   :placeholder="$t('label.streetAddress')+' *'"/>
                            <span v-show="errors.has('streetAddress')"
                                  class="st-is-danger">{{$t('label.address_required')}}</span>
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
                                    <option disabled value="-1">{{$t("label.country")}}</option>
                                    <option v-for="c in countries" :value="c.value">{{c.label}}</option>
                                </select>
                                <span v-show="countrySelected == '-1'"
                                      class="st-is-danger">{{$t('label.please_select_country')}}</span>
                            </p>
                        </div>

                        <div>
                            <label v-if="showLabel" :class="{'el-label':true}">{{$t('label.state')}}</label>


                            <p class="st-control" v-if="hasStates">
                                <select ref="state" class="st-select" v-model="stateSelected">
                                    <option disabled value="-1">{{$t('label.state')}} *</option>
                                    <option v-for="s in states" :value="s.value">{{s.label}}</option>
                                </select>
                                <span v-show="stateSelected == '-1'" class="st-is-danger">{{$t('label.select_state')}}</span>
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
                            <span v-show="errors.has('city')" class="st-is-danger">{{$t('label.city_required')}}</span>
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
                                      class="st-is-danger">{{$t('label.zipcode_required')}}</span>
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
                                      class="st-is-danger">{{$t('label.phone_required')}}</span>
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
        <country-tip-mask 
            v-if="showCountryTip"
            @closeMask="closeMask" 
            @goon="maskGoOn"
            :streetAddress="shipping.streetAddress1"
            :zipCode="shipping.zipCode"
            :city="shipping.city"
            :countryLabel="countryLabel"
            :stateLabel="stateLabel"
            />
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
    import CountryTipMask from './country-tip-mask.vue'

    export default{
        data(){
            var initCountry = this.address && this.address.country ? this.address.country.value : window.__country ? window.__country :'US'
            var initState = this.address && this.address.state ? this.address.state.value : '-1';
            let addressItem = this.address;
            if(addressItem){
                addressItem =  _.cloneDeep(this.address);
                if(addressItem.name && !addressItem.firstName && !addressItem.lastName){
                    let arrs = addressItem.name.split(/\s+/);
                    if(arrs && arrs.length > 1){
                        addressItem.firstName = arrs[0];
                        addressItem.lastName = arrs[1];
                    }else{
                        addressItem.firstName = arrs[0];
                        addressItem.lastName = "";
                    }
                }
            }

            return {
                shipping: addressItem ? _.cloneDeep(addressItem) : {
                    firstName:null,
                    lastName:null,
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
                submiting: false,
                showCountryTip: false, // 展示国家跟ip不符提示弹窗
                countrySelectChange: false, // 是否切换国家(未切换是弹窗的条件之一)
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
            hasCountries(){
                return this.$store.getters.countries && this.$store.getters.countries.length
            },
            states(){
                return this.$store.getters.states
            },
            hasStates(){
                return this.$store.getters.states && this.$store.getters.states.length
            },
             stateLabel(){
                return this.hasStates ? this.states.find(s => s.value == this.shipping.state).label : this.shipping.state
            },
            countryLabel(){
                return this.hasCountries ? this.countries.find(c => c.value == this.shipping.country).label : this.shipping.country
            }
        },
        methods: {
            closeHandle(){
                this.$emit('close')
            },
            submit(){
                this.shipping.checkIPCountry = !this.countrySelectChange && !this.address
                this.validateBeforeSubmit()
            },
            validateBeforeSubmit(){
                this.$validator.validateAll().then((result) => {

                    if (result && (this.stateSelected != '-1' || !this.hasStates) && this.countrySelected != '-1') {
                        this.shipping.country = this.$refs.country.value
                        this.shipping.state = this.$refs.state.value
                        this.shipping.name = `${this.shipping.firstName} ${this.shipping.lastName}`;

                        this.submiting = true
                        this.$store.dispatch('screenLoading', {loading: true})
                        if (this.shipping.id) {
                            this.$store.dispatch('me/updateAddress', this.shipping).then(() => {
                                this.submiting = false
                                this.$store.dispatch('screenLoading', {loading: false})
                                this.$emit('close')
                            }).catch((r) => {
                                this.$store.dispatch('screenLoading', {loading: false})
                                this.submiting = false
                                if(r.code == '401'){
                                    this.showCountryTip = true
                                } else {
                                    alert(r.result)
                                }
                            })
                        } else {
                            this.$store.dispatch('me/addAddress', this.shipping).then(() => {
                                this.submiting = false
                                this.$store.dispatch('screenLoading', {loading: false})
                                this.$emit('close')
                            }).catch((r) => {
                                this.$store.dispatch('screenLoading', {loading: false})
                                this.submiting = false
                                if(r.code == '401'){
                                    this.showCountryTip = true
                                } else {
                                    alert(r.result)
                                }
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
                this.countrySelectChange = true
                evt.preventDefault()
                this.stateSelected = '-1'
                this.getStates(true)
            },
            closeMask(){
                this.showCountryTip = false
            },
            maskGoOn(){
                this.shipping.checkIPCountry = false
                this.validateBeforeSubmit()
            }
        },
        components: {
            'btn': Btn,
            'country-tip-mask': CountryTipMask
        },
        created(){
            this.getStates(false)
        }


    }
</script>
