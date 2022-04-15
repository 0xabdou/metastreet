import useSigner from "state/signer";

const ConnectButton = () => {
  const { loading, connectWallet } = useSigner();

  return (
    <button
      className="flex h-10 w-36 items-center justify-center rounded-full bg-black px-4 font-semibold text-white"
      onClick={connectWallet}
      disabled={loading}
    >
      {loading ? "busy..." : "Connect wallet"}
    </button>
  );
};

export default ConnectButton;
