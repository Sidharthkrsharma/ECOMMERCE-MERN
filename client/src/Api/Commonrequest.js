import axios from "axios";

export const commonrequest = async (methods, url, body, header, auth) => {

    const admintoken = localStorage.getItem("admintoken");
    const usertoken = localStorage.getItem("usertoken");

    let config = {
        method: methods,
        url,
        headers: {},
        data: body
    };

    if(auth == "admin"){
        config.headers.Authorization = admintoken;
    }else if(auth == "user"){
        config.headers.Authorization = usertoken;
    }

    if (header) {
        config.headers["Content-Type"] = "multipart/form-data";
    } else {
        config.headers["Content-Type"] = "application/json"
    }

    try {
        const response = await axios(config);
        return response;
    } catch (error) {
        return error;
    }

}