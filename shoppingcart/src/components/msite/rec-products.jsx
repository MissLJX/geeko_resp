import React from 'react'
import {FormattedMessage} from 'react-intl'
import {SwiperNormalProducts} from './product-items.jsx'
import {Swiper, SwiperSlide} from 'swiper/react'
import styled from 'styled-components'

const TAB = styled.span`
  font-size: 12px;
  color: #999;

  &.active {
    font-family: AcuminPro-Bold;
    color: #222;
  }
`

const ALSOLIKES = styled.div`
  & > .__hd {
    height: 40px;
    line-height: 42px;
    font-family: AcuminPro-Bold;
    font-size: 14px;
    color: #121314;
  }

  & > .__bd {
    padding-bottom: 12px;
  }

  padding-left: 12px;
`

const initialOpts = {
	slidesPerView: 'auto',
	spaceBetween: 27
}

export default class extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			selectedRec: this.props.recs[0]
		}
	}

	alsoRef(c) {
		if (window.sourceObserver && c && !this.alsolink) {
			window.sourceObserver.observe(c)
			this.alsolink = c
		}
	}

	render() {
		const {recs} = this.props
		const {selectedRec} = this.state
		return <ALSOLIKES innerRef={this.alsoRef.bind(this)} data-source type="shopping_cart_match_with"
			data-column="shopping_cart_match_with" data-title="shoppingcart"
			data-type="shopping_cart_match_with" data-content="You Might Like to Fill it With"
			data-position="2">
			<div className="__hd">
				<FormattedMessage id="you_can_match_width"/>
			</div>
			{
				recs && recs.length > 1 && <Swiper {...initialOpts} style={{marginBottom: 12}}>
					{
						recs && recs.map((rec, index) => <SwiperSlide style={{width: 'auto'}} key={rec.name}>
							<TAB onClick={evt => {
								this.setState({selectedRec: rec})
							}}
							className={`${rec.name === this.state.selectedRec.name ? 'active' : ''}`}>{rec.name}</TAB>
						</SwiperSlide>)
					}
				</Swiper>
			}
			<div className="__bd">
				{
					selectedRec && selectedRec.products && selectedRec.products.length > 0 &&
                    <SwiperNormalProducts requestId={selectedRec.requestId} column={selectedRec.name} onSelect={this.props.onSelect}
                    	products={this.state.selectedRec.products}/>
				}
			</div>
		</ALSOLIKES>
	}
}