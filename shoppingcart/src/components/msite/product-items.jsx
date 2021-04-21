import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { NormalProduct } from './product-item'


export const SwiperNormalProducts = props => {
    const { products, options } = props
    const initialOpts = {
        slidesPerView: 3.2,
        spaceBetween: 10
    }

    return <Swiper {...initialOpts} {...(options||{})}>
            {
                products && products.map((product, index) => <SwiperSlide key={product.id}>
                    <NormalProduct {...props} product={product} position={index+1}/>
                </SwiperSlide>)
            }
    </Swiper>
}