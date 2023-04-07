import React from "react";

const PhotoUploader = ({
  photoLink,
  setPhotoLink,
  addPhotoByLink,
  uploadPhoto,
  addedPhotos,
}) => {
  return (
    <div>
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
        <button onClick={addPhotoByLink} className="rounded-2xl px-4 py-2">
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
            <div key={link} className="h-32 flex">
              <img
                className="rounded-2xl object-cover h-full w-full"
                src={"http://localhost:4000/uploads/" + link}
                alt=""
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default PhotoUploader;
