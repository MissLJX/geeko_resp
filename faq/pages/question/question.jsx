import React, { createRef } from 'react';
import style from './question.module.css';
import {FormattedMessage, injectIntl} from 'react-intl';
// import SearchBar from '../../components/search/search-bar';
import {secondaries, questions} from '../../data'
import { Page } from '../../components/page/page';
import {SearchBar} from '../../components/newComponents/new-components';
import styled from 'styled-components';
import {list} from '../../api';

// let style = {}

const ResultBox = styled.div`
    width: 100%;
    height: 82px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const ResultTitle = styled.div`
    font-family: Roboto-Medium;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #222222;
    margin: 0 auto;
    text-shadow: 0 0 #222;
    margin-bottom: 10px;
`

const ResultNum = styled.div`
    margin: 0 auto;
    font-family: Roboto-Regular;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #666666;
    strong{
        font-weight: 500;
        color: #222;
    }
`

const SearchBarBox = styled.div`
    width: 100%;
    border-top: 1px solid #e6e6e6;
    max-height: 100px;
    /* line-height: 42px; */
    padding-top: 25px;
`

const ResultListBox = styled.div`
    width: 100%;
    margin: 0 auto;
    padding: 20px 4% 20px;
    border-top: 1px solid #e6e6e6;
    margin-top: 10px;
    background-color: #fff;
    img {
        width: 100%;
        margin: 10px 0;
    }
`

const ResultItemBox = styled.div`
    padding-bottom: 20px;
    margin-bottom: 20px;
    border-bottom: 1px solid #e6e6e6;
    max-height: 300px;
    overflow: hidden;
`

const ResultItemTitle = styled.div`
    font-family: Roboto-Bold;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #222222;
    font-weight: 600;
    margin-bottom: 13px;
    span:nth-child(1){
        span {
            margin-right: 15px;
        }
        strong {
            color: #3483f4;
        }
    }
    span:nth-child(2){
        @font-face {
            font-family: 'iconfont';  /* Project id 384296 */
            src: url('//at.alicdn.com/t/font_384296_waimmey03x.woff2?t=1631165132958') format('woff2'),
                url('//at.alicdn.com/t/font_384296_waimmey03x.woff?t=1631165132958') format('woff'),
                url('//at.alicdn.com/t/font_384296_waimmey03x.ttf?t=1631165132958') format('truetype');
        }
        font-family:"iconfont" !important;
        font-size:16px;
        font-style:normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #999;
        margin-left: 15px;
    }
    span:nth-child(3){
        color: #999;
        margin-left: 3px;
    }
`

const ResultItemContent = styled.div`
    // width: 100%;
    // padding: 0 4%;
    // margin-top: 27px;
    // background-color: #fff;
    line-height: 1.5;
`

const NoResult = styled.div`
    width: 92%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-top: 30px;
`
const NoResultImg = styled.div`
    @font-face {
  font-family: 'iconfont';  /* Project id 384296 */
  src: url('//at.alicdn.com/t/font_384296_waimmey03x.woff2?t=1631165132958') format('woff2'),
       url('//at.alicdn.com/t/font_384296_waimmey03x.woff?t=1631165132958') format('woff'),
       url('//at.alicdn.com/t/font_384296_waimmey03x.ttf?t=1631165132958') format('truetype');
}
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 61px;
    color: #999;
`

const RelatedBox = styled.div`
    width: 100%;
    /* margin: 0 auto; */
    border-top: 10px solid #f6f6f6;
    padding: 0 4% 20px;
    font-family: Roboto-Bold;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #222222;
    text-shadow: 0 0 #222;
    background-color: #fff;
`
const RelatedTitle = styled.div`
    line-height: 48px;
    line-height: 48px;
    font-weight: 600;
    text-shadow: none;
`
const RelatedItem = styled.div`
    width: 100%;
    /* border: 1px solid; */
    height: 40px;
    line-height: 40px;
    background: #f6f6f6;
    padding: 0 16px;
    font-family: Roboto-Regular;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #222222;
    text-shadow: none;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 8px;
`

const QuestionDetailBox = styled.div`
    width: 100%;
    padding: 0 4%;
    margin-top: 27px;
    background-color: #fff;
`

const QuestionDetail = styled.div`
    padding-bottom: 32px;
`

const QuestionDetailContent = styled.div`
    line-height: 1.4;
    img{
        width: 100%;
        margin: 10px 0;
    }
