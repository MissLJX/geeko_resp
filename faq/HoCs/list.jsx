import React from 'react'

export function withScroll (WrappedComponent) {
  return class extends React.Component {
    constructor (props) {
      super(props)
      this.handleScroll = this.handleScroll.bind(this)
    }

    handleScroll (evt) {
      let [scrollTop, documentHeight, windowHeight] = [
        document.documentElement.scrollTop || document.body.scrollTop,
        document.body.clientHeight,
        window.screen.height
      ]

      if (scrollTop + windowHeight >= documentHeight - 100) {
      	this.props.scrollHandler(evt)
      }
    }

    componentDidMount () {
    	document.addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount () {
    	document.removeEventListener('scroll', this.handleScroll)
    }

    render () {
    	return <WrappedComponent {...this.props}/>
    }
  }
}
