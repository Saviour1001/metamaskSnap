import { extractAccoutPrivateKey } from "./getExtendedPublicKey";
import { Wallet } from "../interface";
import {
  Connection,
  Keypair,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Transaction,
  sendAndConfirmTransaction,
  PublicKey,
} from "@solana/web3.js";

export async function signTransaction(wallet: Wallet): Promise<string> {
  // public key = CbCzzR9crPZzHX4j3KEwD147SNZXMDEHiCvML31TeZBJ

  const user = await extractAccoutPrivateKey(wallet);
  //   return privateKey.publicKey.toBase58();

  const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );

  // const airdropSignature = await connection.requestAirdrop(
  //   user.publicKey,
  //   LAMPORTS_PER_SOL
  // );

  // await connection.confirmTransaction(airdropSignature);

  const lamportsToSend = 1_000_000;

  const transferTransaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: user.publicKey,
      toPubkey: new PublicKey("DdbfQXdtXsBCpCaVkrD9JsNRbchYQXKPtCUKenDCFRDu"),
      lamports: lamportsToSend,
    })
  );

  let blockhash = await connection.getLatestBlockhash("finalized");
  transferTransaction.recentBlockhash = blockhash.blockhash;
  await sendAndConfirmTransaction(connection, transferTransaction, [user]);
  console.log("Transaction sent and confirmed");
  return "Transaction sent and confirmed";
}
