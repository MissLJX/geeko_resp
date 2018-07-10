<template>
    <div class="mainArea">
        <div class="selectArea">
            <div v-bind:class="{ active: isActive }" @click="changeMethod(0)">Inches</div>
            <div v-bind:class="{ active: !isActive }" @click="changeMethod(1)">Centimeters</div>
            <select v-model="selected">
                <option v-for="(option,label) in getSizeMethod">
                    {{label}}
                </option>
            </select>
        </div>

        <div class="tableArea">
            <table class="chartable">
                <tbody>
                <tr>
                    <th colspan="2">Tag Size</th>
                    <th colspan="2">{{selected}}</th>
                    <th colspan="2" v-for="item in getLabel">
                        {{ item }}
                    </th>
                </tr>
                <tr v-for="item in getDataArr">
                    <td colspan="2">{{item[0]}}</td>
                    <td colspan="2">{{item[1][selected]}}</td>
                    <td colspan="2" v-for="data in item[2][picked]" v-if="data!=='inch' && data!=='cm' && data!=='-'">
                        {{data}}
                    </td>
                    <td colspan="2" v-for="item in item[2]" v-if="item==='-'">{{item}}</td>
                    <td colspan="2" v-for="data in item[2][picked]" v-if="data!=='inch' && data!=='cm' && data==''">
                        -
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

        <div class="tipArea">
            <ul>
                <li>
                    <h4>{{$t('label.itemmeasurements')}}:</h4>
                    <p>{{$t('message.measurements')}}</p>
                </li>
                <li>
                    <picture-show :imgSrc="imgSrc"></picture-show>
                </li>
                <li>
                    <h4 class="t-red">{{$t('label.pleasenote')}}:</h4>
                    <p class="mb8">1.{{$t('message.note1')}}</p>
                    <p>2.{{$t('message.note2')}}</p>
                </li>
                <li>
                    <h4 class="t-red">{{$t('label.disclaimer')}}</h4>
                    <p>{{$t('message.disclaimer')}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .mainArea{
        width: 100%;
        padding: 20px;
    }
    .selectArea{
        div{
            height: 33px;
            float: left;
            background-color: #f3f3f3;
            color: #666;
            line-height: 33px;
            text-align: center;
            font-size: 15px;
            padding: 0 10px;
            cursor: pointer;
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        }
        .active{
            background-color: #e5004f;
            color: white;
        }
        select{
            float: right;
            border: none;
            height: 33px;
            line-height: 33px;
            cursor: pointer;
        }
        &:after{
            display: block;
            content: '';
            clear: both;
            text-align: center;
        }
    }

    .chartable{
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 30px;
        margin-top: 12px;
    }
    .chartable th{
        border: 1px solid #e0e0e0;
        text-align: center;
        vertical-align: middle;
        line-height: 40px;
        background-color: #f3f3f3;
        font-size: 14px;
        color: #666;
    }
    .chartable td{
        border: 1px solid #e0e0e0;
        text-align: center;
        vertical-align: middle;
        line-height: 40px;
    }
    .picture-show{
        width: 100%;
    }
    .t-red{
        color: #e5004f;
    }
    .tipArea{
        p{
            font-size: 14px;
            color: #666;
        }
        h4{
            text-transform:capitalize;
        }
    }
</style>

<script type="es6">
    import store from '../store'
    import { mapGetters } from 'vuex'
    import DataMap from '../../data/index.js'

    import WarmPrompt from '../components/warm-prompt.vue'
    import PictureShow from '../components/picture-show.vue'


    export default {
        name: 'mIndex',
        components: {
            WarmPrompt,
            PictureShow
        },
        data(){
            return {
                result:[],
                sizeArr:[],
                sizeMethod:[],
                changeArr:[],
                getSize:[],
                label:[],
                imgSrc:'',
                selected:'',
                picked:'0',
                isActive:'true'
            }
        },
        computed: {
            ...mapGetters([
                'me'
            ]),
            getLang(){
                window.lang = 'pt_BR'
                return (window.lang || 'en_US').substring(3, 5)
            },
            //生成表格头中【Bust,Waist,...】
            getLabel(){
                if(this.result.length>0){
                    return this.label.split(',')
                }
            },
            //生成下拉列表中选项【Size(US),....】
            getSizeMethod(){
                for (let i=0;i<this.result.length;i++){
                    if(typeof this.result[i][1] === 'object'){
                        return this.result[i][1]
                    }
                }
            },
            getChangeArr(){
                for (let i=0;i<this.result.length;i++){
                    if(typeof this.result[i][2] === 'object'){
                        return this.result[i][2]
                    }
                }
            },
            getDataArr(){
                let dataArr = [];
                let replaceData = [];
                if(this.result.length>0){
                    dataArr =  this.label.split(',')
                    for(let i=0;i<dataArr.length;i++){
                        replaceData.push('-')
                    }
                }
                for (let i=0;i<this.result.length;i++){
                    if(this.result[i][2] === ''){
                        this.result[i][2]=replaceData
                    }
                }
                return this.result
            }
        },
        beforeRouteEnter(to, from, next) {
            store.dispatch('init').then(() => {
                next();
            })
        },
        mounted() {
            this.getData();
        },
        methods:{
            getData() {
                this.result = DataMap['result'];
                this.imgSrc = DataMap['imgSrc'];
                this.label = DataMap['label']
                this.selected=this.getLang;
            },
            changeMethod(method){
                this.picked = method;
                this.isActive = !this.isActive;
            }
        }
    };
</script>
