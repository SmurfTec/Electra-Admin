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
  singleImage,
}: any) {
  const fileInputRef: any = useRef(null);
  const [selectedImage, setSelectedImage] = useState<any>();
  const [selectedImages, setSelectedImages] = useState<any>([]); //used for rendering new images or all images
  const [removedExistingImage, setRemoved] = useState(false);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleFileChange = (event: any) => {
    setRemoved(true);
    let selectedFile;
    let objectFiles: any;

    objectFiles = Object.values(event.target.files).map(
      (item: any, index: any) => {
        return item;
      }
    );
    selectedFile = objectFiles.map((item: any, index: number) => {
      return URL.createObjectURL(item);
    });
    if (event.target.files.length === 1) {
      setSelectedImage(selectedFile[0]);
    }

    setSelectedImages([...selectedImages, ...selectedFile]);

    if (setImage) {
      setImage(objectFiles[0]);
    }
    if (setImages) {
      if (IMAGEE && IMAGEE?.length > 0) {
        setImages([...IMAGEE, ...objectFiles]);
      } else {
        setImages([...objectFiles]);
      }
    }

    // Handle the selected file (e.g., upload or process it)
  };

  const deleteImg = (Itemindex: any) => {
    const filterImg = selectedImages.filter(
      (item: any, index: any) => index !== Itemindex
    );
    setImages(filterImg);
    setSelectedImages(filterImg);
  };
  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(`${BaseURL}${images[0].url}`);
    } else if (images && multipleImages && fetchImages) {
      const files: any = [];
      images.map((item: any, index: any) => {
        files.push(item.filename);
      });
      setSelectedImages(files);
    } else if (images && !multipleImages && fetchImages) {
      if (images.filename) {
        setSelectedImage(images);
      }
    }
    // if(!multipleImages &&)
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

        {fetchImages && !multipleImages && selectedImage && (
          <div className="border border-lightgray  rounded relative">
            <div
              onClick={() => {
                setSelectedImage('');
              }}
              className="cursor-pointer w-[15px] h-[15px] text-[10px] flex justify-center items-center rounded-[50%] bg-black text-white absolute right-0 top-0"
            >
              x
            </div>
            {!removedExistingImage ? (
              <img
                className="w-[120px] h-20 p-3"
                src={BaseURL + selectedImage.filename}
              />
            ) : (
              <img className="w-[120px] h-20 p-3" src={selectedImage} />
            )}
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
                    src={item?.startsWith('blob:') ? item : BaseURL + item}
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
