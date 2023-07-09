import React, { useEffect } from "react";
import { getRoles } from "../../store/Slices/RoleSlice";
import { getAllUsers, addAdmin } from "../../store/Slices/UserSlice";
import { getPermission } from "../../store/Slices/RoleSlice";
import { useNavigate } from "react-router-dom";
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
  description: string;
  parent_role: string;
  created_by: string;
};
type RoleArray = {
  name: string;
  users: User[];
};
interface AdminBody {
  // Define the properties of the AdminBody interface
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  mobile_no: string;
  role: string;
}

type Stats = RoleStats[];
type UseCreateAdminReturnType = {
  roles?: Role[];
  setAdmin?: any;
  loading?: boolean;
};
type permission = {
  description: string;
  name: string;
};
type permissionData = permission[];
export const useGetRoles = () => {
  const [roles, setRoles] = React.useState();
  const [users, setUsers] = React.useState();
  const [rolesStats, setRolesStats] = React.useState<Stats>([]);
  const [roleArray, setRoleArray] = React.useState<RoleArray>();
  const [loading, setLoading] = React.useState(true);

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
    setLoading(false);

    return roleArrays;
  }
  useEffect(() => {
    fetchRoles();
  }, []);
  return { roles, rolesStats, users, roleArray, loading };
};
export const useCreateAdmin = (): UseCreateAdminReturnType => {
  const Navigate = useNavigate();

  const [roles, setRoles] = React.useState<Role[]>([]);
  const [adminBody, setAdmin] = React.useState<AdminBody | any>();
  const [loading, setLoading] = React.useState(true);

  const addingAdmin = async () => {
    try {
      const add = await addAdmin(adminBody);
      if (add) {
        Navigate("/Roles");
      }
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ROLES = await getRoles();
        setRoles(ROLES?.roles || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (adminBody) {
      addingAdmin();
    }
  }, [adminBody]);

  return { roles, setAdmin, loading };
};

export const useGetPermission = () => {
  const [perm, setPerm] = React.useState<permissionData>();
  const [loading, setLoading] = React.useState(true);
  const fetchPermission = async () => {
    try {
      const fetch = await getPermission();
      console.log(fetch);
      setPerm(fetch.data);
      setLoading(false);
    } catch (e) {}
  };
  useEffect(() => {
    fetchPermission();
  }, []);
  return { perm, loading };
};
