import { BASE_URL } from "../helper";
import { commonrequest } from "../Commonrequest";


// ProcessPaymentApi api
export const ProcessPaymentApi = async(data,header)=>{
    return await commonrequest("POST",`${BASE_URL}/checkout/api/payment`,data,header,"user");
}


