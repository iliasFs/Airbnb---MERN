import React from "react";
import { useState } from "react";
import PhotoUploader from "../components/PhotoUploader";
import Perks from "../components/Perks";
import { Link, Navigate } from "react-router-dom";
import AccountNavigation from "../components/AccountNavigation";
import axios from "axios";

const PlacesFormPage = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState("");
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [redirect, setRedirect] = useState(false);

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
  const addNewPlace = async (event) => {
    event.preventDefault();
    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };

    await axios.post("/places", placeData);
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to="/account/places" />;
  }

  return (
    <div>
      <AccountNavigation />
      <form onSubmit={addNewPlace}>
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
        <PhotoUploader
          photoLink={photoLink}
          setPhotoLink={setPhotoLink}
          addPhotoByLink={addPhotoByLink}
          uploadPhoto={uploadPhoto}
          addedPhotos={addedPhotos}
        />
        <h2 className="text-2xl mt-6 ">Descripiton</h2>
        <p className="text-gray-400 text-sm">Describe the place</p>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <h2 className="text-2xl mt-6 ">Perks</h2>
        <p className="text-gray-400 text-sm">Select the perks of your place</p>
        <div>
          <Perks perks={perks} setPerks={setPerks} />
        </div>
        <h2 className="text-2xl mt-6 ">Extra Info</h2>
        <p className="text-gray-400 text-sm">Rules to follow, etc..</p>
        <textarea
          value={extraInfo}
          onChange={(e) => setExtraInfo(e.target.value)}
        />
        <h2 className="text-2xl mt-6 ">Check in & out time</h2>
        <p className="text-gray-400 text-sm">
          add check in and out times, dont emmit the time window between guests
          for cleaning.
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
  );
};

export default PlacesFormPage;
