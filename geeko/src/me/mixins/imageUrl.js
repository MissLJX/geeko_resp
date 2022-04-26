/**
 * Created by shao_ on 2017/9/20.
 */

import {IMAGE_PREFIX} from '../../utils/geekoutils'

export default {
    computed:{
        imageUrl(){
            // console.log(this.model.image)
            if(this.model.image && this.model.image.indexOf('http') >= 0){
                return this.model.image
            }
            return IMAGE_PREFIX + this.model.image
        }
    }
}