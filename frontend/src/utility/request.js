import { getToken } from "./storage";

export const base_url = 'http://127.0.0.1:3001'; // all calls need to add /route/subroute/etc..

/**
 * **Old** Method to fetch data and set some data somewhere else. Should be replaced with a useRequest call if still in use
 * @deprecated
 * @param {string} url - url target
 * @param {function} setResponse - state management function to set a response state
 * @param {string} method - http method to request with
 * @param {Object} payload - JSON payload data
 */
export async function request(url,setResponse,method="g",payload=null){
    console.log(`Attempting to make ${method} request on ${url} with Payload: ${payload!=null}`)
    try{
        const request = await fetch(base_url+url, {
            method: (method==="x" ? "DELETE" : (method==="p") ? "POST" : "GET"),
            headers: {
                'Origin': 'http//127.0.0.1:3000',
                'Content-Type': 'application/json',
                'authorization': getToken()
            },
            body: (payload ? JSON.stringify(payload) : "")
        })

        if(request.ok){
            const body = await request.json(); 
            console.log(body);
            setResponse({data:body, error:null})
        }
        else{
            setResponse({data:null, error: new Error(`Response not ok! code: ${request.status}`)})
        }
    }
    catch(e){
        setResponse({data:null,error:e})
    }
}