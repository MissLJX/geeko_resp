import React from 'react'
import {FormattedMessage, injectIntl} from 'react-intl'
import style from './new-order-list.module.css'
import styled from 'styled-components'

const NewOrderList = class extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
  	const STATUS_PENDING = 1
    const STATUS_REVIEWING = 2
    const STATUS_PROCESSING = 3
 	const STATUS_SHIPPED = 4
    const STATUS_PARTIALLY_REFUNDED = 5
    const STATUS_REFUNDED = 6
    const STATUS_CANCELED = 7
    const STATUS_HELD = 8
    const STATUS_CONFIRMED = 10

    const {intl} = this.props

  	const status = (value) => {
  	  let label
      switch (value) {
        case STATUS_PENDING:
          label = intl.formatMessage({id: 'order_status_pendding'})
          break
        case STATUS_REVIEWING:
          label = intl.formatMessage({id: 'order_status_paid'})
          break
        case STATUS_PROCESSING:
          label = intl.formatMessage({id: 'order_status_processing'})
          break
        case STATUS_SHIPPED:
          label = intl.formatMessage({id: 'order_status_shipped'})
          break
        case STATUS_PARTIALLY_REFUNDED:
          label = intl.formatMessage({id: 'order_status_partially_refunded'})
          break
        case STATUS_REFUNDED:
          label = intl.formatMessage({id: 'order_status_refunded'})
          break
        case STATUS_CANCELED:
          label = intl.formatMessage({id: 'order_status_canceled'})
          break
        case STATUS_HELD:
          label = intl.formatMessage({id: 'order_status_held'})
          break
        case STATUS_CONFIRMED:
          label = intl.formatMessage({id: 'order_status_confirmed'})
          break
        default:
          label = ''
      }

      return label
  	}

    const LabelValue = (props) => {
		if(props.style){
			return <span style={props.style}>
						<label style={{marginRight: '5px'}}>{props.label}</label>
						<span >{props.value}</span>
					</span>
		} else {
			return <span style={props.style}>
						<label style={{color: '#999', marginRight: '5px'}}>{props.label}</label>
						<span >{props.value}</span>
					</span>
		}
		
	}

  	const OrderHD = styled.div`
  		height: 40px;
  		border-bottom: 1px solid #cacaca;
  	`

  	const OrderBD = styled.div`
  		& > div{
  			&:first-child{
  				width: 30px;
  			}
  		}
  		padding-bottom: 10px;
  	`

  	const OrderFD = styled.div`
  		height: 40px;
  		border-top: 1px solid #cacaca;
  		line-height: 40px;
  		text-align: right;
  	`

  	const OrderStatus = styled.span`
  		color: #666;
  	`

  	const OrderLI = styled.li`
  		background-color: #fff;
  		padding-left: 10px;
  		padding-right: 10px;
  		cursor: pointer;
  	`

  	const OrderUL = styled.ul`
  		& > li{
  			margin-top: 10px;
  			&:first-child{
  				margin-top: 0;
  			}
  		}
  	`

  	const OrderRadio = styled.span`
  		&::before{
  			content: '\\e65a';
  			font-size: 20px;
  			display: inline-block;
  			font-family: iconfont;
  			font-style: normal;
  		}

  		&.selected{
  			&::before{
  				content: '\\e658';
  				color: #e5004f;
  			}
  		}
  	`

  	const OrderItems = styled.ul`
  		&::after{
  			content: '';
  			display: block;
  			clear: both;
  		}
  		& > li{
  			width: 33.333%;
  			float: left;
  		}
  	`

  	const OrderItem = styled.li`
  		
  		padding-right: 10px;
  		padding-top: 10px;
  		
  	`

  	const OrderImage = styled.div`
  		background-color: rgb(250, 250, 250);
  		position: relative;
  		overflow: hidden;

  		&::after{
  			margin-top: 133%;
  			content: '';
  			display: block;
  		}
  		img{
  			width: 100%;
  			position: absolute;
  			top: 50%;
  			left: 0;
  			transform: translateY(-50%);
  		}
  	`

  	const getMoney = money => money ? (money.unit + money.amount) : ''

  	return <ul className={style.new_order_list_ul}>
  		{
  			this.props.orders && this.props.orders.map(({selected, detail}) => (
  				<li className={style.new_order_list_li} key={detail.id} onClick={(evt) => { this.props.clickHandler(evt, detail) }}>
                      {/* "x-table __vm x-fw" */}
		            <div className={style.new_order_list_item_title_box}>
		              <div className="x-cell">
		                <LabelValue label={intl.formatMessage({id: 'orderno'})} value={detail.id}/>
		              </div>
		              <div className="x-cell" style={{textAlign: 'right'}}>
		                <OrderStatus>{status(detail.status)}</OrderStatus>
		              </div>
		            </div>
		            <div className={style.new_order_list_img_box}>
		              <div className={style.new_order_list_select}>
		              	{/* <OrderRadio className={selected ? 'selected' : ''}/> */}
						  {
							selected ?
							<span className={`${style.new_order_list_select_span} ${selected ? style.selected:''}`}>&#xe658;</span>:
							<span className={`${style.new_order_list_select_span} `}>&#xe65a;</span>
						  }
						
		              </div>
		              <div className={style.new_order_list_item}>
						  <ul>
							{detail.orderItems.map((item, index) => (
								<li key={index}>
									<img src={item.productImageUrl}/>
								</li>
							))}
						  </ul>
		              </div>
                    </div>
		            <div className={style.new_order_list_total_box}>
                        <FormattedMessage id="count_items" values={{count: detail.orderItems.length}}/>
		            	<LabelValue style={{color:"#222", fontWeight:'600'}} label={intl.formatMessage({id: 'ordertotal'})} value={getMoney(detail.orderTotal)}/>
		            </div>
  				</li>
  			))
  		}
  	</ul>
  }
}

export default injectIntl(NewOrderList)
