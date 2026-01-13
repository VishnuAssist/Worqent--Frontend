import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import type { DictionaryType } from "../../models/DictionaryType";


interface Props {
  preview: boolean;
  closePreview: () => void;
  data: DictionaryType | null;
}

const DictionaryPreview = ({ preview, closePreview, data }: Props) => {
  if (!data) return null;

  return (
    <Dialog open={preview} onClose={closePreview} maxWidth="sm" fullWidth>
      <DialogTitle>Dictionary Details</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2}>
          <Grid size={{xs:6,md:6}}>
            <Typography variant="subtitle2">Name:</Typography>
            <Typography>{data.name}</Typography>
          </Grid>
          <Grid size={{xs:6,md:6}}>
            <Typography variant="subtitle2">Category:</Typography>
            <Typography>{data.category}</Typography>
          </Grid>
          <Grid size={{xs:12,md:12}}>
            <Typography variant="subtitle2">Description:</Typography>
            <Typography>{data.description}</Typography>
          </Grid>
          <Grid size={{xs:6,md:6}}>
            <Typography variant="subtitle2">Active:</Typography>
            <Typography>{data.isActive ? "Yes" : "No"}</Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={closePreview} variant="contained" color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DictionaryPreview;
