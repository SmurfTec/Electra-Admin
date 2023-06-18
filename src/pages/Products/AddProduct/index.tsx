import { useEffect, useState } from "react";
import { Header, Variants, Confirmationmodal } from "../../../components";
import {
  InputTxt,
  CustomDropdown,
  CustomButton,
  UploadPicture,
  FetchButton,
} from "../../../atoms";
import { useNavigate } from "react-router-dom";
import { useVariantDetail } from "../../../custom-hooks";
import url from "../../../config/index";
import { CreateProduct } from "../../../store/Slices/ProductSlice";
export const AddProduct = () => {
  type techSpec = {
    title: String;
    value: String;
  };
  type variantSpec = {
    variant: String;
    value: String;
  };
  type descriptionProp = {
    description: String;
  };
  const [visible, setVisible] = useState(false);
  const [fetchVariants, setFetchVariants] = useState(false);
  const [VariantsArray, setVariantArray] = useState([]);
  const [VariantsArray2, setVariantArray2] = useState([]);
  const [VariantsArray3, setVariantArray3] = useState([]);
  const [VariantsArray4, setVariantArray4] = useState([]);
  const [images, setImage] = useState("");
  const [productData, setProductData] = useState({
    title: "",
    is_active: true,
    category: Number,
    brand: Number,
    productProperties: {} as descriptionProp,
    productVariants: [] as variantSpec[],
    technicalSpecificationModel: [] as techSpec[],
  });
  const [variant, setVariant] = useState<any>({
    title: "",
    datatype: String,
    values: [],
  });
  const navigate = useNavigate();
  const VariantsData = useVariantDetail();
  useEffect(() => {
    if (VariantsData?.variants) {
      let newData: any;
      let newData2: any;
      let newData3: any;
      let newData4: any;
      VariantsData.variants.map((item: any, index: any) => {
        console.log(item, "ITEM");
        let mainObj = {
          txt: item.title,
          classes:
            "!bg-[#FCE39C] !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5",
        };
        let mainObj2 = {
          txt: item.title,
          classes: "!bg-[#3C82D6] !w-[148px]  !p-4 !rounded-[9px] !mt-5",
        };
        let mainObj3 = {
          txt: item.title,
          classes: " !w-[148px]  !p-4 !rounded-[9px] !mt-5",
        };
        let mainObj4 = {
          txt: item.title,
          classes: " !w-[148px]  !p-4 !rounded-[9px] !mt-5",
        };
        if (item.title === "capacity") {
          // Extract the string value and remove the curly braces
          // const stringValues = item.values.slice(1, -1);
          // console.log(stringValues,"Stringvalues")
          // // Convert the string to an array by splitting at each comma
          // const valueArray = stringValues?.split(",");
          newData = item.values.map((item: any, index: any) => {
            return {
              txt: item,
              classes:
                "!bg-[#FCFCFC] !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5",
            };
          });
          newData.unshift(mainObj);
        } else if (item.title === "color") {
          // Extract the string value and remove the curly braces
          // const stringValues = item.values.slice(1, -1);
          // // Convert the string to an array by splitting at each comma
          // const valueArray = stringValues.split(",");
          newData2 = item.values.map((item: any, index: any) => {
            return {
              txt: item,
              classes:
                "!bg-[#FCFCFC] !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5",
            };
          });
          newData2.unshift(mainObj2);
        } else if (item.title === "carrier") {
          // // Extract the string value and remove the curly braces
          // const stringValues = item.values.slice(1, -1);
          // // Convert the string to an array by splitting at each comma
          // const valueArray = stringValues.split(",");
          newData3 = item.values.map((item: any, index: any) => {
            return {
              txt: item,
              classes:
                "!bg-[#FCFCFC] !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5",
            };
          });
          newData3.unshift(mainObj3);
        } else if (item.title === "screen") {
          // // Extract the string value and remove the curly braces
          // const stringValues = item.values.slice(1, -1);
          // // Convert the string to an array by splitting at each comma
          // const valueArray = stringValues.split(",");
          newData4 = item.values.map((item: any, index: any) => {
            return {
              txt: item,
              classes:
                "!bg-[#FCFCFC] !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5",
            };
          });
          newData4.unshift(mainObj4);
        }
      });
      setVariantArray(newData);
      setVariantArray2(newData2);
      setVariantArray3(newData3);
      setVariantArray4(newData4);
    }
  }, [VariantsData, fetchVariants]);
  const handleFunction = async (value: any) => {
    let prevArray = variant.values;
    let Newpush = [...prevArray.slice(1), value];
    // Remove the first value from the array
    let sendingData = {
      title: variant.title,
      datatype: "string",
      values: Newpush,
    };
    const sendVariant = await url.post("/variants", sendingData);
    if (sendVariant) {
      setFetchVariants(!fetchVariants);
      setVisible(!visible);
    }
  };
  const handleChange = (setState: any) => (event: any) => {
    setState({
      ...productData,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeDescription = (value: any) => {
    setProductData({
      ...productData,
      productProperties: {
        description: value,
      },
    });
  };
  const updateTechnicalSpecificationModel = (name: any, value: any) => {
    setProductData((prevData) => {
      const updatedModel = prevData.technicalSpecificationModel.map((item) => {
        if (item.title === name) {
          return { ...item, value: value };
        }
        return item;
      });

      if (!updatedModel.some((item) => item.title === name)) {
        updatedModel.push({ title: name, value: value });
      }

      return { ...prevData, technicalSpecificationModel: updatedModel };
    });
  };
  const Addproduct = () => {};
  console.log(images);
  return (
    <div>
      <Header
        chooseDate={false}
        title="Add new Product"
        semiTitle="Add new products for availability on website"
        UserBox={true}
      />
      <InputTxt
        onChange={handleChange(setProductData)}
        placeholder="Enter Phone model"
        MainClasses="mt-[40px] !w-[80%]"
        name={"title"}
      />
      <div className="flex gap-4">
        <CustomDropdown placeholder="Phone" mainclasses={"mt-10  !w-[35%]"} />
        <InputTxt
          onChange={handleChange(setProductData)}
          name={"brand"}
          placeholder="Brand"
          MainClasses="mt-[40px] !border !border-custom  !w-[43%]"
        />
        {/* <InputTxt
          placeholder="Model"
          MainClasses="mt-[40px] !border !border-custom"
        /> */}
      </div>
      <textarea
        onChange={(e) => handleChangeDescription(e.target.value)}
        name={"description"}
        className="pt-2 bg-lightgray border border-custom mt-4 rounded-[8px] w-[75%] h-[142px] overflow-hidden pl-[21px] pr-[22px] focus:outline-none"
      />
      <div>
        <CustomButton
          txt={"Variants"}
          classes={
            "!w-[100px] !h-[40px] !mt-6 !mb-4 !rounded-[12px] !bg-[#EFEFEF] !text-[black]"
          }
        />
        <div className="flex gap-2">
          <Variants
            data={VariantsArray}
            onClick={() => {
              setVisible(!visible);
              setVariant({ ...variant, title: "capacity" });
            }}
          />

          <CustomButton
            onClick={() => {
              let newVariant = VariantsArray.map((item: any, index) => {
                return item.txt;
              });
              setVariant({ ...variant, title: "capacity", values: newVariant });
              setVisible(!visible);
            }}
            txt={"+Add text"}
            classes={"!w-[148px] !mt-5 !rounded-[9px]  "}
          />
        </div>
        <div className="flex gap-2">
          <Variants
            data={VariantsArray2}
            onClick={() => {
              setVisible(!visible);
              setVariant({ ...variant, title: "color" });
            }}
          />
          <CustomButton
            onClick={() => {
              let newVariant = VariantsArray2.map((item: any, index) => {
                return item.txt;
              });
              setVariant({ ...variant, title: "color", values: newVariant });
              setVisible(!visible);
            }}
            txt={"+Add text"}
            classes={"!w-[148px] !mt-5 !rounded-[9px]  "}
          />
        </div>
        <div className="flex gap-2">
          <Variants
            data={VariantsArray3}
            onClick={() => {
              setVisible(!visible);
              setVariant({ ...variant, title: "carrier" });
            }}
          />
          <CustomButton
            onClick={() => {
              let newVariant = VariantsArray3.map((item: any, index) => {
                return item.txt;
              });
              setVariant({ ...variant, title: "carrier", values: newVariant });
              setVisible(!visible);
            }}
            txt={"+Add text"}
            classes={"!w-[148px] !mt-5 !rounded-[9px]  "}
          />
        </div>
        <div className="flex gap-2">
          <Variants data={VariantsArray4} />
          <CustomButton
            onClick={() => {
              let newVariant = VariantsArray4.map((item: any, index) => {
                return item.txt;
              });
              console.log(newVariant, "NEW VARIANT");
              setVariant({ ...variant, title: "screen", values: newVariant });
              setVisible(!visible);
            }}
            txt={"+Add text"}
            classes={"!w-[148px] !mt-5 !rounded-[9px]  "}
          />
        </div>
      </div>
      <div>
        <CustomButton
          txt={"Pictures"}
          classes={
            "!w-[100px] !h-[40px] !mt-6 !rounded-[12px] !bg-[#EFEFEF] !text-[black]"
          }
        />
        <UploadPicture
          setImage={(value:any) => {
            setImage(value);
          }}
        />
        <CustomButton
          txt={"Technical Specifications"}
          classes={
            "!w-[220px] !h-[40px] !mt-6 !rounded-[12px] !bg-[#EFEFEF] !text-[black] !px-2 "
          }
        />
        <div className="flex gap-3 mt-5">
          <FetchButton txt={"Fetch from Database"} />
          <FetchButton txt={"Enter Manually"} />
        </div>
        <CustomButton
          txt={"Search Item"}
          classes={
            "!w-[220px] !h-[55px] !mt-6 !rounded-[12px] !bg-[#3C82D6] !text-[white] !px-2 "
          }
          icon={true}
        />
        <div>
          <p className="bg-lightgray p-4 w-[60%] rounded mt-5 border border-custom">
            Technical Specifiactions for <b>iphone 14 pro max</b> was selected
            via 3rd party. Click on search to replace
          </p>
        </div>
        <div className="mb-5">
          <p className="text-[black] font-extrabold bg-lightgray border-b-0 p-4 w-[60%] rounded mt-5 border border-custom">
            Technical Specifications
          </p>

          <div className="border border-custom  w-[60%] pb-4">
            <div className="ml-5">
              <p className="text-[#656565] text-[12px] mt-4">RELEASE DATE</p>
              <InputTxt
                name="Release Date"
                onChange={(e: any) =>
                  updateTechnicalSpecificationModel(
                    e.target.name,
                    e.target.value
                  )
                }
                placeholder={"eg: 20 aug 2022"}
                MainClasses={"!h-[28px] !bg-white"}
              />
            </div>
            <div className="ml-5">
              <p className="text-[#656565] text-[12px] mt-4">BLUETOOTH</p>
              <InputTxt
                name="Bluetooth"
                onChange={(e: any) =>
                  updateTechnicalSpecificationModel(
                    e.target.name,
                    e.target.value
                  )
                }
                placeholder={"5.0"}
                MainClasses={"!h-[28px] !bg-white"}
              />
            </div>
            <div className="ml-5">
              <p className="text-[#656565] text-[12px] mt-4">BATTERY</p>
              <InputTxt
                name="Battery"
                onChange={(e: any) =>
                  updateTechnicalSpecificationModel(
                    e.target.name,
                    e.target.value
                  )
                }
                placeholder={"eg: Battery info"}
                MainClasses={"!h-[28px] !bg-white"}
              />
            </div>
            <div className="ml-5">
              <p className="text-[#656565] text-[12px] mt-4">STORAGE</p>
              <InputTxt
                name="Storage"
                onChange={(e: any) =>
                  updateTechnicalSpecificationModel(
                    e.target.name,
                    e.target.value
                  )
                }
                placeholder={"eg: 512 GB"}
                MainClasses={"!h-[28px] !bg-white"}
              />
            </div>
            <div className="ml-5">
              <p className="text-[#656565] text-[12px] mt-4">CAMERA</p>
              <InputTxt
                name="Camera"
                onChange={(e: any) =>
                  updateTechnicalSpecificationModel(
                    e.target.name,
                    e.target.value
                  )
                }
                placeholder={"eg: Camera Specs"}
                MainClasses={"!h-[28px] !bg-white"}
              />
            </div>
            <div className="ml-5">
              <p className="text-[#656565] text-[12px] mt-4">CONNECTIVITY</p>
              <InputTxt
                name="Connectivity"
                onChange={(e: any) =>
                  updateTechnicalSpecificationModel(
                    e.target.name,
                    e.target.value
                  )
                }
                placeholder={"eg: bluetooth, wifi"}
                MainClasses={"!h-[28px] !bg-white"}
              />
              {/* <li className="font-medium"> Wi-Fi 6 (802.11ax) with MIMO</li>
              <li className="font-medium"> Bluetooth 5.0 </li> */}
            </div>
            <div className="ml-5">
              <p className="text-[#656565] text-[12px] mt-4"> SCREEN </p>
              <InputTxt
                name="Screen"
                onChange={(e: any) =>
                  updateTechnicalSpecificationModel(
                    e.target.name,
                    e.target.value
                  )
                }
                placeholder={"eg: 1080px"}
                MainClasses={"!h-[28px] !bg-white"}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-3 mb-3">
          <CustomButton
            txt={"Cancel"}
            classes={
              "!bg-[#E2E2E2] !text-black !w-[179px] !h-[50px] !rounded-[12px]"
            }
          />
          <CustomButton
            onClick={() => navigate("/Productrequest")}
            txt={"Add Product"}
            classes={" !w-[179px] !rounded-[12px] !h-[50px]"}
          />
        </div>
      </div>
      <Confirmationmodal
        addValue={true}
        PopupHeader={"Add variant"}
        visible={visible}
        setVisible={setVisible}
        cnfrmbtnText={"Confirm"}
        cnclebtnText={"Cancel"}
        text={"Add name of the variant"}
        handleFunction={handleFunction}
      />
    </div>
  );
};
