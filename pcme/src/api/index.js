import axios from './apiconfigs'
import { VPATH } from '../../../geeko/src/utils/geekoutils';

export const get = () =>  axios.get(VPATH + '/customer/get')
