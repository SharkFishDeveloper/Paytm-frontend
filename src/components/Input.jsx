import React from 'react'

const Input = ({inputValue,setInputValue,label,placeholder,type="text"}) => {
  return (
    <div className="p-3 space-y-2">
    <p className="text-gray-500 font-medium text-sm ">{label}</p>
    <input
       type={type}
       value={inputValue}
       onChange={(e)=>setInputValue(e.target.value)}
       placeholder={placeholder}
       className="rounded-lg h-[2.5rem] w-[18rem] p-3"
     /> 
   </div>
  )
}

export default Input