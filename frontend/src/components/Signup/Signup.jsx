import { useState } from 'react';


export default function Signup({onClick}){

    // nice function to update an object state in react, eventually would like this to be in a util file on the frontend
    const [state, setState] = useState({})
    const [errMessage, setErrMessage] = useState("")

    function handleChange(event) {
        const { name, value } = event.target
        setState({
            ...state,
            [name]: value
        })
    }

    //Log the user in
    async function handleSignup()
    {
        
        const response = await fetch("http://localhost:3001/login/signup", {
            method: "POST",
            headers: {
                'Origin': 'http://127.0.0.1:3000',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state),
            mode: "cors"
        })

        const bod = await response.json();

        if(response.ok){
            console.log(bod);
            if(bod["created"] && bod["created"]==true){
                onClick();
            }
            else{
                setErrMessage(bod["message"]);
            }
            
        }
        else{
            console.log("bad request");
            console.log(response.headers);
        }
    }


    function formValid(){
        if(!state["email"] || state["email"].indexOf("@")==-1){ return false;}
        if(!state["pass"] || !state["cpass"]){ return false;}
        if(state["pass"] && state["pass"].length < 9){return false;}
        return true;
    }


    return (
       
         
        <div className="justify-center">
            <div className="w-auto login-center-card">
                <h2 className="bname">BoatLog</h2>
                <p className='info-green'>Create a new account!</p>
                <div className='pt-4'>
                    <input name="email" onChange={handleChange}  className="focus:form-active-input form-nonactive-input form-gen-input duration-150"  type="email" placeholder="Email"></input>
                    <p className='text-red-500 pt-2'>{state["email"] && state["email"].indexOf("@")==-1 ?  "Please enter a semi valid email" : ""}</p>
                    <br></br>
                    <input name="username" onChange={handleChange}  className="focus:form-active-input form-nonactive-input form-gen-input duration-150"  type="text" placeholder="Username(optional)"></input>
                    <br></br>
                    <br></br>
                    <input name="pass" onChange={handleChange} required type="password" placeholder="Password" className="focus:form-active-input form-nonactive-input form-gen-input duration-150"></input>
                    <p className='text-red-500 pt-2'>{ state["pass"] && state["pass"].length < 9 ? "Please make password a minimum of 9 characters" : ""}</p>
                    <br></br>
                    <input name="cpass" onChange={handleChange} required type="password" placeholder="Confirm Password" className="focus:form-active-input form-nonactive-input form-gen-input duration-150"></input>
                    <p className='text-red-500 pt-2'>{state["pass"]!=state["cpass"] ? "Please ensure passwords match" : ""}</p>
                    <br></br>
                    <br></br>
                    <button disabled={formValid() && (state["pass"]==state["cpass"]) ? false : true}  className='button button_e_green disabled:button_d duration-150' onClick={handleSignup}>Signup</button>
                    <p className='pt-2 font-semibold text-red-400'>{errMessage}</p>
                </div>
            </div>
        </div>
        
       
    )
}