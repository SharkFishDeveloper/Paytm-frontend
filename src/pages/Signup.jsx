import React, { useState } from 'react'
import Input from '../components/Input';
import useDataFetcher from '../hook/FetchData';
import Loading from '../components/Loading';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
    const navigate = useNavigate();
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);


    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');

    const handleSignUp = async()=>{
      setLoading(true);
      try {
        const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
          firstName:name,lastName:lastname,username:email,password
        });
        setData(response.data.message)
        alert(response.data.message);
        navigate("/dashboard");
      } catch (error) {
        setError(error.response.data.message)
       alert(error.response.data.message)
        console.log(error)
      }finally{
        setLoading(false);
      }
    }

    const gotoSiginin = ()=>{
      navigate("/signin")
    }

  return (
    <div className="h-[82%] bg-white rounded-2xl w-[30%] flex mx-auto flex-col p-3 items-center gap-6">
      {loading? (<><Loading/></>):(
        <>
        <div className="flex flex-col items-center gap-4">
    <span className="text-black font-bold text-3xl"> Sign up </span>
    <span className="text-gray-600 font-semibold text-md"> Enter your information to create account </span>
    </div>

    <div className="bg-slate-100 h-[65%] w-[78%] rounded-lg flex flex-col items-center py-4">
    <Input inputValue={name} setInputValue={setName} label={"Enter name"} placeholder={"Enter name"}/>
    <Input inputValue={lastname} setInputValue={setLastname} label={"Enter lastname"} placeholder={"Enter lastname"}/>
    <Input inputValue={email} setInputValue={setEmail} label={"Enter email"} placeholder={"Enter email"}/>
    <Input inputValue={password} setInputValue={setpassword} label={"Enter password"} placeholder={"Enter password"} type='password'/>
    </div>
    <span className="h-[2.9rem] bg-gray-800 w-[78%] rounded-lg flex justify-center text-white font-semibold hover:bg-gray-900 cursor-pointer"  onClick={handleSignUp}><button>Sign up</button></span>
    <span>Already have an account ? <span className="text-blue-700 font-bold cursor-pointer hover:text-blue-900" onClick={gotoSiginin}>Sign in</span></span></>
      )}
    </div>
  )
}

export default Signup