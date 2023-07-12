<template>
  <div>
    <div class="maskBox1" @click.self="close">
      <div :class="{ maskMainBox: true, smallHeight: stepNow === 3 }">
        <div class="maskMainHead">
          <span :class="{ title: true, required: stepNow === 2 }">{{
            maskTitle
          }}</span>
          <span class="iconfont close" @click="close">&#xe69a;</span>
        </div>

        <step-1
          v-if="stepNow === 1"
          :productCanSelect="productCanSelectList"
          :productReturned="productReturned"
          :productCannotSelect="productCannotSelectList"
          @selectChange="(p) => selectChange(p)"
          @toView="id => toView(id)"
          @showConfirm="showConfirm"
          @toNext="toNext"
        />

        <step-2
          v-if="stepNow === 2"
          :productSelected="productSelected"
          :selectedProduct="selectedProduct"
          :reasonList="reasonList"
          @changeProductReason="
            ({ product, reason, reasonCode }) =>
              changeProductReason(product, reason, reasonCode)
          "
        />

        <step-3
          v-if="stepNow === 3"
          :questionObject="questionObject"
          @descriptionTextAreaChange="(e) => descriptionTextAreaChange(e)"
          @questionImgUpload="(e) => uploadImgApi(e)"
          @deleteImg="(index) => deleteImg(index)"
        />

        <div class="buttonBox">
          <button @click="toNext">next</button>
        </div>

        <select-mask v-if="showMaskConfig" :cfg="showMaskConfig" />

        <select-toast
          v-if="toastMessage"
          :message="toastMessage"
          @close="() => (toastMessage = '')"
        />
      </div>
    </div>
  </div>
</template>

<script>
import SelectProduct from './select-product.vue'
import SelectMask from './select-mask.vue'
import SelectToast from './select-toast.vue'
import Step1 from './step-1.vue'
import Step2 from './step-2.vue'
import Step3 from './step-3.vue'
import { fetchUploadImage, getSurveyQuestions, getMessage } from '../../api/index.js';

