import { useState } from 'react';
import lsPrefix  from '../../config/cfUtil';

export default function Login({signin}){
    

    // nice function to update an object state in react, eventually would like this to be in a util file on the frontend
    const [state, setState] = useState({})
    const [errMessage, setErrMessage] = useState("")

    // Handle state changes  in the form fields
    function handleChange(event) {
        const { name, value } = event.target
        setState({
            ...state,
            [name]: value
        })
    }

    // Handle signing the user in
    async function handleLogin()
    {
        try{
            const response = await fetch("http://127.0.0.1:3001/login/login", {
                method: "POST",
                headers: {
                    'Origin': 'http://127.0.0.1:3000',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(state),
                mode: "cors"
            })

            const bod = await response.json(); // convert body to json
            

            if(response.ok){ // server will send a 200 even in failure so we can get body data
                if(bod["access_token"]){
                    setErrMessage("");
                    localStorage.setItem(lsPrefix+"actk", bod["access_token"]);
                    signin(); // this is techinicall prop drilling but we are limited to two layers rn
                }
                else{ // render the error message
                    if(bod["message"]){
                        setErrMessage(bod["message"]);
                    }
                }
            
            }
            else{ // handle this better sometime
                console.log("bad request");
                setErrMessage("Unable to make request")
            }
        }
        catch(e){
            setErrMessage(e.toString());
        }
    }
    

    return(
        
            <div className="justify-center">
                <div  className="w-auto login-center-card">
                    <h2 className="bname">BoatLog</h2>
                    <p className='h2-green'>Sign into your account!</p>
                    <div className=''>
                        <input name="email" onChange={handleChange}  className="focus:form-active-input form-nonactive-input form-gen-input duration-150"  type="email" placeholder="Email"></input>
                        <br></br>
                        <br></br>
                        <input name="pass" onChange={handleChange} required type="password" placeholder="Password" className="focus:form-active-input form-nonactive-input form-gen-input duration-150"></input>
                        <br></br>
                        <br></br>
                        <button disabled={state["email"] && state["email"].indexOf("@") != -1 && state["pass"] ? false : true} className='button button-e-green disabled:button-d duration-150' onClick={handleLogin}>Login</button>
                        <p className='pt-2 error'>{errMessage}</p>
                    </div>
                </div>
            </div>
        

       
    );
};