import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';
import { DeleteuserApi, forgotpasswordApi, forgotpasswordverifyApi, getAlluserApi, loginApi, registerApi, resetpasswordApi, userLoggedInApi, userLogoutApi, usercontactApi } from "../../../Api/UserApis/userApi";
import { AddtoCartApi, DeletecartDataApi, GetUserCartApi, RemoveAllCartItemsApi, RemoveSingleCartItemsApi } from "../../../Api/cartApis/cartApi";
import { userordersApi } from "../../../Api/orderAPi/Orderapi";


// user registerSlice
export const UserRegister = createAsyncThunk("UserRegister",async(data)=>{
    try {
        const response = await registerApi(data.data,data.config);

        if(response.status == 200){
            toast.success("User Succesfully Registerd!")
            
            return response.data
        }else{
            toast.error(response.response.data.error);
        }
    } catch (error) {
        throw error;
    }
});

// userlogin  Slice
export const userlogin = createAsyncThunk("userlogin",async(data)=>{
    try {
        const response = await loginApi(data);
        

        if(response.status == 200){
            localStorage.setItem("usertoken",response.data.token);
            toast.success("User Succesfully Login!")
            
            return response.data
        }else{
            toast.error(response.response.data.error);
        }
    } catch (error) {
        throw error;
    }
});

// userVerify  Slice
export const userVerify = createAsyncThunk("userVerify",async(thunkApi)=>{
    try {
        const response = await userLoggedInApi();
        

        if(response.status == 200){
            
            return response.data
        }else{
            return thunkApi.rejecWithValue("error")
        }
    } catch (error) {
        throw error;
    }
});

// uselogoutfun  Slice
export const uselogoutfun = createAsyncThunk("uselogoutfun",async(thunkApi)=>{
    try {
        const response = await userLogoutApi();
        

        if(response.status == 200){
            toast.success("User Logout Done")
            localStorage.removeItem("usertoken")
            return response.data
        }else{
            toast.success("User Logout Done")
            localStorage.removeItem("usertoken")
            return thunkApi.rejectWithValue("error");
        }
    } catch (error) {
        throw error;
    }
});

// forgotpassword  Slice
export const forgotpassword = createAsyncThunk("forgotpassword",async(data)=>{
    try {
        const response = await forgotpasswordApi(data);
       

        if(response.status == 200){
            toast.success("Password Reset Link Send In Your Email Please Check")
           
            return response.data
        }else{
            toast.error("Invalid details")
            
            
        }
    } catch (error) {
        throw error;
    }
});


// forgotpasswordvalid  Slice
export const forgotpasswordvalid = createAsyncThunk("forgotpasswordvalid",async(data)=>{
    try {
        const response = await forgotpasswordverifyApi(data);


        if(response.status == 200){
            return response.data
        }else{
            toast.error("Your Link Expired, Please Generate New Link")
        }
    } catch (error) {
        throw error;
    }
});

// forgotpasswordvalid  Slice
export const resetpasswordfunc = createAsyncThunk("resetpasswordfunc",async(data)=>{
    try {
        const response = await resetpasswordApi(data);
        

        if(response.status == 200){
            toast.success(response.data.message)
            return response.data
        }else{
            toast.error("Your Link Expired, Please Generate New Link")
        }
    } catch (error) {
        throw error;
    }
});


