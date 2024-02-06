import { useState } from "react";
import axios from "axios";


function useDataFetcher(url){
    const [loading,setLoading] = useState(false);
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);

    const fetchData = async(body=null,method="GET",headers={})=>{
        try {
            setLoading(true);
            const options = {
                method: method,
                url: url,
                headers: headers,
                data: body
            }
            console.log(options);
            const response = await axios(options);
            console.log("end");
            setData(response.data.message);
            console.log(response.data.message)
        } catch (error) {
            setError(error.response.data.message);
            console.log(error.response.data.message)
        }finally {
            setLoading(false);
          }
    };
    return { data, loading, error, fetchData };
}

export default useDataFetcher;