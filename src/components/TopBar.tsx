import Link from "next/link";
import ConnectButton from "./ConnectButton";

const TopBar = () => {
  return (
    <div className="fixed top-0 w-full">
      <div className="relative flex w-full items-center px-4  py-4 shadow">
        <Link href="/">
          <a>
            <img src="/meta_street.png" className="h-8" />
          </a>
        </Link>
        <div className="flex-grow" />
        <ConnectButton />
      </div>
    </div>
  );
};

export default TopBar;
