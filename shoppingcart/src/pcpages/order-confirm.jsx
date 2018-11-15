import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import {injectIntl, FormattedMessage} from 'react-intl'
import Icon from '../components/icon.jsx'
import {fetchTransactionPage} from '../store/actions.js'
import {gettransactionrelatedproducts, getRecentlyProducts} from '../api'
import {Btn, BigButton} from '../components/msite/buttons.jsx'
import Barcode from 'react-barcode'
import Clipboard from 'react-clipboard.js'
import SUCCESSTIP from '../components/pc/successtip.jsx'
import { Grey, Red, Blue } from '../components/text.jsx'

import {OrderAddress} from '../components/pc/address.jsx'
import LinkImage from '../components/link-image.jsx'

import Ellipsis from '../components/ellipsis.jsx'
import Money from '../components/money.jsx'
import {producturl, strconcat} from '../utils/utils.js'
import Tabs from '../components/pc/tabs.jsx'
import Product from '../components/pc/product.jsx'

import Carousel from '../components/pc/carousel.jsx'
import Loadable from 'react-loadable'
import Loading from '../components/msite/loading.jsx'

import {Route, Link} from 'react-router-dom'

const RouteAddress = Loadable({
  loader: () => import(/* webpackChunkName: "component--order-address" */ './order-address.jsx'),
  loading: Loading
})

const SetPassword = Loadable({
  loader: () => import(/* webpackChunkName: "component--set-password" */ './set-password.jsx'),
  loading: Loading
})

const ChangePhone = Loadable({
  loader: () => import(/* webpackChunkName: "component--change-phone" */ './change-phone.jsx'),
  loading: Loading
})

const ChangeEmail = Loadable({
	loader: () => import(/* webpackChunkName: "component--change-email" */ './change-email.jsx'),
  loading: Loading
})

const PAGECONFIRM = styled.div`
	width: 1150px;
	margin-left: auto;
	margin-right: auto;
	padding-bottom: 50px;
`

const CONTAINER = styled.div`
	width: 726px;
	margin-left: auto;
	margin-right: auto;
`

const LI = styled.li`
  &::before{
    display: inline-block;
    content: attr(data-index);
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #e64545;
    color: #fff;
    line-height: 16px;
    text-align: center;
    font-size: 12px;
    vartical-align: middle;
    margin-right: 5px;
  }

  line-height: 20px;
`

const OL = styled.ol`
	& > li{
		margin-top: 10px;
		&:first-child{
			margin-top:0;
		}
	}
`

const BARCODECOPY = styled.div`
	border:1px solid #e6e6e6;
	border-radius: 2px;
	height: 35px;
	width: 687px;
	padding-left: 10px;
	margin-left: 10px;
	line-height: 35px;

	& > button{
		float: right;
		height: 33px;
		border-top-right-radius: 2px;
		border-bottom-right-radius: 2px;
		cursor: pointer;
	}
`

const PAYMETHOD = styled.div`
	border:1px solid #e6e6e6;
	padding: 15px;
`

const ORDERS = styled.ul`
	margin-top: 40px;
	& > li{
		margin-top: 30px;
		&:first-child{
			margin-top:0;
		}
	}
`

const ORDER = styled.div`
	border: solid 1px #e6e6e6;
	& > .__hd{
		height: 40px;
		background-color: #f5f5f5;
		padding-left: 10px;
		padding-right: 10px;
	}

	& > .__bd{
		padding-left: 10px;
		padding-right: 10px;
	}
`

const ORDERFD = styled.div`
	text-align: right;
	margin-top: 10px;
`

const ITEMS = styled.ul`
	&> li{
		padding-top: 10px;
		padding-bottom: 10px;
		border-top: dashed 1px #e6e6e6;
		&:first-child{
			border-top: none
		}
	}
`

const ITEM = styled.div`
	
`

const mapStateToProps = (state) => {
  return {
    transaction: state.transaction,
    me: state.me,
   	m1186: state.m1186,
    m1147: state.m1147,
    m1073: state.m1073
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GETTRANSACTIONPAGE: (transactionId) => {
      return dispatch(fetchTransactionPage(transactionId))
    }
  }
}

