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
        const response = await fetch("http://127.0.0.1:3001/login/login", {
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
    

    return(
        <>
        
        <div className="login-center-view">
            <div className="z-2">
                <div  className="w-[32rem] h-[24rem] login-center-card">
                <h2 className="text-3xl font-bold text-white underline underline-offset-9 pt-5">BoatLog</h2>
                <p className='pt-2 font-semibold text-black'>Sign into your account!</p>
                <div className='relative pt-6 top-1/5'>
                    <input name="email" onChange={handleChange}  className="focus:form-active-input form-nonactive-input form-gen-input duration-150"  type="email" placeholder="Email"></input>
                    <br></br>
                    <br></br>
                    <input name="pass" onChange={handleChange} required type="password" placeholder="Password" className="focus:form-active-input form-nonactive-input form-gen-input duration-150"></input>
                    <br></br>
                    <br></br>
                    <button disabled={state["email"] && state["email"].indexOf("@") != -1 && state["pass"] ? false : true} className='rounded-3xl bg-slate-100 p-5 font-semibold disabled:bg-slate-300 disabled:bg-opacity-75  hover:bg-green-400 disabled:hover:ring-4 disabled:hover:ring-red-600' onClick={handleLogin}>Login</button>
                </div>
                </div>
            </div>
        </div>

        </>
    );
};