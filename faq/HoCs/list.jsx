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
       // 滚动的高度
      const scrollTop1 = (evt.srcElement ? evt.srcElement.scrollTop : false) || window.pageYOffset || (evt.srcElement ? evt.srcElement.body.scrollTop : 0)
      // 视窗高度
      const clientHeight = (evt.srcElement && evt.srcElement.clientHeight) || document.body.clientHeight
      // 页面高度
      const scrollHeight = (evt.srcElement && evt.srcElement.scrollHeight) || document.body.scrollHeight
      // 距离页面底部的高度
      const height = scrollHeight - scrollTop1 - clientHeight
      // console.log(scrollTop1, clientHeight, scrollHeight, height)
      if(height < 200){
        this.props.scrollHandler(evt)
      }
      // if (scrollTop + windowHeight >= documentHeight - 200) {
      //   this.props.scrollHandler(evt)
      	
      // }
    }

    componentDidMount () {
      // console.log('34',document.getElementById("pageScroll"))
    	document.getElementById("pageScroll").addEventListener('scroll', this.handleScroll)
    }

    componentWillUnmount () {
    	document.getElementById("pageScroll").removeEventListener('scroll', this.handleScroll)
    }

    render () {
    	return <WrappedComponent {...this.props}/>
    }
  }
}
