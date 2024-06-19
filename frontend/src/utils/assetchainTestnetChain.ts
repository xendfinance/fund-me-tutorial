//DO NOT EDIT THIS FILE
/*

  @author ASSETCHAIN DEVREL TEAM
   @author James Harrison(https://github.com/KodeSage/)
   @author Ebube Okorie(https://github.com/theiceeman)
 */

import { defineChain } from "viem";

export const assetchain_testnet = defineChain({
  id: 42421,
  name: "AssetChain Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "AssetChain Testnet",
    symbol: "RWA",
  },
  rpcUrls: {
    default: {
      http: ["https://enugu-rpc.assetchain.org"],
      webSocket: ["wss://enugu-rpc.assetchain.org"],
    },
  },
  blockExplorers: {
    default: { name: "Asset Chain Scan", url: "https://testnet.assetchain.org" },
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 42421,
    },
  },
});
