import React from 'react';
import style from './FAQ.module.css';
import {FormattedMessage, injectIntl} from 'react-intl';
// import SearchBar from '../../components/search/search-bar';
// import DropDownItem from '../../components/drop-down-item/drop-down-item';
import {secondaries, questions} from '../../data'
import { Page } from '../../components/page/page';
import {SearchBar, DropDownItem} from '../../components/newComponents/new-components';
import styled from 'styled-components';


const FaqPage = styled.div`
    background-color: #fff;
`

const SearchBarBox = styled.div`
    width: 100%;
    border-top: 1px solid #e6e6e6;
    max-height: 100px;
    /* line-height: 42px; */
    padding-top: 25px;
`

const HowTxt = styled.div`
    width: 100%;
    text-align: center;
    font-family: Roboto-Regular;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #222222;
    margin-bottom: 13px;
`

const DropDownList = styled.div`
    width: 100%;
    padding: 0 4%;
    margin-top: 28px;
    background-color: #fff;
`

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
        const {dropDownList, defaultShow} = this.state;

        const search = (e) => {
            console.log(e)
            if(e){
                this.props.history.push({pathname: `${(window.ctx || '')}/support/question`, state:{search: e, fromFAQ:true}})
            }
        }


        const clickItem = (e) => {
            console.log("item:",e);
            this.props.history.push({pathname:`${(window.ctx || '')}/support/question`, state:{id:e.id, fromFAQ:true}})
        }
        
        return (
            <FaqPage>
                <Page label={intl.formatMessage({id: 'faq'})} href={`${(window.ctx || '')}/support`}>
                    {/* 搜索框 */}
                    <SearchBarBox>
                        {
                            defaultShow &&
                            <HowTxt>{intl.formatMessage({id:"helpyou"})}</HowTxt>
                        }
                        <SearchBar search={(e)=>search(e)}></SearchBar>
                    </SearchBarBox>

                    {/* 问题分类下拉列表 */}
                    {
                        defaultShow && 
                        <DropDownList>
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
                        </DropDownList>
                    }
                    

                </Page>

            </FaqPage>
        )
    }
}

export default injectIntl(FAQ)