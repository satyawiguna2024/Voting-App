import Card from "./Card";
import LogVoting from "./LogVoting";
import { IoAddCircle } from "react-icons/io5";
import { BsFileEarmarkPersonFill } from "react-icons/bs";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { CONTRACT } from "../../client";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function Voting() {
  const [refetchLogs, setRefetchLogs] = useState(null);
  const account = useActiveAccount();
  const navigate = useNavigate();
  const addressOwner = "0x0C72859AF9a63eAb782590184F8D3B1B3252a4a5";

  const { data } = useReadContract({
    contract: CONTRACT,
    method: "getTotalCandidate"
  });

  useEffect(() => {
    if(!account) {
      navigate("/");
    }
  }, [navigate, account]);

  return (
    <>
      <div className="container-costume mt-16">
        <div className="flex justify-between items-center mx-4 xs:mx-5">
            <div>
              <Link to="/add-candidate" className={`group flex items-center gap-x-1 cursor-pointer ${account?.address?.toLowerCase() === addressOwner.toLowerCase() ? "block" : "hidden"}`}>
                  <IoAddCircle size={30} className="text-blue-400 animate-pulse group-hover:animate-none dark:text-blue-600" />
                  <h4 className="font-roboto text-md font-medium group-hover:aniate-none dark:text-white">Candidate</h4>
              </Link>
            </div>
          <div className="flex items-center gap-x-1">
            <BsFileEarmarkPersonFill size={17} className="text-red-400 dark:text-red-600"/>
            <h4 className="font-roboto text-sm font-light dark:text-white">Total: { data }</h4>
          </div>
        </div>
        <Card refetchLogs={refetchLogs} />

        <div className="w-full h-[2px] bg-slate-200 dark:bg-slate-700 mt-32 mb-32" />

        {/* Log voting */}
        <LogVoting setRefetchLogs={setRefetchLogs} />
      </div>
    </>
  );
}
