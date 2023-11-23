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

export const Category = async()=>{
    return await axios('/api/product/getCategory','post')
}

export const AllProduct = async(currentPage,pageSize)=>{
    return await axios('/api/product/getAllProduct','post',{
        currentPage,
        pageSize
    })
}

export const ProductByCategory = async(currentPage,pageSize,categoryID)=>{
    return await axios('/api/product/getProductByCategory','post',{
        categoryID,
        currentPage,
        pageSize
    })
}

export const ProductBySearch = async(search,currentPage,pageSize)=>{
    return await axios('/api/product/getProductBySearch','post',{
        search,
        currentPage,
        pageSize
    })
}