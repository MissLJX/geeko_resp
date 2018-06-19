import React from 'react'
import {injectIntl, FormattedMessage} from 'react-intl'
import {PageHeader, PageContanier} from '../components/buttons.jsx'

const OnlineHelp = ({intl}) => <div style={{backgroundColor: '#fff', position: 'fixed', width: '100%', height: '100%', top: 0}}>
  <PageHeader label={intl.formatMessage({id: 'onlinehelp'})}/>
  <div style={{marginTop: '80px', color: '#666', fontSize: '12px', textAlign: 'center'}}>
  	<FormattedMessage id="loading"/>
  </div>
  <iframe style={{width: '100%', height: 'calc(100% - 50px)', left: '0', top: '20px', position: 'absolute'}} src="https://chatserver.comm100.com/ChatWindow.aspx?siteId=226073&planId=175"/>
</div>

export default injectIntl(OnlineHelp)
