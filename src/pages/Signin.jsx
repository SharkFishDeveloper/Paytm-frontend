import axios from 'axios';
import React, { useState } from 'react'
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const Signin = () => {
    const navigator = useNavigate();
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');

    const handleSignin = async()=>{
      setLoading(true);
      try {
        const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
          username:email,password
        },{withCredentials:true});
        setData(response.data.message)
        alert(response.data.message);
        navigator("/dashboard");
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
       alert(error.response.data.message)
        console.log(error)
      }finally{
        setLoading(false);
      }
    }
  return (
    <>
    {loading ?(<div className="h-[82%] bg-white rounded-2xl  w-[30%]"><Loading/></div>):(<>
    <div  className="h-[82%] bg-white rounded-2xl w-[30%] flex mx-auto flex-col p-3 items-center gap-5 ">
    <div className="flex flex-col items-center gap-4 mt-4">
        <span className="text-black font-bold text-3xl"> Sign in </span>
        <span className="text-gray-600 font-semibold text-md"> Enter your information to login </span>
        </div>
        <div className="bg-slate-100 h-[40%] w-[78%] rounded-lg flex flex-col items-center py-4">
        <Input inputValue={email} setInputValue={setEmail} label={"Enter email"} placeholder={"Enter email"}/>
        <Input inputValue={password} setInputValue={setpassword} label={"Enter password"} placeholder={"Enter password"} type='password'/>
        </div>
        <span className="h-[2.9rem] bg-gray-800 w-[78%] rounded-lg flex justify-center text-white font-semibold hover:bg-gray-900 cursor-pointer mt-6"  onClick={handleSignin}><button>Sign in</button></span>
        </div></>)}
    </>
  )
}

export default Signin