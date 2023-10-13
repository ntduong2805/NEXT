import useCountries from "../../hooks/useCountries";
import Heading from "../Heading";
import Image from "../Image";
import HeartButton from "../HeartButton";

const ListingHead = ({ title, imageSrc, location, id, currentUser }) => {
  const { getByValue } = useCountries();

  const locationValue = getByValue(location);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${locationValue?.region}, ${locationValue?.label}`}
      />
      <div className="w-full overflow-hidden rounded-xl relative">
        <div className="grid grid-cols-4 gap-2 rounded-xl">
          <div className="col-span-2">
            <Image
              alt="Image"
              src={imageSrc[0]}
              className="object-fill h-full w-full"
            />
          </div>
          <div className="col-span-2 grid grid-cols-2 gap-2">
            {imageSrc.slice(1, 5).map((src, index) => (
              <div key={index} className="col-span-1">
                <Image
                  alt="Image"
                  src={src}
                  className="object-fill h-48 w-96"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
