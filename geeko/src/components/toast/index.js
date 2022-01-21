import Vue from "vue"
import tipTemp from './index.vue'

export default function tip(props) {
    const vm = new Vue({
        render(h) { //虚拟dom
            return h(tipTemp, { props }); //Component是要挂载的组件,props是要挂载组件的props属性
        }
    }).$mount();
    document.body.appendChild(vm.$el); //vm.$el是虚拟dom（vm）对应的真实dom,也可以用vm.$root替代vm.$el
    const comp = vm.$children[0]; //用与挂载全局的alert提示，comp就相当于alert组件。
    comp.remove = () => { //当执行remove()方法时，即从body上移除掉挂载的真实dom，并销毁虚拟dom
        document.body.removeChild(vm.$el);
        vm.$destroy(); //销毁虚拟dom
    }
    return comp
}
