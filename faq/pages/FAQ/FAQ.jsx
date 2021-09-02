import React from 'react';
import style from './FAQ.module.css';
import {FormattedMessage, injectIntl} from 'react-intl';
import PageContanier1 from '../../components/page-contanier/page-contanier';
import PageHeader1 from '../../components/page-header/page-header';
import SearchBar from '../../components/search-bar/search-bar';
import DropDownItem from '../../components/drop-down-item/drop-down-item';
import {secondaries, questions} from '../../data'

let resultList1 = [{
    title: "How can I change or modify my order?",
    likes: "134",
    content: `<div>Shipping address or items can be modified by contacting customer service before being shipped out.</div>`,
}]

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
            // questions.forEach((q) => {
            //     let s = q.questions.filter((qq)=>{
            //         return qq.title.indexOf(e) != -1;
            //     })
            //     searchAbout = searchAbout.concat(s)
            // })
            // console.log(searchAbout)
            
            if(e){
                window.location.href = '/supportnew/question1?search='+e;
                // 搜索请求
                this.setState({
                    // defaultShow: false,
                    // searchShow: true,
                    // detailShow:false,
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

        const removeHeader = (text) => {
            let before = text.split("<header>")[0];
            let after = text.split("</header>")[1];
            return before + after;
        }

        const clickItem = (e) => {
            console.log(e);
            window.location.href = "/supportnew/question1/"+e.id+"?search="+e.title;
        }

        const highLightSearch = (title) => {
            console.log(title)
            let reg = new RegExp(''+this.state.searchValue+'', "g");
            console.log(reg.test(title))

            return title.replace(reg, (e)=>{return '<strong>'+e+"</strong>"})
        }

        return (
            <div className={style.faqPage}>
                <PageHeader1 label={intl.formatMessage({id: 'faq'})} href="/supportnew"/>
                <PageContanier1>
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
                                <span onClick={()=>window.location.href = "contact-us"}>{intl.formatMessage({id: 'contact'})}</span>
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
                                        

                </PageContanier1>
            </div>
        )
    }
}

export default injectIntl(FAQ)