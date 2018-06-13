import React from 'react'
import {secondaries, questions} from '../data'
import styled from 'styled-components'
import Search from '../components/search.jsx'
import QuestionSelector from '../components/question-selector.jsx'

export default class Question extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const secondaryId = this.props.match.params.id
    const secondary = secondaries.find(q => q.id === secondaryId)
    const richText = secondary.richText
    const parent = questions.find(q => q.id === secondary.parentId)

    return (
      <div style={{backgroundColor: '#fff'}}>
        <div style={{padding: '20px 10px'}}>
          <Search inputStyle={{border: '1px solid #cacaca'}}/>
          <QuestionSelector style={{marginTop: '20px'}} label="Articles in this section" items={parent.questions}/>
        </div>

        <div style={{padding: '10px'}} className="x-rich" dangerouslySetInnerHTML={{__html: richText}}>

        </div>
      </div>
    )
  }
}
