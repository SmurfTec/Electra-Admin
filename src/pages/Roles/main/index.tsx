import { Header, AdminCards, DashCard } from "../../../components";
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
          outerclasses={"!bg-[#212121] "}
          Add={true}
          txt={"Add New Member"}
          txtclasses={"!text-[#FFFFFF]"}
        />
      </div>
    </div>
  );
};
