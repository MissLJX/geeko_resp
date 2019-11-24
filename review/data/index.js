import axios from "../src/api/apiconfigs";
import _ from 'lodash'//数组操作

let result = '';
axios.get('/comment/878dba58-5c56-48f4-a6bf-77eb271c14b6/get').then(function (response) {
    if(response && response.result){
        result =  response.result;
        return result
        console.log(result)
        console.log("===")
    }
})
