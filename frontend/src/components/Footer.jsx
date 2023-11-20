import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { MdLanguage as LanguageIcon } from "react-icons/md";

const Footer = () => {
    return (
        <div className="h-5vh bg-gray-200 p-2 md:p-4 flex flex-row items-center justify-between mt-8">
            <div>© 2023 DuongNT. No rights reserved.</div>
            <div className="flex items-center">
                <LanguageIcon className="text-lg md:text-xl mr-4" />
                <p className="text-base md:text-lg mr-4">English (US)</p>
                <a
                    href="https://rsdimatulac.github.io/"
                    className="text-base md:text-lg no-underline hover:underline"
                >
                    About the Developer
                </a>
                <a href="" className="text-black text-2xl md:text-3xl ml-4 mr-4 hover:text-green-600">
                    <FaGithub />
                </a>
                <a href="" className="text-black text-2xl md:text-3xl hover:text-blue-600">
                    <FaLinkedinIn />
                </a>
            </div>
        </div>
    );
}

export default Footer;