// AddtoCart  Slice
export const AddtoCart = createAsyncThunk("AddtoCart",async(data)=>{
    try {
        const response = await AddtoCartApi(data);
        

        if(response.status == 200){
            toast.success(response.data.message)
            return response.data
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        throw error;
    }
});

// usercart  Slice
export const usercart = createAsyncThunk("usercart",async(thunkApi)=>{
    try {
        const response = await GetUserCartApi();
        

        if(response.status == 200){
            return response.data
        }else{
            return thunkApi.rejecWithValue("error")
        }
    } catch (error) {
        throw error;
    }
});

// removeSingle  Slice
export const removeSingle = createAsyncThunk("removeSingle",async(data)=>{
    try {
        const response = await RemoveSingleCartItemsApi(data);
       

        if(response.status == 200){
            toast.success(response.data.message)
            return response.data
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        throw error;
    }
});

// removeItem  Slice
export const removeItem = createAsyncThunk("removeItem",async(data)=>{
    try {
        const response = await RemoveAllCartItemsApi(data);
        

        if(response.status == 200){
            toast.success(response.data.message)
            return response.data
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        throw error;
    }
});

// getAlluser  Slice
export const getAlluser = createAsyncThunk("getAlluser",async(data)=>{
    try {
        const response = await getAlluserApi(data);
        

        if(response.status == 200){
            return response.data
        }else{
console.log("error")
        }
    } catch (error) {
        throw error;
    }
});

// deleteuser  Slice
export const deleteuser = createAsyncThunk("deleteuser",async(data)=>{
    try {
        console.log("ddddddddd",data)
        const response = await DeleteuserApi(data);
        

        if(response.status == 200){
            toast.success("User delete Sucessfully")
            return response.data
        }else{
            toast.error("Error")
        }
    } catch (error) {
        throw error;
    }
});

// Deletecartdata  Slice
export const Deletecartdata = createAsyncThunk("Deletecartdata",async(thunkApi)=>{
    try {
        
        const response = await DeletecartDataApi();
        

        if(response.status == 200){
            return response.data
        }else{
            return thunkApi.rejecWithValue("error")
        }
    } catch (error) {
        throw error;
    }
});

// userorders  Slice
export const userorders = createAsyncThunk("userorders",async(thunkApi)=>{
    try {
        
        const response = await userordersApi();
        

        if(response.status == 200){
            return response.data
        }else{
            return thunkApi.rejecWithValue("error")
        }
    } catch (error) {
        throw error;
    }
});


// usercontact  Slice
export const usercontact = createAsyncThunk("usercontact",async(data)=>{
    try {
        
        const response = await usercontactApi(data);
        

        if(response.status == 200){
            toast.success("Your Message Save")

            return response.data
        }else{
            toast.error(response.response.data.error)
        }
    } catch (error) {
        throw error;
    }
});




// create reducer and action
export const UserSlice = createSlice({
    name:"UserSlice",
    initialState:{
        getAlluserData:[],
        DeleteUser:[],
       registeruser:[],
       loginuser:[],
       UserLoggedIn:[],
       UserLogout:[],
       forgotpasswordsend:[],
       forgotpasswordverifyData:[],
       resetpasswordData:[],
       AddCart:[],
       userCartData:[],
       removesingleCart:[],
       removeCart:[],
       DeleteCartData:[],
       userOrderData:[],
       userContactData:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        // user register
        builder.addCase(UserRegister.pending,(state)=>{
            state.loading = true;
        })
        .addCase(UserRegister.fulfilled,(state,action)=>{
            state.loading = false;
            state.registeruser = action.payload;
        })
        .addCase(UserRegister.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })


        // user login
        .addCase(userlogin.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userlogin.fulfilled,(state,action)=>{
            state.loading = false;
            state.loginuser = action.payload;
        })
        .addCase(userlogin.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // getAlluser 
        .addCase(getAlluser.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getAlluser.fulfilled,(state,action)=>{
            state.loading = false;
            state.getAlluserData = action.payload;
        })
        .addCase(getAlluser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // deleteuser
        .addCase(deleteuser.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteuser.fulfilled,(state,action)=>{
            state.loading = false;
            state.DeleteUser = [action.payload];
        })
        .addCase(deleteuser.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })


        // user verify Api
        .addCase(userVerify.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userVerify.fulfilled,(state,action)=>{
            state.loading = false;
            state.UserLoggedIn = [action.payload];
        })
        .addCase(userVerify.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // uselogoutfun Api
        .addCase(uselogoutfun.pending,(state)=>{
            state.loading = true;
        })
        .addCase(uselogoutfun.fulfilled,(state,action)=>{
            state.loading = false;
            state.UserLogout = [action.payload];
            state.UserLoggedIn = [];
            state.userCartData = [];
        })
        .addCase(uselogoutfun.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // forgotpassword Api
        .addCase(forgotpassword.pending,(state)=>{
            state.loading = true;
        })
        .addCase(forgotpassword.fulfilled,(state,action)=>{
            state.loading = false;
            state.forgotpasswordsend = action.payload;
           
        })
        .addCase(forgotpassword.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // forgotpasswordvalid Api
        .addCase(forgotpasswordvalid.pending,(state)=>{
            state.loading = true;
        })
        .addCase(forgotpasswordvalid.fulfilled,(state,action)=>{
            state.loading = false;
            state.forgotpasswordverifyData = action.payload;
           
        })
        .addCase(forgotpasswordvalid.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // resetpasswordfunc Api
        .addCase(resetpasswordfunc.pending,(state)=>{
            state.loading = true;
        })
        .addCase(resetpasswordfunc.fulfilled,(state,action)=>{
            state.loading = false;
            state.resetpasswordData = action.payload;
           
        })
        .addCase(resetpasswordfunc.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // AddtoCart Api
        .addCase(AddtoCart.pending,(state)=>{
            state.loading = true;
        })
        .addCase(AddtoCart.fulfilled,(state,action)=>{
            state.loading = false;
            state.AddCart = action.payload;
           
        })
        .addCase(AddtoCart.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // usercart Api
        .addCase(usercart.pending,(state)=>{
            state.loading = true;
        })
        .addCase(usercart.fulfilled,(state,action)=>{
            state.loading = false;
            state.userCartData = action.payload;
           
        })
        .addCase(usercart.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })


        // removeSingle Api
        .addCase(removeSingle.pending,(state)=>{
            state.loading = true;
        })
        .addCase(removeSingle.fulfilled,(state,action)=>{
            state.loading = false;
            state.removesingleCart = action.payload;
           
        })
        .addCase(removeSingle.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // removeItem Api
        .addCase(removeItem.pending,(state)=>{
            state.loading = true;
        })
        .addCase(removeItem.fulfilled,(state,action)=>{
            state.loading = false;
            state.removeCart = action.payload;
           
        })
        .addCase(removeItem.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        
        // Deletecartdata Api
        .addCase(Deletecartdata.pending,(state)=>{
            state.loading = true;
        })
        .addCase(Deletecartdata.fulfilled,(state,action)=>{
            state.loading = false;
            state.DeleteCartData = action.payload;
           
        })
        .addCase(Deletecartdata.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // userorders Api
        .addCase(userorders.pending,(state)=>{
            state.loading = true;
        })
        .addCase(userorders.fulfilled,(state,action)=>{
            state.loading = false;
            state.userOrderData = action.payload;
           
        })
        .addCase(userorders.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // usercontact Api
        .addCase(usercontact.pending,(state)=>{
            state.loading = true;
        })
        .addCase(usercontact.fulfilled,(state,action)=>{
            state.loading = false;
            state.userContactData = action.payload;
           
        })
        .addCase(usercontact.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })


    }
});

export default UserSlice.reducer;