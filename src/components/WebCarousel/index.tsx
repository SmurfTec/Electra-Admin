import { useState, useEffect } from "react";
import { Galleria, GalleriaResponsiveOptions } from "primereact/galleria";
import IMAGES from "../../assets/Images";
import { Threebuttons } from "..";
import styled from "styled-components";
import { BaseURL } from "../../config";
import { updateSeciton } from "../../store/Slices/WebsiteSlice";
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
  const [selectedId, setSelectedId] = useState();
  const [images, setImages] = useState<any>([]);

  useEffect(() => {
    const mappedImages =
      props.images &&
      props.images?.map((item: any) => ({
        itemImageSrc: `${BaseURL}${item.filename}`,
        thumbnailImageSrc: `${BaseURL}${item.filename}`,
        alt: "Description for Image",
        title: item.id,
      }));
    if (mappedImages) {
      setImages(mappedImages);
    } else {
      setImages([
        {
          itemImageSrc: "",
          thumbnailImageSrc: "",
          alt: "No Image",
          title: "",
        },
      ]);
    }
    setSelectedId(
      mappedImages && mappedImages.length > 0 ? mappedImages[0].title : ""
    );
  }, [props.images]);


  // // Function to handle the file upload
  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];
    let sendingData = new FormData();
    sendingData.append("images", file);

    props.images &&
      props.images.forEach((item: any) => {
        sendingData.append("attachments", item.id);
      });
    const Adding = await updateSeciton(props.webId,props.sectionId, sendingData);
    props.setWebsiteData(Adding);
    console.log("bsdk")
  };

  // function to delete a photo
  const deletePicture = async () => {
    try {
      const attachments =props.images
      .filter((item: any) => item.id !== selectedId)
      .map((item: any) => item.id);
      if (attachments.length === 0) {
        attachments.push(""); // Push an empty string to create an empty attachment array
      }
      let sendingData = new FormData();
      attachments.forEach((attachment:any) => {
        sendingData.append("attachments[]", attachment);
      });
      const Adding = await updateSeciton(props.webId,props.sectionId, sendingData);
      props.setWebsiteData(Adding);
    } catch (e) {}
  };
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
          alt="blank"
          src={item?.itemImageSrc}
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "99%",
            height: "530px",
          }}
        ></img>
        <div className=" absolute top-[40%] left-[40%]">
          <Threebuttons
          class={"Carousell"}
            handleFileUpload={handleFileUpload}
            deletePicture={deletePicture}
          />
        </div>
      </div>
    );
  };

  const thumbnailTemplate = (item: any) => {
    return (
      <div className="flex flex-wrap justify-start ">
        <img
          onClick={() => {
            setSelectedId(item.title);
            console.log(item);
          }}
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
        onChange={(e) => {
          console.log(e.target);
        }}
      />
    </div>
  );
};
