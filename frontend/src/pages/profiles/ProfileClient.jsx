import "react-tabs/style/react-tabs.css";
import { useNavigate } from "react-router-dom";
import ProfilePage from ".";
import { useAuth } from "../../hooks/useAuth";
import ProfileInfo from "../../components/profiles/ProfileInfo";

const ProfileClient = () => {
  const {data: currentUser } = useAuth();
  const navigate = useNavigate();
  return (
    <ProfilePage>
      <div className="px-20 md:px-30 lg:pl-40 lg:pr-30 grid xs:grid-cols-5 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-5 gap-x-10 sm:mb-4 gap-5">
        <div className="bg-white rounded-xl max-h-[360px] md:w-[220px] mb-8 md:mb-0 sm:col-span-2 md:col-span-1 lg:col-span-1">
          <ProfileInfo currentUser={currentUser} />
        </div>
        <div className="bg-white mt-20 md:mt-5 md:ml-20 rounded-xl sm:col-span-2 md:col-span-2 lg:col-span-4">
          <div className="space-y-2 pl-4 pb-4 border-b-[1px]">
            <h1 className="text-lg md:text-2xl font-semibold">
             Information about {currentUser?.username}
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
