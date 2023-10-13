import React, { useEffect, useRef, useCallback, useState } from "react";
import { TbPhotoPlus } from "react-icons/tb";

const ImageUpload = ({ onChange, imageSrc }) => {
  const [showUploader, setShowUploader] = useState(true);

  const cloudName = "ntduong";
  const uploadPreset = "ntduong";
  const maxFiles = 5; // Maximum number of files to upload
  const myWidgetRef = useRef(null);

  const handleUpload = useCallback((result) => {
    if (onChange) {
      const newImageSrc = result.info.secure_url;
      if (!imageSrc.includes(newImageSrc)) { 
        onChange(newImageSrc);
      }
    }
    setShowUploader(false);
  }, [onChange, imageSrc]);

  useEffect(() => {
    // Check if the Cloudinary SDK is already loaded
    if (window.cloudinary) {
      myWidgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName: cloudName,
          uploadPreset: uploadPreset,
          multiple: true, // Allow multiple file uploads
          maxFiles: maxFiles // Set maximum number of files
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            handleUpload(result);
          }
        }
      );
    } else {
      // If the Cloudinary SDK is not loaded, load it dynamically
      const script = document.createElement("script");
      script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
      script.type = "text/javascript";
      script.async = true;
      script.onload = () => {
        // Initialize the widget after the SDK is loaded
        myWidgetRef.current = window.cloudinary.createUploadWidget(
          {
            cloudName: cloudName,
            uploadPreset: uploadPreset,
            multiple: true, // Allow multiple file uploads
            maxFiles: maxFiles // Set maximum number of files
          },
          (error, results) => {
            if (!error && results && results.event === "success") {
              handleUpload(results);
              console.log(results)
            }
          }
        );
      };

      // Append the script to the document to load the SDK
      document.head.appendChild(script);
    }
  }, [cloudName, uploadPreset, maxFiles]);

  return (
    <div>
      {imageSrc.length < 5 ? (
        <div
          onClick={() => myWidgetRef.current.open()}
          className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
        >
          <TbPhotoPlus size={50} />
          <div className="font-semibold text-lg">Click to upload (up to 5 images)</div>
        </div>
      ) : null}
      {imageSrc.length > 0 && (
        <div className="flex flex-wrap gap-2 w-full overflow-y-scroll h-96">
          {imageSrc.map((imageUrl, index) => (
            <div key={index} className="relative">
              <img
                alt={`Uploaded ${index + 1}`}
                className="img-fill"
                src={imageUrl}
              />
              {/* Biểu tượng X để xóa hình ảnh */}
              <button
                className="absolute top-0 right-0 bg-transparent text-white rounded-full p-1 cursor-pointer"
                onClick={() => removeImage(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
