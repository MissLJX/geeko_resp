import React from 'react'
import { connect } from 'react-redux'
import {injectIntl} from 'react-intl'
import styled from 'styled-components'
import {Boxs, Box, BoxBody, BoxHead} from '../components/msite/layout.jsx'
import {Grey, Red, UpperCase} from '../components/text.jsx'
import Address from '../components/msite/address.jsx'
import {Btn, BigButton} from '../components/msite/buttons.jsx'
import {gettransactionrelatedproducts} from '../api'
import Order from '../components/msite/order.jsx'
import {fetchTransactionPage} from '../store/actions.js'
import {Link} from 'react-router-dom'
import {AnimatedRoute} from 'react-router-transition'
import Icon from '../components/icon.jsx'
import Products from '../components/msite/products.jsx'
import Loading from '../components/msite/loading.jsx'

import Loadable from 'react-loadable'

const OrderAddress = Loadable({
  loader: () => import(/* webpackChunkName: "component--order-address" */ './order-address.jsx'),
  loading: Loading
})

const SetPassword = Loadable({
  loader: () => import(/* webpackChunkName: "component--set-password" */ './set-password.jsx'),
  loading: Loading
})

const defaultStyles = {
  position: 'fixed',
  top: 0,
  backgroundColor: '#fff',
  width: '100%',
  zIndex: 20,
  overflow: 'auto'

}

const defaultAnimations = {
  atEnter: { offset: 100, height: 0},
  atLeave: { offset: 100, height: 0},
  atActive: { offset: 0, height: 100}
}

const DashedLine = styled.div`
	background: linear-gradient(to right, #dd747d 35%,transparent 25%,transparent 50%,#626e94 50%,#626e94 85%,transparent 75%);
    background-size: 59px 1px;
    height: 4px;  
    transform:skew(20deg,0);
`

const OverFlow = styled.div`
	overflow: hidden;
`

const AddressBox = styled.div`
	& > .__hd{
		height: 50px;
		padding-left: 10px;
		padding-right: 10px;
		border-bottom: 1px solid #ededed;
	}
	& > .__bd{
		padding: 10px;
	}
`

const LI = styled.li`
  &::before{
    display: inline-block;
    content: attr(data-index);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #e5004f;
    color: #fff;
    line-height: 16px;
    text-align: center;
    font-size: 12px;
    vartical-align: middle;
    margin-right: 5px;
  }

  line-height: 20px;
`

const mapStateToProps = (state) => {
  return {
    transaction: state.transaction,
    me: state.me,
    m1132: state.m1132,
    m1133: state.m1133,
    m1147: state.m1147,
    m1073: state.m1073
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GETTRANSACTIONPAGE: (transactionId) => {
      dispatch(fetchTransactionPage(transactionId))
    }
  }
}

