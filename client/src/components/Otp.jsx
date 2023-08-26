import React, {useEffect, useState} from 'react';
import styles from './Otp.module.css';
import axios from 'axios';
import { server } from '../utils';

const Otp = () => {


    const centerAll = { 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center' 
    }

    const [userDetails, setUserDetails] = useState();

    const [details, setdetails] = useState({
        otp: ""
    });
    const [mins, setMins] = useState(0);
    const [secs, setSecs] = useState(0);

    const updateTimer = () =>{
        console.log(`${mins} : ${secs}`);
        if (secs < 58){
            setSecs(secs+1);
        }else if (secs == 59){

            setSecs(0);
            setMins(mins+1);

        }
        
    }

    var interval=false;
    const startTimer = () => {
        if (!interval){
            interval = setInterval(updateTimer, 1000)
        }
    }

    const clearTimer = () =>{
        clearInterval(interval);
        interval = false
    }

    const handleInputChange = (event) => {
        setdetails({ ...details, [event.target.name]: event.target.value });
    };
    
    
    

    useEffect(() => {
        const storedUserDetails = JSON.parse(localStorage.getItem("user_details"));
        if (!storedUserDetails) {
          window.location.href = "/signup";
        } else {
          setUserDetails(storedUserDetails);
          console.log(storedUserDetails);
        }
      }, []);
    const generateotp = async (e) => {
        try {

            const url = server + "generateotp"
            const res = await axios.put(url, userDetails);
            console.log(res);
            
            
        } catch (error) {

            if (error.response) {
                console.log(error.response.data);       
            }      
            console.log(`Error: ${error.message}`);
            
        }
    }

    const validateotp = async (e) => {
        try {
            const url = server + "client/validateotp"
            const res = await axios.post(url, {...userDetails, "otp": `${details.otp}`});
            console.log(res);

            if (res.data.success){
                localStorage.removeItem("user_details");
                window.location = "/client/signin";
            }

        } catch (error) {
            if (error.response) {
                console.log(error.response.data);       
            }      
            console.log(`Error: ${error.message}`); 
        }
    }

    return (

        <div style={{...centerAll, height: '100vh', width: '100%'}}>

            

            <section style={{backgroundColor: "#fff", height: '450px', width: "280px",padding: "15px 5px" , ...centerAll, flexDirection: "column", boxShadow: "0 0 10px #000", borderRadius: "5px"}}>

                <div style={{width: "100%", height:"100px",...centerAll, flexDirection: "column"}}>
                    <p style={{width: "100%", fontSize: "25px", textAlign: "center", letterSpacing: "3px"}}>OTP</p>
                    <p style={{marginTop: "15px", fontSize: "15px", textAlign: "center"}}>Enter code sent to { userDetails ? userDetails.email : "User"} </p>
                </div>

                <div style={{width: "100%", height:"150px", ...centerAll}}>

                    <input type="text" placeholder='- - - - - -' name='otp' value={details.otp} onChange={handleInputChange}
                    style={{textAlign: 'center', height: '40px', padding: '2px 10px', border: 'none', outline: 'none', letterSpacing: "5px", fontSize: "20px", width: "170px", borderBottom: "solid 1.2px #000", color: "rgb(185, 7, 144)"}}
                    maxLength={6}
                    />

                </div>
                
                <div style={{width: "100%", height:"150px", ...centerAll, flexDirection: "column", justifyContent: "space-around"}}>

                    <div style={centerAll}>
                        <p style={{padding: '0 2px'}}>{mins} </p>
                        <p style={{padding: '0 2px'}}> : </p>
                        <p style={{padding: '0 2px'}}>{secs} </p>
                    </div>

                    <button className={styles.registerButton} onClick={validateotp}>Submit</button>
                    <button className={styles.registerButton} onClick={generateotp}>Resend</button>

                </div>

               

            </section>

        </div>
    )
}

export default Otp;