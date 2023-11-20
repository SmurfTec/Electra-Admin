import { ProgressSpinner } from 'primereact/progressspinner';
import { TabPanel } from 'primereact/tabview';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IMAGES from '../../../assets/Images';
import { CustomTableComponent } from '../../../atoms';
import { CustomMenu, CustomTabView } from '../../../atoms/global.style';
import {
  AdminCards,
  DashCard,
  Header,
  Paginatior,
  ShippingModal,
} from '../../../components';
import { SVGIcon } from '../../../components/SVG';

import moment from 'moment';
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { Menu } from 'primereact/menu';
import { useDeleteRole, useGetRoles } from '../../../custom-hooks/RolesHooks';
import { updateUserRole } from '../../../store/Slices/RoleSlice';
interface RoleStats {
  role: string;
  users: number;
}

type Stats = RoleStats[];
type Account = {
  id: string;
  email: string;
  created_at: string;
  role: string;
  profile?: {
    username: string;
    mobile_no: string;
    firstname: string;
    lastname: string;
  };
};
type User = {
  id: string;
  email: string;
  // Other user properties...
  role: string;
};
type userArray = User[];
type PartialAccount = Partial<Account>;
export const Roles = () => {
  const [visible, setVisible] = React.useState(false);
  const [fetch, setFetch] = React.useState(false);
  const navigate = useNavigate();
  const menuLeft: any = React.useRef(null);
  const roleMenu: any = React.useRef(null);
  const [CurrSelectedProduct, setCurrSelectedProduct] =
    useState<PartialAccount>({});
  const [MenuLabel, setMenuLabel] = useState('');
  const [Body, setBody] = useState({
    ids: [''],
  });
  const [actIndex, setActIndex] = useState(0);
  const { userLoading }: any = useDeleteRole(Body, setFetch, fetch);
  const [initialPageData, setInitialPageData] = useState({
    rowsPerPage: 10,
    currentPage: 1,
  });
  const {
    rolesStats,
    users,
    roleArray,
    totalStats,
    loading,
    updateUsers,
  }: {
    roles?: any;
    rolesStats: Stats | any;
    users: userArray | any;
    roleArray: any;
    totalStats: any;
    loading: boolean;
    updateUsers: any;
  } = useGetRoles(fetch, initialPageData);

  const [updatingRole, setUpdatingRole] = useState(false);

  const filterData = users?.map((item: PartialAccount, index: number) => {
    return {
      id: item.id,
      Account: `${item.profile?.firstname} ${item.profile?.lastname}`,
      'Email Address': item.email,
      'Phone No': item.profile?.mobile_no ?? '-',
      'Assigned On': moment(item.created_at).format('DD MMM YYYY'),
      Role: item.role,
    };
  });
  const viewItem = (event: React.MouseEvent, item: any, vaaluue?: any) => {
    event.stopPropagation();

    setMenuLabel(prevLabel => (prevLabel === item.label ? '' : item.label));
  };
  const deleteItem = (event: React.MouseEvent, item: any, vaaluue?: any) => {
    event.stopPropagation();
    setBody({
      ids: [vaaluue],
    });

    setMenuLabel(prevLabel => (prevLabel === item.label ? '' : item.label));
  };
  const items = [
    {
      items: [
        {
          label: 'View',
          // command: handleBanUser,
          template: (item: any, options: any) => {
            return (
              <div
                onClick={(event: any) =>
                  viewItem(event, item, CurrSelectedProduct)
                }
                style={{ backgroundColor: 'rgba(255, 245, 0, 0.05)' }}
                className="flex gap-1 items-center  text-[10px] font-[400] text-[#21212]"
              >
                <SVGIcon
                  width="9px"
                  height="6px"
                  fillcolor={'#212121'}
                  src={IMAGES.eye}
                />
                View Admin
              </div>
            );
          },
        },
        {
          label: 'Delete',

          // command: handleBanUser,
          template: (item: any, options: any) => {
            return (
              <div
                onClick={(event: any) =>
                  deleteItem(event, item, CurrSelectedProduct)
                }
                style={{ background: 'rgba(231, 29, 54, 0.05)' }}
                className="flex w-full gap-1  items-center  text-[10px] font-[400] text-[#E71D36]"
              >
                <SVGIcon fillcolor={'#E71D36'} src={IMAGES.Delete} /> Delete
              </div>
            );
          },
        },
      ],
    },
  ];
  const AccountBodyTemplate = (option: any) => {
    return (
      <div className="flex gap-2 items-center justify-start">
        <img src={IMAGES.Guy1} />
        <p className="font-bold">{option.Account}</p>
      </div>
    );
  };
  const MenuBodyTemplate = (rowData: any) => {
    const handleClick = (event: any) => {
      event.preventDefault();
      setCurrSelectedProduct(rowData.id);
      menuLeft.current.toggle(event);
    };

    return (
      <>
        <div
          className={`px-[14px] py-[4px] text-[white] relative  flex justify-center items-center rounded-[5px] text-[12px]`}
        >
          <Button
            icon="pi pi-ellipsis-h"
            rounded
            text
            severity="secondary"
            aria-label="Action"
            className="font-extrabold text-black"
            onClick={handleClick}
          />
          {/* <SVGIcon onClick={handleClick} src={IMAGES.Dots} /> */}
          <CustomMenu
            height={'78px'}
            model={items}
            popup
            ref={menuLeft}
            id="popup_menu_left"
          />
        </div>
      </>
    );
  };
  const StatusBodyTemplate = (option: any) => {
    const style = `px-[14px] py-[4px]
          text-center
          h-[33px]
           bg-custom-blue text-[black]
       max-w-[160px]
          
            flex justify-center gap-5 items-center rounded-[25px] text-[12px] overflow-hidden`;

    const handleClick = (event: any) => {
      event.preventDefault();
      if (!updatingRole) {
        setCurrSelectedProduct(option.id);
        roleMenu.current.toggle(event);
      }
    };
    const handleMenuClick = async (e: any) => {
      e.preventDefault();
      const { role } = e.currentTarget.dataset;
      roleMenu.current.toggle(e);

      try {
        setUpdatingRole(true);
        const resp = await updateUserRole(CurrSelectedProduct as string, {
          roles: [role],
        });
        setCurrSelectedProduct({});
        updateUsers([
          ...users.map((el: any) =>
            el.id === resp?.data?.[0]?.user_id ? { ...el, role } : el
          ),
        ]);
        // setInitialPageData(st => ({ ...st, currentPage: 1 }));
      } catch (er) {
        console.log('er', er);
      } finally {
        setUpdatingRole(false);
      }
    };

    return (
      <>
        {updatingRole && (CurrSelectedProduct as string) === option.id ? (
          <div className="flex items-center">
            <ProgressSpinner
              style={{
                width: '30px',
                height: '30px',
                marginInline: 'auto',
                overflow: 'hidden',
              }}
            />
          </div>
        ) : (
          <div
            className={style}
            onClick={handleClick}
            aria-controls="popup_menu_role"
          >
            <p className="font-bold">{option.Role}</p>
            <img src={IMAGES.dropdown} />
          </div>
        )}
        <Menu
          model={[
            ...roleArray.map((el: any, ind: number, arr: any) => ({
              label: '',
              template: (item: any, options: any) => {
                return (
                  <div
                    onClick={handleMenuClick}
                    // data-user={item.id}
                    data-role={el.name}
                  >
                    <div className="text-[14px] font-semibold text-[black]">
                      {el.name}
                    </div>
                    {ind < arr.length - 1 && (
                      <Divider className="!p-0 !my-1 !w-full !h-1" />
                    )}
                  </div>
                );
              },
            })),
          ]}
          popup
          ref={roleMenu}
          id="popup_menu_role"
          className="!w-[130px] !px-3 !py-2"
        />
      </>
    );
  };
  const columnData = [
    { field: 'Account', header: 'Account', body: AccountBodyTemplate },
    { field: 'Email Address', header: 'Email Address' },
    { field: 'Phone No', header: 'Phone No' },
    { field: 'Assigned On', header: 'Assigned On' },
    {
      field: 'Role',
      header: 'Role',
      body: StatusBodyTemplate,
      className: 'role',
    },
    { field: '', header: '', body: MenuBodyTemplate },
  ];
  useEffect(() => {
    if (MenuLabel == 'View') {
      navigate(`/Viewadmin/${CurrSelectedProduct}`);
    }
  }, [MenuLabel]);
  return (
    <div>
      <ShippingModal visible={visible} setVisible={setVisible} />
      <Header placeholder="Search Admins" typeSearch={true} UserBox={true} />
      <div className="flex gap-2 flex-wrap">
        {rolesStats &&
          rolesStats.length > 0 &&
          rolesStats?.map((item: RoleStats, index: number) => {
            return (
              <AdminCards key={index} accounts={item.users} title={item.role} />
            );
          })}
        <DashCard
          onClick={() => navigate('/Newadmin')}
          outerclasses={'!bg-[#212121] !w-[187px] !h-[93px]'}
          Add={true}
          txt={'Add New Member'}
          txtclasses={'!text-[#FFFFFF]'}
          Addimg={IMAGES.newmembers}
        />
        <DashCard
          onClick={() => navigate('/Searchrole')}
          outerclasses={'!bg-[#3C82D6] !w-[187px] !h-[93px]'}
          Add={true}
          txt={'View Roles'}
          txtclasses={'!text-[#FFFFFF]'}
          Addimg={IMAGES.Rolesbadge}
        />
      </div>
      <div className="mt-4 bg-[#FCFCFC] w-[90%] rounded-[10px]">
        <div>
          <p className="font-bold p-4 text-[19px]">
            Administrators <br />
            <span className="font-medium text-[#A4A4A4] -mt-[10px]  text-[14px]">
              Find all of your team accounts
            </span>
          </p>
          {!loading ? (
            <>
              {' '}
              <CustomTabView
                activeIndex={actIndex}
                onTabChange={e => {
                  setActIndex(e.index);
                }}
              >
                <TabPanel key={0} header={`All(${filterData?.length})`}>
                  <p className="m-0">
                    <CustomTableComponent
                      columnStyle={{ backgroundColor: '#FCFCFC' }}
                      headerStyle={{
                        color: 'black',
                        fontWeight: '800',
                        textAlign: 'left',
                      }}
                      columnHeaderFirst={'start'}
                      filterData={filterData}
                      columnData={columnData}
                      rowStyling={'#FCFCFC !important'}
                      // columnHeader={"flex-start"}
                    />
                  </p>
                </TabPanel>
                {roleArray?.map((item: any, index: any) => {
                  const filterData2 = item.users?.map(
                    (item: PartialAccount, index: number) => {
                      return {
                        Account: `${item.profile?.firstname} ${item.profile?.lastname}`,
                        'Email Address': item.email,
                        'Phone No': item.profile?.mobile_no ?? '-',
                        'Assigned On': moment(item.created_at).format(
                          'DD MMM YYYY'
                        ),
                        Role: item.role,
                      };
                    }
                  );
                  return (
                    <TabPanel key={index} header={item.name}>
                      <CustomTableComponent
                        columnStyle={{ backgroundColor: '#FCFCFC' }}
                        headerStyle={{
                          color: 'black',
                          fontWeight: '800',
                          textAlign: 'left',
                        }}
                        columnHeaderFirst={'start'}
                        filterData={filterData2}
                        columnData={columnData}
                        rowStyling={'#FCFCFC !important'}
                        // columnHeader={"flex-start"}
                      />
                    </TabPanel>
                  );
                })}
              </CustomTabView>
            </>
          ) : (
            <div className="w-full h-full flex justify-start items-center overflow-y-hidden">
              <ProgressSpinner style={{ overflow: 'hidden' }} />
            </div>
          )}
          <Paginatior
            totalRecords={Number(totalStats?.total_users_registered)}
            initialPageData={initialPageData}
            setInitialPageData={setInitialPageData}
            recordShowing={
              roleArray && actIndex > 0
                ? roleArray[actIndex - 1]?.users?.length
                : filterData?.length
            }
          />
        </div>
      </div>
    </div>
  );
};
