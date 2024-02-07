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
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);
    const [users,setUsers] = useState([]);
    const [userId,setUserid] = useState(null);
    const [search,setSearch] = useState("");

  useEffect(()=>
  {
   const fetchbalance =async ()=>{
    setLoading(true);
   try {
    const answer = await axios.get("http://localhost:3000/api/v1/account/balance",{
     headers:{
      Authorization:'Bearer '+cookie.authToken
     }
    });
    setData(answer.data.balance);
    console.log(answer.data.balance);
    setUserid(answer.data.userId);

   } catch (error) {
    if(error.response.data.message==="Invalid authentication"){
      navigation("/signin")
    }
    alert(error.response.data.message);
    setError(error.response.data.message);
   }
   finally{
    setLoading(false);
   }
   }
   const getData =  async()=>{
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/v1/user");
      const usersZ = response.data;
      console.log(usersZ)
      const updatedUsers = usersZ.map((user)=>({
        id: user.userId,
        name: user.firstName,
        account:user.accountId
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
   fetchbalance();
  },[cookie.authToken]);

  const handleSearch = async()=>{
    try {
      console.log("Search",search)
      const answer = await axios.get(`http://localhost:3000/api/v1/user/bulk?search=${search}`,{
        headers:{
          Authorization:'Bearer '+cookie.authToken
         }
      });
    const foundUsers = answer.data.foundUsers.map((user)=>({
      id:user.id,
      name:user.name,
      account:user.account
    }));
    console.log(foundUsers);
    if (foundUsers.length === 0) {
      // No users found, set the users state to an empty array
      setUsers([]);
    } 
    else{
      setUsers(foundUsers);
    }
    } catch (error) {
      alert(error.response.data)
      console.log(error);
    }
  }

  return (
   <>
   {loading ? (<div className=" h-[100%] w-[100%] bg-white"><Loading/></div>):(<>
    <div className="bg-white h-[100%] w-[100%] flex flex-col  p-8">
    <>
      <div className="h-[6rem] rouded-xl  text-4xl font-bold flex justify-between  border-b-2 border-gray-400 items-center gap-3"><span>
    Meta pay</span>
    <span className="text-2xl font-medium items-center flex ">
    Hello, User <span className="ml-4"><FaUser /></span></span>
    </div>
    <div className="flex flex-row justify-between mt-2 font-semibold text-lg" >Your balance - {data}</div>
    <span className="mt-3 font-bold text-md">Users</span>
    <input type="text" className="h-[3rem] w-[100%] rounded-xl p-3 my-6 border border-gray-500 " placeholder='Search user' onChange={(e)=>setSearch(e.target.value)} />
    <span onClick={handleSearch} className="flex justify-center items-center mx-auto h-[5rem] w-[10rem] bg-black text-white px-auto rounded-xl cursor-pointer hover:bg-gray-700"><p className="mx-auto">Search</p></span>
    {users.length===0 ? (<><span className="flex justify-center my-7 font-bold text-2xl">No users found ...</span></>):(<>
      <div>
      {users && users.map((user,index)=>(
        userId === user.id ? null : (
          <SendMoneyBar props={user} index={index + 1} key={user.id} />
      )
      ))}
    </div></>)}
    </>
  </div></>)}
   </>
  )
}

export default Dashboard