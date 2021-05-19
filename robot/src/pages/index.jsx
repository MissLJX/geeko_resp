import React, { useState, useEffect } from 'react'
import { FormattedMessage } from 'react-intl'
import Header from '../components/header.jsx'
import { Themes } from '../components/question-theme-level-1.jsx'
import styled from 'styled-components'
import 'swiper/swiper.scss'
import { RobotReply, UserReply } from '../components/reply.jsx'
import { QuestionList } from '../components/question-list.jsx'
import { KeyWords } from '../components/keyword.jsx'
import { fetchHotQuestions, fetchThemesByParentId, matchQuestion, suggest, getUser } from '../api/index'
import { useLayoutEffect } from 'react'
import _ from 'lodash'

const initialData = {
    customerId: '1F4Q3Z7A81P7G8G3w3D5m9a4w',
    customer: {
        id: '1F4Q3Z7A81P7G8G3w3D5m9a4w'
    },
    themes: [
        {
            id: '123',
            name: 'Payment Concern',
            icon: '&#xe662;'
        },
        {
            id: '456',
            name: "Shopping Guidance",
            icon: '&#xe661;'
        },
        {
            id: '789',
            name: "Account  Issues",
            icon: '&#xe65f;'
        },
        {
            id: '789',
            name: "Refund Details",
            icon: '&#xe664;'
        }


    ],
    recomandQuestions: [
        {
            id: '17652S0o816C8y870i239K4M75',
            question: 'What is your return policy?'
        },
        {
            id: '196t2f0f8v6g8F7B5m6e8l3M9X',
            question: 'Is your package safe?'
        },
        {
            id: '1A62240O8u6p8P6s7e290H6u7L',
            question: 'How to contact shipping courier company?'
        },
        {
            id: '1I6l2T0b8a6c8j972C882b4K4F',
            question: 'How do I stop receiving emails?'
        },
        {
            id: '1U6Q2A0d866I8h8h473q1V2s8e',
            question: 'How can I return items?'
        },
        {
            id: '1Z6u2j0N8r6h8q552K6S9x7d2b',
            question: 'How can I track my order?'
        }
    ],
    guesses: [
        {
            id: '1',
            guessItem: 'Payment Concern',
            reply: {
                id: "24234",
                chatId: "13123",
                answer: "Next, please select your question type",
                themes: [
                    {
                        id: '3231',
                        name: 'Payment Method',
                        level: 2
                    },
                    {
                        id: '3231',
                        name: 'Payment failure',
                        level: 2
                    }
                ]
            }
        },
        {
            id: '2',
            guessItem: 'Payment Method',
            reply: {
                id: "id123231",
                chatId: "chatid1321",
                answer: "As some packages are shipped internationally, you may not see updates via local couriers until the package is cleared by local customs and entry is granted into your country. ",
                is_matched: true,
                relation_question_title: "Related Question",
                relation_repository: [
                    {
                        id: "5f69557dcebd34402903a346",
                        question: "Where is my order?"
                    },
                    {
                        id: "5f69557dcebd34402903a34b",
                        question: "Why is my order delayed?"
                    }
                ],
                st_question: "How long will the order take to arrive?",
                intelligent_answers: [

                ],
                trigger: "", //orderDetail getTrack,
                orderDetail: {},
                track: {}
            }

        },
        {
            id: '3',
            guessItem: 'Order',
            reply: {
                id: "id12ss3231",
                chatId: "chatid13fd21",
                answer: "Are these questions? If not, please type your question directly",
                is_matched: true,
                relation_question_title: "",
                relation_repository: [

                ],
                st_question: "",
                intelligent_answers: [
                    {
                        id: "5f69557dcebd34402903a346",
                        question: "Where is my order?"
                    },
                    {
                        id: "5f69557dcebd34402903a34b",
                        question: "Why is my order delayed?"
                    }
                ],
                trigger: "", //orderDetail getTrack,
                orderDetail: {},
                track: {}
            }

        }
    ]
}

const MAIN = styled.div`
    padding-top: 12px;
    // height: calc(100vh - 174px);
    height: calc(100vh - 124px);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 20px;
    & > div{
        margin-top: 25px;
        &:first-child{
            margin-top: 0;
        }
    }
`

const THEME_LEVELS = styled.ul`
    display: flex;
    flex-wrap: wrap;
    & > li{
        padding: 5px;
        
    }
    margin: -5px;
    margin-top: 15px;
`

