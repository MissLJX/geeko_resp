import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { refreshCart, fetchAddresses } from '../store/actions.js'
import FullFixed from '../components/msite/full-fixed.jsx'
import { injectIntl, FormattedMessage } from 'react-intl'
import Address from '../components/msite/address.jsx'
import CheckBox from '../components/checkbox.jsx'
import {Link} from 'react-router-dom'
import { __route_root__ } from '../utils/utils.js'
import {setdefaultaddress} from '../api'


const ADDRESSBODY = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 15px;
    padding-bottom: 15px;
   
    & > div{
        &:first-child{
            padding-right: 12px;
        }
    }
`

const ADDRESSBLOCK = styled.div`
    padding-left: 12px;
    padding-right: 12px;
    background-color: #fff;
    border-top: 8px solid #f7f7f7;
`

const ADDRESSFOOTER = styled.div`
    height: 44px;
    border-top: solid 1px #eeeeee;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`

const AddressBlock = props => {
    const { address } = props

    return <ADDRESSBLOCK>
        <ADDRESSBODY>
            <div>
                <Address address={address} />
            </div>
            <div>
                <CheckBox onClick={evt=>{props.onSelect(address)}} className={`${address.isDefaultAddress?'selected':''}`}/>
            </div>
        </ADDRESSBODY>
        <ADDRESSFOOTER>
            <span style={{cursor:'pointer'}} onClick={evt => {props.onEdit(address)}}>
                <span className="iconfont">&#xe62b;</span>
                <span style={{marginLeft: 5}}><FormattedMessage id="edit"/></span>
            </span>
        </ADDRESSFOOTER>
    </ADDRESSBLOCK>
}

const ADDRESSBOOKFOOTER = styled.div`
    height: 84px;
    background-color: #ffffff;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 12px;
    margin-top: 30px;
`



const mapStateToProps = (state) => {
    return {
        addresses: state.addresses
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        REFRESH: () => {
            dispatch(refreshCart())
        },
        FETCHADDRESSES: () => {
            dispatch(fetchAddresses())
        },
        SETADDRESS: address  => {
            dispatch({
                type: 'SET_ADDRESS',
                address
            })
        }
    }
}

const AddressBook = class extends React.Component {
    constructor(props) {
        super(props)
        this.close = this.close.bind(this)
    }

    close(evt) {
        evt.preventDefault()
        this.props.history.replace(`${window.ctx || ''}${__route_root__}/checkout`)
    }

    componentDidMount() {
        this.props.FETCHADDRESSES()
    }

    addressEditHandle(address){
        this.props.SETADDRESS(address)
        this.props.history.push(`${window.ctx || ''}${__route_root__}/book/address`)
    }

    selectAddressHandle(address){
        this.props.history.replace(`${window.ctx || ''}${__route_root__}/checkout`)
        setdefaultaddress(address.id).then(() => {
            this.props.REFRESH()
            this.props.FETCHADDRESSES()
        })
    }

    render() {
        const { intl, addresses } = this.props

        return <div>
            <FullFixed bodyStyle={{ backgroundColor: '#f7f7f7' }} onClose={this.close} title={intl.formatMessage({ id: 'addressbook' })}>
                <div style={{ paddingBottom: 100 }}>
                    {
                        (addresses || []).map(address => <AddressBlock onSelect={this.selectAddressHandle.bind(this)} onEdit={this.addressEditHandle.bind(this)} key={address.id} address={address} />)
                    }
                    <ADDRESSBOOKFOOTER>
                    <a style={{ 
                        display: 'block',
                        backgroundColor: '#222',
                        color: '#fff',
                        height: 40,
                        lineHeight: '40px',
                        textAlign: 'center',
                        outline: 'none',
                        border: 'none',
                        width: '100%',
                        fontSize: 16,
                        fontFamily: 'AcuminPro-Bold',
                        textTransform: 'capitalize',
                        textDecoration: 'none'
                    }} onClick={
                        () => {
                            this.props.SETADDRESS(null)
                            this.props.history.push(`${window.ctx || ''}${__route_root__}/book/address`)
                        }
                    }>
                        + {intl.formatMessage({ id: 'add_new_address' })}
                    </a>
                </ADDRESSBOOKFOOTER>
                </div>
                
            </FullFixed>
            
        </div>
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(AddressBook))