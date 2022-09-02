export interface GetPublicExtendedKeyRequest {
  method: "getPublicExtendedKey";
  params: [];
}

export interface SignSolTransaction {
  method: "signSolTransaction";
}

export type MetamaskSolRpcRequest =
  | GetPublicExtendedKeyRequest
  | SignSolTransaction;

export type SolMethodCallback = (
  originString: string,
  requestObject: MetamaskSolRpcRequest
) => Promise<unknown>;

export interface Wallet {
  registerRpcMessageHandler: (fn: SolMethodCallback) => unknown;
  request(options: { method: string; params?: unknown[] }): Promise<unknown>;
}

export interface BIP44CoinTypeNode {
  /**
   * The BIP-44 `coin_type` value of this node.
   */
  readonly coin_type: number;

  /**
   * The 0-indexed BIP-44 path depth of this node.
   *
   * Since this is a `coin_type` node, it will be the number `2`.
   */
  readonly depth: 2;

  /**
   * The hexadecimal-encoded string representation of the private key for this node.
   */
  readonly privateKey: string;

  /**
   * The hexadecimal-encoded string representation of the public key for this node.
   */
  readonly publicKey: string;

  /**
   * The hexadecimal-encoded string representation of the chain code for this node.
   */
  readonly chainCode: string;

  /**
   * A human-readable representation of the BIP-44 HD tree path of this node.
   *
   * Since this is a `coin_type` node, it will be of the form:
   *
   * `m / 44' / coin_type'`
   *
   * Recall that a complete BIP-44 HD tree path consists of the following nodes:
   *
   * `m / 44' / coin_type' / account' / change / address_index`
   *
   * With the following depths:
   *
   * `0 / 1 / 2 / 3 / 4 / 5`
   */
  readonly path: string;
}
