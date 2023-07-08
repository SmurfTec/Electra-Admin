import React, { useEffect } from "react";
import { getRoles } from "../../store/Slices/RoleSlice";
import { getAllUsers } from "../../store/Slices/UserSlice";
interface RoleStats {
  role: string;
  users: number;
}
type User = {
  id: string;
  email: string;
  // Other user properties...
  role: string;
};
type Role = {
  name: string;
  description: string | null;
  parent_role: string | null;
  created_by: string;
};
type RoleArray = {
  name: string;
  users: User[];
};
type Stats = RoleStats[];
export const useGetRoles = () => {
  const [roles, setRoles] = React.useState();
  const [users, setUsers] = React.useState();
  const [rolesStats, setRolesStats] = React.useState<Stats>([]);
  const [roleArray, setRoleArray] = React.useState<RoleArray>();
  const fetchRoles = async () => {
    try {
      const ROLES = await getRoles();
      const USERS = await getAllUsers();
      setUsers(USERS?.users);
      setRolesStats(ROLES?.usersPerRole);
      setRoles(ROLES?.roles);
      let result: any = await createRoleArrays(ROLES?.roles, USERS?.users);
      setRoleArray(result);
    } catch (e) {}
  };
  async function createRoleArrays(
    roles: Role[],
    users: User[]
  ): Promise<any[]> {
    const roleArrays: any[] = [];

    roles.forEach((role) => {
      const roleArray: any[] = [];

      users.forEach((user) => {
        if (user.role === role.name) {
          roleArray.push(user);
        }
      });

      roleArrays.push({ name: role.name, users: roleArray });
    });

    return roleArrays;
  }
  useEffect(() => {
    fetchRoles();
  }, []);
  return { roles, rolesStats, users, roleArray };
};
