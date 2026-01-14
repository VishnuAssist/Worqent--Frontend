import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import type { LeaveType } from "../../models/LeaveType";

interface Props {
  open: boolean;
  close: () => void;
  data: LeaveType | null;
}

const LeavePreview = ({ open, close, data }: Props) => {
  if (!data) return null;

  return (
    <Dialog open={open} onClose={close} maxWidth="sm" fullWidth>
      <DialogTitle>Leave Details</DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid size={{ xs: 6 }}>
            <Typography variant="subtitle2">Leave Type</Typography>
            <Typography>{data.leaveType}</Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography variant="subtitle2">Start Date</Typography>
              <Typography>{new Date(data.startDate).toLocaleDateString("en-IN")}</Typography>
          </Grid>

          <Grid size={{ xs: 6 }}>
            <Typography variant="subtitle2">End Date</Typography>
   
<Typography>{new Date(data.endDate).toLocaleDateString("en-IN")}</Typography>

          </Grid>

          <Grid size={{ xs: 12 }}>
            <Typography variant="subtitle2">Reason</Typography>
            <Typography>{data.leaveReason}</Typography>
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={close}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LeavePreview;
