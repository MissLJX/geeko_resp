import React, {useState} from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {IMAGE_PREFIX} from '../../utils/constants'
import styled from 'styled-components'
import ReactDOM from 'react-dom'

const IMAGEDISPLAY = styled.div`
	display: block;
	position: fixed;
	width: 100%;
	height: 100%;
	background-color: #000;
	left: 0;
	top: 0;
	z-index: 100;
	display: flex;
	align-items: center;
	
`

const CLOSE = styled.span`
	display: inline-block;
	width: 25px;
	height: 25px;
	border-radius: 50%;
	right: 12px;
	top: 12px;
	color: #222;
	&:active{
		color: #000;
	}
	cursor: pointer;
	font-family: iconfont;
	font-size: 12px;
	text-align: center;
	line-height: 25px;
	position: absolute;
	background-color: #fff;
`

export const ImageDisplayer = props => {
	const { images, selectedImage } = props
	const [ initialSlide, setInitialSlide ] = useState((images||[]).indexOf(selectedImage) || 0)

	const closeHandle = () => {
		document.body.removeChild(document.getElementById('imageRoot'))
	}

	const initialOpts = {
		initialSlide
	}

	return <IMAGEDISPLAY>
		<Swiper {...initialOpts}>
			{
				images && images.map((image, index) => <SwiperSlide key={index}>
					<img style={{display:'block', width:'100%'}} src={`${IMAGE_PREFIX}/original/${image}`}/>
				</SwiperSlide>)
			}
		</Swiper>
		<CLOSE onClick={closeHandle}>&#xe6af;</CLOSE>
	</IMAGEDISPLAY>
}

export const imageClick = (image, images) => {
	let imageRoot = document.getElementById('imageRoot')
	if(!imageRoot){
		imageRoot = document.createElement('div')
		imageRoot.id = 'imageRoot'
		document.body.appendChild(imageRoot)
	}
	imageRoot.innerHTML=''
	ReactDOM.render(<ImageDisplayer selectedImage={image} images={images}/>, imageRoot)
}