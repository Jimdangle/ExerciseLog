import { useState, useEffect } from 'react';
import { base_url } from '../../utility/request';
import { getToken } from '../../utility/storage';

/**
 * Request custom hook
 * @param {string} url - url to target with request
 * @param {string} method - request method from [g,p,x] Get,Post,Delete
 * @param {Object} payload - Payload to send with request
 * @returns - data from request, isLoading boolean representing fetch state, error object, and fetchData method to perform the operation
 */
export function useRequest(url,method='g',payload=null,debug=false) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(null)

  const invalidate = () => {
    setData(null);
    setError(null)
  }

  /**
   * Fetch data call used by useRequest, performs the actual fetch we want to use
   * @param {Object} additional - additional payload
   * @description **note** the payload from useRequest, and this payload are merged together to form the final payload, if both are null we send nothing
   */
  const fetchData = async (additional=null) => {
    if(!url){setError(new Error('No Url provided'))}
    invalidate();
    setLoading(true)
    if(debug){console.log(`${method} made on ${base_url+url} with payload? ${payload?'yes':'no'}`)}
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
      const responseData = await response.json();
      setData(responseData);
      if(debug){ console.log('response: ', responseData)}
      
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