import { useState } from 'react';


export default function Login(){
    

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
        const response = await fetch("http://localhost:3001/login/login", {
            method: "POST",
            body: JSON.stringify(state),
            mode: "cors"
        })

        console.log(response);
    }
    

    return(
        <>
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            <div className="z-2">
                <div id="login-card" className="w-[32rem] h-[24rem] text-center bg-blue-300 rounded-b-lg rounded-t-md shadow-lg">
                <h2 className="text-3xl font-bold text-white underline underline-offset-9 pt-5">BoatLog</h2>
                <div className='relative pt-6 top-1/5'>
                    <input name="email" onChange={handleChange}  className="px-6 py-1 focus:form-active-input form-nonactive-input duration-150"  type="email" placeholder="Email"></input>
                    <br></br>
                    <br></br>
                    <input name="pass" onChange={handleChange} required type="password" placeholder="Password" className="px-6 py-1 focus:form-active-input form-nonactive-input duration-150"></input>
                    <br></br>
                    <br></br>
                    <button className='rounded-3xl bg-slate-100 p-5 font-semibold' onClick={handleLogin}>Login</button>
                </div>
                </div>
            </div>
        </div>

        </>
    );
};