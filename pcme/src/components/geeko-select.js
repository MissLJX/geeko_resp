/**
 * Created by shao_ on 2017/6/26.
 */
export default{
    props: [
        'items'
    ],
    methods: {
        changeHandler: function(evt){
            this.$emit('change' , evt);
        }

    },
    render: function (h) {
        return h('select', {
            class: {
                'st-select': true
            },
            on: {
                change: this.changeHandler
            }
        }, this.items.map(function (item) {

            return h('option', {
                attrs: {
                    value: item.value,
                    selected: item.selected
                }

            }, item.label);
        }));
    }
}