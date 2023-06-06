import { useState } from "react";
import IMAGES from "../../../assets/Images";
import { Header, StatusCard, Productdetailcard } from "../../../components";
import { Confirmationmodal } from "../../../components";
export const ProductRequests = () => {
  const [visible, setVisible] =useState(false);

  return (
    <div>
      <Header
        placeholder="Search Product Requests"
        typeSearch={true}
        chooseFilter={true}
        UserBox={true}
      />
      <div className="flex gap-2">
        <StatusCard onClick={()=>{setVisible(true)}} title="All" number="55" img={IMAGES.Person} />
        <StatusCard title="New" number="5" img={IMAGES.New} />
        <StatusCard title="Rejected" number="14" img={IMAGES.greencross} />
        <StatusCard title="Accepted" number="14" img={IMAGES.bluetick} />
      </div>
      <div className="flex flex-wrap gap-5 py-4">
        <div className="flex flex-col ">
       
        <Productdetailcard
          text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas
          ultricies tincidunt Morbi luctus nisi ac leo porttitor a varius ante
          interdum. Cras fermentum purus et est laoreet, et posuere massa
          convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed egestas ultricies tincidunt. Morbi luctus nisi ac leo porttitor, a
          varius an`}
        />
        </div>
        <div className="flex flex-col ">
      
        <Productdetailcard
          text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas
          ultricies tincidunt Morbi luctus nisi ac leo porttitor a varius ante
          interdum. Cras fermentum purus et est laoreet, et posuere massa
          convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed egestas ultricies tincidunt. Morbi luctus nisi ac leo porttitor, a
          varius an`}
        />
        </div>
        <div className="flex flex-col ">
      
        <Productdetailcard
          text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas
          ultricies tincidunt Morbi luctus nisi ac leo porttitor a varius ante
          interdum. Cras fermentum purus et est laoreet, et posuere massa
          convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed egestas ultricies tincidunt. Morbi luctus nisi ac leo porttitor, a
          varius an`}
        />
        </div>
        <div className="flex flex-col ">
        <Productdetailcard
          text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas
          ultricies tincidunt Morbi luctus nisi ac leo porttitor a varius ante
          interdum. Cras fermentum purus et est laoreet, et posuere massa
          convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed egestas ultricies tincidunt. Morbi luctus nisi ac leo porttitor, a
          varius an`}
        />
       
        </div>
        <div className="flex flex-col ">
        <Productdetailcard
          text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas
          ultricies tincidunt Morbi luctus nisi ac leo porttitor a varius ante
          interdum. Cras fermentum purus et est laoreet, et posuere massa
          convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed egestas ultricies tincidunt. Morbi luctus nisi ac leo porttitor, a
          varius an Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed egestas ultricies tincidunt. Morbi luctus nisi ac leo porttitor, a
          varius an Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed egestas ultricies tincidunt. Morbi luctus nisi ac leo porttitor, a
          varius an Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed egestas ultricies tincidunt. Morbi luctus nisi ac leo porttitor, a
          varius an`}
        />
       
        </div>
        <div className="flex flex-col ">
        <Productdetailcard
          text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed egestas
          ultricies tincidunt Morbi luctus nisi ac leo porttitor a varius ante
          interdum. Cras fermentum purus et est laoreet, et posuere massa
          convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed egestas ultricies tincidunt. Morbi luctus nisi ac leo porttitor, a
          varius an`}
        />
       
        </div>
       
      
      </div>

      <Confirmationmodal
        PopupHeader={"Item Listed"}
        visible={visible}
        setVisible={setVisible}
        cnfrmbtnText={"Send Notification"}
        cnclebtnText={"Cancel"}
        text={
          "This will send a notifcation to the user who requested you to list this item"
        }
      />
    </div>
  );
};
