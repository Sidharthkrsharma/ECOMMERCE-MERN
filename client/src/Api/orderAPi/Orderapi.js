import { BASE_URL } from "../helper";
import { commonrequest } from "../Commonrequest";


// AddOrderApi api
export const AddOrderApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/order/api/addorders`,data,header,"user");
}

// userordersApi api
export const userordersApi = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/order/api/getuserorders`,"",header,"user");
}

// GetOrdersApi api
export const GetOrdersApi = async(data,header)=>{
    return await commonrequest("GET",`${BASE_URL}/order/api/orders`,"",header,"admin");
}


// OrdersUpdatestatusApi api
export const OrdersUpdatestatusApi = async(data,header)=>{
    return await commonrequest("PUT",`${BASE_URL}/order/api/orders/${data.orderid}`,data,header,"admin");
}


