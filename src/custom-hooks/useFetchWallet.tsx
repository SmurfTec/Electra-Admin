import { useState, useEffect } from "react";
import { getAllUsers } from "../store/Slices/UserSlice";
export const useFetchWallet = () => {
  const [users, setUsers] = useState<any>(null);
  const [userLoading, setUserLoading] = useState<any>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let params = { rowsPerPage: 25, currentPage: 1 };

        const response = await getAllUsers(params);
        setUsers(response);
        setUserLoading(false);
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return { users, userLoading };
};
