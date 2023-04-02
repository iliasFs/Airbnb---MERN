import React from "react";
import { Link, useParams } from "react-router-dom";

const PlacesPage = () => {
  const { action } = useParams();

  return (
    <div>
      {action !== "new" && (
        <div className="text-center flex justify-center">
          <Link
            className="flex gap-1 bg-primary text-white py-2 px-4 rounded-full w-[150px]"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form>
            <h2 className="text-2xl mt-4 ">Title</h2>
            <p className="text-gray-400 text-sm">
              Title for your place. Smart and catchy
            </p>
            <input
              type="text"
              placeholder="Title ---> eg. 'My lovely apartment'"
            />
            <h2 className="text-2xl mt-4 ">Address</h2>
            <p className="text-gray-400 text-sm">
              Title for your place. Smart and catchy
            </p>
            <input
              type="text"
              placeholder="My address ---> eg. Ceasar St 135, Rome, Italy"
            />
            <h2 className="text-2xl mt-4 ">Photos</h2>
            <p className="text-gray-400 text-sm">More equals better. Quality</p>
            <div>
              <input type="text" placeholder="Add  using a link ...jpg" />
              <button>
                Add Photo
              </button>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              <button className="border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                +
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
