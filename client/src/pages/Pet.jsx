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
import { FaSellsy } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";
import { SlCallIn } from "react-icons/sl";
import { CgProfile } from "react-icons/cg";
import { IoMaleFemaleOutline } from "react-icons/io5";
import { TbDisabled } from "react-icons/tb";

export default function Pet() {
  const dispatch = useDispatch();
  const params = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const { imageClicked } = useSelector((state) => state.user);

  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchPet = async () => {
      try {
        const petId = params.petId;
        setError(false);
        setLoading(true);
        const res = await fetch(
          `http://localhost:3000/api/pet/getPet/${petId}`,
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
        setPet(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchPet();
  }, [params.petId]);
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
      {pet && !loading && !error && (
        <div>
          <Swiper navigation>
            {pet.imageUrls.map((url) => (
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
                {pet.pickPet} {pet.pettype}
              </p>
              <div className="flex gap-3 text-md font-semibold text-slate-700 ">
                <span className="flex text-lg gap-1 items-center">
                  <FaSellsy className="size-5 mt-0.5" />
                  Action - {pet.action}
                </span>
              </div>

              <div className="flex gap-3 text-md my-3 border-2 max-w-80 h-[50px] justify-between rounded-lg p-2">
                <div className="flex gap-1 items-center" dir="rtl">
                  {pet.ageper}{" "}
                  {pet.age === "permonth"
                    ? "Months"
                    : pet.age === "peryear"
                    ? "Years"
                    : "days"}
                  <FaBirthdayCake />
                </div>

                <div className="flex gap-1 items-center" dir="rtl">
                  {"Quantity"}
                  {pet.quantity.toLocaleString("en-US")}
                </div>
              </div>
              <p className="flex items-center gap-2 text-slate-600 text-sm mb-5">
                <FaMapMarkerAlt className="text-green-700" />
                {pet.areas} - {pet.city}
              </p>

              <ul className="text-green-900 font-semibold text-sm flex flex-wrap items-center my-5 gap-5 sm:gap-5 max-w-60 border-2 rounded-xl p-2">
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <TbDisabled className="text-2xl" />
                  <div
                    className={` w-full max-w-[200px] text-white text-center p-1 rounded-md ${
                      !pet.disable ? "bg-green-900" : "bg-red-900"
                    }`}
                  >
                    {pet.disable ? "Disabled" : "None Disable"}
                  </div>
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <IoMaleFemaleOutline className="text-2xl" />
                  <div
                    className={` w-full max-w-[200px] text-white text-center p-1 rounded-md ${
                      pet.sex === "male" ? "bg-green-900" : "bg-red-900"
                    }`}
                  >
                    {pet.sex === "male"
                      ? "Male"
                      : pet.sex === "Female"
                      ? "Female "
                      : "Mix"}
                  </div>
                </li>
              </ul>
              <p className="text-slate-800">
                <span className="font-semibold text-black">Description - </span>
                {pet.description}
              </p>
            </div>
            <div className="flex flex-col max-w-4xl mx-auto p-3 my-5 gap-4 border-2 rounded-xl h-[160px]">
              <div className="flex gap-3 text-xl font-bold text-slate-700  rounded-lg mx-auto p-2 items-center">
                <div className="flex items-center">
                  {(+pet.price).toLocaleString("en-US")}
                  <span className="text-3xl mb-2">₪</span>{" "}
                </div>
                {pet.flexible ? (
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
                    {pet.name}{" "}
                  </span>
                </div>
                <div className="flex flex-col items-center ">
                  <SlCallIn />{" "}
                  <span className="gap-1 text-sm text-green-500">
                    {" "}
                    {pet.phonenumber}{" "}
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
