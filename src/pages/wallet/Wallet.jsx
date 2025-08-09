import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { client } from "../../client";

const wallets = [createWallet('io.metamask')];

export default function Wallets() {
  return (
    <>
      <div className="relative">
        <div className="absolute md:static -right-[68px] md:right-0 -top-[25px] md:top-0 scale-[0.60] md:scale-none origin-left">
            <ConnectButton
              client={client}
              wallets={wallets}
            />
        </div>
      </div>
    </>
  )
}