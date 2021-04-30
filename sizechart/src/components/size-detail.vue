<template>
  <div class="size-detail">
    <div class="_img" v-if="pmethod === 'jumpsuits'">
      <div>
        <picture-show :imgSrc="imgSrc"></picture-show>
      </div>

      <div>
        <div style="margin-bottom: 15px">
          <div class="img_t">
            <span>1</span>
            <span>{{ $t("label.waist") }}</span>
          </div>

          <div class="img_c">
            {{ $t("message.waist_note") }}
          </div>
        </div>
        <div style="margin-bottom: 15px">
          <div class="img_t">
            <span>2</span>
            <span>{{ $t("label.hip") }}</span>
          </div>

          <div class="img_c">
            {{ $t("message.hip_note") }}
          </div>
        </div>
      </div>
    </div>

    <div class="_img" v-if="pmethod === 'dress'">
      <div>
        <picture-show :imgSrc="imgSrc"></picture-show>
      </div>

      <div>
        <div style="margin-bottom: 15px">
          <div class="img_t">
            <span>1</span>
            <span>{{ $t("label.bust") }}</span>
          </div>

          <div class="img_c">
            {{ $t("message.bust_note") }}
          </div>
        </div>
        <div style="margin-bottom: 15px">
          <div class="img_t">
            <span>2</span>
            <span>{{ $t("label.waist") }}</span>
          </div>

          <div class="img_c">
            {{ $t("message.waist_note") }}
          </div>
        </div>
        <div style="margin-bottom: 15px">
          <div class="img_t">
            <span>3</span>
            <span>{{ $t("label.hip") }}</span>
          </div>

          <div class="img_c">
            {{ $t("message.hip_note") }}
          </div>
        </div>
      </div>
    </div>

    <div class="_img" v-if="pmethod === 'shoes'">
      <div>
        <picture-show :imgSrc="imgSrc"></picture-show>
      </div>

      <div>
        <div style="margin-bottom: 15px">
          <div class="img_t">
            <span>1</span>
            <span>{{ $t("label.length") }}</span>
          </div>

          <div class="img_c">
            {{ $t("message.length_note") }}
          </div>
        </div>
      </div>
    </div>

    <div class="_img" v-if="pmethod === 'top'">
      <div>
        <picture-show :imgSrc="imgSrc"></picture-show>
      </div>

      <div>
        <div style="margin-bottom: 15px">
          <div class="img_t">
            <span>1</span>
            <span>{{ $t("label.bust") }}</span>
          </div>

          <div class="img_c">
            {{ $t("message.bust_note") }}
          </div>
        </div>
        <div style="margin-bottom: 15px">
          <div class="img_t">
            <span>2</span>
            <span>{{ $t("label.waist") }}</span>
          </div>

          <div class="img_c">
            {{ $t("message.waist_note") }}
          </div>
        </div>
        <div style="margin-bottom: 15px">
          <div class="img_t">
            <span>3</span>
            <span>{{ $t("label.hip") }}</span>
          </div>

          <div class="img_c">
            {{ $t("message.hip_note") }}
          </div>
        </div>
      </div>
    </div>

    <div class="_img" v-if="pmethod === 'underwear'">
      <div>
        <picture-show :imgSrc="imgSrc"></picture-show>
      </div>

      <div>
        <div style="margin-bottom: 15px">
          <div class="img_t">
            <span>1</span>
            <span>{{ $t("label.bust") }}</span>
          </div>

          <div class="img_c">
            {{ $t("message.bust_note") }}
          </div>
        </div>
        <div style="margin-bottom: 15px">
          <div class="img_t">
            <span>2</span>
            <span>{{ $t("label.waist") }}</span>
          </div>

          <div class="img_c">
            {{ $t("message.waist_note") }}
          </div>
        </div>
        <div style="margin-bottom: 15px">
          <div class="img_t">
            <span>3</span>
            <span>{{ $t("label.hip") }}</span>
          </div>

          <div class="img_c">
            {{ $t("message.hip_note") }}
          </div>
        </div>
      </div>
    </div>

    <div class="_img" v-if="pmethod === 'bathing'">
      <div>
        <picture-show :imgSrc="imgSrc"></picture-show>
      </div>

      <div>
        <div style="margin-bottom: 15px">
          <div class="img_t">
            <span>1</span>
            <span>{{ $t("label.bust") }}</span>
          </div>

          <div class="img_c">
            {{ $t("message.bust_note") }}
          </div>
        </div>
        <div style="margin-bottom: 15px">
          <div class="img_t">
            <span>2</span>
            <span>{{ $t("label.hip") }}</span>
          </div>

          <div class="img_c">
            {{ $t("message.hip_note") }}
          </div>
        </div>
      </div>
    </div>

    <div class="_img" v-if="pmethod === 'bottom'">
      <div>
        <picture-show :imgSrc="imgSrc"></picture-show>
      </div>

      <div>
        <div style="margin-bottom: 15px">
          <div class="img_t">
            <span>1</span>
            <span>{{ $t("label.waist") }}</span>
          </div>

          <div class="img_c">
            {{ $t("message.waist_note") }}
          </div>
        </div>
        <div style="margin-bottom: 15px">
          <div class="img_t">
            <span>2</span>
            <span>{{ $t("label.hip") }}</span>
          </div>

          <div class="img_c">
            {{ $t("message.hip_note") }}
          </div>
        </div>
      </div>
    </div>

    <div class="_img" v-if="pmethod === 'coat'">
      <div>
        <picture-show :imgSrc="imgSrc"></picture-show>
      </div>

      <div>
        <div style="margin-bottom: 15px">
          <div class="img_t">
            <span>1</span>
            <span>{{ $t("label.bust") }}</span>
          </div>

          <div class="img_c">
            {{ $t("message.bust_note") }}
          </div>
        </div>
        <div style="margin-bottom: 15px">
          <div class="img_t">
            <span>2</span>
            <span>{{ $t("label.waist") }}</span>
          </div>

          <div class="img_c">
            {{ $t("message.waist_note") }}
          </div>
        </div>
        <div style="margin-bottom: 15px">
          <div class="img_t">
            <span>3</span>
            <span>{{ $t("label.hip") }}</span>
          </div>

          <div class="img_c">
            {{ $t("message.hip_note") }}
          </div>
        </div>
      </div>
    </div>

    <div class="_img" v-if="pmethod === 'onepiece'">
      <div>
        <picture-show :imgSrc="imgSrc"></picture-show>
      </div>

      <div>
        <div style="margin-bottom: 15px">
          <div class="img_t">
            <span>1</span>
            <span>{{ $t("label.bust") }}</span>
          </div>

          <div class="img_c">
            {{ $t("message.bust_note") }}
          </div>
        </div>
        <div style="margin-bottom: 15px">
          <div class="img_t">
            <span>2</span>
            <span>{{ $t("label.waist") }}</span>
          </div>

          <div class="img_c">
            {{ $t("message.waist_note") }}
          </div>
        </div>
        <div style="margin-bottom: 15px">
          <div class="img_t">
            <span>3</span>
            <span>{{ $t("label.hip") }}</span>
          </div>

          <div class="img_c">
            {{ $t("message.hip_note") }}
          </div>
        </div>
      </div>
    </div>

    <div class="_img" v-if="pmethod === 'highheels'">
      <div>
        <picture-show :imgSrc="imgSrc"></picture-show>
      </div>

      <div>
        <div style="margin-bottom: 15px">
          <div class="img_t">
            <span>1</span>
            <span>{{ $t("label.waist") }}</span>
          </div>

          <div class="img_c">
            {{ $t("message.waist_note") }}
          </div>
        </div>
        <div style="margin-bottom: 15px">
          <div class="img_t">
            <span>2</span>
            <span>{{ $t("label.hip") }}</span>
          </div>

          <div class="img_c">
            {{ $t("message.hip_note") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import PictureShow from './picture-show.vue'

    export default {
        name: "SizeDetail",
        props:{
            pmethod:{
                type:String,
                default:''
            },
            imgSrc:{
                type:String,
                default:''
            }
        },
        components:{
            PictureShow
        }
    };
</script>

<style scoped lang="scss">
    .size-detail{
        ._img{
            padding-top: 15px;
            padding-bottom: 15px;
            display: flex;
            align-items: center;

            .img_t{
                text-transform: capitalize;
                font-weight: bold;

                & span {
                    display: inline-block;
                    &:first-child {
                        display: inline-block;
                        width: 16px;
                        height: 16px;
                        border-radius: 50%;
                        background-color: #111;
                        color: #fff;
                        text-align: center;
                        line-height: 16px;
                        font-size: 14px;
                        margin-right: 10px;
                        font-weight: normal;
                    }
                }
            }

            .img_c {
                font-size: 12px;
                color: #666;
                line-height: 16px;
                padding-top: 8px;
            }
        }
    }
</style>