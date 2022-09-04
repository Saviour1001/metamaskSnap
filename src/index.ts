import { OnRpcRequestHandler } from "@metamask/snap-types";
import { getExtendedPublicKey, signTransaction } from "./rpc";
import { Wallet } from "./interface";

declare let wallet: Wallet;

export const onRpcRequest: OnRpcRequestHandler = ({ origin, request }) => {
  switch (request.method) {
    case "getPublicExtendedKey":
      return getExtendedPublicKey(wallet);
    case "signTransaction":
      return signTransaction(wallet);
    default:
      throw new Error("Method not found.");
  }
};
