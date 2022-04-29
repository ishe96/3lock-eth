import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";

export const TranscationContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
    );

    return transactionContract;
};

export const TranscationProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({
        addressTo: "",
        amount: "",
        keyword: "",
        message: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [transactionCount, setTransactionCount] = useState(
        localStorage.getItem("transactionCount")
    );
    const [transactions, setTransactions] = useState([]);

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const getAllTransactions = async () => {
        try {
            if (ethereum) {
                const transactionContract = getEthereumContract();
                const availableTransactions =
                    await transactionContract.getAllTransactions();

                const structuredTransactions = availableTransactions.map(
                    (transaction) => ({
                        addressTo: transaction.receiver,
                        addressFrom: transaction.sender,
                        timestamp: new Date(
                            transaction.timestamp.toNumber() * 1000
                        ).toLocaleString(),
                        message: transaction.message,
                        keyword: transaction.keyword,
                        amount: parseInt(transaction.amount._hex) / 10 ** 18,
                    })
                );

                console.log(structuredTransactions);

                setTransactions(structuredTransactions);
            } else {
                console.log("ETH is not present");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) {
                return alert(
                    "BankCrypto has that MetaMask is missing in your browser.\nGo to Install MetaMask."
                );
            }

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);

                getAllTransactions();
            } else {
                console.log("No Accounts detected");
            }

            console.log(accounts);
        } catch (error) {
            console.log(error);

            throw new Error("No ETH object found");
        }
    };

    const checkIfTransactionsExist = async () => {
        try {
            const transactionContract = getEthereumContract();
            const transactionCount =
                await transactionContract.getTransactionCount();

            window.localStorage.setItem("transactionCount", transactionCount);
        } catch (error) {
            console.log(error);

            throw new Error("No ETH found");
        }
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) {
                return alert(
                    "BankCrypto has that MetaMask is missing in your browser.\nGo to Install MetaMask."
                );
            }

            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });

            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log(error);

            throw new Error("No ETH object found");
        }
    };

    const downloadMeta = async () => {
        try {
            // if(!ethereum){
            return window.open("https://metamask.io/download/");
            // }
        } catch (error) {
            console.log(error);

            throw new Error("Could visit page");
        }
    };

    const sendTransaction = async () => {
        try {
            if (!ethereum) {
                return alert(
                    "BankCrypto has that MetaMask is missing in your browser.\nGo to Install MetaMask."
                );
            }

            // get the data from form :)
            const { addressTo, amount, keyword, message } = formData;

            const transactionContract = getEthereumContract();

            const parsedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: "eth_sendTransaction",
                params: [
                    {
                        from: currentAccount,
                        to: addressTo,
                        gas: "0x5208", // 21000 GWEI
                        value: parsedAmount._hex, // 0.00001
                    },
                ],
            });

            const transactionHash = await transactionContract.addToBlockchain(
                addressTo,
                parsedAmount,
                message,
                keyword
            );

            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            console.log(`Success - ${transactionHash.hash}`);
            setIsLoading(fasle);

            const transactionCount =
                await transactionContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber);

            window.reload();
        } catch (error) {
            console.log(error);

            throw new Error("No ETH object yawanikwa");
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
    }, []);

    return (
        <TranscationContext.Provider
            value={{
                downloadMeta,
                connectWallet,
                currentAccount,
                formData,
                setFormData,
                handleChange,
                sendTransaction,
                transactions,
                isLoading,
                isLogged,
            }}
        >
            {children}
        </TranscationContext.Provider>
    );
};
