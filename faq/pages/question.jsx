import React from 'react'
import {secondaries, questions} from '../data'
import styled from 'styled-components'
import Search from '../components/search.jsx'
import QuestionSelector from '../components/question-selector.jsx'
import {PageHeader, PageContanier} from '../components/buttons.jsx'
import {injectIntl} from 'react-intl'

const Question = class extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const secondaryId = this.props.match.params.id
    const secondary = secondaries.find(q => q.id === secondaryId)
    const richText = secondary.richText
    const parent = questions.find(q => q.id === secondary.parentId)
    const {intl} = this.props
    return (
      <div style={{backgroundColor: '#fff'}}>

        <PageHeader label="FAQ"/>
        <PageContanier>
          <div style={{padding: '20px 10px'}}>
            <Search inputStyle={{border: '1px solid #cacaca'}}/>
            <QuestionSelector style={{marginTop: '20px'}} label={intl.formatMessage({id: 'sectionarticles'})} items={parent.questions}/>
          </div>

          <div style={{padding: '10px'}} className="x-rich" dangerouslySetInnerHTML={{__html: richText}}>

          </div>
        </PageContanier>

      </div>
    )
  }
}

export default injectIntl(Question)
