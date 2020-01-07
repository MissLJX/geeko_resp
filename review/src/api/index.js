import axios from './apiconfigs'
import * as http_infos from "../../../pcme/src/api/http_infos";
let url = 'https://shopify.geeko.online/'
export const loadComment = (id,server) =>  axios.get( 'https://shopify.geeko.online/comment/'+id+'/'+server+'/get-product-comment')
export const sendComment = (comment,authorization) => {
    return axios.post('https://shopify.geeko.online/comment/add', comment, {'Content-Type': http_infos.upload_image_content_type,'authorization':authorization}).then(data => data.result)
}



