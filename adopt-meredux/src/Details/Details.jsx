import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Carousel } from "./Carousel";
import { Modal } from "./Modal";
import { Backdrop } from "./Backdrop";
import { ErrorBoundary } from "./ErrorBoundary";

import { adopt } from "../store/adoptedPetSlice"
import { useGetPetQuery } from "../petApiService";

const Details = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { isLoading, data: pet } = useGetPetQuery(id);
  const dispatch = useDispatch();

  if (isLoading) {
    return (
      <div className="p-15px flex items-center justify-center">
        <div className="inline-flex cursor-not-allowed items-center rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold leading-6 text-white shadow transition duration-150 ease-in-out hover:bg-indigo-400">
          <svg
            className="-ml-1 mr-3 h-24 w-24 animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="text-6xl">Processing...</span>
        </div>
      </div>
    );
  }

  const closeModalHandler = () => setShowModal(false);

  return (
    <div className="my-0 mx-auto mb-[25px] w-[1100px] rounded-md bg-[#faeff0] p-[15px] shadow-lg">
      <Carousel images={pet.images} />
      <div>
        <h1 className="my-[5px] mx-0 text-center text-[60px] text-[#333]">
          {pet.name}
        </h1>
        <h2 className="mt-[5px] mr-0 mb-[20px] ml-0 text-center">{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button
          onClick={() => setShowModal(true)}
          className="my-0 mx-auto block rounded-[5px] border border-[#333] bg-[#ad343e] py-[5px] px-[25px] text-[18px] text-white"
        >
          Adopt {pet.name}
        </button>
        <p className="px-[15px] py-0 leading-[1.5]">{pet.description}</p>
        {showModal ? (
          <Modal className="fixed top-0 left-0 right-0 bottom-0 z-10 flex items-center justify-center bg-[#000000e6]">
            <div className="max-w-[500px] rounded-[30px] bg-[#faeff0] p-[15px] text-center">
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    dispatch(adopt(pet));
                    navigate("/");
                  }}
                  className="mr-[15px] inline-block"
                >
                  Yes
                </button>
                <button onClick={() => setShowModal(false)}>No</button>
              </div>
            </div>
          </Modal>
        ) : null}
        {showModal ? <Backdrop onCancel={closeModalHandler} /> : null}
      </div>
    </div>
  );
};

const DetailsErrorBoundary = (props) => {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
};

export default DetailsErrorBoundary;
