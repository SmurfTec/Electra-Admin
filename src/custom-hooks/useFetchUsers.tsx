import { useState, useEffect } from 'react';
import { getAllUsers } from '../store/Slices/UserSlice';
interface UserParams {
  rowsPerPage?: number;
  currentPage?: number;
}
export const useFetchUsers = (params: UserParams) => {
  const [users, setUsers] = useState<any>(null);
  const [userLoading, setUserLoading] = useState<any>(true);
  const [stats, setstats] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setUserLoading(true);
        const response = await getAllUsers(params);
        if (response.users) {
          setUsers(response.users);
          let newstats = {
            total_user_this_year: response?.stats?.total_user_this_year || 0,
            total_users_last_month:
              response?.stats?.total_users_last_month || 0,
            total_users_percentage:
              response?.stats?.total_users_percentage || 0,
            total_users_registered:
              response?.stats?.total_users_registered || 0,
            total_users_this_month:
              response?.stats?.total_users_this_month || 0,
            users_percentage: response?.stats?.users_percentage || 0,
            users_years_percentage:
              response?.stats?.users_years_percentage || 0,
          };
          setstats(newstats);
          setUserLoading(false);
        }
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    fetchData();
  }, [params]);

  return { users, userLoading, stats };
};