const THEME_LEVEL = styled.span`
    cursor: pointer;
    border-radius: 2px;
	border: solid 1px #e6e6e6;
    padding: 5px 6px;
    color: #666;
    display: inline-block;
`

const ANSWER = styled.div`
    line-height: 20px;
`

const RELATED_QUESTIONS = styled.div`
    border-top: solid 1px #eeeeee;
    margin-top: 10px;
    padding-top: 10px;
`


const FOOTER = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // height: 130px;
    height: 80px;
`

const SENDER = styled.div`
    display: flex;
    background-color: #fff;
    height: 80px;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    input{
        border: none;
        outline: none;
        box-shadow: none;
        width: 100%;
    }
    &>div{
        &:first-child{
            width: 100%;
        }
    }
    box-shadow: 0 1px 2px rgba(0, 0, 0, .2);
    .__btn{
        &:active{
            color: #000;
        }
    }
`

const SUGGESTER = styled.ul`
    position: absolute;
    bottom: 80px;
    width: 100%;
    left: 0;
    background-color: #fff;
    z-index: 5;
    padding-left: 12px;
    padding-right: 12px;
    & > li{
        line-height: 30px;
        border-bottom: 1px solid #efefef;
    }
    padding-top: 12px;
`




const RecomandQeustionArea = props => {
    return <div>
        <div style={{
            fontFamily: 'SlatePro-Medium',
            fontSize: 16
        }}>We guess you may want to ask</div>
        <div style={{ marginTop: 8 }}>
            <QuestionList questionSelect={props.questionSelect} questions={props.questions} />
        </div>

    </div>
}

const GuessQuestions = ({ guess, questionSelect }) => {
    return <div>
        <div style={{
        }}>{guess.reply.answer}</div>
        <div style={{ marginTop: 8 }}>
            <QuestionList questionSelect={questionSelect} questions={guess.reply.intelligent_answers} />
        </div>
    </div>
}



const RecomandLevelThemes = props => {
    const { guess, onLeafTheme } = props
    return <div>
        {
            guess.reply.answer && <ANSWER dangerouslySetInnerHTML={{ __html: guess.reply.answer }} />
        }
        <THEME_LEVELS>
            {
                guess.reply.themes?.map(theme => <li key={theme.id}>
                    <THEME_LEVEL onClick={() => onLeafTheme?.(theme)}>
                        {theme.name}
                    </THEME_LEVEL>
                </li>)
            }
        </THEME_LEVELS>
    </div>
}

const RelatedQuestions = ({ guess, questionSelect }) => {
    return guess.reply.relation_repository && guess.reply.relation_repository.length > 0 ? <RELATED_QUESTIONS>
        <div style={{ color: '#327efe', marginBottom: 10 }}>{guess.reply.relation_question_title}</div>
        <QuestionList questionSelect={questionSelect} questions={guess.reply.relation_repository} />
    </RELATED_QUESTIONS> : <></>
}

const AnswerRelation = props => {
    const { guess, questionSelect } = props
    return <div>
        {
            guess.reply.answer && <ANSWER dangerouslySetInnerHTML={{ __html: guess.reply.answer }} />
        }

        <RelatedQuestions questionSelect={questionSelect} guess={guess} />

    </div>
}



const Sender = props => {
    const [message, setMessage] = useState('')
    const [questions, setQuestions] = useState([])
    const [show, setShow] = useState(false)
    Sender.handleClickOutside = () => setShow(false)

    const suggestQuestions = question => {
        suggest(question).then(data => data.result).then(questions => {
            if(questions && questions.length > 0){
                setQuestions(questions)
            }
        })
        setShow(true)
    }

    const [debouncedSuggest] = useState(() => _.debounce(suggestQuestions, 300));

    

    return <div style={{position: 'relative'}}>
        {
            show && <SUGGESTER>
            {
                questions?.map(question => <li key={question.id}>
                    <span style={{cursor:'pointer'}} onClick={ () => {
                        props.questionSelect?.(question.question)
                        setShow(false)
                    }} dangerouslySetInnerHTML={{__html: question.highlight}}/>
                </li>)
            }
        </SUGGESTER>
        }
        <SENDER>

            
            <input
                placeholder="Type a message here..."
                onKeyUp={(evt) => {
                    if (evt.key === 'Enter') {
                        props?.onSent(message);
                        setMessage('')
                        setShow(false)
                    }
                }} value={message} onChange={e => {
                    setMessage(e.target.value);
                    if(e.target.value){
                        debouncedSuggest(e.target.value)
                    }
                }} />
            <span onClick={() => { props?.onSent(message); setMessage(''); setShow(false); }} className="iconfont __btn" style={{ flexShrink: 0, color: '#999' }}>&#xe789;</span>
        </SENDER>
    </div>
}

const MANUALSERVICE = styled.div`
    .__text{
        font-size: 14px;
        line-height: 18px;
    }

    button{
        height: 26px;
        background-color: #000000;
        border-radius: 2px;
        min-width: 100px;
        outline: none;
        box-shadow: none;
        border: none;
        padding-left: 12px;
        padding-right: 12px;
        color: #fff;
        font-size: 12px;
    }
