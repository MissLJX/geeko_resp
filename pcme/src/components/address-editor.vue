<template>
    <div class="edit-con">
        <form @submit.prevent="submit">
            <p class="cancel-btn1" @click="closeHandle"><i class="iconfont">&#xe69a;</i></p>
            <h4>{{$t('shippingaddress')}}</h4>

            <div class="clearBoth">
                <div class="input-con required w-left">
                    <label>{{$t('firstName')}}:</label>
                    <div class="x-default-input">
                        <input name="firstName" v-model="shipping.firstName" v-validate="'required'"
                            :class="{'st-input':true, 'st-input-danger':errors.has('firstName')}" type="text"
                        />
                        <span v-show="errors.has('firstName')" class="st-is-danger">{{errors.first("firstName")}}</span>
                    </div>
                </div>

                <div class="input-con required w-left">
                    <label>{{$t('lastName')}}:</label>
                    <div class="x-default-input">
                        <input name="lastName" v-model="shipping.lastName" v-validate="'required'"
                            :class="{'st-input':true, 'st-input-danger':errors.has('lastName')}" type="text"
                        />
                        <span v-show="errors.has('lastName')" class="st-is-danger">{{errors.first("lastName")}}</span>
                    </div>
                </div>
            </div>
            
            <div class="input-con required">
                <label>{{$t('streetaddress')}}:</label>
                <div class="x-default-input">
                    <input name="streetAddress" v-model="shipping.streetAddress1" v-validate="'required'"
                           :class="{'st-input':true, 'st-input-danger':errors.has('streetAddress')}" type="text"
                           :placeholder="$t('address_placeholder')"
                    />
                    <span v-show="errors.has('streetAddress')"
                          class="st-is-danger">{{errors.first("streetAddress")}}</span>
                </div>
            </div>
            <div class="input-con">
                <label>{{$t('unit')}}:</label>
                <div class="x-default-input">
                    <input name="unit" v-model="shipping.unit"
                           :class="{'st-input':true}" type="text"
                           :placeholder="$t('unit_placeholder')"/>
                </div>
            </div>
            <div class="input-con required">
                <label>{{$t('city')}}:</label>
                <div class="x-default-input">
                    <input name="city" v-model="shipping.city" v-validate="'required'"
                           :class="{'st-input':true, 'st-input-danger':errors.has('city')}" type="text"
                           />
                    <span v-show="errors.has('city')" class="st-is-danger">{{errors.first("city")}}</span>
                </div>
            </div>
            <div class="clearBoth">
                <div class="input-con required w-left">
                    <label>{{$t('country')}}:</label>
                    <div class="x-default-input">
                        <div class="countryIconDiv">
                            <img :src="countryIcon" alt="">
                        </div>
                        <select ref="country" class="x-select" style="padding-left:35px;" v-model="countrySelected"
                                @change="changeCountry">
                            <option disabled value="-1">{{$t('country')}}</option>
                            <option v-for="c in countries" :value="c.value" :key="c.value">
                                
                                {{c.label}}
                            </option>
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
                                <option v-for="s in states" :value="s.value" :key="s.value">{{s.label}}</option>
                            </select>
                            <span v-show="stateSelected === '-1'" class="st-is-danger">{{$t('selectstate')}}</span>
                        </p>

                        <p v-else>
                            <input ref="state" placeholder="State" name="state" v-model="stateInputed"/>
                        </p>
                    </div>
                </div>
            </div>
            <div class="clearBoth">
                <div class="input-con required w-left">
                    <label v-if="countrySelected!=='BR'">{{$t('zipCode')}}:</label>
                    <label v-if="countrySelected==='BR'">CEP:</label>
                    <div class="x-default-input">
                        <input name="zipCode" v-model="shipping.zipCode" v-validate="zip_validate"
                               :class="{'st-input':true, 'st-input-danger':errors.has('zipCode')}" type="text"
                        />
                        <span v-show="errors.has('zipCode')"
                              class="st-is-danger">{{errors.first("zipCode")}}</span>
                    </div>
                </div>
                <div class="input-con required w-left">
                    <label>{{$t('phoneNumber')}}:</label>
                    <div class="x-default-input" style="display:flex;align-items: center;justify-content: space-between;margin-bottom: 0;">
                        <span v-if="countrySelected==='BR'" style="width:">BR +55</span>
                        <span v-if="countrySelected != 'BR' && phoneAreaCode">{{phoneAreaCode}}</span>
                        <div>
                            <input name="phoneNumber" 
                               v-model="shipping.phoneNumber"
                               v-validate="phone_validate"
                               :class="{'st-input':true, 'st-input-danger':errors.has('phoneNumber'),'phonenum':countrySelected==='BR' || phoneAreaCode}"
                               style="flex:1;"
                               type="text"
                               />
                           
                        </div>
                        
                    </div>
                    <span v-show="errors.has('phoneNumber')"
                                class="st-is-danger">{{errors.first("phoneNumber")}}</span>
                </div>
            </div>
            <div class="input-con required p-relative" v-if="countrySelected==='BR'">
                <div v-if="ifshowCPFtip" class="cpf-tip">CPF (Cadastro de Pessoa Física), utilizado para tributação, é necessário para todos os produtos enviados ao Brasil, independentemente de encomendas expressas ou contêineres logísticos.Quando preenchemos o conhecimento de embarque e fatura, por favor, não esqueça de preencher o número de contribuinte do destinatário.Na maioria dos casos, sua forma é o número digital como abaixo, XXX.XXX.XXX-XX</div>
                <label>CPF: <i class="iconfont cpficon" @mouseover="() => {this.ifshowCPFtip = true}" @mouseout="() => {this.ifshowCPFtip = false}">&#xe73f;</i></label>
                <div class="x-default-input">
                    <input name="CPF" v-model="shipping.cpf" v-validate="cpfValidate"
                           :class="{'st-input':true, 'st-input-dang() => {this.ifshowCPFtip = true}er':errors.has('CPF')}" type="text"
                    />
                    <span v-show="errors.has('CPF')" class="st-is-danger">{{errors.first("CPF")}}</span>
                </div>
            </div>
            <div class="clearBoth">
                <button  class="input-con required w-left s-r-btn" :class="{'grey': submiting}" type="submit">{{tipmsg}}</button>
                <div class="input-con required w-left cancel-btn" @click="closeHandle">{{$t('cancel')}}</div>
            </div>
        </form>

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

