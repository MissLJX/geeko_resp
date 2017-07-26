<template>
    <li class="st-product">
        <div>
            <span class="st-checkbox"></span>
        </div>
        <div>
            <link-image :title="item.productName" :src="item.imageUrl" :href="itemHref"/>
        </div>
        <div>
            <p>{{item.productName}}</p>
            <div>{{sizeColor}}</div>

        </div>
    </li>
</template>

<style type="scss/text" lang="scss">
    .st-product {
        display: table-row;
        & > div {
            display: table-cell;
            &:first-child {
                width: 80px;
            }
        }
    }
</style>

<script type="text/ecmascript-6">
    import LinkImage from '../components/link-image.vue'
    export default{
        props: {
            item: {
                type: Object,
                required: true
            }
        },
        components: {
            'link-image': LinkImage
        },
        computed: {
            itemHref(){
                return this.item.id;
            },
            sizeColor(){
                if (this.item.size && this.item.color) return this.item.size + ', ' + this.item.color
                if (this.item.size) return this.item.size
                return this.item.color || ''
            }
        }
    }
</script>