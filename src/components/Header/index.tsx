import {useState,useEffect} from "react"
import IMAGES from "../../assets/Images";
import { HeaderSearch, ChooseDate, ChooseFilter,HeaderDropDown } from "../../atoms";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { io } from "socket.io-client";
import { BaseURL } from "../../config";
type headerProps = {
  typeSearch?: boolean;
  title?: string;
  semiTitle?: string;
  chooseDate?: boolean;
  chooseFilter?: boolean;
  UserBox?: boolean;
  placeholder?: string;
  titleClass?:string;
  headerClasses?:string;
  dropdown?:boolean
};

export const Header = (props: headerProps) => {
  const [drop, setDrop] = useState(false);
  const [socket,setsocket]=useState<any>()
  const [notification,setnotification]=useState<any>()
  const navigate=useNavigate()
  useEffect(()=>{
    const token = JSON.parse(localStorage.getItem("token") as string);
   
    const socket = io(BaseURL,{
      transports: ['websocket'],
      auth: {
        headers: {
        
          Authentication:`${token}`,
       
          // Add any other headers you need
        },
      },
    });
    socket.on('connect', () => {
      console.log(`Hurrah Socket ${socket.id} Connected`);
        socket.emit("notifications" , {
    "userId" : 1
     })
 })
    setsocket(socket);
    return () => {
      socket.disconnect(); // Clean up the socket connection when component unmounts
    };
  },[])
  useEffect(() => {
    if (socket) {
      
      socket.on("notifications", (data:any)=>{
        setnotification(data)
      });
      console.log(socket,"socket")
    }
  }, [socket]);
  useEffect(()=>{
    console.log(notification,"notification")
  },[notification])
  return (
    <>
      <div className={`overflow-hidden h-16 mt-2 mb-2 flex items-center justify-between px-2 ${props.headerClasses} relative`}>
        {props.typeSearch && (
          <HeaderSearch
            placeholder={props.placeholder ?? "Type here to search"}
          />
        )}
        {props.title && (
          <div>
            <p className={`text-[23px] font-bold  text-[#212121] ${props.titleClass}`}>
              {props.title}
            </p>
            {props.semiTitle && (
              <p className="text-[#A4A4A4]">{props.semiTitle}</p>
            )}
          </div>
        )}
        <div className="flex gap-4 items-center relative">
          {props.chooseDate && (
            <div className="flex gap-4">
              <ChooseDate />
              <div className="border border-[#B4B4B4]"></div>
            </div>
          )}
          {props?.chooseFilter && (
            <div className="flex gap-4">
              <ChooseFilter />
              <div className="border border-[#B4B4B4]"></div>
            </div>
          )}
          <div className="flex gap-4">
            <div className="bg-[black] rounded-[39px] flex  w-9 h-9 justify-center items-center">
              {props.UserBox && <img className="cursor-pointer" 
              src={IMAGES.RectangleBox} onClick={()=> setDrop(!drop)}  />
                           
              }
            </div>
            <div className="border border-[#B4B4B4]"></div>
          </div>
        
          <div className="flex gap-2">
            <div>
              <img src={IMAGES.Admin} />
            </div>
            <div>
              <p className="font-bold">Huzayfah Hanif</p>
              <p className="font-light text-[12px]">Admin</p>
            </div>
          </div>
        </div>
     

      </div>
    { drop&& <HeaderDropDown className={"absolute h-[340px] w-[401px] right-40 top-19 rounded-lg bg-white"}/>}

    </>
  );
};
