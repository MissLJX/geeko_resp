<template>
    <div class="add-to-cart-modal"> 
        <div class="add-to-cart-container">
            <div class="_bd">
                <div style="padding-left:20px;">
                    <product-swiper :images="productImages"></product-swiper>
                </div>

                <div class="padding-container">
                    <product-price :product="product" :variant-product="variantProduct"></product-price>
                    <!-- <product-price-points v-if="isPointsProduct" :product="product" :variant-product="variantProduct"></product-price-points> -->

                    <product-color
                        :variant-product="variantProduct"
                        :products="products"
                        :images="changeProductImage"
                        @changeProduct="changeProduct"
                        :is-beauty="isBeauty"
                        :product-id="productId"
                        v-if="products && products.length > 1"
                    ></product-color>

                    <product-size 
                        :product="product" 
                        :variant-id.sync="variantId" 
                        :variant-product="variantProduct"
                        v-if="!isBeauty"
                    ></product-size>
                </div>

            </div>
            <div class="_fd" @click="addToCart(false)" v-if="!isPointsProduct">
                <div>{{$t('label.add_to_cart')}}</div>
            </div>

            <div class="_fd pointsBtnBox" v-if="isPointsProduct">
                <span :class="saveProduct" :product-id="productId"><i class="iconfont" style="font-size: 22px;">&#xe631;</i></span>
                <div class="pointsBtn" >
                    <div v-if="unitedPrice" @click="addToCartOrigin">
                        {{unitedPrice}}
                        <span class="iconfont">&#xe6a8;</span>
                    </div>
                    <div v-if="pointsPrice" v-html="pointsPrice" @click="addToCartPoints"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import _ from "lodash"

    import ProductSwiper from "./product-swiper.vue"
    import ProductPrice from "./product-price.vue"
    import ProductColor from "./product-color.vue"
    import ProductSize from "./product-size.vue"
    import ProductPricePoints from './product-price-points.vue'
    import {getPointsMoney,unitPrice} from '../../utils/geekoutils.js'

    export default {
        name:"AddToCartModal",
        data(){
            return {
                products:null,
                productId:"0db00778-bf12-4d05-ad59-0cbccf655d46",
                variantId:"1k6N2S7c7S24174y6m4b49740I",
                isPointsProduct: false,
                isBeauty:false
            }
        },
        computed:{
            product(){
                return this.products.find(item => item.id === this.productId);
            },
            productImages(){
                let arr = _.concat(this.product.pcMainImage,this.product.pcExtraImageUrls);
                return arr;
            },
            variantProduct(){
                return this.product.variants.find(item => item.id === this.variantId);
            },
            changeProductImage(){
                return this.products.map(item => {
                    return {"productId":item.id,"imageUrl":item.pcMainImage}
                });
            },
            saveProduct(){
                if(window.WannaList){
                    let isActive = window.WannaList.exists(this.product.id) ? 'active':''
                    return 'mp-l-save alike __like ' + isActive
                } else {
                    return 'mp-l-save alike __like'
                }
            },
            unitedPrice(){
                return unitPrice(this.variantProduct.price)
            },
            price(){
                // 当有促销价格并且大于0的时候  售价显示促销价格
                if (this.product && this.product.promotionPrice && this.product.promotionPrice.amount > 0) {
                    return this.product.promotionPrice
                }

                // 当有价格并且大于0的时候  售价显示价格
                if (this.product && this.product.price && this.product.price.amount > 0) {
                    return this.product.price
                }
                return this.product.price;
            },
            pointsPrice(){
                if(getPointsMoney(this.variantProduct.pointsMallVariantSales)){
                    return getPointsMoney(this.variantProduct.pointsMallVariantSales) + '<span class="iconfont">&#xe6a8;</span>'
                } else {
                    return ''
                }
            },
            addToCartSensors(){
                return this.$store.getters['addToCartSensors'];
            }
        },
        created(){
            let productVo = this.$store.getters.productDetail;
            this.products = productVo.products;
            this.productId = this.$store.getters.productId;
            this.variantId = this.product.variants[0].id;
            this.isPointsProduct = this.$store.getters.isPointsProduct;
            this.isBeauty = productVo.style === 1;
            // console.log(this.isPointsProduct, this.product, this.variantProduct)
        },
        components:{
            "product-swiper":ProductSwiper,
            "product-price":ProductPrice,
            "product-color":ProductColor,
            "product-size":ProductSize,
            "product-price-points":ProductPricePoints
        },
        methods:{
            changeProduct(productId){
                this.productId = productId;
                this.variantId = this.product.variants[0].id;
            },
            addToCart(pointsSale){
                let params = {
                    "variantId":this.variantId,
                    "quantity":'1'
                }
                if(pointsSale){
                    params.pointsMallSales = true
                }
                this.$store.dispatch("addToCart",params).then(() => {
                    // console.log("success");
                    this.$store.dispatch("addToCartIsShow",false);
                    this.$store.dispatch("setIsPointsProduct", false);
                    window.countShoppingCart ? window.countShoppingCart() : "";
                    this.addToCartEvent();

                    this.$store.dispatch("setAddToCartSensors", null);

                    this.$store.dispatch("me/getShoppingCartNum");
                }).catch((e) => {
                    console.log("addToCart报错",e);
                    this.$store.dispatch("addToCartIsShow",false);
                    this.$store.dispatch("setAddToCartSensors", null);
                    this.$store.dispatch("setIsPointsProduct", false);
                });
            },
            addToCartEvent(quantity){
                let _selectedproduct = this.product;
                let realPrice = this.price;
                let _selectedvariant = this.variantProduct;

                if(window.FacebookTrack){
					FacebookTrack.send('AddToCart', {
						content_ids: [_selectedproduct.id],
						content_type: 'product',
						value: realPrice.amount,
						currency: realPrice.currency
					});
				}
				
                if(window.ga){
                    ga("ec:addProduct", {
                        "id": _selectedvariant.sku,
                        "name": _selectedproduct.name,
                        "price": realPrice.amount,
                        "quantity": quantity || 1
                    });
                    ga("ec:setAction", "add");
                    ga("send", "event", "UX", "click", "add to cart")
                }

				if(window.pintrk){
					pintrk('track','addtocart',{
						value: Math.round(realPrice.amount*quantity),
						currency: realPrice.currency,
						line_items:[{
							product_name:_selectedproduct.name,
							product_id:_selectedproduct.id,
							product_variant_id:_selectedvariant.id,
							product_price:realPrice.amount,
							product_quantity:quantity
						}]
					});
				}

				if(window.mkq){
					mkq('track', 'AddToCart', {
						value: realPrice.amount,
						currency: realPrice.currency,
						content_name: _selectedproduct.name,
						content_type: 'product',
						content_ids: [_selectedproduct.id]
					});
				}

				if(window.snaptr){
					snaptr('track','ADD_CART',{
						'price': realPrice.amount,
						'currency': realPrice.currency,
						'item_ids': [_selectedproduct.id],
						'number_items': quantity,
						'item_category': _selectedproduct.productCategoryIds[0]

					});
				}

				if(window.mobileAnalyticsClient){
                    mobileAnalyticsClient.recordEvent('ADD_TO_CART', {
                        'customerId':window.gobalCustomerId?window.gobalCustomerId:'',
                        'info1':window.utm_source || "",
                        'info2':window.utm_campaign || "",
                        'info3':window.utm_medium || "",
                        'currentPage':typeof(window.currentPage) == "undefined"?"":window.currentPage,
                        'relatedId':_selectedvariant.id,
                        'money':realPrice.amount,
                        'unit':realPrice.unit,
                        'quantity':quantity
                    });
                }
				
				
				window.dotq = window.dotq || [];
				window.dotq.push({
					'projectId': '10000',
					'properties': {
						'pixelId': '10044597',
						'qstrings': {
							'et': 'custom',
							'ea': 'AddToCart',
							'product_id': _selectedproduct.id
						}
					}
				});

				if(window.GeekoSensors && this.addToCartSensors){
                    let ali_request_id = this.addToCartSensors.ali_request_id
                    let geeko_request_id = this.addToCartSensors.geeko_request_id
                    let geeko_experiment_id = this.addToCartSensors.geeko_experiment_id
                    let ali_experiment_id = this.addToCartSensors.ali_experiment_id
                    let data_source = this.addToCartSensors.data_source;

                    let resourcepage_title = this.addToCartSensors.resourcepage_title;
                    let resource_position = this.addToCartSensors.resource_position;
                    let resource_type = this.addToCartSensors.resource_type;
                    let resource_content = this.addToCartSensors.resource_content;

                    let position = this.addToCartSensors.position;

					window.GeekoSensors.Track('AddToCartDetail', {
						product_id: _selectedproduct.id,
						product_qty: quantity,
						resourcepage_title: resourcepage_title,
						resource_position: resource_position,
						resource_type: resource_type,
						resource_content: resource_content,
						ali_request_id: ali_request_id,
						geeko_request_id: geeko_request_id,
						ali_experiment_id: ali_experiment_id,
						geeko_experiment_id: geeko_experiment_id,
						data_source: data_source,
					})


                    window.GeekoSensors?.Track('Addtocart', {
                        product_id: _selectedproduct.id,
                        product_qty: quantity,
                        is_success:true,
                        size: _selectedvariant?.size,
                        price: _selectedvariant?.salesPriceWithUSD?.amount,
                        product_position: position,
                        ali_request_id: ali_request_id,
                        geeko_request_id: geeko_request_id,
                        geeko_experiment_id: geeko_experiment_id,
                        ali_experiment_id: ali_experiment_id,
                        data_source: data_source,
                        resourcepage_title: resourcepage_title,
                        resource_position: resource_position,
                        resource_type: resource_type,
                        resource_content: resource_content,
                    })
				}
            },
            addToCartOrigin(){
                if(window.isLoged == 'true'){
                    this.addToCart(false)
                } else {

                }
            },
            addToCartPoints(){
                if(window.isLoged == 'true'){
                    this.addToCart(true)
                } else {

                }
                
            }
        }
    }
