import {useState,useEffect} from "react"
import {
    getAllUsers
} from  "../store/Slices/UserSlice";
export const useGetAllUsers = () => {
    const [users, setUsers] = useState<any>(null);
    const [userLoading, setUserLoading] = useState<any>(true);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await getAllUsers();
          setUsers(response);
          setUserLoading(false)
        } catch (error) {
          // Handle error
          console.error(error);
        }
      };
  
      fetchData();
    }, []);
  
    return {users,userLoading};
  };
