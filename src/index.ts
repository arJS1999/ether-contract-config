import { ethers } from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Fragment, Interface, JsonFragment } from "@ethersproject/abi";

const ethereum = typeof window !== "undefined" && (window as any).ethereum;

export const connectWallet = async () => {
  try {
    console.log("npm connectWallet");
    if (!ethereum) {
      return {
        account: null,
        message: "Please install Metamask",
      };
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    if (accounts.length === 0) {
      console.log("npm No authorized accounts");
      return {
        account: null,
        message: "No authorized accounts",
      };
    }

    const account = accounts[0];
    console.log("npm Connected to account: ", account);

    return {
      account: account,
      message: "Success",
    };
  } catch (error: any) {
    console.log("connectWallet error - ", error);
    return {
      account: null,
      message: error && error.message ? error.message : "Something went wrong",
    };
  }
};

export const deployContract = async (
  abi: string | ReadonlyArray<Fragment | JsonFragment | string> | Interface,
  bytecode: BytesLike | { object: string },
  ...args: Array<any>
) => {
  try {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contractFactory = new ethers.ContractFactory(abi, bytecode, signer);
    const contract = await contractFactory.deploy(...args);
    console.log("deployContract - ", contract.address);
    return contract;
  } catch (error) {
    console.log("deployContract error - ", error);
    return "";
  }
};

export const getContract = async (
  contractAddress: string,
  contractAbi: ReadonlyArray<JsonFragment>
) => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(contractAddress, contractAbi, signer);
};
