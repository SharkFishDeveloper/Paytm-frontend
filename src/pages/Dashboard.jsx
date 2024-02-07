import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaUser } from "react-icons/fa";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import SendMoneyBar from '../components/SendMoneyBar';

const Dashboard = () => {
  const navigation = useNavigate();
  const [cookie,setCookie] = useCookies(['authToken'])
  const   [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const [users,setUsers] = useState([]);
  console.log(cookie.authToken)

  // useEffect(()=>
  // {
  //  const fetchbalance =async ()=>{
  //   setLoading(true);
  //  try {
  //   const answer = await axios.get("http://localhost:3000/api/v1/account/balance",{
  //    headers:{
  //     Authorization:'Bearer '+cookie.authToken
  //    }
  //   });
  //   setData(answer.data.balance[0].balance);
  //   console.log(answer.data.balance[0].balance)
  //  } catch (error) {
  //   if(error.response.data.message==="Invalid authentication"){
  //     navigation("/signin")
  //   }
  //   alert(error.response.data.message);
  //   setError(error.response.data.message);
  //  }
  //  finally{
  //   setLoading(false);
  //  }
  //  }
  //  fetchbalance();
  // },[cookie.authToken])
    useEffect(()=>{
      const getData =  async()=>{
        setLoading(true);
        try {
          const response = await axios.get("https://jsonplaceholder.typicode.com/users");
          const usersZ = response.data;
          console.log(usersZ)
          const updatedUsers = usersZ.map((user)=>({
            id: user.id,
            name: user.name
          }))
          console.log(updatedUsers);
          setUsers(updatedUsers)
        }
         catch (error) {
          console.error("Error fetching data:", error);
        }finally{
          setLoading(false);
        }
      }
      getData();
    },[])


  return (
   <>
   {loading ? (<div className=" h-[100%] w-[100%] bg-white"><Loading/></div>):(<>
    <div className="bg-white h-[100%] w-[100%] flex flex-col  p-8">
    <div className="h-[6rem] rouded-xl  text-4xl font-bold flex justify-between  border-b-2 border-gray-400 items-center"><span>
    Meta pay</span>
    <span className="text-2xl font-medium items-center flex ">
    Hello, User <span className="ml-4"><FaUser /></span></span>
    </div>
    <div className="flex flex-row justify-between mt-2 font-semibold text-lg" >Your balance - {data}</div>
    <span className="mt-3 font-bold text-md">Users</span>
    <input type="text" className="h-[3rem] w-[100%] rounded-xl p-3 my-6 border border-gray-500 " placeholder='Search user' />
    <div>
      {users && users.map((user,index)=>(
        <SendMoneyBar props={user} index={index+1}/>
      ))}
    </div>
  </div></>)}
   </>
  )
}

export default Dashboard