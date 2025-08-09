import { Link, useNavigate, useParams } from "react-router";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { CONTRACT } from "../../client";
import { useEffect } from "react";

export default function DetailCandidate() {
  const { address } = useParams();
  const account = useActiveAccount();
  const navigate = useNavigate();
  
  const { data, isPending } = useReadContract({
    contract: CONTRACT,
    method: "getCandidateByAddress",
    params: [address],
  });

  useEffect(() => {
    if(!account) {
      navigate("/");
    }
  }, [navigate, account]);

  function shortHash(address) {
    if (!address || typeof address !== "string") return "";
    return `${address.slice(0, 8)}...${address.slice(-4)}`;
  }

  return (
    <>
      {isPending ? (
        <div className="container-costume mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 m-1 sm:gap-5">
            {/* Image skeleton */}
            <div className="w-full h-[400px] sm:h-[460px] lg:h-[600px] rounded-md bg-slate-300 animate-pulse" />

            {/* Content skeleton */}
            <div className="flex flex-col justify-start">
              {/* Title + Address + Vote */}
              <div className="flex justify-between mt-3">
                <div>
                  <div className="w-48 h-6 bg-slate-300 rounded animate-pulse mb-2" />
                  <div className="w-32 h-4 bg-slate-300 rounded animate-pulse" />
                </div>
                <div className="w-20 h-5 bg-slate-300 rounded animate-pulse" />
              </div>

              {/* Visi */}
              <div className="mt-5">
                <div className="w-16 h-5 bg-slate-300 rounded animate-pulse mb-2" />
                <div className="w-full h-4 bg-slate-300 rounded animate-pulse mb-2" />
                <div className="w-5/6 h-4 bg-slate-300 rounded animate-pulse mb-2" />
                <div className="w-4/6 h-4 bg-slate-300 rounded animate-pulse" />
              </div>

              {/* Misi */}
              <div className="mt-8">
                <div className="w-16 h-5 bg-slate-300 rounded animate-pulse mb-2" />
                <div className="w-full h-4 bg-slate-300 rounded animate-pulse mb-2" />
                <div className="w-5/6 h-4 bg-slate-300 rounded animate-pulse mb-2" />
                <div className="w-4/6 h-4 bg-slate-300 rounded animate-pulse" />
              </div>

              {/* Buttons */}
              <div className="flex space-x-3 mt-6 sm:mt-12">
                <div className="w-24 h-10 bg-slate-300 rounded-lg animate-pulse" />
                <div className="w-28 h-10 bg-slate-300 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-costume mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 m-1 sm:gap-5">
            {/* image section 1 */}
            <img
              src={data[5]}
              alt={data[2]}
              className="w-full h-[400px] sm:h-[460px] lg:h-[600px] object-cover rounded-md"
            />

            {/* section 2 */}
            <div>
              <div className="flex justify-between mt-3">
                {/* text-section */}
                <div>
                  <h1 className="font-roboto text-2xl font-medium">
                    {data[2]}
                  </h1>
                  <h6 className="font-roboto font-light text-sm">
                    address: {shortHash(data[1])}
                  </h6>
                </div>
                <h5 className="font-roboto text-lg font-light">
                  Vote: {data[6]}
                </h5>
              </div>
              <div className="my-5">
                {/* visi */}
                <h4 className="font-roboto font-medium text-lg italic">
                  Vission:{" "}
                </h4>
                <p className="font-roboto text-md font-light text-justify mr-5">
                  {data[3]}
                </p>
                {/* misi */}
                <h4 className="font-roboto font-medium text-lg italic mt-8">
                  Mission:{" "}
                </h4>
                <p className="font-roboto text-md font-light text-justify mr-5">
                  {data[4]}
                </p>
              </div>
              <div className="space-x-3 mt-6 sm:mt-12">
                <Link
                  to="/voting"
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg mt-6 cursor-pointer"
                >
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
