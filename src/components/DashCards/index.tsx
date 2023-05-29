type MyProps={
  outerclasses?:string
  totalNumber?:string
  textDash?:string
  textColor?:string
  imgColor?:string
  myImg?:string
  arrowImg?:string
  title?:string
  active?:boolean
  txt?:string
  subtxt?:string
  Add?:boolean
  subtxtStyle?:string
  titleStyle?:string
  Numberstyle?:string
  showDefaultNumber?:boolean
  txtclasses?:string
  Addimg?:string
}
import IMAGES from "../../assets/Images"
import { SVGIcon } from "../SVG"
export const DashCard = (props:MyProps) => {
  return (
    <div className={`${props.outerclasses} w-[300px] h-[136px] overflow-hidden bg-[#FCFCFC] rounded-[8px]  `}>
    {props?.Add ?<div className="flex gap-3 cursor-pointer h-full flex-col justify-center items-center">
      <img src={props.Addimg}/>
      <p className={`${props.txtclasses}  text-[13px] font-[600]`}>{props.txt}</p>
    </div>:
    
    <div className="flex justify-between pt-[16px] px-[16px] pb-[12px]">
        <div className="px-2  pt-1 ">
          <p className={`text-[13px] font-[600] ${props.titleStyle}`}>{props.title}</p>
          <h1 className={`text-[28px] font-[700] mt-[2px] ${props.Numberstyle}`}>{props.totalNumber}</h1>
          <div className="flex  items-center gap-2">
          <div className={` ${props.textDash}  w-[67px] flex justify-start rounded mt-[16px] p-1 `}>
         {props.arrowImg && <img className="mr-1" src={props.arrowImg} />}   
            
            {props?.txt ? <p className={`text-[${props.textColor}] font-bold text-[12px]`}>{props.txt}</p>
            :(props?.showDefaultNumber==false) ?<></>:<p className={`text-[${props.textColor}] font-bold text-[12px]`}> + 4 %</p>
            }
           
          </div>
          {props.subtxt && <p className={`text-[#A4A4A4]  text-[10px] mt-4 ${props.subtxtStyle}`}>{props.subtxt}</p> }
          </div>
        
          
        </div>

        <div className={`${props.imgColor}  h-[30px] w-[30px] rounded flex justify-center mt-2`}>
          <img className="p-2" src={props.myImg}  />
        </div>
      </div>
    }  
    
    </div>
  );
};