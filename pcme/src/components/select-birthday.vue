<template>
  <div id="select-birthday">
      <div>
          <select v-model="yearValue" @change="changeYear">
              <option v-for="item in years" :value="item.value" :key="item.value">{{item.label}}</option>
          </select>
      </div>
      
      <div>
          <select v-model="monthValue" @change="changeMonth">
              <option v-for="item in months" :value="item.value" :key="item.value">{{item.label}}</option>
          </select>
      </div>

      <div>
          <select v-model="dayValue" @change="changeDay">
              <option v-for="item in days" :value="item.value" :key="item.value">{{item.label}}</option>
          </select>
      </div>
  </div>
</template>

<script>
export default {
    name:"selectBirthday",
    data(){
        return {
            yearsModel:0,   // 当前年份
            years:[],       // 初始化总年份数据
            monthsModel:0,  // 当前月份
            months:[],      // 月份总数据
            daysModel:0,    // 当前天数
            days:[],        // 天总数据
            yearValue:0,    // 年份值
            monthValue:0,   // 月份值
            dayValue:0,      // 天数值
            flag:true
        }
    },
    props:{
        yearSon:{
            type:Number,
            default:0
        },
        monthSon:{
            type:Number,
            default:0
        },
        daySon:{
            type:Number,
            default:0
        }
    },
    computed:{
        getRegvalue:function(){
            return this.yearValue + "/" + this.monthValue + "/" + this.dayValue;
        },
        getSubmitValue:function(){
            let obj = {year:this.yearValue,month:this.monthValue,day:this.dayValue};
            return obj;
        }
    },
    created:function(){
        this.initOption();
    },
    watch:{
       yearSon:function(newVal,oldVal){
            this.yearSon = newVal;
            if(this.flag && newVal == 1 && !!newVal){
                this.initOption();
                this.flag = false;
            }

            if(this.flag && newVal > 1 && !!newVal){
                this.initOption();
                this.flag = false;
            }
       }
    },
    methods:{
        initOption:function(){
            // 之前因为未有初始化容易导致watch监听的时候导致没有数据
            this.flag = false;
            var myDate = new Date;
            var year = myDate.getFullYear();//获取当前年
            var month = myDate.getMonth()+1;//获取当前月
            var day = myDate.getDate();//获取当前日
            
            this.yearsModel = year;
            this.monthsModel = month;
            this.daysModel = day;

            if(!!this.yearSon && !!this.monthSon && !!this.daySon && this.yearSon > 0 && this.monthSon > 0 && this.daySon > 0){
                this.initSelectMonth();
                this.initSelectDay(this.yearSon,this.monthSon);
                this.yearValue = this.yearSon;
                this.monthValue = this.monthSon;
                this.dayValue = this.daySon;
            }else{
                this.years.push({value:0,label:"year"});
                this.months.push({value:0,label:"month"});
                this.days.push({value:0,label:"day"});
            }
            this.initSelectYear(year);
        },
        changeYear:function(){
            if(!!!this.monthValue && this.monthValue == 0 && !!!this.dayValue && this.dayValue == 0){
                let option = this.years.shift();
                let optionValue = parseInt(option.value);
                if(!!!optionValue && optionValue == 0){
                    this.initSelectMonth();
                    this.initSelectDay(this.yearsModel,this.monthsModel);
                }
                this.monthValue = 1;
                this.dayValue = 1;
            }else{
               let regValue = this.getRegvalue;
                let isCorrect =  this.verificationDate(regValue);
                if(!isCorrect && !!!isCorrect){
                    this.monthValue = this.monthsModel;
                    this.dayValue = this.daysModel;
                }else{
                    this.initSelectDay(this.yearValue,this.monthValue);
                    this.dayValue = 1;
                }
            }
            this.$emit('getChildDate',this.getSubmitValue);
        },
        changeMonth:function(){
            if(!!this.monthValue && this.monthValue > 0 && !!this.dayValue && this.dayValue > 0){
                let regValue = this.getRegvalue;
                let isCorrect =  this.verificationDate(regValue);
                if(!isCorrect && !!!isCorrect){
                    this.monthValue = this.monthsModel;
                    this.dayValue = this.daysModel;
                }else{
                    this.initSelectDay(this.yearValue,this.monthValue);
                    this.dayValue = 1;
                }
            }

            this.$emit('getChildDate',this.getSubmitValue);
        },
        changeDay:function(){
            let regValue = this.getRegvalue;
            let isCorrect =  this.verificationDate(regValue);
            if(!isCorrect && !!!isCorrect){
                this.monthValue = this.monthsModel;
                this.dayValue = this.daysModel;
            }

            this.$emit('getChildDate',this.getSubmitValue);
        },
        
        initSelectYear(year){
            // this.years = [];
           for(let i=0;i<70;i++){
            this.years.push({value:(year - i),label:(year - i)});
           }
        },
        initSelectMonth(){
            this.months = [];
            // this.months.push({value:0,label:"全部"});
            for(let i=1;i<=12;i++){
                this.months.push({value:i,label:this.getCustomMouth(i)});
            }
        },
        initSelectDay(year,month){
            var maxDay = this.getMaxDay(year,month);
            this.days = [];
            // this.days.push({value:0,label:"全部"});
            for(var i=1;i<=maxDay;i++){
                this.days.push({value:i,label:i});
            }
        },
        getMaxDay:function(year,month){
            var new_year = year;  //取当前的年份
            var new_month = month;//取下一个月的第一天，方便计算（最后一天不固定）
            var new_date = new Date(new_year,new_month,1);
            return (new Date(new_date.getTime()-1000*60*60*24)).getDate();
        },
        getCustomMouth(value){
            var selectValue = '';
            switch(value){
                case 1 :
                    selectValue = "Jan";
                    break;
                case 2 :
                    selectValue = "Feb";
                    break;
                case 3 :
                    selectValue = "Mar";
                    break;
                case 4 :
                    selectValue = "Apr";
                    break;
                case 5 :
                    selectValue = "May";
                    break;
                case 6 :
                    selectValue = "Jun";
                    break;
                case 7 :
                    selectValue = "Jul";
                    break;
                case 8 :
                    selectValue = "Aug";
                    break;
                case 9 :
                    selectValue = "Sept";
                    break;
                case 10 :
                    selectValue = "Oct";
                    break;
                case 11 :
                    selectValue = "Nov";
                    break;
                default:
                    selectValue = "Dec";
                    break;
            }
            
            return selectValue;
        },
        verificationDate:function(regValue){
            var curDate = new Date();
 	  	    var d = new Date(Date.parse(regValue));
 		
            if(d >=curDate){
                alert("Date of birth must be less than the current time!");
                return false;
            }
	  	    return true;
        }
    }
}
</script>

<style scoped>
    #select-birthday{
        display: flex;
        text-align: center;
    }

    #select-birthday > div{
        margin-right: 20px;
    }

    #select-birthday select{
        border: none;
        appearance: none;
        -moz-appearance: none;
        -webkit-appearance: none;
        background-position: right;
        background: url(https://image.geeko.ltd/site/pc/icon137.png) no-repeat scroll calc(100% - 10px) center transparent;
        padding-right: 14px;
        padding-left: 5px;
        border-radius: 2px;
        border: solid 1px #cccccc;
        box-shadow: none;
        color: #4b5056;
        cursor: pointer;
        height: 38px;
        line-height: 38px;
        margin-right: 0px;
        width: 160px;
        background-color: transparent;
        vertical-align: middle;
    }

    
</style>