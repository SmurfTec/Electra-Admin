import React,{useState,useEffect} from 'react'
import { Header } from '../../../components'
import { InputTxt ,CustomButton} from '../../../atoms'
import IMAGES from '../../../assets/Images'
import { getAllVariants } from '../../../store/Slices/VariantSlice'
import { CreateCategories } from '../../../store/Slices/Categories'
import { useNavigate } from 'react-router-dom'
import { SuccessModel } from '../../../components'
import { UploadPicture } from '../../../atoms'

const CustomVariatBox=({item,selectedVariant,setSelectedVariant,onClick}:any)=>{
   
  
  
   return(
     <CustomButton onClick={onClick} txt={item.title} classes={`!w-auto !px-[30px] !py-[12px] !inline-block !h-auto !rounded-[7px] ${(!selectedVariant.includes(item.id))?'!bg-custome-button-grey !text-black':'' } `}  />
   )
 }
export const CreateCategory = () => {
  const[successVisible,setsuccessVisible]=useState(false)
  const[Name,setName]=useState('')
  const[fee,setfee]=useState('')
  const navigate=useNavigate()
  const[Variants,setVariants]=useState([])
  const [selectedVariant,setSelectedVariant]=useState<any>([])
  const [image,setImages]=useState<any>()
  const getVariant=async()=>{
    let response=await getAllVariants()
    setVariants(response.variants)
    
    let newArr=response?.variants?.map((item:any)=>{
      let newObj={
        ...item,
        active:false
      }
      return newObj
    })
    setVariants(newArr)
    console.log(newArr)
  }
  useEffect(()=>{
    getVariant()
  },[])
  
  const Create=async()=>{
    
    try{
      console.log(selectedVariant)
      
      const newBody =new FormData()
      newBody.append("name", Name);
      newBody.append("fees", String(fee));
      newBody.append("image",image );
     
      selectedVariant.length > 0 &&
      selectedVariant.map((item:any, index:any) => {
        newBody.append(`variants[${index}]`, item);
      });
      

      
      let response=await CreateCategories(newBody)
      if(response?.category){
        setsuccessVisible(true)
        setName("")
        setfee('')
        getVariant()
        setImages([])
      }
    }catch(err){

    }
  }
  useEffect(()=>{
   console.log(selectedVariant,"selected")
  },[selectedVariant])
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
            //   <CustomVariatBox onClick={()=>{
            //     if(!selectedVariant.includes(item.id)){
            //       console.log("HELLOO")
            //       selectedVariant.push(item.id)
                  
            //       setSelectedVariant(selectedVariant)
            //     }else{
                  
            //       selectedVariant.pop(item.id)
            //       setSelectedVariant(selectedVariant)
            //     }
            //     console.log("hey")
            //   }} selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} key={index} item={item}/>
            // )
            <CustomButton
            onClick={()=>{
              if(!selectedVariant.includes(item.id)){
                selectedVariant.push(item.id)
                  
                      setSelectedVariant(selectedVariant)
                      let newarr:any=Variants?.map((item2:any)=>{
                        if(item2.id==item.id){
                          return{
                            ...item2,
                            active:true
                          }
                        }else{
                          return item2
                        }
                      })
                      console.log(newarr)
                      setVariants(newarr)
              }else{
                selectedVariant.pop(item.id)
                  setSelectedVariant(selectedVariant)
                  let newarr:any=Variants.map((item2:any)=>{
                    if(item2.id==item.id){
                      return{
                        ...item2,
                        active:false
                      }
                    }else{
                      return item2
                    }
                  })
                  setVariants(newarr)
              }
            }}
            txt={item.title} key={index} classes={`!w-auto !px-[30px] !py-[12px] !inline-block !h-auto !rounded-[7px] ${(!item.active)?'!bg-custome-button-grey !text-black':'' } `}  />
          
          )})}
     
        <CustomButton onClick={(value:any)=>navigate('/AddNewVariant')} txt="+Add Variant" classes="!w-[140px] !h-[42px] !rounded-[7px] !bg-blue !text-white"  />
        </div>
        <div className='border border-[#F7F7F8] h-[auto] w-[30%] mt-3'>
          <p className='border-b border-[#F7F7F8]  font-semibold text-[20px] p-3'>
            Upload icon/image
          </p>
          <div className='p-3'>
          <UploadPicture
          fetchImages={false}
          multipleImages={false}
          setImage={setImages}/>
  
          </div>
        </div>
        <div className='flex gap-3 flex-wrap mt-[50px]'>
        <CustomButton onClick={(value:any)=>navigate('/Category')} txt="Cancel" classes="!w-[179px] !h-[50px] !rounded-[10px] !bg-custome-button-grey !text-black"  />
        <CustomButton txt="Create Category" classes="!w-[179px] !h-[50px] !rounded-[10px] " onClick={(value:any)=>Create()}  />
        </div>
      </div>
    </div>
  )
}

