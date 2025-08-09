import { useState } from "react";
import { CONTRACT } from "../../client";
import { Link } from "react-router";
import { prepareContractCall } from "thirdweb";
import {
  TransactionButton,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";

export default function Card({ refetchLogs }) {
  const account = useActiveAccount();
  const [isVoting, setIsVoting] = useState(false);

  //!! function hasVote
  const {
    data: hasVote,
    isPending: isPendingHasVote,
    refetch: isRefetchHasVote,
  } = useReadContract({
    contract: CONTRACT,
    method: "hasVote",
    params: account?.address ? [account.address] : [""],
  });

  //!! function getAllCandidate
  const {
    data: candidates,
    isPending: isPendingCandidate,
    refetch: isRefetchIsCandidate,
  } = useReadContract({
    contract: CONTRACT,
    method: "getAllCandidates",
  });

  const truncate = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  const handleRefetchAfterVote = async () => {
    await Promise.all([
      isRefetchHasVote(),
      isRefetchIsCandidate(),
      refetchLogs(),
    ]);
  };

  return (
    <>
      {isPendingCandidate ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 m-4">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="bg-white w-full shadow rounded-lg dark:shadow-blue-600 animate-pulse"
            >
              {/* Gambar skeleton */}
              <div className="w-full h-56 bg-slate-300 rounded-t-lg" />

              <div className="p-5">
                {/* Judul & Vote Count */}
                <div className="flex justify-between items-center">
                  <div className="w-32 h-5 bg-slate-300 rounded" />
                  <div className="w-16 h-5 bg-slate-300 rounded" />
                </div>

                {/* Deskripsi */}
                <div className="mt-4 space-y-2">
                  <div className="w-full h-4 bg-slate-300 rounded" />
                  <div className="w-5/6 h-4 bg-slate-300 rounded" />
                </div>

                {/* Tombol */}
                <div className="flex space-x-3 mt-6">
                  <div className="w-24 h-10 bg-slate-300 rounded" />
                  <div className="w-24 h-10 bg-slate-300 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 m-4">
          {candidates.length === 0 ? (
            <div>
              <h1>Candidate is Empty</h1>
            </div>
          ) : (
            candidates.map((c, index) => (
              <div
                key={index}
                className="bg-white w-full shadow rounded-lg dark:shadow-blue-600"
              >
                <img
                  src={c.image}
                  alt="unsplash"
                  className="w-full h-56 object-cover rounded-t-lg"
                  style={{ objectPosition: "center 15%" }}
                />
                <div className="p-5">
                  <div className="flex justify-between items-center">
                    <h1 className="font-roboto text-xl font-medium border-b">
                      {c.name}
                    </h1>
                    <h5 className="font-roboto text-lg font-light text-slate-500">
                      Vote: {c.voteCount}
                    </h5>
                  </div>
                  <p className="mt-4 text-left font-roboto text-md leading-relaxed">
                    {truncate(c.visi, 100)}
                  </p>
                  <div className="space-x-3 mt-6">
                    <Link
                      to={`/candidate/${c.candidateAddress}`}
                      className="px-6 py-3 bg-orange-500 text-white rounded-lg mt-6 cursor-pointer"
                    >
                      Detail
                    </Link>
                    <TransactionButton
                      transaction={() =>
                        prepareContractCall({
                          contract: CONTRACT,
                          method: "vote",
                          params: [c.id],
                        })
                      }
                      disabled={isPendingHasVote || hasVote || isVoting}
                      onTransactionStart={() => setIsVoting(true)}
                      onTransactionConfirmed={async () => {
                        await handleRefetchAfterVote();
                        setIsVoting(false);
                      }}
                      onError={(err) => {
                        console.error(err.message);
                        setIsVoting(false);
                      }}
                    >
                      {hasVote ? "You Already Voted" : "Vote Now"}
                    </TransactionButton>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </>
  );
}
