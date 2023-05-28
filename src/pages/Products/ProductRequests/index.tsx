import IMAGES from "../../../assets/Images";
import { Header, StatusCard, Productdetailcard } from "../../../components";

export const ProductRequests = () => {
  return (
    <div>
      <Header
        placeholder="Search Product Requests"
        typeSearch={true}
        chooseFilter={true}
        UserBox={true}
      />
      <div className="flex gap-2">
        <StatusCard title="All" number="55" img={IMAGES.Person} />
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
    </div>
  );
};
