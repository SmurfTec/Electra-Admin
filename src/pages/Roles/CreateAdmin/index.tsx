import React, { useEffect, useState } from "react";
import { Header } from "../../../components";
import {
  CustomDropdown2,
  InputTxt,
  CustomButton,
  InputPassword,
} from "../../../atoms";
import { useNavigate } from "react-router-dom";
import { useCreateAdmin } from "../../../custom-hooks/RolesHooks";
type adminBody = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  mobile_no: string;
  role: string;
};
type Role = {
  name: string;
  description: string | null;
  parent_role: string | null;
  created_by: string;
};
type UseCreateAdminReturnType = {
  roles?: Role[] | any;
  setAdmin?: any;
  loading?: boolean;
};
export const CreateNewadmin = () => {
  const Navigate = useNavigate();
  const [rolesRender, setRolesRender] = useState();
  const { roles, setAdmin, loading }: UseCreateAdminReturnType =
    useCreateAdmin();
  const [error, setError] = useState("");
  useEffect(() => {
    if (!loading) {
      let data;
      data = roles.map((item: any, index: any) => {
        let newObj = {
          value: item.name,
          label: item.name,
        };
        return newObj;
      });
      setRolesRender(data);
    }
  }, [loading]);
  const [adminBody, setAdminBody] = useState<adminBody>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobile_no: "",
    role: "",
  });
  function handleChange<T>(
    e: React.ChangeEvent<HTMLInputElement>,
    object: T,
    setObject: React.Dispatch<React.SetStateAction<T>>
  ): void {
    const { name, value } = e.target;
    setObject((prevObject: T) => ({
      ...prevObject,
      [name]: value,
    }));
  }
  function isAllValuesFilled(adminBody: any) {
    for (const key in adminBody) {
      if (adminBody.hasOwnProperty(key) && adminBody[key] === "") {
        return false;
      }
    }
    return true;
  }
  return (
    <div>
      <Header
        title="Add new admin"
        semiTitle="Create a new admin and assign role accordingly"
        chooseFilter={false}
        UserBox={true}
      />
      <div className="gap-4 w-[35%]">
        <div className="flex gap-5">
          <InputTxt
            placeholder="First Name"
            MainClasses="mt-4 !w-[80%] !h-[59px]"
            name="firstname"
            value={adminBody.firstname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e, adminBody, setAdminBody)
            }
          />
          <InputTxt
            placeholder="Last Name"
            MainClasses="mt-4 !w-[80%] !h-[59px]"
            name="lastname"
            value={adminBody.lastname}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e, adminBody, setAdminBody)
            }
          />
        </div>
        <div className="flex gap-5">
          <InputTxt
            placeholder="Email"
            MainClasses="mt-4 !w-[80%] !h-[59px]"
            name="email"
            value={adminBody.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e, adminBody, setAdminBody)
            }
          />
        </div>
        <div className="flex gap-5">
          <InputTxt
            placeholder="Phone No"
            MainClasses="mt-4 !w-[80%] !h-[59px]"
            name="mobile_no"
            value={adminBody.mobile_no}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e, adminBody, setAdminBody)
            }
          />
          <div className="!w-[85%]">
            <InputPassword
              placeholder="Password"
              MainClasses="mt-4 !w-full !h-[59px]"
              name="password"
              value={adminBody.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange(e, adminBody, setAdminBody)
              }
            />
            <p className="text-right text-[12px] text-[#656565]">
              Min 8 characters
            </p>
          </div>
        </div>
        <div>
          <CustomDropdown2
            placeholderColor={"#A4A4A4"}
            placeholder="Choose Role"
            mainclasses={"mt-4 w-[286px] !h-[59px]"}
            options={rolesRender}
            setValue={(value: any) => {
              console.log(value);
              setAdminBody({
                ...adminBody,
                role: value,
              });
            }}
          />
        </div>
        {error && <p className="text-red">
          {error}</p>}
        <div className="flex gap-4 mt-4">
          <CustomButton
            txt={"Cancel"}
            classes={
              "!bg-[#E2E2E2] !text-black !w-[179px] !h-[50px] !rounded-[12px]"
            }
          />
          <CustomButton
            onClick={() => {
              if (isAllValuesFilled(adminBody)) {
                // All values are filled, perform your action here
                console.log("All values are filled.");
                setError("")
                setAdmin(adminBody);
              } else {
                // Not all values are filled, handle the error or display a message
                setError("Fill all the fields");
              }
            }}
            txt={"Create Admin"}
            classes={" !w-[179px] !rounded-[12px] !h-[50px]"}
          />
        </div>
      </div>
    </div>
  );
};
