import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

interface BaseDialogProps {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  children: React.ReactNode;
  width: "xs" | "sm" | "md" | "lg" | "xl";
}

export const BaseDialog: React.FC<BaseDialogProps> = React.memo(
  ({ open, setOpen, children, width }) => {
    const handleClose = () => {
      setOpen(false);
    };
    return (
      <React.Fragment>
        <Dialog
          open={open}
          fullWidth={true}
          onClose={handleClose}
          maxWidth={width}
          closeAfterTransition={false}
          scroll={"body"}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          disableAutoFocus
          disableEnforceFocus
        >
          <DialogContent dividers={false}>{children}</DialogContent>
        </Dialog>
      </React.Fragment>
    );
  },
);
