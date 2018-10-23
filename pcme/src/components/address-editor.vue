<template>
    <div class="edit-con">
        <form @submit.prevent="validateBeforeSubmit">
            <p class="cancel-btn1" @click="closeHandle">X</p>
            <h4>{{$t('shippingaddress')}}</h4>
            <div class="input-con required">
                <label>{{$t('fullname')}}:</label>
                <div class="x-default-input">
                    <input name="name" v-model="shipping.name" v-validate="'required'"
                           :class="{'st-input':true, 'st-input-danger':errors.has('name')}" type="text"
                           :placeholder="$t('between')"
                    />
                    <span v-show="errors.has('name')" class="st-is-danger">{{errors.first('name')}}</span>
                </div>
            </div>
            <div class="input-con required">
                <label>Street Address:</label>
                <div class="x-default-input">
                    <input name="streetAddress" v-model="shipping.streetAddress1" v-validate="'required'"
                           :class="{'st-input':true, 'st-input-danger':errors.has('streetAddress')}" type="text"
                           :placeholder="$t('streetaddress')"
                    />
                    <span v-show="errors.has('streetAddress')"
                          class="st-is-danger">{{errors.first('streetAddress')}}</span>
                </div>
            </div>
            <div class="input-con">
                <label>Unit:</label>
                <div class="x-default-input">
                    <input name="unit" v-model="shipping.unit"
                           :class="{'st-input':true}" type="text"
                           :placeholder="$t('unit')"/>
                </div>
            </div>
            <div class="input-con required">
                <label>City:</label>
                <div class="x-default-input">
                    <input name="city" v-model="shipping.city" v-validate="'required'"
                           :class="{'st-input':true, 'st-input-danger':errors.has('city')}" type="text"
                           :placeholder="$t('city')+' *'"/>
                    <span v-show="errors.has('city')" class="st-is-danger">{{errors.first('city')}}</span>
                </div>
            </div>

            <div class="input-con required w-left">
                <label>{{$t('country')}}:</label>
                <div class="x-default-input">
                    <select ref="country" class="x-select" v-model="countrySelected"
                            @change="changeCountry">
                        <option disabled value="-1">{{$t('country')}}</option>
                        <option v-for="c in countries" :value="c.value">{{c.label}}</option>
                    </select>
                    <span v-show="countrySelected === '-1'"
                          class="st-is-danger">{{$t('selectcountry')}}</span>
                </div>
            </div>
            <div class="input-con w-left" :class="{'required':hasStates}">
                <label>{{$t('stateand')}}:</label>
                <div class="x-default-input">
                    <p v-if="hasStates">
                        <select ref="state" class="x-select" v-model="stateSelected">
                            <option disabled value="-1">{{$t('state')}} *</option>
                            <option v-for="s in states" :value="s.value">{{s.label}}</option>
                        </select>
                        <span v-show="stateSelected == '-1'" class="st-is-danger">{{$t('selectstate')}}</span>
                    </p>

                    <p v-else>
                        <input ref="state" placeholder="State" name="state" v-model="stateInputed"/>
                    </p>
                </div>
            </div>
            <div class="input-con required w-left">
                <label>Zip Code:</label>
                <div class="x-default-input">
                    <input name="zipCode" v-model="shipping.zipCode" v-validate="'required'"
                           :class="{'st-input':true, 'st-input-danger':errors.has('zipCode')}" type="text"
                           :placeholder="$t('zipCode')"/>
                    <span v-show="errors.has('zipCode')"
                          class="st-is-danger">{{errors.first('zipCode')}}</span>
                </div>
            </div>
            <div class="input-con required w-left">
                <label>{{$t('phoneNumber')}}:</label>
                <div class="x-default-input">
                    <input name="phoneNumber" v-model="shipping.phoneNumber" v-validate="'required'"
                           :class="{'st-input':true, 'st-input-danger':errors.has('phoneNumber')}"
                           type="text"
                           :placeholder="$t('phoneNumber')"/>
                    <span v-show="errors.has('phoneNumber')"
                          class="st-is-danger">{{errors.first('phoneNumber')}}</span>
                </div>
            </div>
            <button  class="input-con required w-left s-r-btn" :class="{'grey': submiting}" type="submit">{{tipmsg}}</button>
            <div class="input-con required w-left cancel-btn" @click="closeHandle">{{$t('cancel')}}</div>
        </form>
    </div>
</template>

<script>
    import _ from 'lodash'
    export default{
        data(){
            var initCountry = this.address && this.address.country ? this.address.country.value : 'US'
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
                initState,
                submiting: false,
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
            },
            tipmsg(){
                if(!this.submiting){
                    return this.$t('save')
                }else{
                    return this.$t('pleasewait')
                }
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
                        if (this.shipping.id) {
                            this.$store.dispatch('updateAddress', this.shipping).then(() => {
                                this.submiting = false
                                this.$emit('close')
                            })
                        } else {
                            this.$store.dispatch('addAddress', this.shipping).then(() => {
                                this.submiting = false
                                this.$emit('close')
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
        created(){
            this.getStates(false)
        }


    }
</script>

<style scoped lang="scss">
    button{
        border: none;
        outline:none;
    }
    .st-is-danger{
        color: #e5004f;
        line-height: 30px;
    }
    .edit-con{
        width: 696px;
        transform: translate(-50%, 0px);
        left: 50%;
        top: 60px;
        position: absolute;
        margin-bottom: 20px;
        /*margin:20px auto;
        position: relative;*/
        background-color: white;
        color: #222;
        font-size: 14px;
        text-align: left;
        padding: 50px 70px;
        .cancel-btn1{
            position: absolute;
            top: 21px;
            right: 21px;
            font-size: 20px;
            cursor: pointer;
        }
        h4{
            font-size: 24px;
            margin-bottom: 22px;
        }
        .input-con{
            label{
                display: block;
                line-height: 24px;
                color: #666;
            }
            .x-default-input{
                position: relative;
                margin-bottom: 12px;
                input{
                    width: 100%;
                    height: 40px;
                    padding-left: 10px;
                    border: 1px solid #cacaca;
                }
                .error-text{
                    color: #e5004f;
                    font-size: 12px;
                }
                .x-select {
                    border: none;
                    appearance: none;
                    -moz-appearance: none;
                    -webkit-appearance: none;
                    background: url(https://dgzfssf1la12s.cloudfront.net/site/pc/icon137.png) no-repeat scroll calc(100% - 10px) center transparent;
                    padding-right: 14px;
                    padding-left: 5px;
                    box-shadow: none;
                    color: #666;
                    cursor: pointer;
                    height: 40px;
                    border: 1px solid #cacaca;
                    width: 100%; }
            }
        }
        .s-r-btn, .cancel-btn{
            width: 100%;
            text-align: center;
            line-height: 40px;
            color: #fff;
            margin-top: 10px;
            font-size: 16px;
            cursor: pointer;
        }
        .s-r-btn{
            background-color: #e5004f;
            border: none;
        }
        .grey{
            background-color:#cacaca !important; ;
        }
        .cancel-btn{
            background-color: #cacaca;
        }
        .required{
            .x-default-input:after{
                content: '*';
                color: #e5004f;
                position: absolute;
                right: -15px;
                top: 0;
                font-size: 20px;
            }
        }
        .w-left{
            width: 45%;
            float: left;
            &:nth-child(2n+1){
                margin-right: 55px;
            }
        }
        &:after{
            display: block;
            content: '';
            clear: both;
        }
    }
</style>