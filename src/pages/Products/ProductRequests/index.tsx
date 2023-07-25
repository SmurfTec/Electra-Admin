import { useEffect, useState } from "react";
import IMAGES from "../../../assets/Images";
import { Header, StatusCard, Productdetailcard } from "../../../components";
import { Confirmationmodal } from "../../../components";
import { useAllProductRequests } from "../../../custom-hooks";
import { deleteProductById } from "../../../store/Slices/ProductSlice";
import { ProgressSpinner } from "primereact/progressspinner";
import { Paginatior } from "../../../components";
export const ProductRequests = () => {
  type Stats = {
    status: string;
    count: string;
  }; 
   const [initialPageData, setInitialPageData] = useState({
    rowsPerPage: 10,
    currentPage: 1,
  });
  const [loading, setLoading] = useState(true);

  const [visible, setVisible] = useState(false);
  const data = useAllProductRequests(loading,setLoading,initialPageData);
  const [productRequest, setProductRequest] = useState([]);
  const [productRequestStats, setProductRequestStats] = useState([{} as Stats]);
  const deleteProduct = async (id: any) => {
    try {
      const deletProdReq = await deleteProductById(id);
      if (deletProdReq) {
        setLoading(!loading);
      }
    } catch (e) {}
  };
  useEffect(() => {
    if (data) {
      setProductRequest(data.productRequests);
      setProductRequestStats(data.productRequestsStats);
    }
  }, [data]);
  useEffect(()=>{
    setLoading(true)
  },[initialPageData])
  return (
    <div>
      <Header
        placeholder="Search Product Requests"
        typeSearch={true}
        chooseFilter={true}
        UserBox={true}
      />
      {!loading ? (
        <>
          {" "}
          <div className="flex gap-2">
            <StatusCard
              onClick={() => {
                setVisible(true);
              }}
              title="All"
              number={`${productRequest.length}`}
              img={IMAGES.Person}
            />
            <StatusCard
              title={`${productRequestStats[2]?.status} `}
              number={`${productRequestStats[2]?.count} `}
              img={IMAGES.New}
            />
            <StatusCard
              title={`${productRequestStats[1]?.status} `}
              number={`${productRequestStats[1]?.count} `}
              img={IMAGES.greencross}
            />
            <StatusCard
              title={`${productRequestStats[0]?.status} `}
              number={`${productRequestStats[0]?.count} `}
              img={IMAGES.bluetick}
            />
          </div>
          <div className="flex flex-wrap gap-5 py-4">
            {productRequest.length > 0 &&
              productRequest.map((item: any, index: any) => {
                return (
                  <div className="flex flex-col " key={index}>
                    <Productdetailcard
                      created={item.created_on}
                      title={item.title}
                      text={item.description}
                      id={item.id}
                      deleteProduct={deleteProduct}
                    />
                  </div>
                );
              })}
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
              <Paginatior
              totalRecords={Number(data.count)}
              initialPageData={initialPageData}
              setInitialPageData={setInitialPageData}
            />
        </>
      ) : (
        <div className="w-full h-full flex justify-start items-center overflow-y-hidden">
          <ProgressSpinner style={{ overflow: "hidden" }} />
        </div>
      )}
    </div>
  );
};
