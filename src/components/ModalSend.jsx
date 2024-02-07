import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Loading from './Loading';

const ModalSend = () => {

  const [cookie,setCookie] = useCookies(['authToken'])
  const [loading,setLoading] = useState(false);
  const [data,setData] = useState(null);
  const [error,setError] = useState(null);
  const [amount,setAmount] = useState(0);

  const location = useLocation();
  const handlePayment = async()=>{
    setLoading(true);
   try {
    if(!amount||amount===0||amount==null || isNaN(amount)){
     return alert("Enter appropriate amount ")
    }
    const answer = await axios.post("http://localhost:3000/api/v1/account/transfer",{
      to:location.state.props.id,  
      amount:parseInt(amount,10)},{
  
      headers:{
        Authorization:'Bearer '+cookie.authToken
       }
      });
      alert(answer.data.message);
   } catch (error) {
    alert(error.response.data.message);
    console.log(error.response.data.message)
   }finally{
    setAmount(0);
    setLoading(false)
   }
  }

  return (
    <div className="h-[50%] w-[60%] bg-white rounded-3xl flex flex-col justify-center gap-8 items-middle p-2 pt-2">
        {loading ? (<Loading/>):(<>
        <div className=" text-black font-bold text-3xl mb-5" > Send Money</div>
        <div className="flex flex-col gap-7 justify-center">
        <span className="text-xl text-green-500 font-bold ">{location.state.props.name.toUpperCase()}
        </span>
        <input type="text" className="h-[3rem] w-[100%] rounded-xl bg-gray-200 p-4" placeholder='Enter amount to send ...' onChange={(e)=>setAmount(e.target.value)}/>
        <div className="bg-black text-white text-sm h-[3rem] w-[100%] flex justify-center rounded-xl hover:bg-gray-700" onClick={handlePayment}><button>Proceed transaction</button></div>
        </div>
        </>)}
    </div>
  )
}

export default ModalSend
