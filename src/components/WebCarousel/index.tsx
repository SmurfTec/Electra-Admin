import { useState } from "react";
import { Galleria, GalleriaResponsiveOptions } from "primereact/galleria";
import IMAGES from "../../assets/Images";
import { Threebuttons } from "..";
import styled from "styled-components";
const CustomCarousel = styled(Galleria)`
  .p-galleria-thumbnail-wrapper {
    .p-galleria-thumbnail-container {
      background-color: white !important;
    }
  }
  .p-galleria-thumbnail-items-container {
    width: 58%;
 
  }
  .p-galleria-indicators {
    padding: 1rem;

    position: absolute;
    bottom: 2px;
    left: 13px;
    button {
      border-radius: 1px !important;
    }
  }
`;
export const Webcarousel = () => {
  const images = [
   
    {
      itemImageSrc: IMAGES.webandbanner5,
      thumbnailImageSrc: IMAGES.webandbanner5,
      alt: "Description for Image 1",
      title: "Title 1",
    },
    {
      itemImageSrc: IMAGES.Ultrablackiphone,
      thumbnailImageSrc: IMAGES.Ultrablackiphone,
      alt: "Description for Image 4",
      title: "Title 1",
    },
    {
      itemImageSrc: IMAGES.webandbanner2,
      thumbnailImageSrc: IMAGES.webandbanner2,
      alt: "Description for Image 1",
      title: "Title 1",
    },
    {
      itemImageSrc: IMAGES.webandbanner3,
      thumbnailImageSrc: IMAGES.webandbanner3,
      alt: "Description for Image 1",
      title: "Title 1",
    },
    {
      itemImageSrc: IMAGES.webandbanner4,
      thumbnailImageSrc: IMAGES.webandbanner4,
      alt: "Description for Image 1",
      title: "Title 1",
    },

    {
      itemImageSrc: IMAGES.Ultrablackiphone2,
      thumbnailImageSrc: IMAGES.Ultrablackiphone2,
      alt: "Description for Image 4",
      title: "Title 1",
    },
    {
        itemImageSrc: IMAGES.webandbanner,
        thumbnailImageSrc: IMAGES.webandbanner,
        alt: "Description for Image 1",
        title: "Title 1",
      },
  ];
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
      <div
        className=""
        style={{
          backgroundImage: `url(${item.itemImageSrc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "99%",
          height: "530px",
          position: "relative",
          borderRadius: "10px",
        }}
      >
        <div className=" absolute top-[40%] left-[40%]">
          <Threebuttons />
        </div>
      </div>
    );
  };

  const thumbnailTemplate = (item: any) => {
    return (
      <div className="flex justify-start ">
        <img
          src={item.thumbnailImageSrc}
          alt={item.alt}
          style={{
            display: "block",
            background: "white",
            width: "100px",
            height: "100px",
            marginRight:"14px"
          }}
        />
      </div>
    );
  };
  return (
    <div className="card w-full">
      {" "}
      <CustomCarousel
        value={images}
        responsiveOptions={responsiveOptions}
        showThumbnails
        numVisible={7}
      
        style={{ maxWidth: "100%" }}
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
        showIndicators
      />
    </div>
  );
};
