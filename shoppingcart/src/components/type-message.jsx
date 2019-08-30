import React from 'react'
var parse = require('simple-xml-dom/parse')
import getUrl from '../utils/deeplink'

export default class extends React.Component{
	constructor(props){
		super(props)
	}
	render(){
		const { messageHtml } = this.props
		if(!messageHtml) return ''
		const dom = parse(`<span>${messageHtml}</span>`)
		if(dom){
			const spanDOM = dom.querySelector('span[data-type]')
			if(spanDOM){
				const parentDOM = spanDOM.parentNode
				const type = spanDOM.getAttribute('data-type')
				if(type === 'deeplink'){
					const linkType = spanDOM.getAttribute('data-link-type')

					const paramString = spanDOM.getAttribute('data-params')

					const params = paramString ? JSON.parse(paramString): null
					const url = getUrl({type: linkType, params})
					spanDOM.innerHTML = `<a href="${url}">${spanDOM.innerHTML}</a>`
					return <span dangerouslySetInnerHTML={{__html: parentDOM.outerHTML}}/>
				}
			}
		}
		return <span dangerouslySetInnerHTML={{__html: messageHtml}}/>
	}
}