</script>

<style scoped lang="scss">
    .active{
        color: #e64545;
    }    
    .add-to-cart-modal{
        position: fixed;
        background-color: #fff;
        z-index: 201;
        bottom: 0;
        left: 0;
        width: 100%;
        transition: bottom .4s ease;

        .add-to-cart-container{
            border-top-left-radius: 4px;
            border-top-right-radius: 4px;
            max-height: 80vh;
            overflow-y: auto;

            ._bd{
                margin-bottom: 60px;
                padding-top: 15px;
            }

            .padding-container{
                padding-left: 20px;
                padding-right: 20px;
                padding-block: 20px;
            }

            ._fd{
                padding: 12px 20px;
                box-shadow: 0px 2px 20px 0px rgba(153,153,153,.5);
                margin-top: 30px;
                position: absolute;
                bottom: 0;
                width: 100%;
                z-index: 10;
                background-color: #ffffff;

                & > div{
                    color: #fff;
                    font-family: SlatePro-Medium;
                    font-size: 18px;
                    text-align: center;
                    height: 42px;
                    line-height: 42px;
                    background-color: #121314;
                    border-radius: 2px;
                    cursor: pointer;
                    display: inline-block;
                    width: 100%;
                    text-transform: uppercase;
                }
            }
            .pointsBtnBox{
                display: flex;
                align-items: center;
                justify-content: space-between;

                .pointsBtn{
                    background: transparent;
                    margin-left: 10px;
                    display: flex;
                    justify-content: space-between;

                    &>div{
                        flex: 1;
                        margin-right: 18px;
                        background: #222;
                    }

                    &>div:last-child{
                        margin-right: 0;
                    }
                }
            }
        }
    }
</style>