export default {
  props: {
    orderdetail: {
      type: Object
    },
    productCanSelect: {
        type: Array,
        default: []
    },
    productCannotSelect: {
        type: Array,
        default: []
    },
    productReturned: {
        type: Array,
        default: []
    }
  },
  data () {
    return {
      stepNow: 1, // 当前步骤
      toastMessage: '',

      productCanSelectList: [],
      productCannotSelectList: [],

      productSelected: [],
      selectedProduct: null,
      showMaskConfig: null,

      reasonList: [],
      questionObject: {
        descriptionInput: '',
        uploadImgList: [],
        uploadImgFileList: []
      },
      submitLoading: false,
      maskMessage: '',
    }
  },
  mounted (){
    this.getMessageFunc()
    this.productCanSelectList = [...this.productCanSelect]
    this.productCannotSelectList = [...this.productCannotSelect]
  },
  computed: {
    maskTitle () {
      const hasSelectReasonProduct = this.productSelected?.filter(p => !!p?.reason)?.length || 1
      return this.stepNow == 1 ? this.$t('please_select_items') :
        this.stepNow == 2 ? this.$t('please_select_reason', {x:hasSelectReasonProduct, y:this.productSelected?.length || 1}) :
          this.$t("please_submit_detail")
    },
  },
  methods: {
    getMessageFunc(){
        getMessage("M1808").then(res => {
            if(res?.message){
                let msg1 = res?.message
                let msg = msg1.replaceAll('\\n', '<br/>')
                this.maskMessage = msg
            }
        })
    },
    close () {
      this.$emit("returnSelectClose")
    },
    showConfirm () {
      let _this = this
      this.showMaskConfig = {
        message: _this.maskMessage,
        btnFont: {
          no: _this.$t('require_support'),
          yes: _this.$t('confirm'),
        },
        yes: () => {
          // 关闭弹窗
          _this.showMaskConfig = null
        },
        no: () => {
          // 将不可选择的加到可选择的里面
          _this.productCanSelectList = [..._this.productCanSelectList, ..._this.productCannotSelectList]
          _this.productCannotSelectList = []
          _this.showMaskConfig = null
        },
        close: () => {
          // 关闭弹窗
          _this.showMaskConfig = null
        },
        style: {
          box: {
            width: '320px',
            padding: '20px 14px 14px',
            right: '0',
            left: 'unset',
            transform: 'translate(-25%, -50%)',
          },
          message: {
            fontSize: '14px',
            fontFamily: 'Roboto-Bold, Roboto',
            fontWeight: 'bold',
            color: '#222222',
            lineHeight: '16px',
            textAlign: 'left',
          },
          btnYes: {
            fontFamily: 'Roboto-Bold, Roboto',
            width: '100%',
            marginTop: '10px',
            fontWeight: 'bold',
          },
          btnNo: {
            fontFamily: 'Roboto-Bold, Roboto',
            width: '100%',
            fontWeight: 'bold',
          }
        }
      }
    },
    toNext () {
      // this.$emit("toNext")
      if (this.stepNow == 1) {
        const selectedProducts = this.productCanSelectList?.filter(p => p?.selected == true)
        if (selectedProducts?.length > 0) {
          // 去下一步
          this.productSelected = selectedProducts
          this.stepNow = 2
          this.getReasonList()
        } else {
          // 提示不行
          this.toastMessage = this.$t('please_select_items_to_return')
        }
      } else if (this.stepNow == 2) {
        const productSelectedNoReason = this.productSelected?.filter(p => !p?.reason)
        if (productSelectedNoReason?.length > 0) {
          // 提示不行
          this.toastMessage = this.$t('please_select_reason_for_items')
          this.selectedProduct = productSelectedNoReason?.[0]
          console.log(productSelectedNoReason?.[0])
          console.log(this.selectedProduct)
        } else {
          // 去下一步
          this.stepNow = 3
        }
      } else if (this.stepNow == 3) {
        // 组合 obj
        this.submit()
      }
    },
    toView (id) {
      this.$emit('returnView', id)
    },
    selectChange (product) {
      let newList = [...(this.productCanSelectList || [])]
      newList.forEach(n => {
        if (n?.variantId == product?.variantId) {
          n.selected = !n.selected
        }
      })
      this.productCanSelectList = newList
    },
    hasSelected (product) {
      return !!this.productSelected?.find(p => p?.variantId == product?.variantId) || false
    },
    getReasonList () {
      getSurveyQuestions('M1799').then(res => {
        if (res?.code == 200 && res?.result?.length > 0) {
          this.reasonList = res?.result
        }
      }).catch(err => {
        alert(err?.result || err)
      })
    },
    changeProductReason (product, reason, reasonCode) {
      let newList = [...(this.productSelected || [])]
      newList?.forEach(n => {
        if (n?.variantId == product?.variantId) {
          n.reason = reason
          n.reasonCode = reasonCode
        }
      })
      this.productSelected = newList
    },
    descriptionTextAreaChange (e) {
      this.questionObject = {
        ...this.questionObject,
        descriptionInput: e.target.value
      }
    },
    deleteImg (index) {
      let imgList = this.questionObject.uploadImgList.slice(0);
      imgList.splice(index, 1);
      this.questionObject = {
        ...this.questionObject,
        uploadImgList: imgList
      }
    },
    async uploadImgApi(evt) {
        if (!(evt.target.files?.length > 0) || this.submitLoading) {
            return;
        }
        this.submitLoading = true
        let formData = new FormData();
        formData.append("type", "return_order");

        let files = Array.from(evt.target.files);
        files?.forEach(file => {
            formData.append("files", new File([file], file?.name));
        });

        let response = await fetchUploadImage(formData, { 'Content-Type': 'application/x-www-form-urlencoded' });
        if (response?.code === 200 && response?.result) {
            const { result } = response;
            let urls = result?.map(item => item?.url);
            this.questionObject.uploadImgList = this.questionObject.uploadImgList?.length > 0 ?
                    [...this.questionObject.uploadImgList, ...urls]?.slice(0, 3) :
                    [...urls]?.slice(0, 3)
        }
        this.submitLoading = false;
    },
    submit () {
      if (this.submitLoading) return
      this.submitLoading = true
      let params = {
        // this.orderdetail
        orderId: this.orderdetail?.id || '-',
        description: this.questionObject?.descriptionInput || '',
        customImages:  this.questionObject?.uploadImgList || [],
      }

      if(this.productSelected && this.productSelected?.length > 0){
        let items = this.productSelected.map(p => {
            return {
                variantId: p?.variantId,
                productId: p?.productId,
                imageUrl: p?.imageURL,
                sku: p?.sku,
                reason: p?.reason
            }
        })
        params['items'] = ("items", items)
      }
      this.$emit("updateTicket", JSON.stringify(params))
    }
  },
  components: {
    "select-product": SelectProduct,
    "select-mask": SelectMask,
    "select-toast": SelectToast,
    "step-1": Step1,
    "step-2": Step2,
    "step-3": Step3
  }
}
</script>


<style scoped lang="scss">

.maskBox1 {
    background: rgba(34, 34, 34, 0.3);
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1;
    width: 499px;
    height: 100%;
    cursor: pointer;

    .maskMainBox {
        width: 100%;
        height: 90%;
        position: absolute;
        bottom: 0;
        left: 0;
        border-radius: 10px 10px 0 0;
        background: #fff;

        &.smallHeight{
            height: 60%;
        }

        .maskMainHead {
            height: 40px;
            line-height: 40px;
            text-align: center;
            position: relative;

            .title {
                font-size: 14px;
                font-family: Roboto-Medium, Roboto;
                font-weight: 500;
                color: #222222;
                line-height: 16px;
                position: relative;

                .required:after{
                    content: '*';
                    color: #E64545;
                    position: absolute;
                    right: -15px;
                    top: 0;
                    font-size: 20px;
                }
            }

            .close {
                position: absolute;
                right: 12px;
                top: 12px;
                color: #666;
                font-size: 12px;
                line-height: 12px;
                // transform: scale(0.67);
                cursor: pointer;
            }
        }

        .buttonBox {
            position: fixed;
            bottom: 0;
            width: 499px;
            right: 0;
            height: 81px;
            background: #FFFFFF;
            box-shadow: 0px 1px 8px 0px rgba(0,0,0,0.5);
            padding: 14px 12px 23px;

            button {
                width: 100%;
                height: 44px;
                background: #222222;
                text-align: center;
                line-height: 44px;
                color: #fff;
                text-transform: uppercase;
                cursor: pointer;
                outline: none;
                border: none;
            }
        }
    }
}
</style>