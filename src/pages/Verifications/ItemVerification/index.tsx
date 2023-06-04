import React,{useReducer,useState} from 'react'
import { Header, DashCard } from '../../../components'
import IMAGES from '../../../assets/Images'
import { CustomSwitch } from '../../../atoms'

import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import "./style.css"
const reducer=(state:any,action:any)=>{
switch(action.type){
    case 'crackswitch':
        return {...state,crackswitch:!state.crackswitch}
    case 'serialswitch':
        return {...state,serialswitch:!state.serialswitch}
    case 'batteryswitch':
            return {...state,batteryswitch:!state.batteryswitch}
    case 'lightswitch':
        return {...state,lightswitch:!state.lightswitch}
    case 'IMEIswitch':
        return {...state,IMEIswitch:!state.IMEIswitch}
    default:
        throw new Error()
}
}
const InitialState={
    crackswitch:true,
    serialswitch:true,
    batteryswitch:true,
    lightswitch:true,
    IMEIswitch:true
}
export const ItemVerification = () => {
    const[state,dispatch]=useReducer(reducer,InitialState)
  
    const[Pass,setPass]=useState(true)
    const [percentage,setpercentage] = useState(100);

    const styles=buildStyles({
    textSize: '16px',
    pathTransitionDuration: 0.5,
    pathColor: Pass==true? `#3C82D6`:'#FF8F6B',
    textColor: '#000000',
    trailColor: '#d6d6d6',
    backgroundColor: '#3e98c7',
    
    })
    return (
        <div>
            <Header
                headerClasses={'!h-[69px]'}
                titleClass={'!mt-[10px]'}
                title="Item Verification & Details"
                semiTitle="Tick the the checkboxes if the item has certain feature."
                UserBox={true}
            />
            <div className='px-[10px] mt-[40px]  bg-[#FCE39C] rounded-[6px] text-black py-[4px] text-[14px] font-[500] inline-block'>
                User Statistics

            </div>
            <div className='flex flex-wrap gap-3 mt-[33px]'>
                <DashCard
                    title={"Completed Sales"}
                    totalNumber={"350"}
                    myImg={IMAGES.Sales}
                    imgColor={"bg-custom-blue"}
                    showDefaultNumber={false}
                    outerclasses="w-[284px] h-[140px]"

                />
                <DashCard
                    title={"Rejected Sales"}
                    totalNumber={"35"}
                    myImg={IMAGES.RegectedSale}
                    imgColor={"bg-[#F8B84E]"}
                    showDefaultNumber={false}

                    outerclasses="w-[284px] h-[140px]"

                />
                <DashCard
                    title={"Total Volume"}
                    totalNumber={"$ 35600"}
                    myImg={IMAGES.VolumeIcon}
                    imgColor={"bg-[#FCE39C]"}
                    showDefaultNumber={false}

                />


            </div>
            <div className='px-[10px] mt-[56px]  bg-[#FCE39C] rounded-[6px] text-black py-[4px] text-[14px] font-[500] inline-block'>
                Condition

            </div>

            <div className='flex flex-wrap mt-[22px] justify-between items-center w-[98%]'>
            <div className=' flex flex-col gap-8'>
                <div className='flex gap-3 items-center'>
                <CustomSwitch
                marginTop={'-5px'}
                checked={state.crackswitch}
                setChecked={()=>dispatch({type:'crackswitch'})}
                />
                <p className='text-[15px] font-[500] text-black'>No Cracks Present</p>
                </div>
                <div className='flex gap-3 items-center'>
                <CustomSwitch
                
                checked={state.serialswitch}
                setChecked={()=>dispatch({type:'serialswitch'})}
                />
                <p className='text-[15px] font-[500] text-black'>Serial Number</p>
                </div>
                <div className='flex gap-3 items-center'>
                <CustomSwitch
                marginTop={'-5px'}
                checked={state.batteryswitch}
                setChecked={()=>dispatch({type:'batteryswitch'})}
                />
                <p className='text-[15px] font-[500] text-black'>Battery Health is Over 80%</p>
                </div>
                <div className='flex gap-3 items-center'>
                <CustomSwitch
              
                checked={state.lightswitch}
                setChecked={()=>dispatch({type:'lightswitch'})}
                />
                <p className='text-[15px] font-[500] text-black'>Light Scratches and Dings</p>
                </div>
                <div className='flex gap-3 items-center'>
                <CustomSwitch
                marginTop={'-5px'}
                checked={state.IMEIswitch}
                setChecked={()=>dispatch({type:'IMEIswitch'})}
                />
                <p className='text-[15px] font-[500] text-black'>IMEI No</p>
                </div>
            </div>
            <div className='w-[380px] h-[320px] border border-inputBorder'>
                <p className='pl-[10px] py-[10px] text-black text-[16px] font-[500]'>Status</p>
                <hr className='border border-lightgray w-full'/>
                <div className='flex flex-col items-center gap-5 pt-[22px]'>

                    <div style={{ width: 200, height: 200,overflow:'hidden' }}>
                    <CircularProgressbarWithChildren className='progress-bar' value={percentage}  styles={styles}>
                    <div className="percentage-text">{`${percentage}%`}</div>
        <div className="additional-text">5/5</div>
                        </CircularProgressbarWithChildren>
                    </div>
                    <div className='flex gap-3'>
                   <div className='flex gap-2 items-center'>
                   <div className='w-[15px] h-[15px] rounded-[5px] bg-[#2E66C2]' ></div>
                   <p className='text-[15px] text-black'>Pass</p>
                   </div>
                  <div className='flex gap-2 items-center'>
                  <div className='w-[15px] h-[15px] rounded-[5px] bg-[#FF8F6B]' ></div>
                  <p className='text-[15px] text-black'>Fail</p>
                  </div>
                    </div>
                </div>
            </div>
            </div>
            
        </div>
    )
}

