import React, { useEffect, useRef, useState } from "react";
import IMAGES from "../../assets/Images";
import { BaseURL } from "../../config";
export function UploadPicture({
  multipleImages = false,
  setImage,
  setImages,
  images,
  fetchImages,
}: any) {
  const fileInputRef: any = useRef(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImages, setSelectedImages] = useState<any>([]);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  console.log(images);
  const handleFileChange = (event: any) => {
  
    const selectedFile = event.target.files[0];
   console.log(selectedFile)
    setSelectedImage(URL.createObjectURL(selectedFile));
    if (setImage) {
      setImage(event.target.files[0]);
    }
    if (setImages) {
      setImages([...images, event.target.files[0]]);
    }
    console.log(selectedImages)
    setSelectedImages([...selectedImages, URL.createObjectURL(selectedFile)]);
    // Handle the selected file (e.g., upload or process it)
  };
  const deleteImg = (Itemindex: any) => {
    let filterImg = selectedImages.filter(
      (item: any, index: any) => index !== Itemindex
    );
    setSelectedImages(filterImg);
  };
  useEffect(() => {
    if (images) {
      images.map((item: any, index: any) => {
        console.log(item, "ITEM");
        setSelectedImages([...selectedImages, item.filename]);
      });
    }
  }, [images]);
  return (
    <div className="mt-3 ">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <div className="flex">
        <div
          className="bg-[#FCFCFC] h-[90px] w-[200px] cursor-pointer"
          onClick={handleButtonClick}
        >
          <div className=" flex justify-center p-3">
            <img src={IMAGES.Upload} />
          </div>
          <button className="bg-[#FCFCFC] text-grey border-none rounded outline-none w-[200px]">
            Upload Picture
          </button>
        </div>
        {!fetchImages &&selectedImage && !multipleImages && (
          <div className="border border-lightgray  rounded">
            <img className="w-[120px] h-20 p-3" src={selectedImage} />
          </div>
        )}
        {!fetchImages && multipleImages && selectedImages.length > 0 && (
          <>
            {selectedImages.map((item: any, index: any) => {
              return (
                <div
                  key={index}
                  className="border border-lightgray  rounded relative"
                >
                  <div
                    onClick={() => deleteImg(index)}
                    className="cursor-pointer w-[15px] h-[15px] text-[10px] flex justify-center items-center rounded-[50%] bg-black text-white absolute right-0 top-0"
                  >
                    x
                  </div>
                  <img className="w-[120px] h-20 p-3" src={item} />
                </div>
              );
            })}
          </>
        )}
        {fetchImages && multipleImages && selectedImages.length > 0 && (
          <>
            {selectedImages.map((item: any, index: any) => {
              return (
                <div
                  key={index}
                  className="border border-lightgray  rounded relative"
                >
                  <div
                    onClick={() => deleteImg(index)}
                    className="cursor-pointer w-[15px] h-[15px] text-[10px] flex justify-center items-center rounded-[50%] bg-black text-white absolute right-0 top-0"
                  >
                    x
                  </div>
                  <img
                    className="w-[120px] h-20 p-3"
                    src={item.startsWith("blob:") ? item : BaseURL + item}
                  />
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
