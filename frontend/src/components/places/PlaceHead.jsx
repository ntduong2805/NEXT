import useCountries from "../../hooks/useCountries";
import Heading from "../Heading";
import Image from "../Image";
import Address from "../Address";

const PlaceHead = ({
  title,
  imageSrc,
  location,
  address,
  placeId,
  currentUser,
}) => {
  const { getByValue } = useCountries();

  const locationValue = getByValue(location);
  return (
    <>
      <Heading
        title={title}
        subtitle={`${locationValue?.region}, ${locationValue?.label}`}
      />
      <Address>{address}</Address>
      <div className="w-full overflow-hidden rounded-xl relative grid grid-cols-4 gap-2" >
        <div className="col-span-2  h-[60vh]">
          <Image
            alt="Image"
            src={imageSrc[0]}
            priority
            className="object-cover h-full w-full"
          />
        </div>
        <div className="col-span-2 h-[60vh] relative grid grid-cols-2 grid-rows-2 gap-2">
          {imageSrc.slice(1, 5).map((src, index) => (
            <div key={index}>
              <Image
                alt="Image"
                src={src}
                className="object-cover h-full w-full"
                priority
              />
            </div>
          ))}
        </div>

      
      </div>
    </>
  );
};

export default PlaceHead;