<script>
    import _ from 'lodash'
    import CountryTipMask from './country-tip-mask.vue'
    import {fetchPhoneAreaCode} from '../api'
    export default{
        data(){
            var initCountry = this.address && this.address.country ? this.address.country.value : window.__country ? window.__country :'US'
            var initState = this.address && this.address.state ? this.address.state.value : '-1'
            var initPhoneValidate = 'required|phone';
            if(this.address && this.address.country){
                if(this.address.country.value==='BR'){
                    initPhoneValidate = 'required|phone_br'
                }
                if(this.address.country.value==='AE'){
                    initPhoneValidate = 'required|phone_ae'
                }
                if(this.address.country.value==='SA'){
                    initPhoneValidate = 'required|phone_sa'
                }
            }
            var initZipValidate = 'required|zip_us';
            if(this.address && this.address.country){
                if(this.address.country.value==='BR'){
                    initZipValidate = 'required|zip_br'
                }
                if(this.address.country.value==='GB'){
                    initZipValidate = 'required|zip_uk'
                }
            }else{
                initZipValidate = 'required|zip_us'
            }

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
                if(addressItem.phoneArea && addressItem.phoneNumber){
                    addressItem.phoneNumber = addressItem.phoneArea + addressItem.phoneNumber
                }
            }

            return {
                shipping: addressItem ? _.cloneDeep(addressItem) : {
                    name: null,
                    firstName:null,
                    lastName:null,
                    streetAddress1: null,
                    unit: null,
                    country: null,
                    state: null,
                    city: null,
                    zipCode: null,
                    phoneNumber: null,
                    phoneArea:null,
                    CPF:null
                },
                countrySelected: initCountry,
                stateSelected: initState,
                stateInputed: this.address && this.address.state ? this.address.state.value : '',
                initState,
                submiting: false,
                phone_validate:initPhoneValidate,
                zip_validate:initZipValidate,
                cpfValidate:'required|cpf',
                ifshowCPFtip:false,
                showCountryTip: false, // 展示国家跟ip不符提示弹窗
                countrySelectChange: false, // 是否切换国家(未切换是弹窗的条件之一)
                phoneAreaCodeList: null, // 
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
            tipmsg(){
                if(!this.submiting){
                    return this.$t('save')
                }else{
                    return this.$t('pleasewait')
                }
            },
            stateLabel(){
                return this.hasStates ? this.states.find(s => s.value == this.shipping.state).label : this.shipping.state
            },
            countryLabel(){
                return this.hasCountries ? this.countries.find(c => c.value == this.shipping.country).label : this.shipping.country
            },
            countryIcon(){
                return this.countrySelected != -1 && `https://image.geeko.ltd/country/flag/${this.countrySelected}.png`
            },
            phoneAreaCode(){
                let obj = this.phoneAreaCodeList?.find(code => code?.country == this.countrySelected)
                return obj ? obj?.country + ' + ' + obj?.areaCode : ''
            },
            // phoneNumberC() {
            //     return this.shipping.phoneArea+this.shipping.phoneNumber
            // }
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
                        // this.shipping.phoneArea
                        this.shipping.name = `${this.shipping.firstName} ${this.shipping.lastName}`;

                        this.submiting = true
                        if (this.shipping.id) {
                            this.$store.dispatch('updateAddress', this.shipping).then(() => {
                                this.submiting = false
                                this.$emit('close')
                            }).catch((r) => {
                                this.submiting = false
                                if(r.code == '401'){
                                    this.showCountryTip = true
                                } else {
                                    alert(r.result)
                                }
                            })
                        } else {
                            this.$store.dispatch('addAddress', this.shipping).then(() => {
                                this.submiting = false
                                this.$emit('close')
                            }).catch((r) => {
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
                } else {}
            },
            changeCountry(evt){
                this.countrySelectChange = true
                evt.preventDefault()
                this.phone_validate = 'required|phone'
                this.zip_validate = 'required'

                if(this.countrySelected === 'BR'){
                    this.phone_validate = 'required|phone_br'
                    this.zip_validate = 'required|zip_br'
                }
                if(this.countrySelected === 'GB'){
                    this.zip_validate = 'required|zip_uk'
                }
                if(this.countrySelected === 'US'){
                    this.zip_validate = 'required|zip_us'
                }
                if(this.countrySelected === 'AE'){
                    this.phone_validate = 'required|phone_ae'
                }
                if(this.countrySelected === 'SA'){
                    this.phone_validate = 'required|phone_sa'
                }

                this.stateSelected = '-1'
                this.getStates(true)
            },
            closeMask(){
                this.showCountryTip = false
            },
            maskGoOn(){
                this.shipping.checkIPCountry = false
                this.validateBeforeSubmit()
            },
            phoneNumberChange(e) {
                console.log(e)
            }
        },
        created(){
            this.getStates(false);
            fetchPhoneAreaCode().then(res => {
                if(res?.code == 200 && res?.result){
                    this.phoneAreaCodeList = res?.result
                }
            })
        },
        components:{
            "country-tip-mask":CountryTipMask
        }
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
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        appearance: none;
        margin: 0;
    }
    .phonenum{
        // width: calc(100% - 130px) !important;
        margin-left: 10px;
    }
    button{
        border: none;
        outline:none;
    }
    .st-is-danger{
        color: #E64545;
        line-height: 30px;
    }
    .edit-con{
        width: 696px;
        transform: translate(-50%, 0px);
        left: 50%;
        top: 60px;
        position: absolute;
        z-index: 99999;
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
                    color: #E64545;
                    font-size: 12px;
                }
                .x-select {
                    border: none;
                    appearance: none;
                    -moz-appearance: none;
                    -webkit-appearance: none;
                    background: url(https://image.geeko.ltd/site/pc/icon137.png) no-repeat scroll calc(100% - 10px) center transparent;
                    padding-right: 14px;
                    padding-left: 5px;
                    box-shadow: none;
                    color: #666;
                    cursor: pointer;
                    height: 40px;
                    border: 1px solid #cacaca;
                    width: 100%; 
                }

                .countryIconDiv{
                    position: absolute;
                    bottom: 10px;
                    left: 10px;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    overflow: hidden;

                    & > img{
                        width: 100%;
                        height: 100%;
                    }
                }
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
            background-color: #222;
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
                color: #E64545;
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
    .clearBoth{
        &:after{
            display: block;
            content: '';
            clear: both;
        }
    }
    .p-relative{
        position: relative;
    }
    .cpf-tip{
        width: 70%;
        position: absolute;
        background-color: #fff;
        z-index: 99;
        border: 1px solid #efefef;
        padding: 14px;
        top: 28px;
        left:-200px;
    }
    .cpficon{
        cursor: pointer;
    }

    .mask{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.4);
        text-align: left;
        overflow-y: auto;
        z-index: 999;
        display: flex;
        align-items: center;
        justify-content: center;

        .contentBoxPc{
            width: 461px;
            background-color: #ffffff;
            border-radius: 3px;
            padding: 22px 18px;

            .tipContentPc{
                font-size: 18px;
                font-family: AcuminPro-Bold, Roboto;
                font-weight: bold;
                color: #222222;
                line-height: 21px;
                margin-bottom: 43px;
            }

            .tipCountryPc{
                font-size: 16px;
                font-family: Roboto;
                font-weight: 400;
                color: #222222;
                line-height: 19px;

                .countryLabel{
                    color:#E64545;
                }
            }

            .tipButtonBoxPc{
                margin-top: 38px;
            }

            .tipButton{
                width: 100%;
                height: 42px;
                line-height: 42px;
                background-color: #222;
                border-radius: 2px;
                border: solid 1px #222222;
                text-align: center;
                font-family: AcuminPro-Bold;
                font-size: 18px;
                font-weight: normal;
                font-stretch: normal;
                letter-spacing: 0px;
                color: #fff;
                text-transform: uppercase;
                margin-top: 12px;
                cursor: pointer;
            }

            .whiteBtn{
                background-color: #fff;
                color: #222;
            }
        }
    }
</style>