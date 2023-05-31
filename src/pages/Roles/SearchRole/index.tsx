import React from "react";
import { Header } from "../../../components";
import { DashCard } from "../../../components";
import { useNavigate } from "react-router-dom";
import IMAGES from "../../../assets/Images";
export const Searchrole = () => {
  return (
    <div>
      <Header
        typeSearch={true}
        placeholder="Search Roles"
        chooseFilter={false}
        UserBox={true}
      />
      <div>
        <DashCard
          outerclasses={"!bg-[#212121] !w-[187px] !h-[93px] !mt-10"}
          Add={true}
          txt={"Add New Member"}
          txtclasses={"!text-[#FFFFFF]"}
          Addimg={IMAGES.newmembers}
        />
        <div>
            
        </div>
      </div>
    </div>
  );
};
