<template>
    <div class="detailCon">
        <div class="infoBox">
            <table class="infotabel">
                <tr>
                    <td>
                        <link-image href="#" :src="orderpro.productImageUrl" :title="orderpro.productName" />
                    </td>
                    <td>
                        <p>{{ orderpro.productName }}</p>
                        <p class="grey">{{ orderpro.color }} {{ orderpro.size }} <span
                                style="margin-left: 10px">X{{ orderpro.quantity }}</span></p>
                    </td>
                    <td>
                        <p class="price">{{ realprice }}</p>
                    </td>
                </tr>
            </table>
        </div>

        <div class="review-con">
            <div class="rating-con">
                <div>{{ $t('howtheitem') }}</div>
                <star-list id="stars" :score="commentsData.score" @star="starClickHandle" />
            </div>
            <div class="rating-con">
                <div>{{ $t('howthispro') }}</div>
                <div class="radio-beauty-container">
                    <label v-for="(fit, index) in fits">
                        <input type="radio" @click="fitClickHandle" :value="fit.value" name="radioName" :id="index" hidden
                            :checked="fit.value === commentsData.sizingRecommendation" />
                        <label :for="index" class="radio-beauty"></label>
                        <span class="radio-name">{{ fit.label }}</span>
                    </label>
                </div>
            </div>

            <div id="review-measure-area">
                <p>{{ $t("my_size_infomation") }} </p>
                <table>
                    <tr>
                        <td>
                            <span class="_title">{{ $t("measurements.mea_height") }}:</span>
                            <input class="_input" type="number" v-model="sizeData.height" />
                            <span class="_size">cm/ in</span>
                        </td>
                        <td>
                            <span class="_title">{{ $t("measurements.mea_weight") }}:</span>
                            <input class="_input" type="number" v-model="sizeData.weight" />
                            <span class="_size">kg/ lbs</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="_title">{{ $t("measurements.mea_bust_size") }}:</span>
                            <input class="_input" type="number" v-model="sizeData.bust" />
                            <span class="_size">cm/ in</span>
                        </td>
                        <td>
                            <span class="_title">{{ $t("measurements.mea_hips") }}:</span>
                            <input class="_input" type="number" v-model="sizeData.hips" />
                            <span class="_size">cm/ in</span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span class="_title">{{ $t("measurements.mea_waist") }}:</span>
                            <input class="_input" type="number" v-model="sizeData.waist" />
                            <span class="_size">cm/ in</span>
                        </td>
                    </tr>
                </table>

            </div>

            <div class="commet-area">
                <span class="remnant">{{ remnant1 }}/1000</span>
                <div class="t-area">
                    <textarea v-model="commentsData.content" style="resize:none;" maxlength="1000"></textarea>
                </div>
            </div>
            <div class="upload-container" id="imgboxid">
                <ul v-if="commentsData.images">
                    <li v-for="(image, index) in commentsData.images" class="uploadImage">
                        <img :src="formateImgUrl(image)" />
                        <span class="removeImg" @click="removeImg(index)">&times;</span>
                    </li>
                </ul>
                <div class="upload-img" id="uploadimg" v-show="commentsData.images.length < 6">
                    <form ref="imageLoader">
                        <input type="file" name="imageFiles" multiple="multiple" @change="uploadImgApi"
                            accept="image/jpg,image/jpeg,image/png,image/gif">
                    </form>
                    <div class="addbtn">+</div>
                    <div class="addnum">{{ addnum }} / 6</div>
                </div>
            </div>

            <div class="v-btn" @click="sendCommentApi">{{ $t('submit') }}</div>
        </div>

        <div v-if="isconfirm">
            <div class="mask"></div>
            <comment-alert :data="commentAler" @hideAlert="backOrderPage"></comment-alert>
        </div>
        <loding v-if="isloding"></loding>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LinkImage from '../components/link-image.vue';
import StarList from '../components/star-list.vue';
import uploadImg from '../components/upload-img.vue';
import CommentAlert from '../components/comment-alert.vue';
import loding from '../components/loding.vue';
import HtmlImageCompress from 'html-image-compress';
import { fetchUploadImage, fetchSaveComments } from '../api/index'

