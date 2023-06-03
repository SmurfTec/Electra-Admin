import { useState } from "react";
import { Galleria, GalleriaResponsiveOptions } from "primereact/galleria";
import IMAGES from "../../assets/Images";
import styled from "styled-components";
const CustomCarousel = styled(Galleria)`
  .p-galleria-thumbnail-wrapper {
    margin-top: -20px;
    .p-galleria-thumbnail-container {
      background-color: white !important;
      background:linear-gradient(180deg, rgba(33, 33, 33, 0) 0%, rgba(33, 33, 33, 0.46) 100%);
    }
  }
  .p-galleria-item-nav {
    background-color:#3C82D6 !important;
    border-radius: 50px;
    height:38px;
    width:38px

  }
`;
export const Carouselcard = () => {
  const [images, setImages] = useState([
    {
        itemImageSrc: IMAGES.pinkphone,
        thumbnailImageSrc: IMAGES.pinkphone,
        alt: "Description for Image 1",
        title: "Title 1",
      },
    {
      itemImageSrc: IMAGES.Iphone22,
      thumbnailImageSrc: IMAGES.Iphone22,
      alt: "Description for Image 1",
      title: "Title 1",
    },
    {
        itemImageSrc: IMAGES.Greeniphone,
        thumbnailImageSrc: IMAGES.Greeniphone,
      alt: "Description for Image 1",
      title: "Title 1",
    },
    {
        itemImageSrc: IMAGES.yellowiphone,
        thumbnailImageSrc: IMAGES.yellowiphone,
      alt: "Description for Image 1",
      title: "Title 1",
    },
  ]);
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
        style={{ width: "100%", display: "block",height:"300px" }}
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

  return (
    <div className="card "  >
      <CustomCarousel
        value={images}
        responsiveOptions={responsiveOptions}
        numVisible={5}
        circular
        style={{ maxWidth: "530px" ,borderRadius:"15px"}}
        showItemNavigators
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
      />
    </div>
  );
};
