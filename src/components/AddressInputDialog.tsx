import { ethers } from "ethers";
import { useState } from "react";
import Button from "./Button";
import CustomDialog from "./CustomDialog";
import { Input } from "./Input";

type AddressInputDialogProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (address: string) => void;
};

const AddressInputDialog = (props: AddressInputDialogProps) => {
  const { onSubmit, open, onClose } = props;
  const [address, setAddress] = useState("");
  const [error, setError] = useState<string>();

  const validateThenSubmit = () => {
    try {
      // If address is valid
      ethers.utils.getIcapAddress(address);
      // Submit it
      onSubmit(address);
      // And close
      onClose();
    } catch (e) {
      console.log(e);
      setError("Invalid address");
    }
  };

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title="SEARCH BY ADDRESS"
      description="Display NFTs for a different address"
      className="w-96"
    >
      <div className="flex items-center space-x-2">
        <Input
          value={address}
          error={error}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="0x367..."
          className="flex-grow"
          autoFocus
        />
        <Button onClick={validateThenSubmit}>SEARCH</Button>
      </div>
    </CustomDialog>
  );
};

export default AddressInputDialog;
