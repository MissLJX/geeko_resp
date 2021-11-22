<template>
    <div class="countdown" v-if="lefting > 0">
        <slot class="label" :style="labelStyle"></slot>
        <template v-if="showDay">
          <span :style="timeStyle">{{countdowning.day}}</span><span>:</span>
        </template>
        <template v-if="showHour">
          <span :style="timeStyle">{{countdowning.hour}}</span><span>:</span>
        </template>
        
        <span :style="timeStyle">{{countdowning.minute}}</span><span>:</span>
        <span :style="timeStyle">{{countdowning.second}}</span>
    </div>
</template>

<script>
  const __dayoffset = 1000*60*60*24, __houroffset = 1000*60*60, __minuteoffset = 1000*60;


  export default {
    name: 'countdow',
    // 'timeLeft', 'labelStyle', 'timeStyle'
    props: {
      timeLeft:{
        type:[String,Number]
      },
      timeStyle:{
        type:Object
      },
      showDay:{
        type:Boolean,
        default:false
      },
      showHour:{
        type:Boolean,
        default:false
      }
    },
    data(){
      return {
        lefting: 0,
        timerId: null
      }
    },
    computed: {
      countdowning(){
        const lefting = this.lefting;
        const day = Math.floor(lefting / __dayoffset);
        const _leftday = lefting % __dayoffset;
        const hour = Math.floor(_leftday / __houroffset);
        const _lefthour = lefting % __houroffset;
        const minute = Math.floor(_lefthour / __minuteoffset);
        const second = Math.floor((lefting % __minuteoffset)/1000);
        // return `${this.getFullNumber(day)}:${this.getFullNumber(hour)}:${this.getFullNumber(minute)}:${this.getFullNumber(second)}`;
        return {
          day: this.getFullNumber(day),
          hour: this.getFullNumber(hour),
          minute: this.getFullNumber(minute),
          second: this.getFullNumber(second)
        }
      }
    },
    methods: {
      getFullNumber(number){
        return number >= 10 ? number : ('0'+number);
      }
    },
    created(){
      let offset = 0;
      this.timerId = setInterval(() => {
        this.lefting = this.timeLeft - offset;
        offset+=1000;

        if(this.lefting <= 0){
          clearInterval(this.timerId)
        }

      }, 1000);
    },
    destroyed(){
        clearInterval(this.timerId)
    }

  };
</script>

<style scoped lang="scss">
    .countdown{
        display: inline-block;

        // .time::before{
        //     content: '\e655';
        //     font-size: 14px;
        //     margin-right: 5px;
        //     font-family: iconfont;
        // }
    }


</style>
