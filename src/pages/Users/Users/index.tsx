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
import { Paginatior } from "../../../components/index.js";
import { ProgressSpinner } from 'primereact/progressspinner';
import moment from "moment";
import { useFetchUsers } from "../../../custom-hooks/useFetchUsers.js";

export const Users = () => {
  const navigate = useNavigate();
  const [totalUsers, setTotalUsers] = useState(0)
  const [totalBan, setTotalBan] = useState(0)
  const [visible, setVisible] = useState(false);
  
  
  const [LoadMore, setLoadMore] = useState(false)
  const [selectedUsers, setselectedUsers] = useState<any>([]);
  const [CurrSelectedUser, setCurrSelectedUser] = useState("");
  const [filterData, setFilterData] = useState([]);
  
  const [initialPageData, setInitialPageData] = useState({
    rowsPerPage: 25,
    currentPage: 1,
    
  })
  const {users, userLoading,stats}=useFetchUsers(initialPageData)
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
        setInitialPageData({...initialPageData,currentPage:1})

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
        setInitialPageData({...initialPageData,currentPage:1})

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
      setInitialPageData({...initialPageData,currentPage:1})
    } catch (err) {

    }

  };
  const SelectUser = async (e: any, id: any) => {
    e.stopPropagation();
    navigate(`/UserProfile/${id}`)
  }
  useEffect(() => {
    // getUsers()

    let latestArr = users?.map((item: any) => {
      let newObj = {
        ...item,
        firstname: item?.profile?.firstname || "",
        lastname: item?.profile?.lastname || "",
        phone: item?.profile?.mobile_no || "",
        register: moment(item.created_at).format("DD,MM,YYYY"),
        registerValue: "Website",
      }
     
      return newObj
    })
    latestArr?.sort((a: any, b: any) => a.id - b.id)
   
    setFilterData(latestArr)
  }, [users])

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

  function getLastMonthName() {
    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  
    const currentDate = new Date(); // Current date
    const currentMonth = currentDate.getMonth(); // Current month (0-11)
    const currentYear = currentDate.getFullYear(); // Current year
  
    // Calculate the month and year for the last month
    let lastMonth, lastYear;
    if (currentMonth === 0) {
      // If current month is January, the last month is December of the previous year
      lastMonth = 11; // December (0-11)
      lastYear = currentYear - 1;
    } else {
      lastMonth = currentMonth - 1;
      lastYear = currentYear;
    }
  
    // Get the name of the last month
    const lastMonthName = monthNames[lastMonth];
  
    return lastMonthName;
  }
  return (
    <div className="">
      <Header typeSearch={true} chooseFilter={true} UserBox={true} />
      {!userLoading ?
    <>
    <div className="flex flex-wrap gap-6 mt-[28px]">
        <DashCard
          title={"Total Users"}
          totalNumber={String(stats?.total_users_registered || 0
            )}
          myImg={IMAGES.person}
          imgColor={"bg-custom-grey"}
          textDash={`${stats?.total_users_percentage>=0?"bg-custom-blue":"bg-custom-red"}  w-[67px]`}
          textColor={stats?.total_users_percentage>=0?"#3C82D6":"#FF0000"}
          arrowImg={stats?.total_users_percentage>=0? IMAGES.uparrow:IMAGES.downarrow}
          outerclasses="w-[284px] h-[140px]"
          txt={stats?.total_users_percentage?.toFixed(2)||0}
        />
        <DashCard
          title={`User Registered In ${getLastMonthName()}`}
          totalNumber={stats?.total_users_last_month || 0}
          myImg={IMAGES.person}
          imgColor={"bg-custom-grey"}
          textDash={`${stats?.users_percentage>=0?"bg-custom-blue":"bg-custom-red"}  w-[67px]`}
          textColor={stats?.users_percentage>=0?"#3C82D6":"#FF0000"}
          arrowImg={stats?.users_percentage>=0? IMAGES.uparrow:IMAGES.downarrow}
          outerclasses="w-[284px] h-[140px]"
          txt={stats?.users_percentage?.toFixed(2)||0 }
        />
        <DashCard
          title={"User Registered This Year"}
          totalNumber={String(stats?.total_user_this_year || 0)}
          myImg={IMAGES.person}
          imgColor={"bg-custom-grey"}
          textDash={`${stats?.users_years_percentage>=0?"bg-custom-blue":"bg-custom-red"}  w-[67px]`}
          textColor={stats?.users_years_percentage>=0?"#3C82D6":"#FF0000"}
          arrowImg={stats?.users_years_percentage>=0? IMAGES.uparrow:IMAGES.downarrow}
          outerclasses="w-[284px] h-[140px]"
          txt={stats?.users_years_percentage?.toFixed(2)||0 }
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
        <Paginatior totalRecords={stats?.total_users_registered} initialPageData={initialPageData} setInitialPageData={setInitialPageData} />
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
    </>
    :  
    <div className="w-full mt-[100px] h-full flex justify-start items-center overflow-y-hidden">
<ProgressSpinner  style={{overflow:"hidden"}} />
</div>
    }

    </div>
  );
};
