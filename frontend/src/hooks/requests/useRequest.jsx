import {useEffect, useState} from 'react'
import {getToken} from '../../utility/storage'
import { base_url } from '../../utility/request'

export default function useRequest(url,method="g",payload=null){
    const [data,setData] = useState(null);
    const [error,setError] = useState("")
    useEffect(()=>{
        request()
    },[])
    
    async function request(){
        try{
            const request = fetch(base_url+url, {
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
                setData(body)
            }
        }
        catch(e){
            setError(e.message)
        }
    }


    return {data:data, error:error};

}

