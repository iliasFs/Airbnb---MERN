import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "../components/Perks";
import axios from "axios";

const PlacesPage = () => {
  const { action } = useParams();
  const [title, setTAddress] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  //it will take a link from the state and then upload this photo to our server and it will return a link that will be inside our API server directory folder
  async function addPhotoByLink(event) {
    event.preventDefault();
    //we grap the filename from the request to use it through addedPhotos and place it next to the button.
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  //We use the FormData object to easily gather and send data from an HTML form to a server. The FormData object allows you to create key/value pairs of form data, which can then be sent to the server using an HTTP request, such as fetch()
  function uploadPhoto(event) {
    const files = event.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post("/upload", data, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  }

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
            <h2 className="text-2xl mt-6 ">Title</h2>
            <p className="text-gray-400 text-sm">
              Title for your place. Smart and catchy
            </p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title ---> eg. 'My lovely apartment'"
            />
            <h2 className="text-2xl mt-6 ">Address</h2>
            <p className="text-gray-400 text-sm">
              Title for your place. Smart and catchy
            </p>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="My address ---> eg. Ceasar St 135, Rome, Italy"
            />
            <h2 className="text-2xl mt-6 ">Photos</h2>
            <p className="text-gray-400 text-sm">
              More equals better. Quality is important
            </p>

            <div className="flex justify-between gap-4">
              <input
                className=""
                type="text"
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
                placeholder="Add using a link ...jpg"
              />
              <button
                onClick={addPhotoByLink}
                className="rounded-2xl px-4 py-2"
              >
                Add photo
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6">
              
              <label className=" h-32 border flex gap-1 justify-center items-center bg-transparent rounded-2xl p-8 md:text-2xl text-gray-600 cursor-pointer">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={uploadPhoto}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-8 w-8 object-contain"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                Upload
              </label>
              {addedPhotos.length > 0 &&
                addedPhotos.map((link) => (
                  <div className="h-32 flex">
                    <img
                      w-full
                      h-full
                      className="rounded-2xl object-cover"
                      src={"http://localhost:4000/uploads/" + link}
                      alt=""
                    />
                  </div>
                ))}
            </div>
            <h2 className="text-2xl mt-6 ">Descripiton</h2>
            <p className="text-gray-400 text-sm">Describe the place</p>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <h2 className="text-2xl mt-6 ">Perks</h2>
            <p className="text-gray-400 text-sm">
              Select the perks of your place
            </p>
            <div>
              <Perks selected={perks} onChange={setPerks} />
            </div>
            <h2 className="text-2xl mt-6 ">Extra Info</h2>
            <p className="text-gray-400 text-sm">Rules to follow, etc..</p>
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />
            <h2 className="text-2xl mt-6 ">Check in & out time</h2>
            <p className="text-gray-400 text-sm">
              add check in and out times, dont emmit the time window between
              guests for cleaning.
            </p>
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-1">Check In time</h3>
                <input
                  type="text"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  placeholder="14"
                />
              </div>
              <div>
                <h3 className="mt-2">Check Out time</h3>
                <input
                  type="text"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  placeholder="11"
                />
              </div>
              <div>
                <h3 className="mt-2">Max number of guests</h3>
                <input
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                  type="number"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button className="primary !py-4 my-16 max-w-[40%]">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
