import * as utils from "./utils/geekoutils.js"
const data = {};

data.sitename = window.name ? window.name : "chicme";
data.siteurl = window.site ? window.site : "https://www.chicme.com";

data.getUrl = function(url){
    return utils.PROJECT + url;
}

export default data;