`

const ManualService = props => {
    return <MANUALSERVICE>
        <div className="__text">
            <FormattedMessage id="Need more support" />
        </div>
        <div style={{ marginTop: 14 }}>
            <button className="zenDesk"><FormattedMessage id="Manual Service" /></button>
        </div>
    </MANUALSERVICE>
}



export default props => {

    

    const [count, setCount] = useState(0)

    const [data, setData] = useState({ guesses: [] })

    const [guess, setGuess] = useState(null)

    const listRef = React.useRef()

    const eventTrack = (event, opts) => {
        window.GeekoSensors?.Track(event, opts)
        console.log(event)
        console.log(opts)
    }

    useEffect(async () => {
        const [data1, data2, data3] = await Promise.all([
            fetchHotQuestions().then(data => data.result),
            fetchThemesByParentId(0).then(data => data.result),
            getUser().then(data => data.result).catch(data => null)
        ])

        const initData = JSON.parse(window.localStorage.getItem(`robotData_${data3?.id || window.wid}`)) || {}

        setData({ ...data, ...initData, recomandQuestions: data1, themes: data2, customer: data3, customerId: data3?.id })

    }, [])

    useEffect(async () => {
        if (guess) {
            let _data = data
            
            if (guess.theme) {
                const { result: themes } = await fetchThemesByParentId(guess.theme.id)
                _data = {
                    ...data, guesses: data.guesses.map(g => {
                        if (g.id === guess.id) {
                            let _guess = {
                                ...g, reply: {
                                    ...g.reply,
                                    answer: 'Next, please select your question type',
                                    themes
                                }
                            }
                            eventTrack('ibot_qa', {
                                users_question: guess.theme.name,
                                ibot_answer: _guess.reply.answer,
                                themes: themes?.map(t => t.name)
                            })
                            return _guess
                        }
                        return g
                    })
                }
            } else if (guess.leafTheme) {
                const { relation_repository, name } = guess.leafTheme
                _data = {
                    ...data, guesses: data.guesses.map(g => {
                        if (g.id === guess.id) {

                            let _guess = {
                                ...g, reply: {
                                    ...g.reply,
                                    answer: 'Are these questions? If not, please type your question directly',
                                    intelligent_answers: relation_repository
                                }
                            }
                            eventTrack('ibot_qa', {
                                users_question: name,
                                ibot_answer: _guess.reply.answer,
                                intelligent_answers: relation_repository?.map(r => r.question)
                            })

                            return _guess
                        }
                        return g
                    })
                }
                
            } else if(guess.is_manual_service) {
                _data = {
                    ...data, guesses: data.guesses.map(g => {
                        if (g.id === guess.id) {

                            let _guess = {
                                ...g, reply: {
                                    ...g.reply,
                                    is_matched: false
                                }
                            }
                            eventTrack('ibot_qa', {
                                users_question: 'Manual Service',
                                ibot_answer: 'Manual Service'
                            })

                            return _guess
                        }
                        return g
                    })
                }
            } else if (guess.question) {
                const { result: response } = await matchQuestion(guess.question).catch(data => (
                    {
                        result: {
                            is_matched: false
                        }
                    }
                ))
                _data = {
                    ...data, guesses: data.guesses.map(g => {
                        if (g.id === guess.id) {


                            let _guess = {
                                ...g, reply: {
                                    ...g.reply,
                                    answer: response?.answer,
                                    intelligent_answers: response?.intelligent_answers,
                                    relation_question_title: response?.relation_question_title,
                                    relation_repository: response?.relation_repository,
                                    st_question: response?.st_question,
                                    is_matched: !!response?.is_matched
                                }
                            }

                            eventTrack('ibot_qa', {
                                users_question: guess.question,
                                ibot_answer: response?.answer,
                                st_question: response?.st_question,
                                intelligent_answers: response?.intelligent_answers?.map(r => r.question),
                                relation_repository: response?.relation_repository?.map(r => r.question),
                                is_matched: !!response?.is_matched
                            })


                            return _guess
                        }
                        return g
                    })
                }
                
            }

            setData(_data)
            setCount(count + 1)
            window.localStorage.setItem(`robotData_${data.customerId || window.wid}`, JSON.stringify(_data))
        }

    }, [guess])


    useLayoutEffect(() => {
        // listRef.current.scrollTop = listRef.current.scrollHeight
        listRef.current.scrollTo(0, listRef.current.scrollHeight)
    }, [
        count
    ])

    useEffect(() => {
        listRef.current.scrollTo(0, listRef.current.scrollHeight)
    }, [data.guesses.length])




    const getGuessReply = guess => {

        if (guess.reply.themes && guess.reply.themes.length > 0) {
            return <RecomandLevelThemes onLeafTheme={onLeafTheme} guess={guess} />
        } else if (guess.reply.intelligent_answers && guess.reply.intelligent_answers.length > 0) {
            return <GuessQuestions questionSelect={questionSelect} guess={guess} />
        } else if(guess.reply.is_matched) {
            return <AnswerRelation questionSelect={questionSelect} guess={guess} />
        }

        return <ManualService />
    }

    const onTheme = async theme => {
        const guessId = new Date().getTime()
        const guess = {
            id: guessId,
            guessItem: theme.name,
            reply: {
                id: new Date().getTime(),
                chatId: "13123",
                answer: "please wait...",
                is_matched: true
            }
        }
        setData({
            ...data, guesses: [...data.guesses, guess]
        })
        setGuess({ ...guess, theme })
    }

    const onLeafTheme = async theme => {
        const guessId = new Date().getTime()
        const guess = {
            id: guessId,
            guessItem: theme.name,
            reply: {
                id: new Date().getTime(),
                chatId: "13123",
                answer: "please wait...",
                is_matched: true
            }
        }
        setData({
            ...data, guesses: [...data.guesses, guess]
        })
        setGuess({ ...guess, leafTheme: theme })
    }

    const questionSelect = question => {
        if(!question) return
        const guessId = new Date().getTime()
        const guess = {
            id: guessId,
            guessItem: question,
            is_manual_service: question.toLowerCase().indexOf('manual service') >= 0,
            reply: {
                id: new Date().getTime(),
                chatId: "13123",
                answer: "please wait...",
                is_matched: true,
            }
        }
        setData({
            ...data, guesses: [...data.guesses, guess]
        })
        setGuess({ ...guess, question })
    }



    return <div>
        <Header text={<FormattedMessage id="Chat with us" />} />
        <MAIN ref={listRef}>
            <Themes themes={data?.themes} onTheme={onTheme} />
            <RobotReply>
                <RecomandQeustionArea questionSelect={questionSelect} questions={data?.recomandQuestions} />
            </RobotReply>
            {
                data?.guesses?.map(guess => {
                    return <React.Fragment key={guess.id}>
                        {guess.guessItem && <UserReply user={data?.customer}>{guess.guessItem}</UserReply>}
                        <RobotReply>
                            {getGuessReply(guess)}
                        </RobotReply>
                    </React.Fragment>
                })
            }
        </MAIN>
        <FOOTER>
            {/* <div style={{ paddingLeft: 12, paddingTop: 10 }}>
                <KeyWords keywords={[
                    {
                        id: '123',
                        name: 'Change address'
                    },
                    {
                        id: '234',
                        name: 'Exchange'
                    },
                    {
                        id: '345',
                        name: 'Track logistics'
                    },
                    {
                        id: '456',
                        name: 'Cancel Goods'
                    },
                ]} />
            </div> */}
            <div>
                <Sender questionSelect={questionSelect} onSent={(message) => { questionSelect(message) }} />
            </div>
        </FOOTER>
    </div>
}