const OrderConfirm = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      products: []
    }
  }

  componentWillMount () {
    const {transactionId} = this.props.match.params
  	this.props.GETTRANSACTIONPAGE(transactionId)
    gettransactionrelatedproducts(transactionId, 0, 20).then(({result}) => {
      this.setState({
        products: [...this.state.products, ...result]
      })
    })
  }

  handleViewOrder (){
    if(!window.__is_login__ && this.props.transaction.orderVos[0].order.payMethod === '1'){
      this.props.history.push(`${this.props.match.url}/set-password`)
    }else{
      window.location.href = `${window.ctx || ''}/me/m/order`
    }
    
  }

  render () {
    const {transaction, me, m1132, m1133, m1147, m1073} = this.props
  	const {message, orderVos} = transaction || {}
  	const orderVo = orderVos ? orderVos[0] : null

    const getTitle = () => {
      if (orderVo.order.payBarCode) { return <div>Seu pedido de compra foi realizado! Pague agora seu Boleto Bancário paraagilizar a confirmação do seu pedido.</div> }
      if (orderVo.order.mercadopagoPayURL) { return <div dangerouslySetInnerHTML={{__html: m1147.message}}/> }
      return <div>{message} <a style={{color: 'skyblue'}} href="#">{me.communicationEmail}</a><Icon style={{marginLeft: 10, color: 'skyblue', cursor: 'pointer'}}>&#xe61f;</Icon></div>
    }

  	return <div>{transaction && (
      <div>
    		<Boxs>
    			<Box>
            <div style={{padding: 10}}>
              <div style={{fontSize: 18}}>
                <div dangerouslySetInnerHTML={{__html: m1073.message}} />
              </div>

              <div style={{marginTop: 10, lineHeight: '20px'}}>{getTitle()}</div>
            </div>

    			</Box>

          {
            orderVo.order.payBarCode && <Box>
              <div style={{paddingBottom: 10}}>
                <ol style={{padding: 10}}>
                  <LI data-index={1} dangerouslySetInnerHTML={{__html: m1132.message}}/>
                  <LI style={{marginTop: 10}} data-index={2} dangerouslySetInnerHTML={{__html: m1133.message}}/>
                </ol>
                <div style={{marginTop: 10, marginLeft: 10}}><Btn style={{backgroundColor: '#e5004f', padding: '6px 8px'}}>Imprimir boleto</Btn></div>
              </div>
            </Box>
          }

    			<Box>
    				<AddressBox>
    					<div className="__hd">
    						<div className="x-table __vm __fixed x-fw x-fh">
    							<div className="x-cell">
    								<div><UpperCase>Shipping Address</UpperCase></div>
    								<div><Red style={{fontSize: 12}}>(Please check it carefully.)</Red></div>
    							</div>
    							<div className="x-cell __right">
    								<Btn><Link style={{textDecoration: 'none', color: '#fff'}} to={`${this.props.match.url}/address`}>Update</Link></Btn>
    							</div>
    						</div>
    					</div>
    					<div className="__bd">
    						<Address address={orderVo.order.shippingDetail}/>
    					</div>
    					<OverFlow>
  	  					<DashedLine/>
  	  				</OverFlow>
    				</AddressBox>

    			</Box>

          <Box>
            <BoxHead title={'Payment Method'}/>
            <BoxBody>
              <div>{orderVo.order.payMethodInfo.label}</div>
              {orderVo.order.accountNo && <div style={{marginTop: 5}}>
                {orderVo.order.accountNo}
              </div>}
              <div style={{marginTop: 5}}><span>Zip / Postal Code: </span> <span>{orderVo.order.shippingDetail.zipCode}</span></div>
            </BoxBody>
          </Box>

          {orderVos.map(vo => (
            <Box key={vo.id}>
              <Order orderVo={vo}/>
            </Box>
          ))}

    		</Boxs>

        <div style={{marginTop: 15, paddingLeft: 20, paddingRight: 20}}>
          <BigButton onClick={this.handleViewOrder.bind(this)} className="__btn" height={47}>
                Check Orders
          </BigButton>
        </div>

        <Boxs style={{marginTop: 20}}>
          <Box>
            <BoxHead title={'You May Also Like'}/>
            <BoxBody>
              <Products products={this.state.products}/>
              <div style={{fontSize: 12, textAlign: 'center', marginTop: 5}}><Grey>Loading...</Grey></div>
            </BoxBody>
          </Box>

        </Boxs>
      </div>

  	)}

    <AnimatedRoute {...defaultAnimations}
      mapStyles={(styles) => ({
        transform: `translateY(${styles.offset}%)`,
        ...defaultStyles
      })}
      path={`${this.props.match.path}/address`} component={OrderAddress}/>

      <AnimatedRoute {...defaultAnimations}
      mapStyles={(styles) => ({
        transform: `translateY(${styles.offset}%)`,
        ...defaultStyles
      })}
      path={`${this.props.match.path}/set-password`} component={SetPassword}/>

    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OrderConfirm))
