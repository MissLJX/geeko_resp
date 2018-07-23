import React from 'react'
import styled from 'styled-components'
import FullFixed from '../components/msite/full-fixed.jsx'
import MercadoBinding from '../components/mercado-binding.jsx'
import { connect } from 'react-redux'
import {getMercadoCards} from '../store/actions.js'
import {Boxs, Box} from '../components/msite/layout.jsx'
import {removeMercadoCard} from '../api'
import {__route_root__} from '../utils/utils.js'

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    GETMERCADOCARDS: () => {
      dispatch(getMercadoCards())
    }
  }
}

const CardInfos = styled.div`
    width: 80%;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    & > img{
      width: 100%;
    }
`

const Card = styled.li`
  height: 50px;
  & > div{
    height: 100%;
  }
`

const CardUL = styled.ul`
  & > li{
    border-top: 1px solid #e5e5e5;
    &:first-child{
      border-top: none;
    }
  }
`

const CardBD = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 100px;
`

const CardHD = styled.h1`
  padding-left: 10px;
  padding-right: 10px;
  font-weight: 400;
  font-size: 16px;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #e5e5e5;
`

const DeleteIcon = styled.span`
  width: 22px;
  height: 22px;
  background-color: #999;
  border-radius: 50%;
  font-size: 14px;
  display: inline-block;
  cursor: pointer;
  color: #fff;
  text-align: center;
  line-height: 22px;
`

const Mercado = class extends React.Component {
  constructor (props) {
  	super(props)
  	this.close = this.close.bind(this)
    this.deletecard = this.deletecard.bind(this)
  }

  close (evt) {
  	evt.preventDefault()
    this.props.history.replace(`${window.ctx || ''}${__route_root__}/`)
  }

  addcardback () {
    this.props.GETMERCADOCARDS()
    this.props.history.replace(`${window.ctx || ''}${__route_root__}/`)
  }

  deletecard (cardId) {
    removeMercadoCard(cardId).then(() => {
      this.props.GETMERCADOCARDS()
    }).catch((e) => {
      console.log(e)
    })
  }

  componentDidMount () {
    this.props.GETMERCADOCARDS()
  }

  render () {
    const state = this.props.location.state
    const exsiting = state ? state.exsiting : false

  	return <FullFixed onClose={this.close} title="Tarjeta de crédito o débito">
      <Boxs style={{backgroundColor: '#e5e5e5'}}>
        <Box style={{paddingBottom: 20}}>
          <CardInfos>
            <img src="https://dgzfssf1la12s.cloudfront.net/shoppingcart/maxicocard.png"/>
          </CardInfos>
          <MercadoBinding cart={this.props.cart} email={this.props.me ? this.props.me.email : ''} addcardback={this.addcardback.bind(this)} exsiting={exsiting}/>
        </Box>

        {
          this.props.mercadocards && this.props.mercadocards.length > 0 && (
            <Box>
              <CardHD>Cards</CardHD>

              <CardBD>
                <CardUL>
                  {
                    this.props.mercadocards.map(({isSelected, quickpayRecord}) => <Card key={quickpayRecord.id}>
                      <div className="x-table __fixed __vm x-fw">
                        <div className="x-cell">
                          {quickpayRecord.cardNumber}
                        </div>
                        <div className="x-cell __right" style={{width: 50}}>
                          <DeleteIcon onClick={(evt) => { this.deletecard(quickpayRecord.quickpayId) }} className="iconfont">&#xe731;</DeleteIcon>
                        </div>
                      </div>
                    </Card>)
                  }

                </CardUL>
              </CardBD>
            </Box>

          )
        }

      </Boxs>
      <div style={{height: 100}}></div>
    </FullFixed>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Mercado)
