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


/**
 * const scrollEvent = evt => {
if (!evt.srcElement.scrollTop) {
 //处理向上使劲滚动的时候scrollTop为undefined
 return undefined
 }
 // 滚动的高度
 const scrollTop =
 (evt.srcElement ? evt.srcElement.scrollTop : false) ||
 window.pageYOffset ||
 (evt.srcElement ? evt.srcElement.body.scrollTop : 0)
 // 视窗高度
 const clientHeight = (evt.srcElement && evt.srcElement.clientHeight) || document.body
 // 页面高度
 const scrollHeight = (evt.srcElement && evt.srcElement.scrollHeight) || document.body
 // 距离页面底部的高度
 const height = scrollHeight - scrollTop - clientHeight
 return height
}
const initialState = {
 page: 1,
 pageSize: 50
}
const reducer = (state, action) => {
 const payload = reap(action, 'payload', {})
 switch (action.type) {
 case 'update':
 return { ...state, ...payload }
 default:
 throw new Error()
 }
}
function Demo(props) {
 const {
 getList
 } = props
 const [hasMore, setHasMore] = useState(true)
 const [state, dispatch] = useReducer(reducer, initialState)
 const [list, setList] = useState([])
 const _handleScroll = useCallback(
 evt => {
 const height = scrollEvent(evt)
 if (hasMore && height <= 100) {
 const page = state.page + 1
 //get new list data
 dispatch({
 type: 'update',
 payload: {
 page
 }
 })
 }
 },
 [hasMore, state.page]
 )
 useEffect(() => {
 const scrollDom = document.getElementById('layoutContentContainer')
 scrollDom.addEventListener('scroll', _handleScroll)
 return () => scrollDom.removeEventListener('scroll', _handleScroll)
 }, [_handleScroll])
 useEffect(() => {
 const { page, pageSize, searchText } = state
 getList({ page, pageSize, name: searchText }).then(res => {
 const code = reap(res, 'code', 0)
 if (code === 200) {
 //判断设置还有没有数据可以加载了 setHasMore()
 //设置获取的数据列表setList(a => a.concat(list))
 }
 })
 }, [getList, state])
 return (
 <React.Fragment>
 </React.Fragment>
 )
}

 */