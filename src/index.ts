import { OnRpcRequestHandler } from "@metamask/snap-types";
import { getAddress } from "./rpc";
import { getBIP44AddressKeyDeriver } from "@metamask/key-tree";

export async function getKey(): Promise<string> {
  const solanaNode = await wallet.request({
    method: "snap_getBip44Entropy_3",
  });

  const deriveSolanaAddress = await getBIP44AddressKeyDeriver(solanaNode);
  const addressKey0 = await deriveSolanaAddress(0);
  const addressKey1 = await deriveSolanaAddress(1);
  return addressKey0.address;
}

export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  switch (request.method) {
    case "hello":
      return wallet.request({
        method: "snap_confirm",
        params: [
          {
            prompt: `Hello, ${origin}!`,
            description:
              "This custom confirmation is just for display purposes.",
            textAreaContent:
              "But you can edit the snap source code to make it do something, if you want to!",
          },
        ],
      });
    case "goodbye":
      return wallet.request({
        method: "snap_confirm",
        params: [
          {
            prompt: `Goodbye, ${origin}!`,
            description: "Let's goooo",
            textAreaContent: "Trying my best!!",
          },
        ],
      });
    case "test":
      return await getKey();

    default:
      throw new Error("Method not found.");
  }
};
