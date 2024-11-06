import React from "react";
import { BaseDialog } from "../components/BaseDialog";

interface ConfirmDialogProps {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  message: string;
  okText: string;
  onConfirm: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = React.memo(
  ({ open, setOpen, message, okText, onConfirm }) => {
    return (
      <BaseDialog open={open} setOpen={setOpen} width="sm">
        <div>
          <p>{message}</p>
          <button type="button" onClick={onConfirm}>
            {okText}
          </button>
        </div>
      </BaseDialog>
    );
  },
);
