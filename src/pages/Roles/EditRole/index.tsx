import { useEffect, useState } from 'react';
import { Header } from '../../../components';
import { InputTxt, CustomButton, CustomSwitch } from '../../../atoms';
import {
  useGetPermission,
  useGetRoleByName,
} from '../../../custom-hooks/RolesHooks';
import { editRole } from '../../../store/Slices/RoleSlice';
import { useNavigate, useLocation } from 'react-router-dom';

type permission = {
  permissions: {
    name: string;
    description: string;
  };
  name: string;
  created_by: string;
  created_at: string;
};
type PermissionHookState = {
  perm?: simplePermission[] | any;
  loading?: boolean | any;
};
type PermissionHookState1 = {
  perm1: permission[] | any;
  loading1: boolean | any;
};
type PermissionBody = {
  name?: string;
  permissions: string[];
};
type simplePermission = {
  name?: string;
  description?: string;
};
export const Editrole = () => {
  const [permissions, setPermissions] = useState<permission[]>();
  const [permissionData, setPermissionData] = useState<PermissionBody>({
    name: '',
    permissions: [],
  });
  const location = useLocation();
  const { pathname } = location;
  const name = pathname.split('/').pop();
  const hookResult = useGetRoleByName(name) as PermissionHookState1;
  const { perm1, loading1 } = hookResult;
  const { perm, loading }: PermissionHookState = useGetPermission();

  useEffect(() => {
    if (perm1 && !loading1) {
      let newPerm = perm1?.map((item: permission, index: any) => {
        let { name } = item.permissions;
        return name;
      });
      setPermissionData({
        name: name,
        permissions: newPerm,
      });
    }
  }, [loading1]);
  useEffect(() => {
    if (perm && !loading) {
      setPermissions(perm);
    }
  }, [loading]);
  const navigate = useNavigate();
  // This state is for sending data in the api

  const handleChangePermission = (permissionValue: string) => {
    console.log(permissionValue);
    const existingPermissionIndex = permissionData.permissions?.findIndex(
      item => item === permissionValue,
    );

    if (existingPermissionIndex !== -1) {
      // Permission value already exists, so remove it
      const updatedPermissions = [...permissionData.permissions];
      updatedPermissions?.splice(existingPermissionIndex, 1);
      setPermissionData({
        ...permissionData,
        permissions: updatedPermissions,
      });
    } else {
      // Permission value doesn't exist, so add it
      const newPermission = permissionValue;
      setPermissionData({
        ...permissionData,
        permissions: [...permissionData.permissions, newPermission],
      });
    }
  };
  const EDIT = async () => {
    const ADD = await editRole(permissionData, name);
    console.log(ADD);
    if (ADD) {
      navigate('/Searchrole');
    }
  };
  useEffect(() => {
    console.log(permissionData);
  }, [permissionData]);
  return (
    <div>
      {' '}
      <Header
        title={'Edit Role'}
        semiTitle={'Edit role and give permissions'}
        UserBox={true}
      />
      <InputTxt
        value={permissionData.name}
        placeholder="Title"
        MainClasses="mt-[40px]"
        onChange={(e: any) => {
          setPermissionData({
            ...permissionData,
            name: e.target.value,
          });
        }}
      />
      <div className="border-custom border w-[50%] mt-3">
        <p className="text-[19px] font-bold p-3">Permissions</p>
        <div className="border-t  border-custom">
          {permissions?.map((item?: simplePermission, index?: number) => {
            const existingPermissionIndex =
              permissionData.permissions?.findIndex(
                item1 => item1 === item?.name,
              );
            return (
              <div className="flex p-3 gap-3" key={index}>
                <CustomSwitch
                  value={item?.name}
                  onChange={handleChangePermission}
                  checked={existingPermissionIndex !== -1 ? true : false}
                />
                <p className="font-bold">{item?.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex  mt-2 gap-4">
        <CustomButton
          onClick={() => {
            navigate('/Searchrole');
          }}
          txt={'Cancel'}
          classes={
            '!bg-[#E2E2E2] !text-black !w-[179px] !h-[50px] !rounded-[12px]'
          }
        />
        <CustomButton
          onClick={EDIT}
          txt={'Edit Role'}
          classes={' !w-[179px] !rounded-[12px] !h-[50px]'}
        />
      </div>
    </div>
  );
};