const OrderConfirm = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      products: [],
      histories: [],
      successTip: null,
      tabIndex: 0
    }
  }

  componentWillMount () {
    const {transactionId} = this.props.match.params
  	this.props.GETTRANSACTIONPAGE(transactionId).then( (data) => {
  		if(window.sendEvent){
  			window.sendEvent(data)
  		}
  	})
    gettransactionrelatedproducts(transactionId, 0, 11).then(({result}) => {
      this.setState({
        products: [...this.state.products, ...result]
      })
    })
    getRecentlyProducts().then( ({result}) => {
    	this.setState({
    		histories: [...this.state.histories, ...result]
    	})
    } )
  }

  addressEditHandle (){
  	this.props.history.push(`${this.props.match.url}/address`)
  }

  handleViewOrder () {
    if (!window.__is_login__ && this.props.transaction.orderVos[0].order.payMethod === '1') {
      this.props.history.push(`${this.props.match.url}/set-password`)
    } else {
      window.location.href = `${window.ctx || ''}/me/m/order`
    }
  }

  copied () {
    this.showSuccessTip('Copiado com sucesso')
  }

  showSuccessTip (tip) {
    this.setState({
      successTip: tip
    })
    setTimeout(() => {
      this.setState({
        successTip: null
      })
    }, 450)
  }

  tabClickHandle( index ){
  	this.setState({
  		tabIndex: index
  	})
  }

  render () {
  	const {transaction, me, m1186, m1147, m1073} = this.props
  	const {message, orderVos} = transaction || {}
  	const orderVo = orderVos ? orderVos[0] : null

  	let __BB__,__Tips__

  	if(transaction && m1186){
  		__BB__ = m1186 ? JSON.parse(m1186.message) : null;
  		__Tips__ = orderVo.order.mercadopagoPayURL ? __BB__.spain : __BB__.portugal
  	}

    const getTitle = () => {
      if (orderVo.order.payBarCode) { return <div>Seu pedido de compra foi realizado! Pague agora seu Boleto Bancário paraagilizar a confirmação do seu pedido.</div> }
      if (orderVo.order.mercadopagoPayURL) { return <div dangerouslySetInnerHTML={{__html: m1147.message}}/> }
      return <div>{message} <Link style={{color: 'skyblue'}} to={`${this.props.match.url}/change-email`}>{me.communicationEmail}<Icon style={{marginLeft: 10, color: 'skyblue', cursor: 'pointer'}}>&#xe61f;</Icon></Link></div>
    }

    return <PAGECONFIRM>
    	{
    		transaction && <CONTAINER style={{paddingTop: 50}}>
    			<div className="x-table __vt __fixed x-fw">
    				<div className="x-cell" style={{width: 42}}>
    					<Icon style={{color: '#57b936', fontSize: 32}}>&#xe73c;</Icon>
    				</div>
    				<div className="x-cell" style={{paddingTop: 4}}>
    				 	<div dangerouslySetInnerHTML={{__html: m1073.message}} style={{fontFamily: 'HelveticaNeue-Medium', fontSize: 16}}/>
    				 	<div style={{marginTop: 10, lineHeight: '20px'}}>{getTitle()}</div>
    				</div>
    			</div>

    			{
    				orderVo.order.mercadopagoPayURL && <div style={{paddingLeft: 30}}>
    					<div className="x-table __vm __fixed x-fw" style={{marginTop: 20, paddingTop: 20, borderTop: '1px solid #e6e6e6'}}>
	            	<div className="x-cell">
		                <OL style={{padding: 10}}>

		                	{
		                		__Tips__ && __Tips__.map( (tip, index) =>  <LI key={index} data-index={index+1} dangerouslySetInnerHTML={{__html: tip.message}}/> )
		                	}

		                </OL>
	              </div>
	            </div>

	            <div style={{textAlign: 'center'}}>
	            	{
	            		orderVo.order.shippingDetail.phoneNumber && <Link to={`${this.props.match.url}/change-phone`}>
		            		<Blue style={{cursor:'pointer'}}>
		            			<span>{orderVo.order.shippingDetail.phoneNumber}</span>
		            			<Icon style={{marginLeft:5}}>&#xe62b;</Icon>
		            		</Blue>
	            		</Link>
	            	}
	            </div>

	            <div style={{textAlign: 'center', marginTop: 20}}>
	            	 <Btn style={{backgroundColor: '#e64545', padding: '12px 26px'}}>Generar Ticket</Btn>
	            </div>
    				</div>
    			}

    			{
            orderVo.order.payBarCode && <div style={{paddingLeft: 30}}>
	            <div className="x-table __vm __fixed x-fw" style={{marginTop: 20, paddingTop: 20, borderTop: '1px solid #e6e6e6'}}>
	            	<div className="x-cell">
		                <OL style={{padding: 10}}>

		                	{
		                		__Tips__ && __Tips__.map( (message, index) =>  <LI key={index} data-index={index+1} dangerouslySetInnerHTML={{__html: message}}/> )
		                	}

		                </OL>
	              </div>
	            </div>

	            <div style={{textAlign: 'center'}}>
	            	{
	            		orderVo.order.shippingDetail.phoneNumber && <Link to={`${this.props.match.path}/change-phone`}>
		            		<Blue style={{cursor:'pointer'}}>
		            			<span>{orderVo.order.shippingDetail.phoneNumber}</span>
		            			<Icon style={{marginLeft:5}}>&#xe62b;</Icon>
		            		</Blue>
	            		</Link>
	            	}
	            </div>


	           <div style={{textAlign: 'center', marginTop: 20}}>
	            	 <Btn style={{backgroundColor: '#e64545', padding: '12px 26px'}}>Imprimir boleto</Btn>
	            </div>
	            <div style={{marginTop: 25}}>
	            	<Barcode value={orderVo.order.digitableLine} width={2.21} displayValue={false}/>
	            	<BARCODECOPY>
		            	<span>{orderVo.order.digitableLine}</span>

		            	<Clipboard onSuccess={this.copied.bind(this)} style={{backgroundColor: '#e64545', color: '#fff', border: 'none', outline: 'none', boxShadow: 'none'}} data-clipboard-text={orderVo.order.digitableLine}>
					        	Copiar código
					      	</Clipboard>
	            	</BARCODECOPY>
	            </div>
            </div>
          }
          <div style={{marginTop: 40}}>
          	<OrderAddress address={orderVo.order.shippingDetail} showEdit={true} onEdit={ this.addressEditHandle.bind(this)}/>
          </div>

          <PAYMETHOD style={{marginTop: 15}}>
          	<div className="x-table __vt">
              <div className="x-cell" style={{width: 150, fontSize: 16}}>
              	<FormattedMessage id="payment_method"/>
              </div>
	          	<div className="x-cell">
	          		<div>
	          			<span>{orderVo.order.payMethodInfo.label}</span>
	          			{
	          				orderVo.order.accountNo && <span style={{marginLeft: 10}}>{orderVo.order.accountNo}</span>
		            	}
	          		</div>

	          		<div style={{marginTop: 2}}>
	          			<FormattedMessage id="zip_code"/>:
	          			<span style={{marginLeft: 10}}>{orderVo.order.shippingDetail.zipCode}</span>
	          		</div>
	          	</div>
          	</div>
          </PAYMETHOD>

          <ORDERS>
          	{
          		orderVos.map(vo => (
		            <li key={vo.id}>
		              <ORDER>
		              	<div className="__hd">
		              		<div className="x-table x-fw __vm x-fh">
		              			<div className="x-cell" style={{width: 210}}>
		              				<span>{new Date(vo.order.orderTime).toLocaleString()}</span>
		              			</div>
		              			<div className="x-cell" style={{width: 200}}>
		              				{
		              					vo.order.orderItems[0].shippedCountryCode && <span>
		              						Ships From {vo.order.orderItems[0].shippedCountryCode}
		              					</span>
		              				}

		              			</div>
		              			<div className="x-cell __right">
		              				<Grey>Order No:</Grey> <span>{vo.order.id}</span>
		              			</div>
		              		</div>

		              	</div>

		              	<div className="__bd">
		              		<ITEMS>
			              		{
			              			vo.order.orderItems.map(item => <li key={ item.variantId }>
			              				<ITEM>
			              					<div className="x-table __fixed __vm" style={{width: 670}}>
												  			<div className="x-cell" style={{width: 110}}>
												  				<LinkImage style={{width: 90}} href={producturl({id: item.productId, name: item.productName})} src={item.productImageUrl}/>
												  			</div>
												  			<div className="x-cell" style={{width: 310}}>
												  				<Ellipsis>{item.productName}</Ellipsis>
												  				<div style={{marginTop: 4}}><Grey>{strconcat(item.color, item.size)}</Grey></div>
												  			</div>
												  			<div className="x-cell">
												  				<span>{item.quantity}</span>
												  			</div>

												  			<div className="x-cell __right">
												  				<Red><Money money={item.realPrice}/></Red>
												  			</div>
												  		</div>
			              				</ITEM>
			              			</li>)
			              		}
		              		</ITEMS>
		              	</div>
		              </ORDER>
		              <ORDERFD>
	              		<span>
	              			<FormattedMessage style={{fontFamily: 'HelveticaNeue-Medium'}} id="shipping_price"/>:
	              			<Money money={vo.order.shippingPrice}/>
	              		</span>

	              		{
	              			vo.order.shippingInsurancePrice && vo.order.shippingInsurancePrice.amount > 0 && <span style={{marginLeft: 15}}>
	              				<FormattedMessage style={{fontFamily: 'HelveticaNeue-Medium'}} id="shipping_insurance"/>:
	              				<Money money={vo.order.shippingInsurancePrice}/>
	              			</span>
	              		}
	              		{
	              			vo.order.points > 0 && <span style={{marginLeft: 15}}>
		              			<FormattedMessage style={{fontFamily: 'HelveticaNeue-Medium'}} id="credits"/>:
		              			<Red>+{vo.order.points}</Red>
		              		</span>
	              		}

	              		<span style={{marginLeft: 15}}>
	              			<FormattedMessage style={{fontFamily: 'HelveticaNeue-Medium'}} id="total"/>:
	              			<Red style={{fontSize: 20, fontFamily: 'HelveticaNeue-Medium'}}><Money money={vo.order.orderTotal}/></Red>
	              		</span>

	              	</ORDERFD>
		            </li>
		          ))
          	}
          </ORDERS>

          <BigButton onClick={this.handleViewOrder.bind(this)} style={{width: 313, marginLeft: 'auto', marginRight: 'auto', marginTop: 40}}><FormattedMessage id="check_order"/></BigButton>

    		</CONTAINER>
    	}

    		{
    			this.state.products && transaction && <div style={{marginTop: 55}}>

    				
    				<Tabs tabIndex={ this.state.tabIndex } tabClick={ this.tabClickHandle.bind(this) } tabs={ [
    						{title: 'You May Also Like'},
    						{title: 'Recently View'}
    					] }/>

    				{
    					this.state.tabIndex === 0 && <div style={{marginTop:30}}>
			    			<Carousel options={{margin: 10, displays: 5, count: this.state.products.length, parentWidth: 1150}}>
				    			{
				    				this.state.products.map(product => <div key={product.id}>
				    					<Product product={product}/>

				    				</div>)
				    			}
			    			</Carousel>
	    				</div>
    				}

    				{
    					this.state.tabIndex === 1 && <div style={{marginTop:30}}>
    						{
    							this.state.histories && <Carousel options={{margin: 10, displays: 5, count: this.state.histories.length, parentWidth: 1150}}>
				    			{
				    				this.state.histories.map(product => <div key={product.id}>
				    					<Product product={product}/>
				    				</div>)
				    			}
			    			</Carousel>
    						}
    					</div>
    				}
    				
    			</div>
    		}

    	{
        this.state.successTip && <SUCCESSTIP time={0.5}>
          { this.state.successTip }
        </SUCCESSTIP>
      }


      <Route path={`${this.props.match.path}/address`}  component={RouteAddress}/>
      <Route path={`${this.props.match.path}/set-password`}  component={SetPassword}/>
      <Route path={`${this.props.match.path}/change-phone`}  component={ChangePhone}/>
      <Route path={`${this.props.match.path}/change-email`}  component={ChangeEmail}/>
      

    </PAGECONFIRM>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(OrderConfirm))
