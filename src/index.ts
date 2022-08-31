import { OnRpcRequestHandler } from "@metamask/snap-types";
import { getExtendedPublicKey } from "./rpc";
import { Wallet, ScriptType, MetamaskBTCRpcRequest } from "./interface";
declare let wallet: Wallet;

export const onRpcRequest: OnRpcRequestHandler = ({ origin, request }) => {
  switch (request.method) {
    case "getPublicExtendedKey":
      return getExtendedPublicKey(wallet);
    default:
      throw new Error("Method not found.");
  }
};
