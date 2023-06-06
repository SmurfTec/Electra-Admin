import { Header } from "../../../components";
import { CustomDropdown, InputTxt, CustomButton,InputPassword } from "../../../atoms";
import { useNavigate } from "react-router-dom";
export const CreateNewadmin = () => {
  const Navigate=useNavigate()
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
            placeholder="Full Name"
            MainClasses="mt-4 !w-[80%] !h-[59px]"
          />
          <InputTxt placeholder="Email" MainClasses="mt-4 !w-[80%] !h-[59px]" />
        </div>
        <div className="flex gap-5">
          <InputTxt
            placeholder="Phone No"
            MainClasses="mt-4 !w-[80%] !h-[59px]"
          />
          <div className="!w-[85%]">
          <InputPassword
            placeholder="Password"
            MainClasses="mt-4 !w-full !h-[59px]"
          />
          <p className="text-right text-[12px] text-[#656565]">
            Min 8 characters
          </p>
          </div>
         
        </div>
        <div>
          <CustomDropdown
            placeholderColor={"#A4A4A4"}
            placeholder="Choose Role"
            mainclasses={"mt-4 w-[286px] !h-[59px]"}
          />
        </div>
        <div className="flex gap-4 mt-4">
          <CustomButton
            txt={"Cancel"}
            classes={
              "!bg-[#E2E2E2] !text-black !w-[179px] !h-[50px] !rounded-[12px]"
            }
          />
          <CustomButton
          onClick={()=>{
            Navigate("/Viewadmin")
          }}
            txt={"Create Admin"}
            classes={" !w-[179px] !rounded-[12px] !h-[50px]"}
          />
        </div>
      </div>
    </div>
  );
};
