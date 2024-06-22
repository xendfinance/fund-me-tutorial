"use client";
import deployedContracts from "@/contracts/deployedContracts";
import { useState, useEffect } from "react";
import {
  createPublicClient,
  createWalletClient,
  http,
  custom,
  getContract,
  parseEther,
} from "viem";
import { useAccount } from "wagmi";
import { assetchain_testnet } from "@/utils/assetchainTestnetChain";
import Link from "next/link";

const Debug = () => {
  //useState Variables
  const [greeter, setGreeter] = useState<any>("");
  const [donate, setDonate] = useState<any>("");
  const [transactionHash, setTransactionHash] = useState<any>("");
  const { address: account } = useAccount();
  const [publicClient, setPublicClient] = useState<any>(null);
  const [walletClient, setWalletClient] = useState<any>(null);
  const isEmpty = (obj: any) => {
    return Object.keys(obj).length === 0;
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPublicClient(
        createPublicClient({
          chain: assetchain_testnet,
          transport: http(),
        })
      );

      setWalletClient(
        createWalletClient({
          chain: assetchain_testnet,
          transport: custom(window.ethereum!),
        })
      );
    }
  }, []);

  const WrteContract = async () => {
    if (!account || !publicClient || !walletClient) return;
    const { request } = await publicClient.simulateContract({
      address: deployedContracts.assetchain_testnet.address as `0x${string}`,
      abi: deployedContracts.assetchain_testnet.abi,
      functionName: "donate",
      account,
      value: parseEther(donate),
    });
    const hash = await walletClient.writeContract(request);
    setTransactionHash(hash);
  };
  const disableButton = !account;
  return (
    <div className="flex items-center flex-col w-full">
      {isEmpty(deployedContracts) ? (
        <p className="text-center text-3xl font-extrabold">
          No Deployed Contracts
        </p>
      ) : (
        <div>
          <p className="text-center text-3xl font-extrabold">
            {deployedContracts.assetchain_testnet.contractName} Contract
          </p>
          <div className="py-8 w-full">
            <div className="w-full pt-8">
              <div className="bg-white rounded-3xl shadow-md shadow-secondary border border-base-300 flex flex-col mt-10 relative">
                <div className="h-[5rem] w-[5.5rem] bg-[#DAE8FF] absolute self-start rounded-[22px] -top-[38px] -left-[1px] -z-10 py-[0.65rem] shadow-lg shadow-base-300">
                  <div className="flex items-center justify-center space-x-2">
                    <p className="my-0 text-sm">Write</p>
                  </div>
                </div>
                <div className="p-5 w-96">
                  <div className="flex flex-col gap-3 py-5 first:pt-0 last:pb-1">
                    <p className="my-0 break-words font-extrabold">Donate</p>
                    <input
                      className="input input-ghost focus-within:border-transparent focus:outline-none focus:bg-transparent focus:text-gray-400 h-[2.2rem] min-h-[2.2rem] px-4 border w-full font-medium placeholder:text-accent/50 text-gray-400"
                      placeholder="donate funds"
                      value={donate}
                      onChange={(e) => setDonate(e.target.value)}
                      disabled={disableButton}
                      autoComplete="off"
                    />
                    <button
                      onClick={WrteContract}
                      className="bottom-2 right-2 bg-blue-500 text-white py-2 px-4 rounded disabled:cursor-not-allowed disabled:bg-slate-200"
                      disabled={disableButton}
                    >
                      Donate some Rwa 📡
                    </button>
                    {transactionHash && (
                      <Link
                        href={`https://testnet.assetchain.org/transactions/${transactionHash}`}
                        target="_blank"
                      >
                        view transaction hash here
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Debug;
