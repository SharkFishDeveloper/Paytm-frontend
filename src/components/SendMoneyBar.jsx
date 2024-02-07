import React from 'react'
import {useNavigate} from "react-router-dom"

const SendMoneyBar = ({index,props}) => {
  const navigate = useNavigate();
  return (
    <div className="h-[5rem] w-[100%] grid grid-cols-10  rounded-3xl ">

        <div className="col-span-1  flex justify-center items-center"><div className="h-[4rem] rounded-full w-[4rem] bg-gray-300 items-center flex justify-center text-black">{index}</div></div>

        <div className="col-span-2  flex justify-start "><div className="   flex  my-auto text-lg font-semibold">{props.name}
        <p>{props.id}</p>
        </div></div>

        <div className="col-span-7  flex justify-end items-center"><div className=" bg-black items-center flex justify-center h-[3.5rem] w-[8rem] rounded-2xl text-white hover:scale-110 transition-transform " onClick={()=>{
          navigate("/modal")
        }}>Send money</div></div>

    </div>
  )
}

export default SendMoneyBar