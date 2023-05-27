import React, { useRef, useState } from "react";
import IMAGES from "../../assets/Images";

export function UploadPicture() {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState("");
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    console.log;
    const selectedFile = event.target.files[0];
    setSelectedImage(URL.createObjectURL(selectedFile));
    // Handle the selected file (e.g., upload or process it)
  };

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
        {selectedImage && (
          <div className="border border-lightgray  rounded">
            <img className="w-[120px] h-20 p-3" src={selectedImage} />
          </div>
        )}
      </div>
    </div>
  );
}
