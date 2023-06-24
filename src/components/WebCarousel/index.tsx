import { useState } from "react";
import { Galleria, GalleriaResponsiveOptions } from "primereact/galleria";
import IMAGES from "../../assets/Images";
import { Threebuttons } from "..";
import styled from "styled-components";
import { BaseURL } from "../../config";
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
export const Webcarousel = (props: any) => {
  const images =
    props.images &&
    props?.images.map((item: any, index: any) => {
      return {
        itemImageSrc: `${BaseURL}${item.filename}`,
        thumbnailImageSrc: `${BaseURL}${item.filename}`,
        alt: "Description for Image",
        title: item.id,
      };
    });
  const responsiveOptions: GalleriaResponsiveOptions[] = [
    {
      breakpoint: "991px",
      numVisible: props?.images?.length,
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
        className="relative"
        style={{
          width: "99%",
        }}
      >
        <img
          className=""
          src={item.itemImageSrc}
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "99%",
            height: "530px",
          }}
        ></img>
        <div className=" absolute top-[40%] left-[40%]">
          <Threebuttons />
        </div>
      </div>
    );
  };

  const thumbnailTemplate = (item: any) => {
    return (
      <div className="flex flex-wrap justify-start ">
        <img
          src={item.thumbnailImageSrc}
          alt={item.alt}
          style={{
            display: "block",
            background: "white",
            width: "100px",
            height: "100px",
            marginRight: "14px",
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
        numVisible={props?.images?.length}
        style={{ maxWidth: "100%" }}
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
        showIndicators
      />
    </div>
  );
};
