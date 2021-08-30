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
      &.invalid{
        & > a{
          color: red;
        }
      }
    `

export const LabelValueContainer = styled.div`
      padding: 15px 0;
      position: relative;
      & > div{
        margin-top: 5px;
        &:first-child{
          margin-top: 0;
        }

      }

      & > a{
        cursor: pointer;
        font-size: 18px;
        position: absolute;
        right: 10px;
        top: calc(50% - 9px);
        text-decoration: none;
        color: #222;
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
      position: relative;
      top: 5px;
      min-width: 30px;
      min-height: 38px;
      padding: 12px 18px;
  

  		&.buyer{
  			background-color: #e6e6e6;
  			color: #222;
        position:relative;
        
        &::after{
          content: "";
          position: absolute;
          color: #000;
          width: 0;
          height: 0;
          top: 16px;
          right: -4px;
          border-top: 3px solid transparent;
          border-left: 4px solid #e6e6e6;
          border-bottom: 3px solid transparent;
        }
  		}

  		&.seller{
  			background-color: #FFF;
  			color: #222;
        position:relative;
        &::after{
          content: "";
          position: absolute;
          color: #000;
          width: 0;
          height: 0;
          top: 16px;
          left: -4px;
          border-top: 3px solid transparent;
          border-right: 4px solid #fff;
          border-bottom: 3px solid transparent;
        }
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
  		// background-color: #fff;
  		padding-left: 10px;
  		padding-right: 10px;
  		padding-bottom: 10px;
  	`

export const ChatContainer = styled.div`
      & > div{
        // &:nth-child(1){
        //   height: 200px;
        //   overflow: hidden;
        // }
        // &:nth-child(3){
        //   height: 140px;
        //   overflow: hidden;
        // }
        // &:nth-child(2){
        //   height: calc(100vh - 390px);
        //   overflow: auto;
        // }
      }
    `

export const ChatSendor = styled.div`
      background-color: #fff;
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 10px;

      textarea{
        &.invalid{
          box-shadow: inset 0 0 1px red !important;
          border-color: red !important;
        }
      }
    `

export const ImageLoader = styled.div`
      width: 40px;
      height: 30px;
      border-radius: 3px;
      border: 1px solid #d6d6d6;
      background: url(https://image.geeko.ltd/site/pc/icon61.png) center/60% no-repeat;

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
