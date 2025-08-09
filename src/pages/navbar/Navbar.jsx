import { HiMiniCube } from "react-icons/hi2";
import Wallets from "../wallet/Wallet";

export default function Navbar() {

  return (
    <>
      <nav className="shadow-sm dark:shadow-slate-700">
        <div className="container-costume flex items-center justify-between p-2 md:p-3">
          <div className="flex items-center gap-x-1">
            <i>
              <HiMiniCube className="text-sky-500 md:size-6 xl:size-7" />
            </i>
            <h1 className="font-raleway font-light tracking-wide text-slate-900 md:text-xl xl:text-2xl dark:text-white">
              Voting App
            </h1>
          </div>

          <div>
            <Wallets />
          </div>
        </div>
      </nav>
    </>
  );
}
