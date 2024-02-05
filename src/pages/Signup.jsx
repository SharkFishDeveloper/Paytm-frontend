import React, { useState } from 'react'
import Input from '../components/Input';



const Signup = (props) => {
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');

  return (
    <div className="h-[82%] bg-white rounded-2xl w-[30%] flex mx-auto flex-col p-3 items-center">
    <span className="text-black font-bold text-3xl"> Sign up </span>
    <span className="text-gray-600 font-semibold text-md"> Enter your information to create account </span>
    <div className="bg-slate-200 h-[50%] w-[78%] rounded-lg">
    <Input inputValue={name} setInputValue={setName} label={"Enter name"}/>
    <Input inputValue={lastname} setInputValue={setLastname} label={"Enter lastname"}/>
    <Input inputValue={email} setInputValue={setEmail} label={"Enter email"}/>
    <Input inputValue={password} setInputValue={setpassword} label={"Enter password"}/>
    </div>
    </div>
  )
}

export default Signup