import React from 'react';
import style from './FAQ.module.css';
import {FormattedMessage, injectIntl} from 'react-intl';
// import SearchBar from '../../components/search/search-bar';
// import DropDownItem from '../../components/drop-down-item/drop-down-item';
import {secondaries, questions} from '../../data'
import { Page } from '../../components/page/page';
import {SearchBar, DropDownItem} from '../../components/newComponents/new-components';


class FAQ extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            dropDownList: [
                {
                    iconImg: `&#xe6ee;`,
                    rootId: 'root-2',
                    title: this.props.intl.formatMessage({id:"orderProcessing"}),
                    open: false,
                    questionList:[]
                },
                {
                    iconImg: `&#xe6f1;`,
                    rootId: 'root-5',
                    title: this.props.intl.formatMessage({id:"tracking"}),
                    open: false,
                    questionList:[]
                },
                {
                    iconImg: `&#xe6ed;`,
                    rootId: 'root-6',
                    title: this.props.intl.formatMessage({id:"return"}),
                    open: false,
                    questionList:[]
                },
                {
                    iconImg: `&#xe6ec;`,
                    rootId: 'root-4',
                    title: this.props.intl.formatMessage({id:"product"}),
                    open: false,
                    questionList:[]
                },
                {
                    iconImg: `&#xe6ef;`,
                    rootId: 'root-3',
                    title: this.props.intl.formatMessage({id:"payment"}),
                    open: false,
                    questionList:[]
                },
                {
                    iconImg: `&#xe6f2;`,
                    rootId: 'root-1',
                    title: this.props.intl.formatMessage({id:"account"}),
                    open: false,
                    questionList:[]
                },
            ],
            isSearched: false,
            searchValue: "",
            // resultList: resultList1,
            resultList: [],

            questionDetail:`<div style="color:red;">hdsjkadhladd;asd</div>`,
            likeQuestion: "",
            defaultShow: true, // 页面刚进来时
            searchShow: false, // 搜索显示的内容
            detailShow: false, // 详情展示的内容
        }
    }

    componentWillMount(){
        console.log(this.props.location.params)
        let list = JSON.parse(JSON.stringify(this.state.dropDownList))
        if(this.props.location.params){
            for(let i =0 ;i < list.length; i++){
                if(list[i]['title'] == this.props.location.params.title){
                    list[i]['open'] = true;
                }
            }
        }
        console.log(questions)
        for(let i = 0; i < questions.length; i++){
            for(let j = 0; j < list.length; j++){
                if(questions[i]['id'] == list[j]['rootId']){
                    list[j]['questionList'] = questions[i]['questions']
                }
            }
        }
        this.setState({
            dropDownList: list
        })
    }

    componentDidMount(){
        document.body.scrollIntoView({
            top: 100,
            behavior: 'smooth'
        })
    }

    render(){
        const {intl} = this.props;
        const {dropDownList, isSearched, searchValue, resultList, likeQuestion,questionDetail,defaultShow, detailShow, searchShow} = this.state;

        const search = (e) => {
            console.log(e)
            if(e){
                // window.location.href = '/supportnew/question1?search='+e;
                this.props.history.push({pathname: '/supportnew/question1', state:{search: e}})
                // 搜索请求
                this.setState({
                    searchValue: e,
                    resultList: searchAbout
                })
            }
        }

        const filter = (e, key) => {
            if(e == searchValue){
                return <strong key={key}>{e}</strong>
            } else {
                return <span key={key}>{e}</span>
            }
        }

        const showDetail = () => {
            // document.body.scrollIntoView({
            //     top:0,
            //     behavior:'smooth'
            // })
            // this.setState({
            //     searchShow: false,
            //     detailShow: true
            // })
        }

        const clickItem = (e) => {
            console.log(e);
            // window.location.href = "/supportnew/question1/"+e.id+"?search="+e.title;
            this.props.history.push({pathname: '/supportnew/question1', state:{id:e.id,search: e.title}})
        }

        return (
            <div className={style.faqPage}>
                <Page label={intl.formatMessage({id: 'faq'})} href="/supportnew">
                    {/* 搜索框 */}
                    <div className={style.searchBar}>
                        {
                            defaultShow &&
                            <div className={style.howTxt}>{intl.formatMessage({id:"helpyou"})}</div>
                        }
                        <SearchBar search={(e)=>search(e)}></SearchBar>
                    </div>

                    {/* 问题分类下拉列表 */}
                    {
                        defaultShow && 
                        <div className={style.dropDownList}>
                            {
                                dropDownList.map((item, index) => {
                                    return <DropDownItem 
                                                iconImg={item.iconImg} 
                                                title={item.title} 
                                                questionList={item.questionList} 
                                                open={item.open} 
                                                clickItem={(e)=>clickItem(e)}
                                                key={index}>
                                           </DropDownItem>
                                })
                            }
                        </div>
                    }
                    

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
                                    return <div className={style.resultItemBox} onClick={()=> showDetail()} key={index}>
                                            <div className={style.resultItemTitle}>
                                                <span className={style.resultTitleTxt}>
                                                    {
                                                        item.title.split(" ").map((item, index) => {
                                                            return filter(item, index)
                                                        })
                                                    }

                                                </span>
                                                <span className={`${style.iconfont} ${style.resultlike}`}>&#xe7af;</span>
                                                <span className={style.likes}>{item.likes}</span>
                                            </div>
                                            <div className={style.resultItemContent} dangerouslySetInnerHTML={{__html: item.content}}>

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
                                <span onClick={()=>this.props.history.push({pathname: '/contact-us'})}>{intl.formatMessage({id: 'contact'})}</span>
                            </div>
                        </div>
                    }

                    {/* 问题详情 */}
                    {
                        detailShow && 
                        <div className={style.questionDetailBox}>
                            <div className={style.questionDetail} >
                                <div className={style.questionDetailTitle}>How can I change or modify my order? How can I place an order？</div>
                                <div className={style.questionDetailContent} dangerouslySetInnerHTML={{__html:questionDetail}}></div>
                            </div>
                            <div className={style.questionRateBox}>
                                <div className={style.questionRateTxt}>{intl.formatMessage({id:"articleHelpful"})}</div>
                                <div className={style.questionRateIcon}>
                                    <span className={`${style.iconfont} ${style.like} ${likeQuestion==1?style.liked:""}`} onClick={()=>this.setState({likeQuestion: 1})}>&#xe7af;</span>
                                    <span className={`${style.iconfont} ${style.unlike} ${likeQuestion==2?style.unliked:""}`} onClick={()=>this.setState({likeQuestion: 2})}>&#xe7af;</span>
                                </div>
                                <div className={style.noResultTxt}>
                                    {intl.formatMessage({id:"question"})}
                                    <span onClick={()=>window.location.href = "contact-us"}>{intl.formatMessage({id: 'contact'})}</span>
                                </div>
                            </div>
                        </div>
                    }

                    {/* 相似推荐 */}
                    {
                        detailShow &&
                        <div className={style.relatedBox}>
                            <div className={style.relatedTitle}>{intl.formatMessage({id:"related"})}</div>
                            <div className={style.relatedItem}>
                                How can I change or modify my order?
                            </div>
                        </div>
                    }
                </Page>

            </div>
        )
    }
}

export default injectIntl(FAQ)