import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { GiTakeMyMoney } from "react-icons/gi";
import { GiMatterStates } from "react-icons/gi";

export default function SecondHandItem(prop) {
  const secondhand = prop.post;
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[320px]">
      <Link to={`/secondhand/${secondhand._id}`}>
        <img
          src={secondhand.imageUrls[0]}
          alt="secondhand cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="text-lg font-semibold text-slate-700 truncate">
            {secondhand.pickSecondHand} {secondhand.secondhandcategory}
          </p>
          <p className="text-lg font-semibold text-slate-600 truncate">
           {"Model - "} {secondhand.model} 
          </p>
          <div className="flex gap-3 text-md my-3 border-2 max-w-72 h-[50px] justify-between rounded-lg p-2">
                <div className="flex gap-1 items-center font-medium">
                  <GiMatterStates />
                  Status -{" "}
                  <span className="text-green-700"> {secondhand.status}</span>
                </div>

                <div className="flex gap-1 items-center font-medium" dir="rtl">
                  {"Quantity - "} 
                  {secondhand.quantity.toLocaleString("en-US")}
                </div>
              </div>
          <div className="flex flex-col  gap-2">
            <div className="flex items-center gap-1">
              <MdLocationOn className="h-4 w-4 text-green-700" />
              <p className="turncate text-sm text-gray-600">
                {secondhand.areas}-{secondhand.city}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <GiTakeMyMoney className="h-4 w-4 text-green-700" />{" "}
              <p className="turncate text-sm text-gray-600">
                {"Price - "}
                {secondhand.price ? (+secondhand.price).toLocaleString("en-US") : "No Price"}
                ⟨₪⟩
              </p>
            </div>
          </div>
    
          <p className="text-sm text-gray-600 line-clamp-2">
            {secondhand.description}
          </p>
        </div>
      </Link>
    </div>
  );
}
