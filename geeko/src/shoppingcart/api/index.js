/**
 * Created by shao_ on 2017/7/14.
 */
import axios from '../../api/apiconfigs'
import {version} from '../../api/http_infos'
export const get = () => {
    return axios.get(version + '/shopping-cart/select-all', {
            select: true
        }
    ).then(data => data.result)
}
