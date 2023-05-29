import { Header, AdminCards, DashCard } from "../../../components";
import IMAGES from "../../../assets/Images";
export const Roles = () => {
  return (
    <div>
      <Header
        placeholder="Search Admins"
        typeSearch={true}
        chooseFilter={true}
        UserBox={true}
      />
      <div className="flex gap-2">
        <AdminCards accounts={"3 ACCOUNTS"} title={"Super Admin"} />
        <AdminCards accounts={"3 ACCOUNTS"} title={"Admin"} />
        <AdminCards accounts={"3 ACCOUNTS"} title={"Sub Admin"} />
        <DashCard
          outerclasses={"!bg-[#212121] !w-[187px] !h-[93px]"}
          Add={true}
          txt={"Add New Member"}
          txtclasses={"!text-[#FFFFFF]"}
          Addimg={IMAGES.newmembers}
        />
         <DashCard
          outerclasses={"!bg-[#3C82D6] !w-[187px] !h-[93px]"}
          Add={true}
          txt={"View Roles"}
          txtclasses={"!text-[#FFFFFF]"}
          Addimg={IMAGES.Rolesbadge}
        />
      </div>
    </div>
  );
};
