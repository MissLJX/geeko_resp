<script>
    /*打包鞋子网站和chiquedoll网站时记得隐藏分享功能*/
    let sitename = 'chicme'
    let siteurl = 'https://www.chicme.com'
    if(window.name && window.site){
        sitename = window.name;
        siteurl = window.site;
    }
    export default
    {
        sitename,
        siteurl
    }
</script>