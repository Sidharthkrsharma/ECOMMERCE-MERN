import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AddCategoryApi,AddProductsApi,AddReviewApi,DeleteProductApi,
    GetCategoryApi, GetLatestProductsApi, GetProductsApi,
     GetSingleProductApi, ProductReviewDeleteApi, ProductReviewgetApi } from "../../../Api/ProductApis/Productapi";
import toast from 'react-hot-toast';



// Admin AdminAddCategory Slice
export const AdminAddCategory = createAsyncThunk("AdminAddCategory",async(data)=>{
    try {
        const response = await AddCategoryApi(data);

        if(response.status == 200){
            toast.success("Category Succesfully Added!")
            
            return response.data
        }else{
            toast.error(response.response.data.error);
        }
    } catch (error) {
        throw error;
    }
});


// GetCategory Slice
export const getCategory = createAsyncThunk("getCategory",async(thunkApi)=>{
    try {
        const response = await GetCategoryApi();

        if(response.status == 200){
            
            return response.data
        }else{
            // toast.error(response.response.data.error);
            return thunkApi.rejectWithValue("error");
        }
    } catch (error) {
        throw error;
    }
});


// Add Product Slice
export const AddProductsslice = createAsyncThunk("AddProducts",async(data)=>{
    try {
        const response = await AddProductsApi(data.data,data.categoryId,data.config);

        if(response.status == 200){
            toast.success("Product Added")
            return response.data
        }else{
            toast.error(response.response.data.error);
           
        }
    } catch (error) {
        throw error;
    }
});


// get Product Slice
export const getAllProducts = createAsyncThunk("getAllProducts",async(data)=>{
    try {
        const response = await GetProductsApi(data);

        if(response.status == 200){
            return response.data
        }else{
            toast.error(response.response.data.error);
           
        }
    } catch (error) {
        throw error;
    }
});


//  getLatestProducts Slice
export const getLatestProducts = createAsyncThunk("getLatestProducts",async(thunkApi)=>{
    try {
        const response = await GetLatestProductsApi();

        if(response.status == 200){
            return response.data
        }else{
            return thunkApi.rejectWithValue("error");

            // toast.error(response.response.data.error);
           
        }
    } catch (error) {
        throw error;
    }
});


// delete product Slice
export const deleteProduct = createAsyncThunk("deleteProduct",async(data)=>{
    try {
        const response = await DeleteProductApi(data);

        if(response.status == 200){
            toast.success("Product Delete Sucessfully");
            return response.data
        }else{
            toast.error("Error");
           
        }
    } catch (error) {
        throw error;
    }
});

// getSingleProducts Slice
export const getSingleProducts = createAsyncThunk("getSingleProducts",async(data)=>{
    try {
        const response = await GetSingleProductApi(data);

        if(response.status == 200){
            return response.data
        }else{
            toast.error("Error");
           
        }
    } catch (error) {
        throw error;
    }
});


// Addreview Slice
export const Addreview = createAsyncThunk("Addreview",async(data)=>{
    try {
        const response = await AddReviewApi(data);

        if(response.status == 200){
            toast.success("Review Sucessfully Added")
            return response.data
        }else{
            toast.error("Error");
           
        }
    } catch (error) {
        throw error;
    }
});


// productreview Slice
export const productreview = createAsyncThunk("productreview",async(data)=>{
    try {
        const response = await ProductReviewgetApi(data);

        if(response.status == 200){
            return response.data
        }else{
            // toast.error("Error");
            console.log("errr")
           
        }
    } catch (error) {
        throw error;
    }
});

// reviewDelete Slice
export const reviewDelete = createAsyncThunk("reviewDelete",async(data)=>{
    try {
        const response = await ProductReviewDeleteApi(data);

        if(response.status == 200){
            toast.success("Review Sucessfully Delete")
            return response.data
        }else{
            toast.error("Error");
        }
    } catch (error) {
        throw error;
    }
});

// create reducer and action
export const ProductSlice = createSlice({
    name:"ProductSlice",
    initialState:{
        addCategoryData:[],
        CategoryData:[],
        AddProducts:[],
        ProductsData:[],
        DeleteProducts:[],
        LatestProducts:[],
        singleProducts:[],
        addProductReview:[],
        deleteReview:[],
        ProductReview:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        // Admin AdminAddCategory
        builder.addCase(AdminAddCategory.pending,(state)=>{
            state.loading = true;
        })
        .addCase(AdminAddCategory.fulfilled,(state,action)=>{
            state.loading = false;
            state.addCategoryData = action.payload;
        })
        .addCase(AdminAddCategory.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // getcategory
        .addCase(getCategory.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getCategory.fulfilled,(state,action)=>{
            state.loading = false;
            state.CategoryData = action.payload;
        })
        .addCase(getCategory.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })


        // AddProductsslice
        .addCase(AddProductsslice.pending,(state)=>{
            state.loading = true;
        })
        .addCase(AddProductsslice.fulfilled,(state,action)=>{
            state.loading = false;
            state.AddProducts = action.payload;
        })
        .addCase(AddProductsslice.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })


        // getAllProducts slice
        .addCase(getAllProducts.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getAllProducts.fulfilled,(state,action)=>{
            state.loading = false;
            state.ProductsData = action.payload;
        })
        .addCase(getAllProducts.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // deleteProduct slice
        .addCase(deleteProduct.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteProduct.fulfilled,(state,action)=>{
            state.loading = false;
            state.DeleteProducts = [action.payload];
        })
        .addCase(deleteProduct.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // getLatestProducts slice
        .addCase(getLatestProducts.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getLatestProducts.fulfilled,(state,action)=>{
            state.loading = false;
            state.LatestProducts = action.payload;
        })
        .addCase(getLatestProducts.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // getSingleProducts slice
        .addCase(getSingleProducts.pending,(state)=>{
            state.loading = true;
        })
        .addCase(getSingleProducts.fulfilled,(state,action)=>{
            state.loading = false;
            state.singleProducts = [action.payload];
        })
        .addCase(getSingleProducts.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })


        // Addreview slice
        .addCase(Addreview.pending,(state)=>{
            state.loading = true;
        })
        .addCase(Addreview.fulfilled,(state,action)=>{
            state.loading = false;
            state.addProductReview = [action.payload];
        })
        .addCase(Addreview.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // productreview slice
        .addCase(productreview.pending,(state)=>{
            state.loading = true;
        })
        .addCase(productreview.fulfilled,(state,action)=>{
            state.loading = false;
            state.ProductReview = action.payload;
        })
        .addCase(productreview.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // reviewDelete slice
        .addCase(reviewDelete.pending,(state)=>{
            state.loading = true;
        })
        .addCase(reviewDelete.fulfilled,(state,action)=>{
            state.loading = false;
            state.deleteReview = [action.payload];
        })
        .addCase(reviewDelete.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })


    }
});

export default ProductSlice.reducer;