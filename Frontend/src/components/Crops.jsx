import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
function Crops({ item }) {
  return (
    <div className="mt-4 my-3 p-3">
      <div className="card w-72 md:w-80 lg:w-[18rem] bg-base-100 shadow-lg hover:scale-105 duration-200 dark:bg-slate-900 dark:text-white dark:border">
        <figure className="h-40 flex items-center justify-center overflow-hidden">
          <img
            src={item.image}
            alt="Not Available"
            className="object-cover h-full w-full"
          />
        </figure>
        <div className="card-body flex flex-col justify-between h-40 p-3">
          <h2 className="card-title text-base md:text-lg">
            {item.name}
            <div className="badge badge-secondary text-xs md:text-sm">
              {item.category}
            </div>
          </h2>
          <p className="text-xs md:text-sm line-clamp-2">{item.title}</p>
          <div className="card-actions flex justify-between items-center">
            <div className="badge badge-outline text-xs md:text-sm">
              ₹{item.price}
            </div>
            {/* Using Link for navigation */}
            <Link
              to={`/cropdetails/cabbage`}
              className="cursor-pointer px-2 py-1 rounded-full border-2 hover:bg-green-500 hover:text-white duration-200 text-xs md:text-sm">
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Crops;
