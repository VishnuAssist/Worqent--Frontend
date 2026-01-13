
import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LogoutImg from "../../../public/assets/delete2.png";

interface DeleteDialogProps {
  deleteConfirmationOpen: boolean;
  handleDeleteConfirmationClose: () => void;
  handleDeleteConfirmed: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  deleteConfirmationOpen,
  handleDeleteConfirmationClose,
  handleDeleteConfirmed,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={deleteConfirmationOpen}
      onClose={handleDeleteConfirmationClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogContent>
        {isMobile && (
          <Box display="flex" justifyContent="center" mb={2}>
            <img
              src={LogoutImg}
              alt="Delete Icon"
              width={80}
              height={80}
              style={{ borderRadius: "15px" }}
            />
          </Box>
        )}
        <Typography
          sx={{
            fontSize: isMobile ? "16px" : "18px",
            fontWeight: 600,
            textAlign: "center",
          }}
        >
          Are you sure you want to delete this?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          gap={1}
          px={2}
          pb={1}
          flexWrap="wrap"
        >
          <Button
            color="error"
            variant="contained"
            size="small"
            onClick={handleDeleteConfirmationClose}
          >
            Cancel
          </Button>
          <Button
            color="success"
            variant="contained"
            
            size="small"
            onClick={handleDeleteConfirmed}
          >
            Confirm
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};
export default DeleteDialog;