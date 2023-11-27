
import { MdHome as Home } from "react-icons/md";
import { AiFillMessage as Speaks } from "react-icons/ai";
const ProfileSettings = ({ currentUser }) => {
    return ( 
        <>
        <div className="space-y-4 pl-4 pb-4 border-b-[1px]">
          <h1 className="text-4xl font-semibold">
            Hi, I'm {currentUser?.username}
          </h1>
          <h6 className="text-sm text-gray-600">Joined in</h6>
          <div className="line-height-0">
            <button
              onClick={() => {
                
              }}
              className="text-base font-bold underline bg-transparent border-none cursor-pointer"
            >
              Edit Profile
            </button>
          </div>
          <h3 className="text-2xl font-semibold">About</h3>
          
          <div className="flex items-center space-x-4">
            <Home className="text-xl" />
            <p>Lives anywhere in the world</p>
          </div>
          <div className="flex items-center space-x-4">
            <Speaks className="text-xl" />
            <p>Speaks English</p>
          </div>
        </div>
        </>
     );
}
 
export default ProfileSettings;