import { useState } from 'react';


export default function Signup(){

    // nice function to update an object state in react, eventually would like this to be in a util file on the frontend
    const [state, setState] = useState({})

    function handleChange(event) {
        const { name, value } = event.target
        setState({
            ...state,
            [name]: value
        })
    }

    async function handleLogin()
    {
        console.log(state);
        const response = await fetch("http://localhost:3001/login/signup", {
            method: "POST",
            headers: {
                'Origin': 'http://127.0.0.1:3000',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(state),
            mode: "cors"
        })

        console.log(response);
    }


    function formValid(){
        if(!state["email"] || state["email"].indexOf("@")==-1){ return false;}
        if(!state["pass"] || !state["cpass"]){ return false;}
        if(state["pass"] && state["pass"].length < 9){return false;}
        return true;
    }

    
    return (
        <>
         <div className="login-center-view">
            <div className="z-2">
                <div id="login-card" className="w-[32rem] h-[32rem] login-center-card">
                <h2 className="text-3xl font-bold text-white underline underline-offset-9 pt-5">BoatLog</h2>
                <p className='pt-2 font-semibold text-black'>Create a new account!</p>
                <div className='relative pt-6 top-1/5'>
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
                    <button disabled={formValid() && (state["pass"]==state["cpass"]) ? false : true}  className='rounded-3xl bg-slate-100 p-5 font-semibold disabled:bg-slate-300 disabled:bg-opacity-75 bg-opacity-100 hover:bg-green-400 disabled:hover:ring-4 disabled:hover:ring-red-600' onClick={handleLogin}>Signup</button>
                </div>
                
                </div>
            </div>
        </div>
        </>
    )
}