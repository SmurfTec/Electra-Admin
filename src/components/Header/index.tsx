import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
export const Header = () => {
  const navigate=useNavigate();
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  useEffect(()=>{
    let user: any = null;
    const storedUser = localStorage.getItem('user');
    console.log(storedUser)
    if (storedUser !== null) {
      navigate('/Dashboard')
      setIsLoggedIn(true)
      user = JSON.parse(storedUser);
    }else{
      setIsLoggedIn(false)
      navigate('/')
    }
  },[])
  return (
   <>
   {isLoggedIn && <div className='h-10'>Header</div>} 
   </>
  )
}
