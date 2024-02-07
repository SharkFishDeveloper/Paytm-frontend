import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

const ModalSend = () => {
  const [loading,setLoading] = useState(false);
  const location = useLocation();
  return (
    <div className="h-[50%] w-[60%] bg-white rounded-3xl flex flex-col justify-center gap-8 items-middle p-3 pt-3">
        <div className=" text-black font-bold text-3xl mb-5" > Send Money</div>
        <div className="flex flex-col gap-7 justify-center">
        <span className="text-xl text-green-500 font-bold ">{location.state.props.name}</span>
        <input type="text" className="h-[3rem] w-[100%] rounded-xl bg-gray-200 p-4" placeholder='Enter amount to send ...'/>
        <div className="bg-black text-white text-sm h-[3rem] w-[100%] flex justify-center rounded-xl hover:bg-gray-700"><button>Proceed transaction</button></div>
        </div>
    </div>
  )
}

export default ModalSend
