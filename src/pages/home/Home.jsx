import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useActiveAccount } from "thirdweb/react";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { client } from "../../client";

const wallets = [createWallet("io.metamask")];

export default function Home() {
  const account = useActiveAccount();
  const navigate = useNavigate();

  useEffect(() => {
    if (account) {
      navigate("/voting");
    }
  }, [account, navigate]);
  return (
    <section className="relative dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 px-6 mt-24">
      <div className="container-costume mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold font-roboto leading-tight text-gray-900 dark:text-white">
            Think <span className="text-red-500">Twice</span> Before You Vote
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 dark:text-gray-300">
            Every click shapes the future. Don't let your vote be a gamble —
            research, reflect, and make a choice that matters.
          </p>
          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
            <ConnectButton
              client={client}
              wallets={wallets}
              connectButton={{
                label: "let's Meet the Candidates",
                style: {
                  padding: "0.75rem 1.5rem",
                  borderRadius: "0.5rem",
                  backgroundColor: "#ef4444",
                  color: "white",
                  fontWeight: "500",
                  transition: "all 0.2s ease-in-out",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                },
              }}
            />
          </div>
        </div>

        {/* Image / Illustration */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1161/1161388.png"
            alt="Think before voting"
            className="w-72 sm:w-96 lg:w-[28rem] drop-shadow-xl"
          />
        </div>
      </div>

      {/* Decorative Shape */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-200 opacity-40 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-red-300 opacity-30 rounded-full blur-2xl -z-10" />
    </section>
  );
}
