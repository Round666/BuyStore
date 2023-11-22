import axios from './axios'
export const Carousel = async()=>{
    return await axios('/api/resource/carousel','post');
}

export const PromoProduct = async(categoryName)=>{
    return await axios('/api/product/getPromoProduct','post',{categoryName})
}

export const HotProduct = async(categoryName)=>{
    return await axios('/api/product/getHotProduct','post',{categoryName})
}