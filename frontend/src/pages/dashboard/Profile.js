import React ,{useEffect, useState}from 'react'
import UserMenu from '../../components/layout/UserMenu'
import Layout from '../../components/layout/Layout'
import { useAuth } from '../../context/authContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const Profile = () => {
  const {auth,setAuth}=useAuth();
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
 useEffect(()=>{
  console.log("auth",auth);
setEmail(auth.user.email);
setUsername(auth.user.username);
 },[])


async function handleSubmit(e)
{
e.preventDefault();
try {
  const {data}=await axios.put(`${process.env.REACT_APP_API_URL}/api/auth/profile`,{username,email,password});
  // console.log(response.data);
  if(data.success)
  { 
  // console.log(response.data.message);
       setAuth({...auth,user:data.updated});
       let loginuser=JSON.parse(localStorage.getItem("loginUser"));
       loginuser.user=data.updated;
       localStorage.setItem("loginUser",JSON.stringify(loginuser));
       toast.success("profile updation is successful");
  
  // navigate("/login");

  }
  else{
      toast.error(data.message);

  }

} catch (error) {
  console.log(error);
}

}

  return (
    <Layout>
    <div className='container-fuild m-3 p-3'>

    <div className="row">
       <div className="col-md-3">
         <UserMenu/>
       </div>
       <div  className="col-md-4">
        
           <h1>User profile</h1>
           <form onSubmit={handleSubmit}>
           <div className="mb-3">
          
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter user Fullname"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              required
            />
           </div>
          <div className="mb-3">
          
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
              disabled

            />
           </div>
          <div className="mb-3">
          
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />
          </div>
         
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
       </div>
     </div>
</div>
  </Layout>
  )
}

export default Profile