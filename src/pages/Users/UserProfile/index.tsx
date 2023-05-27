import React, { useState } from 'react'
import { DashCard } from '../../../components'
import IMAGES from '../../../assets/Images'
import { CustomButton } from '../../../atoms'
import { Header } from '../../../components'
import { InputTxt } from '../../../atoms'
export const UserProfile = () => {
    const [activetxt, setactivetxt] = useState('Active')
    const[search,setSearch]=useState('')
    const [ButtonList, setButtonList] = useState([
        { id: 1, txt: 'Active', active: true },
        { id: 2, txt: 'Pending', active: false },
        { id: 3, txt: 'Completed', active: false },
    ])
    const [Data, setData] = useState([
        { id: 1, txt: 'Active', title: "No of Listings", body: '20' },
        { id: 2, txt: 'Active', title: "Gross Value", body: '$2000' },
        { id: 3, txt: 'Active', title: "Net Value", body: '$1900' },
        { id: 4, txt: 'Pending', title: "Pending Sales", body: '5' },
        { id: 5, txt: 'Pending', title: "Gross Value", body: '$2000' },
        { id: 6, txt: 'Pending', title: "Net Value", body: '$2100' },
        { id: 7, txt: 'Completed', title: "Total Sales", body: '20' },
        { id: 8, txt: 'Completed', title: "Gross Value", body: '3' },
        { id: 9, txt: 'Completed', title: "Net Value", body: '17' },
        { id: 10, txt: 'Completed', title: "Total Points Earned", body: '1500' },
    ])
    const handleButton = (id: any) => {
        const buttonfilter = ButtonList.map((item: any, index: any) => {
            if (item.id == id) {
                setactivetxt(item.txt)
                return ({
                    ...item,
                    active: true
                })
            } else {
                return ({
                    ...item,
                    active: false
                })
            }

        })
        setButtonList(buttonfilter)
    }
    return (
        <div className=''>
             <Header 
              title="User Profile"
              semiTitle="View user profile and their stats"
              chooseFilter={true}
              UserBox={true}
              />
            <div className='flex gap-5 mt-[31px]'>
                <div className=' w-[500px] h-auto border border-custom-border rounded-[10px] flex flex-col pt-[11px] pl-[17px] pr-[17px]'>
                    <div className='flex justify-between'>
                        <div className='flex flex-col gap-2'>
                            <h1 className='text-[24px] font-[600] text-[#212121]'>John Carter</h1>
                            <p className='text-[14px] font-[400] text-[#969696]'>annejacob2@ummoh.com</p>
                        </div>
                    </div>
                    <div className='flex justify-between mt-[46px]'>
                        <div className='flex flex-col'>
                            <h1 className='text-[14px] font-[500] text-[#969696]'>Joined On</h1>
                            <p className='text-[14px] font-[400] text-[#212121]'>20 aug,2022</p>
                        </div>
                    </div>
                    <hr className='w-full mt-[19px] border border-custom-border' />
                    <div className='flex justify-between mt-[19px]'>
                        <div className='flex flex-col'>
                            <h1 className='text-[14px] font-[500] text-[#969696]'>Phone No</h1>
                            <p className='text-[14px] font-[400] text-[#212121]'>+53563636366336</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-wrap gap-6'>
                    <DashCard
                        title={"Total Volume"}
                        totalNumber={"4500"}
                        myImg={IMAGES.Volume}
                        imgColor={"bg-custom-grey"}
                        textDash={"bg-yellow-dash px-2 py-1 w-[6rem] "}
                        txt="20 aug,2022"
                        subtxt="Last Sale"
                        textColor={"#3C82D6"}

                        outerclasses="w-[284px] h-[140px]"

                    />
                    <DashCard
                        title={"Completed Sales"}
                        totalNumber={"4500"}
                        myImg={IMAGES.Sales}
                        imgColor={"bg-custom-blue"}
                        textDash={"bg-custom-red w-[67px] "}
                        textColor={"#FF0000"}
                        arrowImg={IMAGES.downarrow}
                        outerclasses="w-[284px] h-[140px]"

                    />
                    <DashCard
                        title={"Rejected Sales"}
                        totalNumber={"4500"}
                        myImg={IMAGES.RegectedSale}
                        imgColor={"bg-[#F8B84E]"}
                        textDash={"bg-custom-red w-[67px] "}
                        textColor={"#FF0000"}
                        arrowImg={IMAGES.downarrow}
                        outerclasses="w-[284px] h-[140px]"

                    />
                </div>
            </div>

            <div className='w-[521px] mt-[21px] h-[61px] rounded-[10px] bg-lightgray flex item-center pt-[5px] pl-[5px] !shadow-custom-inset-shadow'>
                {ButtonList.map((item: any, index: any) => {
                    return (
                        <React.Fragment key={index}>
                            <CustomButton txt={item?.txt}
                                onClick={(e: any) => {
                                    e.preventDefault()
                                    handleButton(item.id)
                                }}
                                classes={item.active ? '!h-[52px] !w-[164px] !rounded-[10px] !bg-[#FFFFFF] !text-[black]' :
                                    '!h-[52px] !w-[164px] !rounded-[10px] !bg-[transparent] !text-customTxt'
                                }
                            />
                        </React.Fragment>
                    )
                })}

            </div>
            <div className='flex flex-wrap gap-3 mt-[20px]'>
                {Data.map((item: any, index: any) => {
                    return (
                        <React.Fragment key={index}>
                            {item.txt == activetxt &&
                                <div key={index} className='w-[201px] h-[115px] bg-[#FFFFFF] border border-custom-cardBorder pt-[19px] pl-[21px]'>
                                    <p className='text-[#656565] text-[14px] font-[500]'>{item.title}</p>
                                    <p className='text-[#111111] text-[32px] font-[700]'>{item.body}</p>
                                </div>
                            }

                        </React.Fragment>
                    )
                })}

            </div>
            {/* activetxt */}
         {activetxt =='Completed' &&
           <div className='flex mt-[30px] gap-3'>
           <CustomButton txt={"Completed"}

               classes={'!h-[45px] !w-[276px] !rounded-[1px] !bg-blue !text-white'
               
               }
               value="17"
               valueclasses={'!bg-[#F1F1F1] !text-[black] ml-2'}
           />
           <CustomButton txt={"Rejected"}

               classes={'!h-[47px] !w-[276px] !rounded-[1px] !bg-[#F1F1F1] !text-[black]'
              }
              value="3"
              valueclasses={'!bg-[#111111] !text-white ml-2'}
           />

       </div>
         
         } 
         <div className='mt-[27px] flex gap-4 flex-wrap'>
         <InputTxt
        placeholder="Search by Id,name"
        MainClasses={`!bg-[#F1F1F1] !text-[#656565]`}
        img={IMAGES.Search}
        value={search}
        onChange={(e: any) => setSearch(e.target.value)}
      />
      <InputTxt
        placeholder="Filter Date"
        MainClasses={`!bg-[#F1F1F1] !text-[#656565] !w-[152px]`}
        img={IMAGES.Email}
        value={search}
        onChange={(e: any) => setSearch(e.target.value)}
        iconRight={true}
      />
            </div>  
         
       
        </div>
    )
}