export default {
    data() {
        return {
            order: '',
            orderpro: '',
            isloding: false,
            fits: [
                { label: "Small", value: '3' },
                { label: "True to size", value: '2' },
                { label: "Large", value: '1' }
            ],
            isconfirm: false,
            isissatisfy: true,
            alertMess: '',
            addnum: 0,
            lastComments: [],
            commentsData: {
                content: '',
                id: null,
                productId: null,
                score: 5,
                images: [],
                sizingRecommendation: '2'
            },
            sizeData: {
                height: "",
                weight: "",
                bust: "",
                hips: "",
                waist: ""
            },
        }
    },
    components: {
        'link-image': LinkImage,
        'star-list': StarList,
        'upload-img': uploadImg,
        'comment-alert': CommentAlert,
        'loding': loding,
        HtmlImageCompress
    },
    computed: {
        ...mapGetters(['orderdetail', 'comment']),
        remnant1() {
            if (this.commentsData && this.commentsData.content) {
                return this.commentsData.content.length
            } else {
                return '0'
            }
        },
        realprice() {
            if (this.orderpro && this.orderpro.realPrice && this.orderpro.realPrice.unit) {
                return this.orderpro.realPrice.unit + this.orderpro.realPrice.amount
            }
        },
        commentAler() {
            return {
                'isagree': this.issatisfy,
                'message': this.alertMess,
                'agreeText': 'Yes'
            }
        },
    },
    methods: {
        starClickHandle(data) {
            this.commentsData.score = Number(data.star);
        },
        fitClickHandle(evt) {
            let fitNum = evt.target.value
            this.commentsData.sizingRecommendation = fitNum
        },
        backOrderPage() {
            this.$router.go(-1);
        },
        async uploadImgApi(evt) {
            if (!(evt.target.files?.length > 0)) {
                return;
            }
            this.isloding = true
            let formData = new FormData();
            formData.append("type", "comment");

            let files = Array.from(evt.target.files);
            files?.forEach(file => {
                formData.append("files", new File([file], file?.name));
            });

            let response = await fetchUploadImage(formData, { 'Content-Type': 'application/x-www-form-urlencoded' });
            if (response?.code === 200 && response?.result) {
                const { result } = response;
                let urls = result?.map(item => item?.url);
                this.commentsData.images = this.commentsData?.images?.length > 0 ?
                    [...this.commentsData?.images, ...urls]?.slice(0, 6) :
                    [...urls]?.slice(0, 6)
                this.addnum = this.commentsData?.images?.length
            }
            this.isloding = false;
        },
        removeImg(index) {
            this.commentsData.images.splice(index, 1)
            this.addnum -= 1
        },
        formateImgUrl(url) {
            if (!url) return ''
            if (url.indexOf("http") == -1) {
                return 'https://img-s3.geeko.ltd/comment/medium/' + url
            } else {
                return url
            }
        },
        async sendCommentApi() {
            if (window.GeekoSensors) {
                window.GeekoSensors.Track('ELClick', {
                    clicks: 'Save Review',
                    orderId: this.order?.id
                })
            }

            this.isloding = true
            let comments = [...this.lastComments];
            let flag = false;
            let varaintId = this.commentsData?.varaintId || this.commentsData?.variantId || this.$route.query.variantId

            let initData = {
                productId: this.commentsData?.productId || this.$route.query.productid,
                orderId: this.order?.id,
            };

            if(this.commentsData?.id){
                initData['id'] = this.commentsData?.id
            }

            if(varaintId){
                initData['varaintId'] = varaintId
            }

            this.commentsData.content.trim()

            if (!!this.commentsData?.content && this.commentsData?.score > 0) {
                initData['content'] = this.commentsData.content;
                initData['score'] = this.commentsData.score;
                flag = true;
            }

            if (!!this.commentsData?.sizingRecommendation) {
                initData['sizingRecommendation'] = this.commentsData.sizingRecommendation;
            }

            if (this.commentsData?.images && this.commentsData?.images?.length > 0) {
                initData['images'] = this.commentsData.images;
            }

            

            comments.push(initData);

            comments.forEach((c) => {
                if (c['createTime']) {
                    delete c['createTime']
                }
            })

            if (!flag) {
                alert(this.$t("comments_not_empty"))
                this.isloding = false
                return;
            }
            let params = { comments };
            params['mySizeInformation'] = this.sizeData;
            let response = await fetchSaveComments(params);
            this.isloding = false
            if (response?.code == 200) {
                let tipContent = ''
                if (response.prompt && response.prompt.html) {
                    tipContent = response.prompt.html
                    this.$router.push({ name: 'reviewConfirm', params: { tipContent: tipContent } })
                } else {
                    alert(this.$t("success") + "!");
                    this.$router.go(-1);
                }
            } else {
                alert(response?.result || 'Fail!')
            }
        },
    },
    created() {
        this.$store.dispatch('getOrder', this.$route.query.orderid).then(() => {
            this.order = this.orderdetail
            if (this.order && this.orderdetail.orderItems) {
                this.orderdetail.orderItems.forEach(item => {
                    if (item.productId === this.$route.query.productid) {
                        this.orderpro = item
                    }
                })
            }
        })
        this.$store.dispatch('loadComment', this.$route.query.orderid).then((res) => {
            if (this.comment?.code == 200 && this.comment?.result) {
                let comment = this.comment.result?.comments?.find(c => c.productId === this.$route.query.productid) || {}
                this.lastComments = this.comment.result?.comments?.filter(c => c.productId != this.$route.query.productid) || []
                if (comment) {
                    this.commentsData = {...this.commentsData, ...comment}
                    this.addnum = this.commentsData.images.length
                }
                this.sizeData = { ...this.sizeData, ...(this.comment.result?.mySizeInformation || {}) } || null
            }
        });
    }
}
</script>

