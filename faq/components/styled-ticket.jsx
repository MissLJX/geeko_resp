import styled from 'styled-components'

export const OrderSelector = styled.div`
      height: 67px;
      & > a{
        display: block;
        text-decoration: none;
        color: #222;
      }
      line-height: 67px;

      i{
        float: right;
      }
      span{
        font-size: 16px;
      }
    `

export const LabelValueContainer = styled.div`
      padding: 15px 0;
      & > div{
        margin-top: 5px;
        &:first-child{
          margin-top: 0;
        }

      }
    `

export const OrderInfoContainer = styled.div`
      padding: 0 10px;
      background-color: #fff;
    `

export const ChatTip = styled.div`
  		padding: 5px;
  		
  		background-color: ${props => props.tipColor};
  		border-radius: 5px;
  		display: inline-block;

  		&.buyer{
  			background-color: #1a95d3;
  			color: #fff;
  		}

  		&.seller{
  			background-color: #efefef;
  			color: #999;
  		}

  		img{
  			display: block;
  			width: 100%;
  		}

  		max-width: calc(90% - 60px);
  	`
export const ChatRow = styled.div`
  		&::after{
  			content: '';
  			display: block;
  			clear: both;
  		}
  		&.seller{
  			& > div{
  				float: left;
  				&:last-child{
  					margin-left: 10px;
  				}
  			}
  		}

  		&.buyer{
  			& > div{
  				float: right;
  				&:first-child{
  					margin-left: 10px;
  				}
  			}
  		}
  	`

  	export const ChatRows = styled.div`
  		& > div{
  			margin-top: 15px;
  			&:first-child{
  				margin-top: 0;
  			}
  		}
  	`

  	export const Chat = styled.div`
  		background-color: #fff;
  		padding-left: 10px;
  		padding-right: 10px;
  		padding-bottom: 10px;
  	`

export const ChatContainer = styled.div`
      & > div{
        &:nth-child(1){
          height: 200px;
          overflow: hidden;
        }
        &:nth-child(3){
          height: 140px;
          overflow: hidden;
        }
        &:nth-child(2){
          height: calc(100vh - 340px);
          overflow: auto;
        }
      }
    `

export const ChatSendor = styled.div`
      background-color: #fff;
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 10px;
    `

export const ImageLoader = styled.div`
      width: 40px;
      height: 30px;
      border-radius: 3px;
      border: 1px solid #d6d6d6;
      background: url(https://dgzfssf1la12s.cloudfront.net/site/pc/icon61.png) center/60% no-repeat;

      & > input{
        width: 40px;
        height: 30px;
        opacity: 0;
        filter: Alpha(opacity=0);
        -webkit-appearance: none;
        outline: none;
        box-shadow: none;
      }

`
