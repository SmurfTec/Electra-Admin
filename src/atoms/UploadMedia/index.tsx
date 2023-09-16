import React, { useEffect, useRef, useState } from 'react';
import IMAGES from '../../assets/Images';
import { BaseURL } from '../../config';
export function UploadPicture({
  multipleImages = false,
  setImage,
  setImages,
  images, // used for rendering previous images
  IMAGEE, //shows the useState for sending new images
  fetchImages,
}: any) {
  const fileInputRef: any = useRef(null);
  const [selectedImage, setSelectedImage] = useState<any>();
  const [selectedImages, setSelectedImages] = useState<any>([]);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event: any) => {
    console.log(event.target.files);
    let selectedFile;
    let objectFiles:any;
    if (event.target.files.length === 1) {
      console.log('HEREREE');
      selectedFile = event.target.files[0];
      setSelectedImage(URL.createObjectURL(selectedFile));
      setSelectedImages([...selectedImages, URL.createObjectURL(selectedFile)]);
    } else if (event.target.files.length > 1) {
      console.log('HEREREE', Object.values(event.target.files));

      objectFiles = Object.values(event.target.files).map(
        (item: any, index: any) => {
          return item;
        }
      );
      selectedFile = objectFiles.map((item:any, index:number) => {
        return URL.createObjectURL(item);
      });
      setSelectedImages([...selectedFile]);
      // setSelectedImages([...selectedImages, URL.createObjectURL(selectedFile)]);
    }
    if (setImage) {
      setImage(selectedFile);
    }
    if (setImages) {
      if (IMAGEE && IMAGEE?.length > 0) {
        setImages([...IMAGEE, ...objectFiles]);
      } else {
        console.log("SETTING IMAGES FOR Attachment")
        setImages([...objectFiles]);
      }
    }
    console.log(selectedImages);
    // Handle the selected file (e.g., upload or process it)
  };
  const deleteImg = (Itemindex: any) => {
    console.log(Itemindex);
    console.log(selectedImages);
    let filterImg = selectedImages.filter(
      (item: any, index: any) => index !== Itemindex
    );
    console.log(filterImg);
    setImages(filterImg)
    setSelectedImages(filterImg);
  };
  useEffect(() => {
    if (images) {
      let files: any = [];
      images.map((item: any, index: any) => {
        files.push(item.filename);
      });
      setSelectedImages(files);
    }
  }, [images]);
  return (
    <div className="mt-3 ">
      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
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
        {!fetchImages && selectedImage && !multipleImages && (
          <div className="border border-lightgray ml-10 rounded relative">
            <div
              onClick={() => setSelectedImage('')}
              className="cursor-pointer w-[15px] h-[15px] text-[10px] flex justify-center items-center rounded-[50%] bg-black text-white absolute right-0 top-0"
            >
              x
            </div>
            <img className="w-[120px] h-20 p-3" src={selectedImage} />
          </div>
        )}
        {!fetchImages && multipleImages && selectedImages.length > 0 && (
          <>
            {selectedImages.map((item: any, index: any) => {
              console.log(item);

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
              console.log(item);
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
                    src={item.startsWith('blob:') ? item : BaseURL + item}
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
