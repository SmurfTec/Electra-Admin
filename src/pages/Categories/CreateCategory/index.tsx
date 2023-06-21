import React,{useState,useEffect} from 'react'
import { Header } from '../../../components'
import { InputTxt ,CustomButton} from '../../../atoms'
import IMAGES from '../../../assets/Images'
import { getAllVariants } from '../../../store/Slices/VariantSlice'
import { CreateCategories } from '../../../store/Slices/Categories'
import { useNavigate } from 'react-router-dom'
import { SuccessModel } from '../../../components'
export const CreateCategory = () => {
  const[successVisible,setsuccessVisible]=useState(false)
  const[Name,setName]=useState('')
  const[fee,setfee]=useState('')
  const navigate=useNavigate()
  const[Variants,setVariants]=useState([])
  const [selectedVariant,setSelectedVariant]=useState<any>([])
  const getVariant=async()=>{
    let response=await getAllVariants()
    setVariants(response.variants)
  }
  useEffect(()=>{
    getVariant()
  },[])
  const CustomVariatBox=({item}:any)=>{
    const[active,setActive]=useState(false)
   useEffect(()=>{
    if(active){
      selectedVariant.push(item.id)
        setSelectedVariant(selectedVariant)
     
    }else{
      selectedVariant.pop(item.id)
      setSelectedVariant(selectedVariant)
    }
   },[active])
    return(
      <CustomButton onClick={(value:any)=>setActive(!active)} txt={item.title} classes={`!w-auto !px-[30px] !py-[12px] !inline-block !h-auto !rounded-[7px] ${active==false?'!bg-custome-button-grey !text-black':'' } `}  />
    )
  }
  const Create=async()=>{
    
    try{
      let body={
        "name":Name,
        "fees":Number(fee),
        "variants":selectedVariant
      }
      let response=await CreateCategories(body)
      if(response){
        setsuccessVisible(true)
        setName("")
        setfee('')
        getVariant()
      }
    }catch(err){

    }
  }
  return (
    <div>
      <SuccessModel visible={successVisible} setVisible={setsuccessVisible} txt="Category Created Successfully" />
       <Header
       headerClasses={'!h-[69px]'}
       titleClass={'!mt-[10px]'}
        title="Add New Category"
        semiTitle="Add New Category to list item relatively."
       
        UserBox={true}
      />
      <div className='mt-[35px]'>
      <InputTxt
        placeholder="Enter Category Name"
        MainClasses="!bg-[#FCFCFC] border !border-inputBorder !h-[59px]"
       
        value={Name}
        onChange={(e: any) => setName(e.target.value)}
      />
      <InputTxt
        placeholder="Marketplace Fee"
        MainClasses="mt-[10px] !bg-[#FCFCFC] border !border-inputBorder !h-[59px]"
        iconRight={true}
        img={IMAGES.Percentage}
        value={fee}
        onChange={(e: any) => setfee(e.target.value)}
      />
      </div>
      <div className='mt-[27px]'>
        <p className='text-[20px] font-[600] text-black'>Variants</p>
        <div className='mt-[32px] flex gap-3 flex-wrap w-[32.6rem]'>
          {Variants.map((item:any,index:any)=>{
            return(
              <CustomVariatBox key={index} item={item}/>
            )
          })}
     
        <CustomButton onClick={(value:any)=>navigate('/AddNewVariant')} txt="+Add Variant" classes="!w-[140px] !h-[42px] !rounded-[7px] !bg-blue !text-white"  />
        </div>
        <div className='flex gap-3 flex-wrap mt-[50px]'>
        <CustomButton onClick={(value:any)=>navigate('/Category')} txt="Cancel" classes="!w-[179px] !h-[50px] !rounded-[10px] !bg-custome-button-grey !text-black"  />
        <CustomButton txt="Create Category" classes="!w-[179px] !h-[50px] !rounded-[10px] " onClick={(value:any)=>Create()}  />
        </div>
      </div>
    </div>
  )
}

