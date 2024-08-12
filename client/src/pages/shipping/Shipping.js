import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import Select from 'react-select'
import {Country,State} from "country-state-city"
import toast from 'react-hot-toast'

const Shipping = () => {

    const [inputvalue,setInputvalue] = useState({
        mobile:"",
        city:"",
        pincode:"",
        address:""
    });

    

    const [country,setCountry] = useState([]);
    const [state,setState] = useState([]);


    const [countrycode,setCountryCode] = useState("");
    const [finalstate,setFinalState] = useState("");

    

    const location = useLocation();
    const naviget = useNavigate();
    // console.log("first",location)

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setInputvalue({...inputvalue,[name]:value})
    }

    let shippingPrice = 40;

    const handleSubmit = (e)=>{
        e.preventDefault();

        const {mobile,city,pincode,address} = inputvalue;

        if(mobile == ""){
            toast.error("mobile is required")
        }else if(mobile.length !== 10){
            toast.error("enter valid mobile number")
        }else if(countrycode == ""){
            toast.error("countrycode is required")
        }else if(finalstate == ""){
            toast.error("finalstate is required")
        }else if(city == ""){
            toast.error("city is required")
        }else if(pincode == ""){
            toast.error("pincode is required")
        }else if(address == ""){
            toast.error("address is required")
        }else{
            const data = {
                mobile,
                city,
                pincode,
                address,
                country:countrycode,
                state:finalstate,
                itemsPrice:location.state,
                shippingPrice:shippingPrice,
                totalPrice:location.state + shippingPrice,

            }

            naviget("/checkout",{state:data})
        }
    }

   
    useEffect(()=>{
        let countrydata = Country.getAllCountries();
        
        let arr = [];

        for(let i = 0; i<countrydata?.length;i++){
            let storedata = {value:countrydata[i].isoCode,label:countrydata[i].name}
            arr.push(storedata)
        }
        setCountry(arr)

        if(countrycode){
            let stateData = State.getStatesOfCountry(countrycode)
            
            let arr2 = [];

            for(let i = 0; i<stateData?.length;i++){
                let storestatedata = {value:stateData[i].isoCode,label:stateData[i].name}
                arr2.push(storestatedata)
            }
            setState(arr2)
        }
    },[countrycode])
    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Shipping Details</h1>
                    </div>

                    <form>
                        <div className="form_input">
                            <input type="text" name="mobile" value={inputvalue.mobile} onChange={handleChange} placeholder='Enter Your Mobile' id="" />
                        </div>
                        <div className="form_input mb-3">
                            <Select options={country} onChange={(e)=>setCountryCode(e.value)} placeholder="Select Your Country" />
                        </div>
                        <div className="form_input mb-2">
                            <Select options={state} placeholder="Select Your State" onChange={(e)=>setFinalState(e.label)}  />
                        </div>
                        <div className="form_input">
                            <input type="text" name="city" value={inputvalue.city} onChange={handleChange} placeholder='Enter Your City' id="" />
                        </div>
                        <div className="form_input">
                            <input type="text" name="pincode" value={inputvalue.pincode} onChange={handleChange} placeholder='Enter Your Pincode' id="" />
                        </div>

                        <Form.Group className="mb-3 mt-2"  controlId="exampleForm.ControlTextarea1">
                            <Form.Control as="textarea" value={inputvalue.address} onChange={handleChange} name='address' placeholder='Shipping Address' rows={2} />
                        </Form.Group>

                        <button className='btn' onClick={handleSubmit}>Send</button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Shipping