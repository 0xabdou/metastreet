import Link from "next/link";
import useSigner from "state/signer";
import AddressAvatar from "./AddressAvatar";
import ConnectButton from "./ConnectButton";
import SearchButton from "./SearchButton";

const TopBar = () => {
  const { address } = useSigner();

  return (
    <div className="fixed top-0 w-full">
      <div className="relative flex w-full items-center px-4  py-4 shadow">
        <Link href="/">
          <a>
            <img src="/meta_street.png" className="h-8" />
          </a>
        </Link>
        <div className="flex-grow" />
        {!address && <ConnectButton />}
        {address && (
          <div className="flex items-center space-x-4">
            <SearchButton />
            <AddressAvatar address={address} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
