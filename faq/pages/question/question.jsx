import React, { createRef } from 'react';
import style from './question.module.css';
import {FormattedMessage, injectIntl} from 'react-intl';
// import SearchBar from '../../components/search/search-bar';
import {secondaries, questions} from '../../data'
import { Page } from '../../components/page/page';
import {SearchBar} from '../../components/newComponents/new-components';

let lastSearchId = 0
class Question1 extends React.PureComponent{
    constructor(props){
        super(props);
        console.log(props)
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
            headerRef: createRef()
        }
    }

    componentWillMount(){
        this.initPage()
    }

    componentWillUpdate(){
        this.initPage()
        this.state.headerRef.current.scrollIntoView({
            top: 0,
            behavior:'smooth'
        })
    }

    replaceStr(str){
        str = decodeURI(str).split("\"");
        for(let i in str){
            if(str[i] != ''){
                return str[i]
            }
        }
    }

    initPage(){
        console.log(this.state)
        let search = this.props.history.location.state ? this.props.history.location.state.search : 
                     this.props.location.search ? this.props.location.search : 0;
        let id = this.props.history.location.state ? this.props.history.location.state.id : 
                this.props.match.params.id ? this.props.match.params.id : 0;
        if(lastSearchId !== id){
            // return
            lastSearchId = id;
            this.changeShow(search,id)
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
                return;
        }
    }

    show1(search,id){
        this.setState({
            detailShow:true,
            searchShow:false,
            secondaryId: id,
            secondary: secondaries.find(q => q.id === id),
            richText:  secondaries.find(q => q.id === id).richText,
            parent: questions.find(q => q.id ===  secondaries.find(q => q.id === id).parentId),
            searchValue: this.replaceStr(search),
            stopSearch: true
        })
    }

    show2(search){
        this.setState({
            detailShow: false,
            searchShow: true,
            searchValue: this.replaceStr(search),
            stopSearch:false,
            // parent: questions.find(q => q.id === secondary.parentId)
        })
    }

    show3(id){
        this.setState({
            detailShow:true,
            searchShow:false,
            secondaryId: id,
            secondary: secondaries.find(q => q.id === id),
            richText:  secondaries.find(q => q.id === id).richText,
            parent: questions.find(q => q.id ===  secondaries.find(q => q.id === id).parentId),
            stopSearch: false
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
            console.log(e)
            if(e){
                questions.forEach((q) => {
                    let s = q.questions.filter((qq)=>{
                        return qq.title.indexOf(e) != -1;
                    })
                    searchAbout = searchAbout.concat(s)
                })
                console.log(searchAbout)
                // 搜索请求
                this.setState({
                    defaultShow: false,
                    searchShow: true,
                    detailShow:false,
                    searchValue: e,
                    resultList: searchAbout
                })
            }
        }

        const showDetail = (e) => {
            lastSearchId = 0
            history.push({pathname:"/supportnew/question1",state:{id:e.id,search:e.title}})
        }

        const removeHeader = (text) => {
            let before = text.split("<header>")[0];
            let after = text.split("</header>")[1];
            return before + after;
        }

        const clickItem = (e) => {
            console.log(e)
            this.setState({
                searchValue: e.title
            })
            history.push({pathname:"/supportnew/question1",state:{id:e.id,search:e.title}})
        }

        const highLightSearch = (title) => {
            let reg = new RegExp(''+this.state.searchValue+'', "g");
            return title.replace(reg, (e)=>{return '<strong>'+e+"</strong>"})
        }

        return (
            <div className={style.faqPage}>
                <Page label={intl.formatMessage({id: 'faq'})} >
                    {/* 搜索框 */}
                    <div className={style.searchBar} ref={headerRef}>
                        <SearchBar search={(e)=>search(e)} value={searchValue} stopSearch={stopSearch}></SearchBar>
                    </div>                    

                    {/* 搜素结果 */}
                    {
                        searchShow &&
                        <div className={style.resultBox}>
                            <div className={style.resultTitle}>{intl.formatMessage({id:'search'})}</div>
                            <div className={style.resultNum}>{resultList.length}&nbsp;<span dangerouslySetInnerHTML={{__html:intl.formatMessage({id:"resultFor"}, {result:searchValue})}}></span></div>
                        </div>
                    }
                    
                    {/* 结果列表 */}
                    {
                        searchShow &&
                        <div className={style.resultListBox}>
                            {
                                resultList.map((item, index) => {
                                    return <div className={style.resultItemBox} onClick={()=> showDetail(item)} key={index}>
                                            <div className={style.resultItemTitle}>
                                                <span className={style.resultTitleTxt} dangerouslySetInnerHTML={{__html:highLightSearch(item.title)}}>
                                                    
                                                </span>
                                                <span className={`${style.iconfont} ${style.resultlike}`}>&#xe7af;</span>
                                                <span className={style.likes}>{item.likes}</span>
                                            </div>
                                            <div className={style.resultItemContent} dangerouslySetInnerHTML={{__html: removeHeader(item.richText)}}>

                                            </div>
                                    </div>
                                })
                            }
                        </div>
                    }
                    

                    {/* 暂无资料 */}
                    {
                        searchShow && resultList.length == 0 && 
                        <div className={style.noResult}>
                            <div className={style.noResultImg}>
                                <span className={`${style.iconfont} ${style.noResultIcon}`}>&#xe7c6;</span>
                            </div>
                            <div className={style.noResultTxt}>
                                {intl.formatMessage({id:"question"})}
                                <span onClick={()=>this.props.history.push({pathname: "contact-us"})}>{intl.formatMessage({id: 'contact'})}</span>
                            </div>
                        </div>
                    }

                    {/* 问题详情 */}
                    {
                        detailShow && 
                        <div className={style.questionDetailBox}>
                            <div className={style.questionDetail} >
                                <div className={style.questionDetailTitle}>{secondary.title}</div>
                                <div className={style.questionDetailContent} dangerouslySetInnerHTML={{__html:removeHeader(richText)}}></div>
                            </div>
                            <div className={style.questionRateBox}>
                                {/* <div className={style.questionRateTxt}>{intl.formatMessage({id:"articleHelpful"})}</div>
                                <div className={style.questionRateIcon}>
                                    <span className={`${style.iconfont} ${style.like} ${likeQuestion==1?style.liked:""}`} onClick={()=>this.setState({likeQuestion: 1})}>&#xe7af;</span>
                                    <span className={`${style.iconfont} ${style.unlike} ${likeQuestion==2?style.unliked:""}`} onClick={()=>this.setState({likeQuestion: 2})}>&#xe7af;</span>
                                </div> */}
                                <div className={style.noResultTxt}>
                                    {intl.formatMessage({id:"question"})}
                                    <span onClick={()=>window.location.href = "/supportnew/contact-us"}>{intl.formatMessage({id: 'contact'})}</span>
                                </div>
                            </div>
                        </div>
                    }

                    {/* 相似推荐 */}
                    {
                        detailShow &&
                        <div className={style.relatedBox}>
                            <div className={style.relatedTitle}>{intl.formatMessage({id:"related"})}</div>
                            {
                                parent.questions.map((item,index)=>{
                                    if(item.title != secondary.title){
                                        return <div className={style.relatedItem} key={index} onClick={()=>clickItem(item)}>
                                            {item.title}
                                        </div>
                                    }
                                })
                            }
                            
                        </div>
                    }
                </Page>
            </div>
        )
    }
}

export default injectIntl(Question1)