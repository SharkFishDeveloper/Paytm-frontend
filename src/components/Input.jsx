import React from 'react'

const Input = ({inputValue,setInputValue,label}) => {
  return (
    <div className="p-3 space-y-2">
    <p className="text-black font-bold text-sm">{label}</p>
    <input
       type="text"
       value={inputValue}
       onChange={(e)=>setInputValue(e.target.value)}
       placeholder="Enter name"
       className="rounded-lg h-[2rem] w-[18rem]"
     /> 
   </div>
  )
}

export default Input