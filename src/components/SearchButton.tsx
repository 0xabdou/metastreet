import { SearchIcon } from "@heroicons/react/outline";
import { useState } from "react";
import useSigner from "state/signer";
import AddressInputDialog from "./AddressInputDialog";
import IconButton from "./IconButton";

const SearchButton = () => {
  const { setSearchAddress } = useSigner();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="flex">
      <IconButton
        icon={<SearchIcon className="h-full w-full" />}
        onClick={() => setDialogOpen(true)}
      />
      <AddressInputDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSubmit={setSearchAddress}
      />
    </div>
  );
};

export default SearchButton;
