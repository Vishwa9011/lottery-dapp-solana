"use client";


import dynamic from "next/dynamic";
import { WalletAdapterNetwork, WalletError } from "@solana/wallet-adapter-base";
import { ConnectionProvider, useConnection, useWallet, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { ReactNode, useCallback, useMemo } from "react";
import { getCluster } from "../cluster/cluster";

require('@solana/wallet-adapter-react-ui/styles.css');

export const WalletButton = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton
  , { ssr: false }
);

export const SolanaProvider = ({ children }: { children: ReactNode }) => {

  const cluster = getCluster(WalletAdapterNetwork.Devnet);

  const endpoint = useMemo(() => cluster.endpoint, [cluster]);

  const wallets = useMemo(() =>
    [new SolflareWalletAdapter({ network: cluster.network })]
    , [cluster]
  );

  const onError = useCallback((error: WalletError) => {
    console.error(error);
  }, []);


  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} onError={onError} autoConnect={true}>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}