import IMAGES from "../../assets/Images"

export const ChooseFilter = () => {
  return (
    <div className='w-[130px] justify-center bg-[#3C82D6] h-[39px] flex gap-2 items-center rounded p-2 overflow-hidden cursor-pointer'>
        <img src={IMAGES.Filter}/>
        <p className='text-[white]'>
            Filter
        </p>
    </div>
  )
}