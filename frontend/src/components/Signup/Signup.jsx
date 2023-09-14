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
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <div className="z-2">
                <div id="login-card" className="w-[32rem] h-[32rem] text-center bg-blue-300 rounded-b-lg rounded-t-md shadow-lg">
                <h2 className="text-3xl font-bold text-white underline underline-offset-9 pt-5">BoatLog</h2>
                <p className='pt-2 font-semibold text-black'>Create a new account!</p>
                <div className='relative pt-6 top-1/5'>
                    <input name="email" onChange={handleChange}  className="px-6 py-1 focus:form-active-input form-nonactive-input duration-150"  type="email" placeholder="Email"></input>
                    <p className='text-red-500 pt-2'>{state["email"] && state["email"].indexOf("@")==-1 ?  "Please enter a semi valid email" : ""}</p>
                    <br></br>
                    <input name="username" onChange={handleChange}  className="px-6 py-1 focus:form-active-input form-nonactive-input duration-150"  type="text" placeholder="Username(optional)"></input>
                    <br></br>
                    <br></br>
                    <input name="pass" onChange={handleChange} required type="password" placeholder="Password" className="px-6 py-1 focus:form-active-input form-nonactive-input duration-150"></input>
                    <p className='text-red-500 pt-2'>{ state["pass"] && state["pass"].length < 9 ? "Please make password a minimum of 9 characters" : ""}</p>
                    <br></br>
                    <input name="cpass" onChange={handleChange} required type="password" placeholder="Confirm Password" className="px-6 py-1 focus:form-active-input form-nonactive-input duration-150"></input>
                    <p className='text-red-500 pt-2'>{state["pass"]!=state["cpass"] ? "Please ensure passwords match" : ""}</p>
                    <br></br>
                    <br></br>
                    <button disabled={formValid() && (state["pass"]==state["cpass"]) ? false : true}  className='rounded-3xl bg-white p-5 font-semibold disabled:bg-slate-300 disabled:bg-opacity-75 bg-opacity-100' onClick={handleLogin}>Signup</button>
                </div>
                
                </div>
            </div>
        </div>
        </>
    )
}