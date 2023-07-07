import React, { useEffect } from "react";
import { getRoles } from "../../store/Slices/RoleSlice";
interface RoleStats {
  role: string;
  users: number;
}

type Stats = RoleStats[];
export const useGetRoles = () => {
  const [roles, setRoles] = React.useState();
  const [rolesStats, setRolesStats] = React.useState <Stats> ([]);
  const fetchRoles = async () => {
    try {
      const ROLES = await getRoles();
      setRoles(ROLES?.roles)
      setRolesStats(ROLES?.usersPerRole)
      console.log(ROLES,"ROLESS")
    } catch (e) {}
  };
  useEffect(() => {
    fetchRoles();
  }, []);
  return {roles,rolesStats}
};
