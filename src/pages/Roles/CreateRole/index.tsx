import React from "react";
import { Header } from "../../../components";
import { InputTxt, CustomButton, CustomSwitch } from "../../../atoms";
export const Createrole = () => {
  return (
    <div>
      {" "}
      <Header
        title={"Create Role"}
        semiTitle={"Create role and give permissions"}
        UserBox={true}
      />
      <InputTxt placeholder="Title" MainClasses="mt-[40px]" />
      <div className="border-custom border w-[50%] mt-3">
        <p className="text-[19px] font-bold p-3">Permissions</p>
        <div className="border-t  border-custom">
          <div className="flex p-3 gap-3">
            <CustomSwitch checked={true} />
            <p className="font-bold">User can view payment data</p>
          </div>
          <div className="flex p-3 gap-3">
            <CustomSwitch checked={false} />
            <p className="font-bold">User can edit settings.</p>
          </div>
          <div className="flex p-3 gap-3">
            <CustomSwitch checked={true} />
            <p className="font-bold">View & edit coupons.</p>
          </div>

          <div className="flex p-3 gap-3">
            <CustomSwitch checked={true} />
            <p className="font-bold">View & Edit Categories.</p>
          </div>
          <div className="flex p-3 gap-3">
            <CustomSwitch checked={false} />
            <p className="font-bold">View, list or edit products.</p>
          </div>
          <div className="flex p-3 gap-3">
            <CustomSwitch checked={true} />
            <p className="font-bold">Access to help center.</p>
          </div>
          <div className="flex p-3 gap-3">
            <CustomSwitch checked={true} />
            <p className="font-bold">View Orders.</p>
          </div>
          <div className="flex p-3 gap-3">
            <CustomSwitch checked={true} />
            <p className="font-bold">View Listings.</p>
          </div>
          <div className="flex p-3 gap-3">
            <CustomSwitch checked={true} />
            <p className="font-bold">Modify & view fee structure.</p>
          </div>
        </div>
      </div>
      <div className="flex  mt-2 gap-4">
        <CustomButton
          txt={"Cancel"}
          classes={
            "!bg-[#E2E2E2] !text-black !w-[179px] !h-[50px] !rounded-[12px]"
          }
        />
        <CustomButton
          txt={"Create Role"}
          classes={" !w-[179px] !rounded-[12px] !h-[50px]"}
        />
      </div>
    </div>
  );
};
