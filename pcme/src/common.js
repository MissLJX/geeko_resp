import { PROJECT } from "./utils/geekoutil.js"

const data = {};

data.sitename = window.name ? window.name : "chicme";
data.siteurl = window.site ? window.site : "https://www.chicme.com";

data.getUrl = function(url){
    return PROJECT + url;
}

export default data;