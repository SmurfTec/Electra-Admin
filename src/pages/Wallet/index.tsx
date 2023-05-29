import React from 'react'
import { Header,DashCard } from '../../components'
import IMAGES from '../../assets/Images'
export const Wallet = () => {
    return (
        <div>
            <Header
                typeSearch={true}
                chooseFilter={true}
                UserBox={true}
            />
        <div className='flex gap-5 mt-[20px]'>
        <div className='p-3 w-[419px] h-auto bg-[#212121] rounded-[10px] overflow-hidden' style={{background:`url(${IMAGES.AtmBackground})`}}>
                <div className='flex justify-between'>
                    <div className='flex flex-col '>
                            <p className='text-[16px] font-[600] text-white'>Balance</p>
                            <p className='text-[40px] font-[600] text-white'>$500,000</p>
                            <div className='flex flex-col mt-[80px]'>
                            <p className='text-[13px] font-[600] text-white'>Last Updated</p>
                            <p className='text-[16px] font-[600] text-white'>20,aug,2022</p>
                            </div>
                    </div>
                    <div className=' flex justify-center items-center '>
                        <img src={IMAGES.Coins}/>
                    </div>
                </div>
               
               
            </div>
            <div className='p-3 w-[419px] h-auto bg-[#212121] rounded-[15px]'>
                <div className='flex justify-between'>
                    <div className='flex flex-col '>
                            <p className='text-[12px] font-[600] text-white'>Account holder name</p>
                            <p className='text-[20px] font-[600] text-white'>HUZAYFAH HANIF</p>
                    </div>
                    <div className='w-[33px] h-[33px] flex justify-center items-center rounded-[50px] bg-white'>
                        <i className='pi pi-pencil ' ></i>
                    </div>
                </div>
                <div className='mt-[34px] flex flex-col '>
                <p className='text-[12px] font-[600] text-white'>IBAN</p>
                            <p className='text-[20px] font-[600] text-white'>KFL35532536353535</p>
                </div>
                <div className='flex gap-[76px] mt-[34px]'>
                <div className=' flex flex-col '>
                <p className='text-[20px] font-[400] text-white'>US BANK</p>
                <p className='text-[12px] font-[400] text-white'>Bank</p>
                            
                </div>
                <div className=' flex flex-col '>
                <p className='text-[20px] font-[400] text-white'>25/7/2022</p>
                <p className='text-[12px] font-[400] text-white'>linked on</p>
                            
                </div>
                </div>
            </div>
        </div>
        <div className='mt-[35px]'>
        <div className='flex flex-wrap gap-6 mt-[28px]'>

<DashCard
    title={"Net Revenue"}
    totalNumber={"$450,000"}
    myImg={IMAGES.coin}
    imgColor={"bg-blue-dash"}
    textDash={"bg-custom-blue !w-[63px] "}
    textColor={"#3C82D6"}
    arrowImg={IMAGES.uparrow}
    outerclasses="w-[284px] h-[140px]"
 
/>
<DashCard
    title={"Net Revenue"}
    totalNumber={"$35000"}
    myImg={IMAGES.DollorHouse}
    imgColor={"bg-yellow-dash"}
    textDash={"bg-custom-blue !w-[63px] "}
    textColor={"#3C82D6"}
    arrowImg={IMAGES.uparrow}
    outerclasses="w-[284px] h-[140px]"

/>
<DashCard
    title={"Withdrawn"}
    totalNumber={"$3500"}
    myImg={IMAGES.Volume}
            imgColor={"bg-custom-grey"}
    textDash={"bg-yellow-dash !w-[90px] px-1 "}
    textColor={"#3C82D6"}
txt='20 aug,2022'
subtxt="Recent Withdrawal"
    outerclasses="w-[284px] h-[140px]"
    subtxtStyle={`!w-[100px]`}
/>
<DashCard
    title={"Available for withdrawal"}
    totalNumber={"$350000"}
    myImg={IMAGES.CashWithdraw}
    imgColor={"bg-custom-dark-red"}
    textDash={" !w-full "}
    textColor={"#3C82D6"}
    txt='Lorem Ipsum'
    outerclasses="w-[284px] h-[140px]"
    
/>

</div>
        </div>
        </div>
    )
}

