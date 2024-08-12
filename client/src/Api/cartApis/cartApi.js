import { BASE_URL } from "../helper";
import { commonrequest } from "../Commonrequest";


// add to cart api
export const AddtoCartApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/carts/api/addtocart/${data}`,{},header,"user");
}

// GetUserCartApi api
export const GetUserCartApi = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/carts/api/getcarts`,"",header,"user");
}

// RemoveSingleCartItemsApi api
export const RemoveSingleCartItemsApi = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_URL}/carts/api/removesingleiteam/${data}`,{},header,"user");
}

// RemoveAllCartItemsApi api
export const RemoveAllCartItemsApi = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_URL}/carts/api/removeiteams/${data}`,{},header,"user");
}

// DeletecartDataApi api
export const DeletecartDataApi = async(data,header)=>{
    return await commonrequest("DELETE",`${BASE_URL}/carts/api/removecartdata`,{},header,"user");
}

