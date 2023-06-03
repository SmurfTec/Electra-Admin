import IMAGES from "../../assets/Images";
type buttonProps={
    txt:string;
    onClick:React.MouseEventHandler
}
export const ReviewButton = (props:buttonProps) => {
  return (
    <div onClick={props.onClick} className="bg-black w-[154px] h-[48px] flex gap-3 justify-center rounded-lg items-center cursor-pointer">
        <img className="h-[12px]"src={IMAGES.Flag}/>
      <p className="text-white text-[13px]">{props.txt}</p>
    </div>
  );
};
