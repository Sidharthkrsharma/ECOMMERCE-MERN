import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
import { ProcessPaymentApi } from "../../../Api/PaymentApis/paymentapi";
import { AddOrderApi } from "../../../Api/orderAPi/Orderapi";


// payment slice
export const paymentProcess = createAsyncThunk("paymentProcess",async(data)=>{
    try {
        const response = await ProcessPaymentApi(data);

        if(response.status == 200){
            return response.data
        }else{
            toast.error(response.response.data.error);
        }
    } catch (error) {
        throw error;
    }
});

// Order slice
export const Order = createAsyncThunk("Order",async(data)=>{
    try {
        const response = await AddOrderApi(data);

        if(response.status == 200){
            toast.success("your payment sucessfully completed");

            return response.data
        }else{
            toast.error(response.response.data.error);
        }
    } catch (error) {
        throw error;
    }
});

// create reducer and action
export const PaymentSlice = createSlice({
    name:"PaymentSlice",
    initialState:{
        payment:[],
        ordersucess:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        // payment process
        builder.addCase(paymentProcess.pending,(state)=>{
            state.loading = true;
        })
        .addCase(paymentProcess.fulfilled,(state,action)=>{
            state.loading = false;
            state.payment = action.payload;
        })
        .addCase(paymentProcess.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Order
        .addCase(Order.pending,(state)=>{
            state.loading = true;
        })
        .addCase(Order.fulfilled,(state,action)=>{
            state.loading = false;
            state.ordersucess = action.payload;
        })
        .addCase(Order.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    


    }
});

export default PaymentSlice.reducer;