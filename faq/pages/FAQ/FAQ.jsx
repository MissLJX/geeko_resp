import React from 'react';
import style from './FAQ.module.css';
import {FormattedMessage, injectIntl} from 'react-intl';
import PageContanier1 from '../../components/page-contanier/page-contanier';
import PageHeader1 from '../../components/page-header/page-header';
import SearchBar from '../../components/search-bar/search-bar';
import DropDownItem from '../../components/drop-down-item/drop-down-item';

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
                    title: "Order Processing",
                    open: false,
                    questionList:[
                        "How can I change or modify my order?",
                        "How can I modify my shipping address?",
                        "Can I cancel my order?"
                    ]
                },
                {
                    iconImg: `&#xe6f1;`,
                    title: "Logistics Tracking",
                    open: false,
                    questionList:[
                        "How can I change or modify my order?",
                        "How can I modify my shipping address?",
                        "Can I cancel my order?"
                    ]
                },
                {
                    iconImg: `&#xe6ed;`,
                    title: "Return & Refund",
                    open: false,
                    questionList:[
                        "How can I change or modify my order?",
                        "How can I modify my shipping address?",
                        "Can I cancel my order?"
                    ]
                },
                {
                    iconImg: `&#xe6ec;`,
                    title: "Product & Stock",
                    open: false,
                    questionList:[
                        "How can I change or modify my order?",
                        "How can I modify my shipping address?",
                        "Can I cancel my order?"
                    ]
                },
                {
                    iconImg: `&#xe6ef;`,
                    title: "Payment & Promos",
                    open: false,
                    questionList:[
                        "How can I change or modify my order?",
                        "How can I modify my shipping address?",
                        "Can I cancel my order?"
                    ]
                },
                {
                    iconImg: `&#xe6f2;`,
                    title: "Account Issues",
                    open: false,
                    questionList:[
                        "How can I change or modify my order?",
                        "How can I modify my shipping address?",
                        "Can I cancel my order?"
                    ]
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
        if(this.props.location.params){
            let list = JSON.parse(JSON.stringify(this.state.dropDownList))
            for(let i =0 ;i < list.length; i++){
                if(list[i]['title'] == this.props.location.params.title){
                    list[i]['open'] = true;
                }
            }
            this.setState({
                dropDownList: list
            })
        }
        
    }

    render(){
        const {intl} = this.props;
        const {dropDownList, isSearched, searchValue, resultList, likeQuestion,questionDetail,defaultShow, detailShow, searchShow} = this.state;

        const search = (e) => {
            console.log(e)
            if(e){
                // 搜索请求
                this.setState({
                    defaultShow: false,
                    searchShow: true,
                    searchValue: e
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
            this.setState({
                searchShow: false,
                detailShow: true
            })
        }

        const clickItem = (e) => {
            console.log(e);
        }

        return (
            <div className={style.faqPage}>
                <PageHeader1 label={intl.formatMessage({id: 'FAQ'})} href="/supportnew"/>
                <PageContanier1>
                    {/* 搜索框 */}
                    <div className={style.searchBar}>
                        {
                            defaultShow &&
                            <div className={style.howTxt}>How Can I Help You?</div>
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
                            <div className={style.resultTitle}>Search Results</div>
                            <div className={style.resultNum}>{resultList.length} results for "<strong>{searchValue}</strong>"</div>
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
                            <div className={style.noResultImg}></div>
                            <div className={style.noResultTxt}>
                                Have more questions?
                                <span onClick={()=>window.location.href = "contact-us"}>Contact Us</span>
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
                                <div className={style.questionRateTxt}>Was this article helpful?</div>
                                <div className={style.questionRateIcon}>
                                    <span className={`${style.iconfont} ${style.like} ${likeQuestion==1?style.liked:""}`} onClick={()=>this.setState({likeQuestion: 1})}>&#xe7af;</span>
                                    <span className={`${style.iconfont} ${style.unlike} ${likeQuestion==2?style.unliked:""}`} onClick={()=>this.setState({likeQuestion: 2})}>&#xe7af;</span>
                                </div>
                                <div className={style.noResultTxt}>
                                    Have more questions?
                                    <span onClick={()=>window.location.href = "contact-us"}>Contact Us</span>
                                </div>
                            </div>
                        </div>
                    }

                    {/* 相似推荐 */}
                    {
                        detailShow &&
                        <div className={style.relatedBox}>
                            <div className={style.relatedTitle}>Related Articles</div>
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