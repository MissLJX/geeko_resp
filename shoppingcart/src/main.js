/**
 * Created by shao_ on 2017/7/11.
 */
import axios from 'axios'


var instance = axios.create({
    baseURL: 'http://192.168.1.62:5000/',
    timeout: 1000
});

instance.get('/print?url=LM498056095CN&shippingType=cne&labelType=pdf').then(rep => {console.log(rep)})