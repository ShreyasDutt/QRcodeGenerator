import { FaGithub } from "react-icons/fa6";
function Navbar() {
    return (
        <div className="bg-[#09033a] py-5 flex justify-between px-5 w-auto">
            <header>
            <p className={"text-white font-sans font-semibold"}>QR Code Generator</p>
            </header>
            <ul>
                <li>
                    <a href="https://github.com/ShreyasDutt" target={"_blank"}>

                        <FaGithub className={"text-2xl text-white"}/>
                    </a>
                </li>
            </ul>



        </div>
    );
}

export default Navbar;