`

const QuestionDetailTitle = styled.div`
    font-family: Roboto-Bold;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #222222;
    font-weight: bold;
    margin-bottom: 13px;
`

const QuestionRateBox = styled.div`
    width: 100%;
    max-height: 130px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    border-top: 1px solid #e6e6e6;
`

const QuestionRateTxt = styled.div`
    margin-top: 20px;
    margin-bottom: 16px;
    font-family: Roboto-Regular;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #222222;
`
const QuestionRateIcon = styled.div`
    font-size: 16px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 20px;
`
const Liked = styled.span`
    @font-face {
        font-family: 'iconfont';  /* Project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_waimmey03x.woff2?t=1631165132958') format('woff2'),
            url('//at.alicdn.com/t/font_384296_waimmey03x.woff?t=1631165132958') format('woff'),
            url('//at.alicdn.com/t/font_384296_waimmey03x.ttf?t=1631165132958') format('truetype');
    }
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // color: #57b936;
`
const Unliked = styled.span`{
    @font-face {
        font-family: 'iconfont';  /* Project id 384296 */
        src: url('//at.alicdn.com/t/font_384296_waimmey03x.woff2?t=1631165132958') format('woff2'),
            url('//at.alicdn.com/t/font_384296_waimmey03x.woff?t=1631165132958') format('woff'),
            url('//at.alicdn.com/t/font_384296_waimmey03x.ttf?t=1631165132958') format('truetype');
    }
    font-family:"iconfont" !important;
    font-size:16px;
    font-style:normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    // color: #e64545;
`


const NoResultTxt = styled.div`
    font-family: Roboto-Regular;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #999999;
    line-height: 48px;
    // margin-bottom: 20px;

    span{
        margin-left: 5px;
        text-decoration: underline;
        font-family: Roboto-Regular;
        font-size: 12px;
        font-weight: normal;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #222222;
    }
