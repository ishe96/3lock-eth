import React, { useContext } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";

import { Loader } from "./";
import { TranscationContext } from "../context/TransactionContext";
import { shortenAddress } from "../utils/shortenAddress";

const commonStyles =
    "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-solid border border-gray-400 text-white";

const Input = ({ placeholder, name, type, value, handleChange }) => (
    <input
        placeholder={placeholder}
        type={type}
        step="0.0001"
        value={value}
        onChange={(e) => handleChange(e, name)}
        className="my-2 w-full rounded-sm p-2 outline-none text-white border-none text-sm white-glassmorphism"
    />
);

const Welcome = () => {
    const { downloadMeta ,connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction, isLoading} = useContext(TranscationContext);

    const handleSubmit = (e) => {
        const { addressTo, amount, keyword, message } = formData;

        e.preventDefault();

        if (!addressTo || !amount || !keyword || !message) return;

        sendTransaction();
    };

    return (
        <div className="flex w-full justify-center items-center">
            <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
                <div className="flex flex-1 justify-start flex-col mf:mr-10">
                    <h1 className="text-white text-3xl sm:text-3xl text-gradient py-1">
                        Send crypto <br /> across the world
                    </h1>
                    <p className="text-white text-left mt-5 font-light md:w-9/12 w-11/12 text-base">
                        Explore the crypto world. Buy and sell cryptocurrencies
                        easily on 3ank-crypto
                    </p>
                    {!currentAccount && (
                        <>
                        <button
                            type="button"
                            onClick={connectWallet}
                            className="text-white flex flex-row justify-center items-center my-5 bg-blue-700 p-3 rounded-full cursor-pointer hover:bg-blue-500"
                        >
                            <p className="text-white text-base font-semibold">
                                To Wallet
                            </p>
                        </button>
                        <button
                            type="button"
                            onClick={downloadMeta}
                            className="text-white flex flex-row justify-center items-center my-2 p-3 rounded-full cursor-pointer hover:bg-[#F97316] white-glassmorphism"
                        >
                            <p className="text-white text-base font-semibold">
                                Install MetaMask
                            </p>
                        </button>
                        </>
                        
                    )}

                    <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
                        <div className={`rounded-tl-2xl ${commonStyles}`}>
                            Common
                        </div>
                        <div className={`${commonStyles}`}>Security</div>
                        <div className={`rounded-tr-2xl ${commonStyles}`}>
                            Etherium
                        </div>
                        <div className={`rounded-bl-2xl ${commonStyles}`}>
                            Web 3.0
                        </div>
                        <div className={`${commonStyles}`}>Low fees</div>
                        <div className={`rounded-br-2xl ${commonStyles}`}>
                            Blockchain
                        </div>
                    </div>
                </div>

                <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
                    <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
                        <div className="flex justify-between flex-col w-full h-full">
                            <div className="flex justify-between items-start">
                                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                                    <SiEthereum fontSize={21} color="#fff" />
                                </div>

                                <BsInfoCircle fontSize={17} color="#fff" />
                            </div>
                            <div>
                                <p className="text-white font-light text-sm">
                                    {shortenAddress(currentAccount)}
                                </p>
                                <p className="text-white font-semibold text-lg">
                                    Etherium
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
                        <Input
                            placeholder="Address To"
                            name="addressTo"
                            type="text"
                            handleChange={handleChange}
                        />
                        <Input
                            placeholder="Amount (ETH)"
                            name="amount"
                            type="number"
                            handleChange={handleChange}
                        />
                        <Input
                            placeholder="Keyword (GIF)"
                            name="keyword"
                            type="text"
                            handleChange={handleChange}
                        />
                        <Input
                            placeholder="Enter Message"
                            name="message"
                            type="text"
                            handleChange={handleChange}
                        />
                        {/* <div className="h-[1px] w-full bg-gray-400 my-2" /> */}

                        {isLoading ? (
                            <Loader />
                        ) : (
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="text-white w-full mt-2 border p-2 border-indigo-700 hover:bg-indigo-500 rounded-full cursor-pointer"
                            >
                                Send Now
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
