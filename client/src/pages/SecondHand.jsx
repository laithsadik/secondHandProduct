import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { useDispatch, useSelector } from "react-redux";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/bundle";
import { FaMapMarkerAlt, FaShare } from "react-icons/fa";
import {
  imageClickedPress,
  imageClickedRelease,
} from "../redux/user/userSlice";
import { MdOutlineCategory } from "react-icons/md";
import { GiMatterStates } from "react-icons/gi";
import { SlCallIn } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";

export default function SecondHand() {
  const dispatch = useDispatch();
  const params = useParams();
  const [secondHand, setSecondHand] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const { imageClicked } = useSelector((state) => state.user);

  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchSecondHand = async () => {
      try {
        const secondHandId = params.secondHandId;
        setError(false);
        setLoading(true);
        const res = await fetch(
          `http://localhost:3000/api/secondhand/getSecondHand/${secondHandId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setSecondHand(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchSecondHand();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.secondHandId]);
  const handleImageClick = (url) => {
    dispatch(imageClickedPress(url));
  };

  return (
    <main>
      {imageClicked && (
        <div
          onClick={() => {
            return dispatch(imageClickedRelease());
          }}
          className="flex justify-start z-10 bg-black  bg-opacity-85 absolute "
        >
          <img
            className="object-contain mt-3 w-screen h-screen"
            src={imageClicked}
            alt="image clicked"
          />
        </div>
      )}
      {loading && (
        <p className="text-center my-7 text-3xl text-slate-700">Loading...</p>
      )}
      {error && (
        <p className="text-center my-7 text-3xl text-red-700">
          Somthing went wrong
        </p>
      )}
      {secondHand && !loading && !error && (
        <div>
          <Swiper navigation>
            {secondHand.imageUrls.map((url) => (
              <SwiperSlide className="flex justify-between h-[500px]" key={url}>
                <div className="sm:max-w-24 max-w-0 sm:min-w-24 min-w-0"></div>
                <img
                  onClick={() => {
                    return handleImageClick(url);
                  }}
                  className="mt-4 border-2 w-full object-cover  cursor-pointer rounded-lg"
                  src={url}
                  alt="img-listing"
                />

                <div className="sm:max-w-24 max-w-0 sm:min-w-24 min-w-0"></div>
              </SwiperSlide>
            ))}
          </Swiper>
          {!imageClicked && (
            <div className="fixed top-[13%] right-[7%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
              <FaShare
                className="text-slate-500 "
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              />
            </div>
          )}
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              Link copied!
            </p>
          )}
          <div className="flex  max-w-6xl p-3  gap-4 mx-auto justify-between ">
            <div className="flex flex-col max-w-4xl mx-auto p-3 my-3 gap-4">
              <p className="text-3xl font-bold text-slate-700 ">
                {"Category"} {secondHand.pickSecondHand}
                {" -"} {secondHand.secondhandcategory}
              </p>
              <p className="text-xl font-bold text-slate-600 ">
                {"Product Name "} {secondHand.productname}
              </p>
              <div className="flex gap-3 text-md font-semibold text-slate-700 ">
                <span className="flex text-lg gap-1 items-center">
                  <MdOutlineCategory className="size-5 mt-0.5" />
                  Sub Category -{" "}
                  <span className="text-green-700">{secondHand.model}</span>
                </span>
              </div>

              <div className="flex gap-3 text-md my-3 border-2 max-w-72 h-[50px] justify-between rounded-lg p-2">
                <div className="flex gap-1 items-center font-medium">
                  <GiMatterStates />
                  Status -{" "}
                  <span className="text-green-700"> {secondHand.status}</span>
                </div>

                <div className="flex gap-1 items-center font-medium" dir="rtl">
                  {"Quantity - "}
                  {secondHand.quantity.toLocaleString("en-US")}
                </div>
              </div>
              <p className="flex items-center gap-2 text-slate-600 text-sm mb-5 font-semibold">
                <FaMapMarkerAlt className="text-green-700" />
                {secondHand.areas} - {secondHand.city}
              </p>

              <p className="text-slate-800">
                <span className="font-semibold text-black">Description - </span>
                {secondHand.description}
              </p>
            </div>
            <div className="flex flex-col max-w-4xl mx-auto p-3 my-5 gap-4 border-2 rounded-xl h-[180px]">
              <div className="flex gap-3 max-w-xl text-xl font-bold text-slate-700  rounded-lg mx-auto p-2 items-center">
                <div className="flex  items-center max-w-xl">
                  {secondHand.price ? (
                    (+secondHand.price).toLocaleString("en-US")
                  ) : (
                    <span className=" text-nowrap">No Price</span>
                  )}
                  <span className="text-3xl mb-2">₪</span>{" "}
                </div>
                {secondHand.flexible ? (
                  <span className="text-green-500">{"Flexible"}</span>
                ) : (
                  <span className="bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
                    {"None Flexible"}
                  </span>
                )}
              </div>
              <hr className="text-black" />
              <div className="flex gap-3 text-xl font-bold text-slate-700 rounded-lg mx-auto p-2 items-center">
                <div className="flex flex-col items-center ">
                  <CgProfile />
                  <span className="gap-1 text-sm text-blue-500 flex-wrap">
                    {" "}
                    {secondHand.name}{" "}
                  </span>
                </div>
                <div className="flex flex-col items-center ">
                  <SlCallIn />{" "}
                  <span className="gap-1 text-sm text-green-500">
                    {" "}
                    {secondHand.phonenumber}{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
