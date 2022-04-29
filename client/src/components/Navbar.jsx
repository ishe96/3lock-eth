import React from "react";
import { HiMenuAlt4 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

import logo from "../../images/logo.png";
import { SiBitcoin } from "react-icons/si";
import { TranscationContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";

const NavBarItem = ({ title, classProps }) => {
    return <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>;
};

const Navbar = () => {
    const { connectWallet, currentAccount, isLogged } =
        React.useContext(TranscationContext);
    const [toggleMenu, setToggleMenu] = React.useState(false);
    const [hover, setHover] = React.useState(false);

    return (
        <nav className="w-full py-2 flex md:justify-center justify-between items-center">
            <div className="md:flex-[0.5] flex-initial justify-center items-center">
                {/* <img
                    src={logo}
                    alt="logo"
                    className="w-32 cursor-pointer px-2"
                /> */}

                {/* <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                    <SiBitcoin fontSize={21} color="#fff" /> 
                </div> */}
                <text className="text-white font-bold text-xl ">
                    3ankcrypto
                </text>
            </div>
            <ul className="text-white md:flex hidden list-none flex-row justify-between items-center flex-initial">
                {["Market", "Exchange", "Tutorials", "Wallets"].map(
                    (item, index) => (
                        <NavBarItem key={item + index} title={item} />
                    )
                )}

                {currentAccount ? (
                    <li className="py-2 px-7 mx-4 cursor-pointer bg-[#F97316] hover:bg-indigo-400 rounded-full">
                        {shortenAddress(currentAccount)}
                    </li>
                ) : (
                    <li>
                        <button
                            type="button"
                            onClick={connectWallet}
                            className="text-white py-2 px-7 mx-4 cursor-pointer bg-indigo-700 hover:bg-indigo-400 rounded-full"
                        >
                            Login
                        </button>
                    </li>
                )}
            </ul>
            <div className="flex relative">
                {toggleMenu ? (
                    <AiOutlineClose
                        fontSize={28}
                        className="text-white md:hidden cursor-pointer rounded-full"
                        onClick={() => setToggleMenu(false)}
                    />
                ) : (
                    <HiMenuAlt4
                        fontSize={28}
                        className="text-white md:hidden cursor-pointer"
                        onClick={() => setToggleMenu(true)}
                    />
                )}
                {toggleMenu && (
                    <ul className="z-10 fixed top-0 -right-2 p-3 shadow-2xl md:hidden list-none h-1/2 w-2/3 flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in">
                        <li className="text-xl w-full my-2">
                            <AiOutlineClose
                                onClick={() => setToggleMenu(false)}
                            />
                        </li>
                        {["Market", "Exchange", "Wallets"].map(
                            (item, index) => (
                                <NavBarItem
                                    key={item + index}
                                    title={item}
                                    classProps="my-2 text-lg"
                                />
                            )
                        )}
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
