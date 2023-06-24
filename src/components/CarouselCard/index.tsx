import { useState,useEffect } from "react";
import { Galleria, GalleriaResponsiveOptions } from "primereact/galleria";
import IMAGES from "../../assets/Images";
import styled from "styled-components";
const CustomCarousel = styled(Galleria)`
  border: 1px solid rgba(0, 0, 0, 0.11);
  min-width:380px;
  .p-galleria-thumbnail-wrapper {
    margin-top: 10px;
    .p-galleria-thumbnail-container {
      background-color: white !important;
      background: linear-gradient(
        180deg,
        rgba(33, 33, 33, 0) 0%,
        rgba(33, 33, 33, 0.46) 100%
      );
    }
  }
  .p-galleria-item-nav {
    background-color: #3c82d6 !important;
    border-radius: 50px;
    height: 38px;
    width: 38px;
  }
  .p-galleria-item-next {
    padding: 5px;
    ::before {
      content: "";
      display: inline-block;
      width: 100%;
      height: 2px;
      background-color: #fff;
      /* margin: 5px; */
      margin-right: -7.5px;
      margin-left: 5px;
      margin-top: 4px;
      margin-bottom: 5px;
    }
  }
  .p-galleria-item-prev {
    padding: 5px;

    ::after {
      content: "";
      display: inline-block;
      width: 100%;
      height: 2px;
      background-color: #fff;
      /* margin: 5px; */
      margin-left: -8.5px;
      margin-top: 4px;
      margin-bottom: 5px;
      margin-right: 5px;
    }
  }
  .p-galleria-thumbnail-prev{
    display: none;
  }.p-galleria-thumbnail-next{
    display: none;
  }
  .p-galleria-thumbnail-container {
    padding:1rem 1.25rem;
  }
  .p-galleria-thumbnail-item-content img{
    height:50px;
    margin-left: 5px;
   
  }
`;
export const Carouselcard = ({Images}:any) => {
  const [images, setImages] = useState();
  const responsiveOptions: GalleriaResponsiveOptions[] = [
    {
      breakpoint: "991px",
      numVisible: 4,
    },
    {
      breakpoint: "767px",
      numVisible: 3,
    },
    {
      breakpoint: "575px",
      numVisible: 1,
    },
  ];

  const itemTemplate = (item: any) => {
    return (
      <img
        src={item.itemImageSrc}
        alt={item.alt}
        style={{ width: "100%", display: "block", height: "300px",paddingTop:"6px" }}
      />
    );
  };

  const thumbnailTemplate = (item: any) => {
    return (
      <img
        src={item.thumbnailImageSrc}
        alt={item.alt}
        style={{ display: "block", background: "white" }}
      />
    );
  };
useEffect(()=>{
  console.log(Images,"Images")
if(Images){
  setImages(Images)
}
},[Images])
  return (
    <div className="card ">
      <CustomCarousel
        value={images}
        responsiveOptions={responsiveOptions}
        numVisible={5}
        circular
        style={{ maxWidth: "530px", borderRadius: "15px" }}
        showItemNavigators
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
      />
    </div>
  );
};
