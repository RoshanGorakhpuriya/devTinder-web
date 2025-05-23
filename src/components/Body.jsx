import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { useEffect } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import {useDispatch} from "react-redux";
import {addUser} from "../utils/userSlice"
import axios from "axios";
import {useSelector} from "react-redux";


const Body = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((store)=>store.user);


    const fetchUser = async() =>{
        if(userData)
            return;
       try{ const res = await axios.get(BASE_URL + "/profile/view" , {
            withCredentials : true,
        }); 
        dispatch(addUser(res.data));

       } catch(err){
        if(err.status === 401){
            navigate("/login");
        }
        console.log(err);
       }
    };

    useEffect(()=>{
      fetchUser();
    } , []);   

  return (
    <div>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </div>
  );
};

export default Body;