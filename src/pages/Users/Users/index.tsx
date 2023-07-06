import { useState, useEffect, useRef } from "react";
import { DashCard } from "../../../components/index.js";
import IMAGES from "../../../assets/Images";
import { CustomTableComponent, CustomButton } from "../../../atoms";
import { SVGIcon } from "../../../components/SVG";
import { CustomMenu } from "../../../atoms/global.style";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/index.js";
import { Confirmationmodal } from "../../../components/index.js";
import { getAllUsers, BanUser, UnBanUser, DeleteSingleUser } from "../../../store/Slices/UserSlice.js";
import moment from "moment";
export const Users = () => {
  const navigate = useNavigate();
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalBan, setTotalBan] = useState(0)
  const [visible, setVisible] = useState(false);
  const [LoadMore, setLoadMore] = useState(true)
  const [selectedUsers, setselectedUsers] = useState<any>([]);
  const [CurrSelectedUser, setCurrSelectedUser] = useState("");
  const [filterData, setFilterData] = useState([]);


  const StatusBodyTemplate = (option: any) => {
    return (
      <>
        <div
          className={`px-[14px] py-[4px] text-[white] ${!option.is_banned ? "bg-blue" : "bg-red"
            } flex justify-center items-center rounded-[5px] text-[12px]`}
        >
          <p>{!option.is_banned ? "Active" : "Banned"}</p>
        </div>
      </>
    );
  };

  const getUsers = async () => {
    let response = await getAllUsers();
    setTotalUsers(response.results)
    let totalBan = 0
    let latestArr = response?.users?.map((item: any) => {
      let newObj = {
        ...item,
        firstname: item?.profile?.firstname || "",
        lastname: item?.profile?.lastname || "",
        phone: item?.profile?.mobile_no || "",
        register: moment(item.created_at).format("DD,MM,YYYY"),
        registerValue: "Website",
      }
      if (item.is_banned) {
        totalBan++
      }
      return newObj
    })
    latestArr.sort((a: any, b: any) => a.id - b.id)
    setTotalBan(totalBan)
    setFilterData(latestArr)

  }
  const setCancelButton = (e: any) => {
    e.preventDefault()
    setVisible(false)
  }

  const UnBanuser = async (e: any, id: any) => {
    e.stopPropagation();
    setVisible(false)
    console.log(id, "id")
    try {

      let body: any = {
        "ids": [
          id
        ]
      }
      let response = await UnBanUser(body)
      if (response) {
        getUsers()

      }
    } catch (err) {

    }
  }
  const setOkButton = async () => {
    BannedUser()
  }
  const UserBan = (e: any, id: any) => {
    e.stopPropagation();
    setCurrSelectedUser(id);
    setVisible(true);
  }
  const BannedUser = async () => {

    try {

      let body: any = {
        "ids": [
          CurrSelectedUser
        ]
      }
      let response = await BanUser(body)
      if (response) {
        setVisible(false)
        getUsers()

      }
    } catch (err) {

    }
  }
  const DeleteUser = async (event: React.MouseEvent, id: any) => {
    event.stopPropagation();

    try {
      let body: any = {
        "ids": [
          id
        ]
      }
      let response = await DeleteSingleUser(body)
      getUsers()
    } catch (err) {

    }

  };
  const SelectUser = async (e: any, id: any) => {
    e.stopPropagation();
    navigate(`/UserProfile/${id}`)
  }
  useEffect(() => {
    getUsers()
  }, [])

  const MenuBodyTemplate = (rowData: any) => {
    const MenuTemplate = ({ id, menuRef }: { id: string, menuRef: React.RefObject<any> }) => {
      let [items] = useState([
        {
          label: rowData.is_banned === true ? "UnBan User" : "Ban User",
          template: (item: any, options: any) => {
            return (
              <div

                className={`flex gap-1 items-center  text-[10px] font-[400] ${rowData.is_banned === true ? '!bg-[#3C82D6] !text-[#FFFFFF]' : '!bg-ban-color !text-[#21212]'}   `}
                onClick={(event: any) => { rowData.is_banned === true ? UnBanuser(event, rowData.id) : UserBan(event, rowData.id); }}
              >
                <SVGIcon fillcolor={rowData.is_banned ? "#FFFFFF" : '#212121'} src={IMAGES.Ban} />
                {rowData.is_banned === true ? "UnBan User" : "Ban User"}
              </div>
            );
          },
        },
        {
          label: "Delete",
          template: (item: any, options: any) => {
            return (
              <div
                style={{ background: "rgba(231, 29, 54, 0.05)" }}
                className="flex w-full gap-1  items-center  text-[10px] font-[400] text-[#E71D36]"
                onClick={(event: any) => DeleteUser(event, rowData.id)}
              >
                <SVGIcon fillcolor={"#E71D36"} src={IMAGES.Delete} /> Delete
              </div>
            );
          },
        },
        {
          label: "Select",
          template: (item: any, options: any) => {
            return (
              <div
                style={{ background: "rgba(46, 102, 194, 0.05)" }}
                className="flex gap-1 items-center  text-[10px] font-[400] text-[#21212]"
                onClick={(event: any) => SelectUser(event, rowData.id)}
              >
                <SVGIcon fillcolor={"#212121"} src={IMAGES.Select} /> Select
              </div>
            );
          },
        },
      ]);

      return (
        <CustomMenu model={items} popup ref={menuRef} id="popup_menu_left" />
      );
    };
    const menuLeftRef = useRef<any>(null);
    const handleClick = (event: any) => {
      event.preventDefault();
      menuLeftRef.current?.toggle(event);
    };

    return (
      <>
        <div
          className={`px-[14px] py-[4px] text-[white] relative  flex justify-center items-center rounded-[5px] text-[12px]`}
        >
          <SVGIcon onClick={handleClick} src={IMAGES.Dots} />
          <MenuTemplate id={rowData.id} menuRef={menuLeftRef} />
        </div>
      </>
    );
  };


  const [columnData] = useState([
    { field: "id", header: "ID" },
    { field: "firstname", header: "First Name" },
    { field: "lastname", header: "Last Name" },
    { field: "email", header: "Email" },
    { field: "phone", header: "Phone" },
    { field: "register", header: "Registered On" },
    { field: "status", header: "Status", body: StatusBodyTemplate },
    { field: "registerValue", header: "Registered Via" },
    { field: "", header: "", body: MenuBodyTemplate },
  ]);


  return (
    <div className="">
      <Header typeSearch={true} chooseFilter={true} UserBox={true} />
      <div className="flex flex-wrap gap-6 mt-[28px]">
        <DashCard
          title={"Total Users"}
          totalNumber={String(totalUsers)}
          myImg={IMAGES.person}
          imgColor={"bg-custom-grey"}
          textDash={"bg-custom-blue w-[67px] "}
          textColor={"#3C82D6"}
          arrowImg={IMAGES.uparrow}
          outerclasses="w-[284px] h-[140px]"
        />
        <DashCard
          title={"User Registered In March"}
          totalNumber={"350"}
          myImg={IMAGES.person}
          imgColor={"bg-custom-grey"}
          textDash={"bg-custom-blue w-[67px] "}
          textColor={"#3C82D6"}
          arrowImg={IMAGES.uparrow}
          outerclasses="w-[284px] h-[140px]"
        />
        <DashCard
          title={"User Registered This Year"}
          totalNumber={"3500"}
          myImg={IMAGES.person}
          imgColor={"bg-custom-grey"}
          textDash={"bg-custom-blue w-[67px] "}
          textColor={"#3C82D6"}
          arrowImg={IMAGES.uparrow}
          outerclasses="w-[284px] h-[140px]"
        />
      </div>
      <div className="mt-[40px] relative">
        <CustomTableComponent 
          filterData={filterData}
          selectedProducts={selectedUsers}
          setSelectedProducts={setselectedUsers}
          columnData={columnData}
          MultipleSelect={true}
          LoadMore={LoadMore}
          setLoadMore={setLoadMore}
        />
      </div>
      <Confirmationmodal
        PopupHeader={"Confirmation"}
        visible={visible}
        setVisible={setVisible}
        cnfrmbtnText={"Ban"}
        cnclebtnText={"Cancel"}
        text={
          "Are you sure you want to ban this user"
        }
        setOkButton={setOkButton}
        setCancelButton={setCancelButton}
      />
      {!LoadMore
        &&
        <div className="flex gap-2 items-center mt-[20px]">
          <CustomButton iconLeft={<SVGIcon fillcolor={"white"} src={IMAGES.DeleteIcon} />} classes={'!w-[194px] !h-[46px] !rounded-[8px] !bg-[#BA0000]'} txt={`Delete Users(${totalUsers})`} />
          <CustomButton iconLeft={<SVGIcon width={"14px"} height={"14px"} fillcolor={"#212121"} src={IMAGES.Ban} />} classes={'!w-[173px] !h-[46px] !text-black !rounded-[8px] !bg-[#FBBB00]'} txt={`Ban Users(${totalBan})`} />
        </div>
      }

    </div>
  );
};
