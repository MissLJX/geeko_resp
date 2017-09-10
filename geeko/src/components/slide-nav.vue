<template>
    <div>
        <div class="el-slide-nav-container">
            <ul class="el-slide-nav" ref="navdom" :style="{width:'100%'}">
                <li v-for="nav in navs" :class="{'active':nav.active}" @click="navHandle(event, nav.id)">
                    <router-link replace  :to="{name:nav.path}">{{nav.name}}</router-link>
                </li>
            </ul>
        </div>

        <transition :name="transitionName">
            <router-view class="child-view"></router-view>
        </transition>
    </div>
</template>

<style scoped lang="scss">

    .el-slide-nav-container {
        overflow: hidden;
        background-color: #fff;
    }

    .el-slide-nav {
        & > li {
            float: left;
            a {
                display: block;
                text-decoration: none;
                color: #222928;
                height: 40px;
                line-height: 40px;
            }
            padding: 0 15px;
            &.active a {
                border-bottom: 2px solid #e5004f;
            }
        }
        &::after {
            content: '';
            display: block;
            clear: both;
        }
    }

    .child-view {
        position: absolute;
        transition: all .5s cubic-bezier(.4, 0, .1, 1);
        width: 100%;
    }

    .slide-left-enter, .slide-right-leave-active {
        opacity: 0;
        -webkit-transform: translate(30px, 0);
        transform: translate(30px, 0);
    }

    .slide-left-leave-active, .slide-right-enter {
        opacity: 0;
        -webkit-transform: translate(-30px, 0);
        transform: translate(-30px, 0);
    }
</style>

<script type="text/ecmascript-6">
    export default{
        data(){
            return {
                total: 0,
                transitionName: 'slide-left'
            }
        },
        props: {
            navs: Array
        },
        methods: {
            navHandle(evt, id){
                this.$emit('navchange', id)
            }
        },
        mounted(){
            _.each(this.$refs.navdom.children, (li) => {
                this.total += li.offsetWidth
            })
        },
        watch: {
            '$route' (to, from) {
                const toDepth = to.meta.depth
                const fromDepth = from.meta.depth
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        }
    }
</script>