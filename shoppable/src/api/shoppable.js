import http from './api'

export const getproducts = (skip, limit) => http.get(`/v7/product/anon/${skip}/${limit}/shoppable-products2`);

export const getgroupproducts = (groupId) => http.get(`/v7/product/anon/${groupId}/get-group-products`);

export const addtocart = (variantIds) => http.get('/v7/shopping-cart/add-bundling',{variantIds,qty:1});

export const getthemeproducts = (skip,limit)=>http.get(`/v7/collection/anon/${skip}/${limit}/shoppable-collections`);