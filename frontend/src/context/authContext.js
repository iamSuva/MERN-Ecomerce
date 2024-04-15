import { useState,createContext,useContext,useEffect} from "react";
const AuthContext=createContext();
const AuthProvider=({children})=>{
    const [auth,setAuth]=useState({
        user:null,
        token:""
    });
    let count=0;
    useEffect(()=>{
        console.log("use effect inside authcontext is called",count++);
        const loginUser=JSON.parse(localStorage.getItem("loginUser"));
        
        if(loginUser){
            setAuth({
                ...auth,
                user:loginUser.user,
                token:loginUser.token
            })
        }
        
    },[]);
    
    /* By passing an empty dependency array ([]) as the second argument to useEffect, 
    you ensure that the effect runs only once when the component mounts.
     This prevents unnecessary re-renders or side effects during component updates.
     */ 
    
    return ( <AuthContext.Provider value={{auth,setAuth}}>
             {children}
    </AuthContext.Provider>)
};

//hook
const useAuth=()=>useContext(AuthContext);

export {useAuth,AuthProvider};
