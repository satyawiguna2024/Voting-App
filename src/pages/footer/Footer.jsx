import { HiMiniCube } from "react-icons/hi2";
import { Link } from "react-router";

export default function Footer() {
  return (
    <>
      <div className="w-full bg-slate-700 dark:bg-white mt-50">
        <footer className="container-costume p-3">
          <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-0">
            <div className="flex items-center md:items-start gap-x-1">
              <i>
                <HiMiniCube className="text-sky-500 size-6 xl:size-7" />
              </i>
              <h1 className="font-raleway font-medium tracking-wide text-xl xl:text-2xl text-white dark:text-slate-800">
                Voting App
              </h1>
            </div>

            {/* list */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:gap-x-2">
              <ul className="flex flex-col">
                <li className="font-roboto font-medium text-md text-white mb-4 uppercase dark:text-slate-800">Resources</li>
                <Link to="https://react.dev/" className="font-roboto font-medium text-md text-slate-400 mb-3 hover:underline dark:text-slate-500">React</Link>
                <Link to="https://thirdweb.com/" className="font-roboto font-medium text-md text-slate-400 mb-3 hover:underline dark:text-slate-500">Thirdweb</Link>
                <Link to="https://soliditylang.org/" className="font-roboto font-medium text-md text-slate-400 mb-3 hover:underline dark:text-slate-500">Solidity</Link>
                <Link to="https://react-icons.github.io/react-icons/" className="font-roboto font-medium text-md text-slate-400 mb-3 hover:underline dark:text-slate-500">React Icons</Link>
                <Link to="https://tailwindcss.com/" className="font-roboto font-medium text-md text-slate-400 hover:underline dark:text-slate-500">Tailwind CSS</Link>
              </ul>

              <ul className="flex flex-col">
                <li className="font-roboto font-medium text-md text-white mb-4 uppercase dark:text-slate-800">Follow Us</li>
                <Link to="https://github.com/satyawiguna2024" className="font-roboto font-medium text-md text-slate-400 mb-3 hover:underline dark:text-slate-500">Github</Link>
                <Link to="https://www.instagram.com/satya375__" className="font-roboto font-medium text-md text-slate-400 mb-3 hover:underline dark:text-slate-500">Instagram</Link>
                <Link to="https://www.facebook.com/satya.wiguna.395" className="font-roboto font-medium text-md text-slate-400 mb-3 hover:underline dark:text-slate-500">Facebook</Link>
                <Link to="https://t.me/IMadeSatyaWiguna" className="font-roboto font-medium text-md text-slate-400 mb-3 hover:underline dark:text-slate-500">Telegram</Link>
                <Link to="https://discord.com/" className="font-roboto font-medium text-md text-slate-400 hover:underline dark:text-slate-500">Discord</Link>
              </ul>

              <ul className="mt-6 sm:mt-0 flex flex-col">
                <li className="font-roboto font-medium text-md text-white mb-4 uppercase dark:text-slate-800">Legal</li>
                <Link className="font-roboto font-medium text-md text-slate-400 mb-3 hover:underline dark:text-slate-500">Privacy Policy</Link>
                <Link className="font-roboto font-medium text-md text-slate-400 mb-3 hover:underline dark:text-slate-500">Disclaimer</Link>
                <Link className="font-roboto font-medium text-md text-slate-400 mb-3 hover:underline dark:text-slate-500">Accessibility</Link>
                <Link className="font-roboto font-medium text-md text-slate-400 hover:underline dark:text-slate-500">Terms & Conditions</Link>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
