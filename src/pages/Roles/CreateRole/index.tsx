import React, { useEffect, useState } from 'react';
import { Header } from '../../../components';
import { InputTxt, CustomButton, CustomSwitch } from '../../../atoms';
import { useGetPermission } from '../../../custom-hooks/RolesHooks';
import { createRole } from '../../../store/Slices/RoleSlice';
import { useNavigate } from 'react-router-dom';
type permission = {
  description: string;
  name: string;
};
type PermissionHookState = {
  perm?: permission[];
  loading?: boolean;
};
type PermissionBody = {
  name: string;
  permissions: string[];
};
export const Createrole = () => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState<permission[]>();
  // This state is for sending data in the api
  const [permissionData, setPermissionData] = useState<PermissionBody>({
    name: '',
    permissions: [],
  });
  const { perm, loading }: PermissionHookState = useGetPermission();
  useEffect(() => {
    if (!loading) {
      setPermissions(perm);
    }
  }, [loading]);
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
  const addRole = async () => {
    const ADD = await createRole(permissionData);
    console.log(ADD);
    if (ADD) {
      navigate('/Searchrole');
    }
  };
  return (
    <div>
      {' '}
      <Header
        title={'Create Role'}
        semiTitle={'Create role and give permissions'}
        UserBox={true}
      />
      <InputTxt
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
          {!loading &&
            permissions?.map((item: permission, index: number) => {
              const existingPermissionIndex =
                permissionData.permissions?.findIndex(
                  item1 => item1 === item.name,
                );
              return (
                <div className="flex p-3 gap-3" key={index}>
                  <CustomSwitch
                    value={item.name}
                    onChange={handleChangePermission}
                    checked={existingPermissionIndex !== -1 ? true : false}
                  />
                  <p className="font-bold">{item.description}</p>
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
          onClick={addRole}
          txt={'Create Role'}
          classes={' !w-[179px] !rounded-[12px] !h-[50px]'}
        />
      </div>
    </div>
  );
};