<style scoped lang="scss">
.grey {
    color: #999;
}

.infoBox {
    margin: 20px 0 30px 0;
}

.infotabel {
    border: 1px solid #e6e6e6;
    width: 100%;

    td {
        padding: 14px;
        vertical-align: middle;
        font-size: 14px;
        line-height: 25px;
        text-align: center;

        i {
            font-size: 18px;
            margin-right: 6px;
        }

        a {
            text-decoration: underline;
            cursor: pointer;
        }
    }

    tr {
        td:first-child {
            width: 120px;
        }

        td:nth-child(2) {
            text-align: left;
        }

        td:last-child {
            text-align: right;
            padding-left: 30px;
            font-size: 20px;
            color: #E64545;
        }
    }

    img {
        width: 90px;
        height: 120px;
    }
}

.tbl-cell {
    display: table-cell;
}

.detailCon {
    width: 916px;
    margin: 0 auto;
    padding-top: 60px;
}

.review-con {
    .star {
        font-size: 20px;
        color: #E64545;
    }
}

.rating-con {
    div {
        float: left;
        font-size: 16px;
        margin-right: 30px;
        margin-bottom: 20px;
    }

    &:after {
        display: block;
        content: '';
        clear: both;
    }

    .radio-beauty-container {
        font-size: 0;
        $bgc: #E64545;

        %common {
            padding: 2px;
            background-color: $bgc;
            background-clip: content-box;
        }

        .radio-name {
            vertical-align: middle;
            font-size: 16px;
        }

        .radio-beauty {
            width: 18px;
            height: 18px;
            box-sizing: border-box;
            display: inline-block;
            border: 1px solid #cacaca;
            vertical-align: middle;
            margin: 0 10px 0 45px;
            border-radius: 50%;
            cursor: pointer;
        }

        input[type="radio"]:checked+.radio-beauty {
            @extend %common;
        }
    }
}

#review-measure-area {
    padding-bottom: 15px;

    &>table {
        width: 50%;

        &>tr {
            &>td {
                vertical-align: middle;
                padding: 10px;

                ._title {
                    font-size: 14px;
                    color: #999999;
                }

                ._size {
                    font-size: 14px;
                    color: #222222;
                }

                ._input {
                    border: none;
                    border-bottom: 1px solid #dddddd;
                    width: calc(50% - 25px);
                    text-align: center;
                }
            }
        }
    }

    &>p {
        font-size: 16px;
        padding-bottom: 5px;
    }
}

.commet-area {
    width: 100%;
    height: 176px;
    position: relative;

    .remnant {
        position: absolute;
        right: 10px;
        bottom: 10px;
        z-index: 333;
        color: #666;
    }

    .t-area {
        position: relative;

        span {
            position: absolute;
            right: -90px;
            top: 0;
            color: red;
            font-size: 18px;
        }

        textarea {
            width: 100%;
            height: 176px;
            padding: 15px;
            border: 1px solid #cacaca;
            border-radius: 3px;
        }
    }

}

.uploadimg {
    margin: 20px 0 0 0;

    p {
        font-size: 16px;
    }
}

.v-btn {
    width: 240px;
    height: 40px;
    margin-top: 50px;
    background-color: #222222;
    border-radius: 2px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    margin-bottom: 20px;
    cursor: pointer;
}

.upload-container {
    overflow: hidden;
    padding-top: 20px;

    .upload-img {
        float: left;
        width: fit-content;
        /*background-image: url("https://s3-us-west-2.amazonaws.com/image.chic-fusion.com/promotion/1129/chicme-23.png");*/
        background-size: 100%;
        position: relative;
        border: 1px dashed #999;
        cursor: pointer;

        input {
            display: inline-block;
            height: 144px;
            width: 144px;
            opacity: 0;
            position: relative;
            z-index: 99;
        }

        .addbtn {
            position: absolute;
            top: calc(50% - 25px);
            left: calc(50% - 8px);
            font-size: 34px;
            z-index: 0;
            color: #999;
        }

        .addnum {
            position: absolute;
            top: 70%;
            left: calc(50% - 10px);
            font-size: 12px;
            z-index: 0;
            color: #999;
        }
    }

    .uploadImage {
        position: relative;
        height: 107.5px;
        width: 88px;
        float: left;
        margin: 5px;
        overflow: hidden;

        img {
            width: 100%;
        }

        .removeImg {
            width: 20px;
            line-height: 20px;
            font-size: 21px;
            text-align: center;
            display: block;
            border-radius: 50%;
            background-color: #cccccc;
            color: #ffffff;
            position: absolute;
            top: 6px;
            right: 4px;
            cursor: pointer;
        }
    }
}</style>