import { RiShieldCheckLine as Verified } from "react-icons/ri";
import { FaRegStar as StarOutline } from "react-icons/fa";
import { FaCheck as Check } from "react-icons/fa";
import UserProfileCard from "../cards/UserProfileCard";
import UserProfileInfo from "../UserProfileInfo";
const ProfileCard = ({ currentUser }) => {
  return (
    <div>
      <UserProfileInfo currentUser={currentUser}/>
      {/* <div className="space-y-4">
        <div className="flex justify-center">
          <img
            src={
              currentUser?.avatar
                ? currentUser.avatar
                : "/images/placeholder.jpg"
            }
            alt=""
            className="h-32 w-32 rounded-full object-cover"
          />
        </div>
        <div className="flex items-center space-x-4">
          <StarOutline className="text-lg" />
          <p className="text-xs">Outstanding reviews</p>
        </div>
        <div className="flex items-center space-x-4">
          <Verified className="text-lg" />
          <p className="text-xs">Identity verified</p>
        </div>
      </div>
      <div className="pt-4">
        <h1 className="text-sm font-bold">{currentUser?.username} confirmed</h1>
        <div className="flex items-center space-x-4 pt-4">
          <Check className="text-xs" />
          <p className="text-xs">Identity</p>
        </div>
        <div className="flex items-center space-x-4">
          <Check className="text-xs" />
          <p className="text-xs">Email address</p>
        </div>
        <div className="flex items-center space-x-4">
          <Check className="text-xs" />
          <p className="text-xs">Awesomeness</p>
        </div>
        <div className="mt-5 text-xs">
          <span className="font-semibold underline">Learn more</span> about how
          confirming account info helps keep the Airbnb community secure.
        </div>
      </div> */}
    </div>
  );
};

export default ProfileCard;
