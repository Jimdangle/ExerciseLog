import {useState, useEffect} from 'react'

export default function useFetch({url, method='g', payload=null}){
    const [data,setData] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const [error,setError] = useState(null);


    async function request(url,method,payload){
        console.log(`Attempting to make ${method} request on ${url} with Payload: ${payload!=null}`)
        try{
            setIsLoading(true)
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
                setData(data);
                
            }
            else{
                setError(new Error(`Response not ok! code: ${request.status}`))
            }
        }
        catch(e){
            setError(e)
        }
        finally{
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        request(url,method,payload)

    },[url,method,payload])


    return {data:data, isLoading:isLoading, error:error}
}