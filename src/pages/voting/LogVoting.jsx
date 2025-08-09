import { useEffect } from "react";
import { useReadContract } from "thirdweb/react";
import { formatDistanceToNow } from "date-fns";
import { CONTRACT } from "../../client";

export default function LogVoting({ setRefetchLogs }) {
  const {
    data: voteLogs,
    isPending: isPendingVoteLogs,
    refetch: isRefetchVoteLogs,
  } = useReadContract({
    contract: CONTRACT,
    method: "getAllVoteLogs",
  });

  useEffect(() => {
    setRefetchLogs(() => isRefetchVoteLogs);
  }, [setRefetchLogs, isRefetchVoteLogs]);

  function shortHash(address) {
    if (!address || typeof address !== "string") return "";
    return `${address.slice(0, 8)}...${address.slice(-4)}`;
  }

  return (
    <>
      <h1 className="font-roboto text-3xl font-semibold mx-4 dark:text-white">
        List Recent Vote Table
      </h1>
      <div className="overflow-x-auto overflow-y-auto max-h-[600px] rounded-lg shadow-lg m-4">
        <table className="w-full text-sm text-left text-gray-700 bg-white">
          <thead className="bg-blue-500 text-white uppercase text-xs font-bold">
            <tr>
              <th scope="col" className="px-6 py-4">
                #
              </th>
              <th scope="col" className="px-6 py-4">
                Voter Address
              </th>
              <th scope="col" className="px-6 py-4">
                Voted For
              </th>
              <th scope="col" className="px-6 py-4">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 divide">
            {isPendingVoteLogs ? (
              // Skeleton table
              [1, 2, 3, 4, 5].map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-300 rounded w-4"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-300 rounded w-32"></div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                  </td>
                </tr>
              ))
            ) : voteLogs.length === 0 ? (
              <tr className="hover:bg-gray-50 transition-all">
                <td className="px-6 py-4 font-medium">Vote logs is empty</td>
              </tr>
            ) : (
              voteLogs
                .slice()
                .reverse()
                .map((v, index) => {
                  const timeAgo = formatDistanceToNow(
                    new Date(Number(v.timestamp) * 1000),
                    { addSuffix: true }
                  );
                  return (
                    <tr key={index} className="hover:bg-gray-50 transition-all">
                      <td className="px-6 py-4 font-medium">{index + 1}</td>
                      <td className="px-6 py-4">{shortHash(v.voter)}</td>
                      <td className="px-6 py-4">
                        {shortHash(v.candidateAddress)}
                      </td>
                      <td className="px-6 py-4">{timeAgo === "less than a minute ago" ? "Now" : timeAgo}</td>
                    </tr>
                  );
                })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
