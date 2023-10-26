import {useState, useEffect} from 'react'
import { base_url } from '../../utility/request';
import { getToken } from '../../utility/storage';
/**
 * **Old** initial attempt at a custom hook that can fetch data, could only do so statically / non-conditionally
 * @param {string} url - url to make request on
 * @param {string} method - method to use from [g,p,x] : Get,Post,Delete
 * @param {Object} payload - Payload to send with request if applicable
 * @returns {{Object,boolean,Object}} 
 */
export default function useFetch(url, method='g', payload=null){
    const [data,setData] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState(null);

    
    useEffect( ()=>{
        (
        async function(){
            console.log(`Attempting to make ${method} request on ${url} with Payload: ${payload!=null}`)
            try{
                setData(null)
                setIsLoading(true)
                
                const request = await fetch(base_url+url, {
                    method: (method==="x" ? "DELETE" : (method==="p") ? "POST" : "GET"),
                    headers: {
                        'Origin': 'http//127.0.0.1:3000',
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: (payload ? JSON.stringify(payload) : null)
                })
               
                
    
                if(request.ok){
                    const body = await request.json(); 
                    
                    setData(body);
                    
                }
                else{
                    setError(new Error(`Response not ok! code: ${request.status}`))
                }
            }
            catch(e){

                console.log(e)
                setError(e)
            }
            finally{
                setIsLoading(false)
            }
        }
        )();
        

    },[url])


    return {data:data, isLoading:isLoading, error:error}
}