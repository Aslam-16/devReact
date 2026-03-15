import api from "../utils/interceptor";
import { removeUser } from "../slices/userSlice";
import { toggleToast } from "../slices/toastSlice";
import { useDispatch } from "react-redux";
import { useEffect,useState } from "react";
import { useSelector } from "react-redux";

 const useApi =  ({url,method}) => {
    const dispatch = useDispatch();
        const toast = useSelector((state) => state.toast);
        const [response, setresponse] = useState(null);
    

    const apicall=async(url,method)=>{
    try {
        if(method.toLowerCase()==='get'){
            const response = await api.get(url);
            return response.data;
        }else if(method.toLowerCase()==='post'){
            const response = await api.post(url);
            return response.data;
        }
        else if(method.toLowerCase()==='put'){
            const response = await api.put(url);
            return response.data;
        }
        else if(method.toLowerCase()==='delete'){
            const response = await api.delete(url);
            return response.data;
        }
    }catch (error) {
        console.log('error');
        
                if (error?.response?.status === 401) {
                    console.error('Error loading feed:', error);
                    dispatch(removeUser());
                    return null;
                }
                else if(error?.response) {
                    dispatch(toggleToast({message:error.response.data.message,error:true,status:error.response.status}));
                    return null;
                }
                else{
                    dispatch(toggleToast({message:'No response received from server',error:true,status:1}));
                    return null;
                }
            }
        }
     useEffect(() => {
         const resp = async () => {
            const res= await apicall(url, method);
            setresponse(res);
         }         
         resp();
     }, [url, method]);  
    
        

        return response;
    
};

export default useApi;