import React from 'react'
import styled from 'styled-components'

const LI = styled.li`
    color: #327efe;
    font-size: 14px;
    line-height: 25px;
`

const UL = styled.ul`
    list-style: disc;
    padding-left: 12px;
`

export const Question = props => {
    const { question, questionSelect } = props
    return <LI><span onClick={ () => questionSelect?.(question.question) } style={{cursor:'pointer'}}>{question.question}</span></LI>
}

export const QuestionList = props => {
    const { questions, questionSelect } = props
    return <UL>
        {questions?.map(q => <Question key={q.id} question={q} questionSelect={questionSelect}/>)}
    </UL>
}