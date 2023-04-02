import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
import { Network, Alchemy, Wallet, Utils } from "alchemy-sdk";

export const TranscationContext = React.createContext();

const { ethereum } = window;

export const TranscationProvider = ({ children }) => {
    var alchemysettings = {
        // apiKey: "2paAFPEzTNDLG0exTn9kFdRoMwC9tGww",
        apiKey: "VhT7rJdwQ3g_NV6-vRjS_QtU02b7yoom",
        network: Network.MATIC_MUMBAI,
    };

    var wallet_Key =
        "39d99e4e23b8088672c4fc1b390c03fb60804ce88ea0135fd2086ea32802821b";

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

    // const getEthereumContract = ()=>{
    //     const alchemy = new Alchemy(alchemysettings);
    // }

    const getAllTransactions = async () => {
        const { ethereum } = window;
        try {
            const alchemy = new Alchemy(alchemysettings);
            // const provider = await alchemy.core.getAssetTransfers(
            //     "0x600d8E431eD06031dCd6cf4E423B22a693EbdEBD"
            // );
            // const transactionCount = await alchemy.core.getLogs(
            //     // "0x0AA2DfAf89902cA0CD8dac4939Fc72CCc7075d4c"
            //     "0x600d8E431eD06031dCd6cf4E423B22a693EbdEBD"
            // );
            let wallet = new Wallet(wallet_Key);
            const transactionCount = await alchemy.core.getAssetTransfers({
                fromBlock: "0x0",
                fromAddress: "0x0AA2DfAf89902cA0CD8dac4939Fc72CCc7075d4c",
                // toAddress: "0x0",
                excludeZeroValue: true,
                withMetadata: true,
                category: ["erc721", "erc20"],
            });

            const txList = transactionCount.transfers;

            // console.log("Check: ", txList);
            // console.log(transactionCount);

            const structuredTransactions = txList.map((transaction) => ({
                addressTo: transaction.to,
                addressFrom: transaction.from,
                timestamp: new Date(
                    transaction.metadata.blockTimestamp
                ).toLocaleString(),
                txBlock: transaction.blockNum,
                txHash: transaction.hash,
                // keyword: transaction.keyword,
                // amount: parseInt(transaction.amount._hex) / 10 ** 18,
            }));
            console.log("Check : ", structuredTransactions);

            // setTransactions(structuredTransactions);
        } catch (error) {
            console.log(error);
        }
    };

    const checkIfWalletIsConnected = async () => {
        const { ethereum } = window;
        try {
            if (!ethereum) {
                return alert(
                    "BankCrypto has detected that MetaMask is missing in your browser.\nGo to Install MetaMask."
                );
            }

            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);

                // getAllTransactions();
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
            const alchemy = new Alchemy(alchemysettings);
            const transactionCount = await alchemy.core.getAssetTransfers({
                fromBlock: "0x0",
                fromAddress: "0x0AA2DfAf89902cA0CD8dac4939Fc72CCc7075d4c",
                // toAddress: "0x0",
                excludeZeroValue: true,
                withMetadata: true,
                category: ["erc721", "erc20"],
            });
            console.log(transactionCount.transfers);

            const walleTx = new Wallet(wallet_Key);
            const moreTx = await alchemy.nft.
            console.log("More : ", moreTx);
            const toLocalStore = window.localStorage.setItem(
                "transactionCount",
                JSON.stringify(transactionCount.transfers)
            );

            return toLocalStore;
        } catch (error) {
            console.log(error);

            throw new Error("No ETH found");
        }
    };

    const connectWallet = async () => {
        const { ethereum } = window;
        try {
            if (!ethereum) {
                return alert(
                    "BankCrypto has detected that MetaMask is missing in your browser.\nGo to Install MetaMask."
                );
            }

            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });
            console.log(accounts[0]);
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

            throw new Error("Failed to visit page");
        }
    };

    const sendTransaction = async () => {
        try {
            const { amount } = formData;
            const alchemy = new Alchemy(alchemysettings);
            const wallet = new Wallet(
                "39d99e4e23b8088672c4fc1b390c03fb60804ce88ea0135fd2086ea32802821b"
            );

            // creating the transaction object
            const tx = {
                to: "0x600d8E431eD06031dCd6cf4E423B22a693EbdEBD",
                value: Utils.parseEther(amount),
                gasLimit: "21000",
                maxPriorityFeePerGas: Utils.parseUnits("5", "gwei"),
                maxFeePerGas: Utils.parseUnits("20", "gwei"),
                nonce: await alchemy.core.getTransactionCount(
                    wallet.getAddress()
                ),
                type: 2,
                chainId: 80001, // Corresponds to MATIC
            };

            const rawTransaction = await wallet.signTransaction(tx);

            // sending the transaction
            await alchemy.transact
                .sendTransaction(rawTransaction)
                .then((transaction) => {
                    console.dir(transaction);
                    alert(`Sent ${amount} ETH`);
                });
        } catch (error) {
            console.log("HEX : ", Number("0.001").toString(16));
            console.log(error);
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
        getAllTransactions();
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
                setIsLoading,
                setTransactionCount,
            }}
        >
            {children}
        </TranscationContext.Provider>
    );
};