`

let lastSearchId = 0
class Question1 extends React.PureComponent{
    constructor(props){
        super(props);
        // console.log(props)
        this.state = {
            isSearched: false,
            searchValue: "",
            // resultList: resultList1,
            resultList: [],

            questionDetail:`<div style="color:red;">hdsjkadhladd;asd</div>`,
            likeQuestion: "",
            defaultShow: false, // 页面刚进来时
            searchShow: false, // 搜索显示的内容
            detailShow: true, // 详情展示的内容
            secondaryId:0,
            secondary:{},
            richText:'',
            parent:{},
            stopSearch: false, // 如果是选择下拉框里提示跳转过来的为true
            headerRef: createRef(),
            initTime: 0,
        }
    }

    componentWillMount(){
        this.initPage()
    }

    componentWillUpdate(){
        this.initPage()
        // console.log(this.state.headerRef)
        this.state.headerRef.current.scrollIntoView({
            top: 0,
            behavior:'smooth'
        })
    }


    replaceStr(str){
        // console.log('replace: ',str)
        str = decodeURI(str).split("\"");
        for(let i in str){
            if(str[i] != ''){
                return str[i]
            }
        }
    }

    initPage(){
        // console.log(this.state)
        let search = this.props.history.location.state ? this.props.history.location.state.search : 
                     this.props.location.search ? this.props.location.search : 0;
        let id = this.props.history.location.state ? this.props.history.location.state.id : 
                this.props.match.params.id ? this.props.match.params.id : 0;
        let fromFAQ = this.props.history.location.state.fromFAQ;
        // console.log('s:',search, 'd:', id)
        // console.log(lastSearchId !== id)
        // console.log(fromFAQ)
        // console.log(this.state.initTime==0)
        if(lastSearchId !== id || (fromFAQ&&this.state.initTime==0)){
            // console.log('in')
            this.setState({
                initTime:1
            })
            // return
            lastSearchId = id;
            this.changeShow(search ,id)
        }
    }

    changeShow(search, id){
        let type = search && id ? 0:
                   search ? 1: 
                   id ? 2: ''
        switch(type){
            case 0:
                this.show1(search, id)
                return;
            case 1:
                this.show2(search)
                return;
            case 2:
                this.show3(id)
                return;
            default:
                // console.log('default')
                return;
        }
    }

    show1(search,id){
        // console.log(1)
        this.setState({
            detailShow:true,
            searchShow:false,
            secondaryId: id,
            secondary: secondaries.find(q => q.id === id),
            richText:  secondaries.find(q => q.id === id).richText,
            parent: questions.find(q => q.id ===  secondaries.find(q => q.id === id).parentId),
            searchValue: search,
            stopSearch: true
        })
    }

    show2(search){
        // console.log(2)
        this.setState({
            detailShow: false,
            searchShow: true,
            searchValue: search,
            stopSearch: false,
            // parent: questions.find(q => q.id === secondary.parentId)
        })
    }

    show3(id){
        // console.log(3)
        this.setState({
            detailShow:true,
            searchShow:false,
            secondaryId: id,
            secondary: secondaries.find(q => q.id === id),
            richText:  secondaries.find(q => q.id === id).richText,
            parent: questions.find(q => q.id ===  secondaries.find(q => q.id === id).parentId),
            stopSearch: false,
            searchValue: ''
        })
    }

    render(){
        const {intl, history} = this.props;
        const { 
                dropDownList, 
                isSearched, 
                searchValue, 
                resultList, 
                likeQuestion,
                questionDetail,
                defaultShow,
                detailShow,
                searchShow,
                secondary,
                secondaryId,
                richText,
                parent,
                stopSearch,
                headerRef
            } = this.state;

        const search = (e) => {
            let searchAbout = []
            // console.log('start:',e)
            let reg = new RegExp(e, 'ig')
            if(e){
                questions.forEach((q) => {
                    let s = q.questions.filter((qq)=>{
                        return reg.test(qq.title);
                    })
                    searchAbout = searchAbout.concat(s)
                })
                // console.log(searchAbout)

                // 搜索请求
                this.setState({
                    defaultShow: false,
                    searchShow: true,
                    detailShow:false,
                    searchValue: e,
                    resultList: searchAbout
                })
            }else {
                // console.log('no e')
            }
        }

        const showDetail = (e) => {
            lastSearchId = 0
            this.setState({
                searchValue: 0
            },()=>{
                history.push({pathname:`${(window.ctx || '')}/support/question`,state:{id:e.id}})
            })
            
        }

        // 去掉头部 将链接改成相对链接
        const removeHeader = (text) => {
            let before = text.split("<header>")[0];
            let after = text.split("</header>")[1];
            let noHeader = before + after;
            if(window.isShowApp == "true"){
                // 1. <a href="https://www.chicme.com/... 替换成 <a href="/...或者 <a href="wanna/...
                noHeader = noHeader.replace(/(<a href="https:\/\/www.chicme.com)/g, ()=>{return `<a href="chic-me://chic.me/web?href=https://${window.location.host? window.location.host: 'www.chicme.com'}`});
            } else {
                // 1. <a href="https://www.chicme.com/... 替换成 <a href="/...或者 <a href="wanna/...
                noHeader = noHeader.replace(/(<a href="https:\/\/www.chicme.com)/g, ()=>{return `<a href="${(window.ctx || '')}`});
            }
            // 2. >https://www.chicme.com/fs/shipping-policy-pc 替换成 shipping-policy
            noHeader = noHeader.replace(/(>https:\/\/www.chicme.com\/fs\/shipping-policy-pc)/g, ()=>{return '>shipping-policy'});
            // 3. >https://www.chicme.com/fs/shipping-policy-pc 替换成 shipping-policy
            noHeader = noHeader.replace(/(>https:\/\/www.chicme.com\/fs\/wholesale-program-pc)/, ()=>{return '>wholesale-program'});
            // 4. chicme、Chicme、chic me、Chic me 替换为 window.floderName
            noHeader = noHeader.replace(/(chicme|Chicme|Chic me|chic me|Chic Me|chic Me|ChicMe|chicMe)/g, ()=>{return window.floderName? window.floderName: 'Chicme'})
            
            // console.log(noHeader)
            
            return noHeader;
        }

        const clickItem = (e) => {
            // console.log(e)
            this.setState({
                searchValue: 0
            },()=>{
                history.push({pathname:`${(window.ctx || '')}/support/question`,state:{id:e.id}})
            })
            
        }

        const highLightSearch = (title) => {
            let reg = new RegExp(''+this.state.searchValue+'', "ig");
            return title.replace(reg, (e)=>{return '<strong>'+e+"</strong>"})
        }

        const toContact = () => {
            document.documentElement.scrollTop = document.body.scrollTop = 0
            list(0,20).then(({result: items}) => {
                lastSearchId = 1;
                this.props.history.push({pathname: `${(window.ctx || '')}/support/contact-us`})
            }).catch((err)=>{
                // console.log(err)
                if(err.code == 300){
                    if(window.isShowApp=="true"){
                        window.location.href = "chic-me://chic.me/loginRoot"
                    } else {
                        window.location.href = `${(window.ctx || '')}/i/login?redirectUrl=${(window.ctx || '')}/support/contact-us`
                    }
                }
            })
        }
        
        return (
            <div className={style.faqPage}>
                <Page label={intl.formatMessage({id: 'faq'})} >
                    <div ref={headerRef}></div>
                    {/* 搜索框 */}
                    <SearchBarBox >
                        <SearchBar search={(e)=>search(e)} value={searchValue} stopSearch={stopSearch}></SearchBar>
                    </SearchBarBox>                    

                    
                    {/* 搜素结果 */}
                    {
                        searchShow &&
                        <ResultBox>
                            <ResultTitle>{intl.formatMessage({id:'search'})}</ResultTitle>
                            <ResultNum>{resultList.length}&nbsp;<span dangerouslySetInnerHTML={{__html:intl.formatMessage({id:"resultFor"}, {result:searchValue})}}></span></ResultNum>
                        </ResultBox>
                    }
                    
                    {/* 结果列表 */}
                    {
                        searchShow &&
                        <ResultListBox>
                            {
                                resultList.map((item, index) => {
                                    return <ResultItemBox onClick={()=> showDetail(item)} key={index}>
                                            <ResultItemTitle>
                                                <span dangerouslySetInnerHTML={{__html:highLightSearch(item.title)}}>
                                                    
                                                </span>
                                                {/* <span style={{fontWeight:'500'}}>&#xe7af;</span>
                                                <span>{item.likes ? item.likes : 0}</span> */}
                                            </ResultItemTitle>
                                            <ResultItemContent dangerouslySetInnerHTML={{__html: removeHeader(item.richText)}}>

                                            </ResultItemContent>
                                    </ResultItemBox>
                                })
                            }
                        </ResultListBox>
                    }
                    

                    {/* 暂无资料 */}
                    {
                        searchShow && resultList.length == 0 && 
                        <NoResult>
                            <NoResultImg>
                                <span>&#xe7c6;</span>
                            </NoResultImg>
                            <NoResultTxt>
                                {intl.formatMessage({id:"question"})}
                                <span onClick={()=>toContact()}>{intl.formatMessage({id: 'contact'})}</span>
                            </NoResultTxt>
                        </NoResult>
                    }

                    {/* 问题详情 */}
                    {
                        detailShow && 
                        <QuestionDetailBox>
                            <QuestionDetail>
                                <QuestionDetailTitle>{secondary.title}</QuestionDetailTitle>
                                <QuestionDetailContent dangerouslySetInnerHTML={{__html:removeHeader(richText)}}></QuestionDetailContent>
                            </QuestionDetail>
                            <QuestionRateBox>
                                {/* <QuestionRateTxt>{intl.formatMessage({id:"articleHelpful"})}</QuestionRateTxt> */}
                                {/* <QuestionRateIcon>
                                    <Liked style={{color:likeQuestion==1?'#57b936':''}} onClick={()=>this.setState({likeQuestion: 1})}>&#xe7af;</Liked>
                                    <Unliked style={{color:likeQuestion==2?'#e64545':'', transform: 'rotate(180deg)'}} onClick={()=>this.setState({likeQuestion: 2})}>&#xe7af;</Unliked>
                                </QuestionRateIcon> */}
                                <NoResultTxt>
                                    {intl.formatMessage({id:"question"})}
                                    <span onClick={()=>toContact()}>{intl.formatMessage({id: 'contact'})}</span>
                                </NoResultTxt>
                            </QuestionRateBox>
                        </QuestionDetailBox>
                    }

                    {/* 相似推荐 */}
                    {
                        detailShow &&
                        <RelatedBox>
                            <RelatedTitle>{intl.formatMessage({id:"related"})}</RelatedTitle>
                            {
                                JSON.stringify(parent)!="{}" && parent.questions.map((item,index)=>{
                                    if(item.title != secondary.title){
                                        return <RelatedItem key={index} onClick={()=>clickItem(item)}>
                                            {item.title}
                                        </RelatedItem>
                                    }
                                })
                            }
                            
                        </RelatedBox>
                    }
                </Page>
            </div>
        )
    }
}

export default injectIntl(Question1)