import React from 'react'

import '../css/share.css'

import { Modal } from '../components/pc/modal.jsx'
import styled from 'styled-components'

import { getFaceBookUrl, getShareInputUrl } from '../api/index.js'

import Clipboard from 'react-clipboard.js'

const ADDRESSBODY = styled.div`
  padding: 30px;
  background-color: #fff;
  width: 696px;
`

const ADDRESSTITLE = styled.div`
  font-family: HelveticaNeue-Medium;
  font-size: 20px;
  color: #222;
`

const CopySharePC = class extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            inputValue: "",
        };
    }


    componentWillMount() {
        // inputValue
		getShareInputUrl().then(data => {
			// console.log("getShareInputUrl", data);
			this.setState({
				inputValue: window.siteUrl + "/i/share/register?key=" + data.result
			});

		});

    }

    close(evt) {
        evt.preventDefault()
        this.props.history.goBack();
    }

    copied() {
		alert('Copiado com sucesso')
	}

    render() {
        return (
            <Modal onClose={this.close.bind(this)}>
                <ADDRESSBODY>
                    <ADDRESSTITLE>
                        {"Share Link"}
                    </ADDRESSTITLE>
                    <div >
                        {/* <span className="iconfont" id="close-copy" style={{position:'absolute',right: '10px', top:'10px',fontSize:'25px',cursor:'pointer'}}>&#xe69a;</span> */}
                        <div style={{color: '#666',marginTop:'20px'}}>Here is your personal link:</div>
                        <div style={{marginTop:'8px'}}>
                            <input  className="share-input-pc" type="text" value={this.state.inputValue} />
                        </div>
                        <div>
                        <Clipboard onSuccess={this.copied.bind(this)} className="share-email-button cbtn" style={{border: 'none', outline: 'none', boxShadow: 'none' }} data-clipboard-text={this.state.inputValue}>
                            Copy Link
						</Clipboard>
                            
                        </div>
                    </div>
                </ADDRESSBODY>
            </Modal>
        )
    }
}

export default CopySharePC;
