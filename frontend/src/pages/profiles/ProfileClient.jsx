import "react-tabs/style/react-tabs.css";
import ProfileSettings from "../../components/profiles/ProfileSettings";
import UserProfileInfo from "../../components/UserProfileInfo";
import { useNavigate } from "react-router-dom";
import ProfilePage from ".";
import { useAuth } from "../../hooks/useAuth";

const ProfileClient = () => {
  const {data: currentUser } = useAuth();
  const navigate = useNavigate();
  return (
    <ProfilePage>
      <div className="md:px-40 p-12 grid md:grid-cols-6 lg:grid-cols-7 gap-x-10 sm:mb-4 gap-2">
        <div className="bg-white rounded-xl md:h-auto h-[auto] max-h-[510px] md:w-[280px] mb-8 md:mb-0 md:col-span-2 lg:col-span-2">
          <UserProfileInfo currentUser={currentUser} />
        </div>
        <div className="bg-white mt-8 p-8 rounded-xl md:col-span-4 lg:col-span-5">
          <div className="space-y-4 pl-4 pb-4 border-b-[1px]">
            <h1 className="text-4xl font-semibold">
              Hi, I'm {currentUser?.username}
            </h1>
            <h6 className="text-sm text-gray-600">Joined in</h6>
            <div className="line-height-0">
              <button
                onClick={() => {
                  navigate("/profile/setting");
                }}
                className="text-base font-bold underline bg-transparent border-none cursor-pointer"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProfilePage>
  );
};

export default ProfileClient;
