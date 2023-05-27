import { Header } from "../../../components";
import { InputTxt ,CustomDropdown} from "../../../atoms";
export const AddProduct = () => {
  return (
    <div>
      <Header
        chooseDate={false}
        title="Add new Product"
        semiTitle="Add new products for availability on website"
      />
      <InputTxt
        placeholder="Enter Phone model"
        MainClasses="mt-[40px] !w-[80%]"
      />
      <div className="flex gap-4">
        <CustomDropdown placeholder="Phone" mainclasses={"mt-10"} />
        <InputTxt placeholder="Brand" MainClasses="mt-[40px] !border-2 !border-[#FCFCFC] " />
        <InputTxt placeholder="Model" MainClasses="mt-[40px] " />
      </div>
    </div>
  );
};
