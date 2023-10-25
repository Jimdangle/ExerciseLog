import { useState, useEffect } from 'react';
import { base_url } from '../../utility/request';
import { getToken } from '../../utility/storage';
export function useRequest(url,method='g',payload=null) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(null)

  const invalidate = () => {
    setData(null);
    setError(null)
  }

  const fetchData = async (additional=null) => {
    if(!url){setError(new Error('No Url provided'))}
    invalidate();
    setLoading(true)
    console.log(`${method} made on ${base_url+url} with payload? ${payload?'yes':'no'}`)
    const sendData = {...payload,...additional}
    try {
      // Simulate an API call to fetch workout log data
      const response = await fetch(base_url+url, {
        method: (method==="x" ? "DELETE" : (method==="p") ? "POST" : "GET"),
                    headers: {
                        'Origin': 'http//127.0.0.1:3000',
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: (Object.keys(sendData).length!==0 ? JSON.stringify(sendData) : null)
      });
      if(response.status!==200){
        const err = new Error('Problem with request!')
        err.code = response.status;
        throw err;
      }
      const workoutLogData = await response.json();
      setData(workoutLogData);
      
    } catch (error) {
      
      setError(error)
      
    }
    finally{
      setLoading(false);
    }
  };

  

  return {
    data,
    loading,
    error,
    fetchData, // Make fetchData available to the component using the custom hook
  };
}