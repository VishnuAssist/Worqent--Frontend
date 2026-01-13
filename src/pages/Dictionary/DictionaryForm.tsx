
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CustomInput from "../../components/FormComponents/CustomInput";
import { useAddOrUpdateDictionaryMutation } from "../../api/DictionaryApi";
import type { DictionaryType } from "../../models/DictionaryType";

import { DICTIONARY_CATEGORIES } from "../../constants/defaultvalues";

interface Props {
  form: boolean;
  closeForm: () => void;
  initialData: DictionaryType | null;
}



const DictionaryForm: FC<Props> = ({ form, closeForm, initialData }) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm({
    values: initialData || {},
  });
  const [saveDictionary, { isLoading }] = useAddOrUpdateDictionaryMutation();

  const submitData = async (data: any) => {
    try {
      await saveDictionary(data).unwrap();
      toast.success("Dictionary entry saved successfully!");
      closeForm();
      reset();
    } catch (error: any) {
      toast.error("Failed to save dictionary entry.");
    }
  };

  return (
    <Dialog open={form} onClose={closeForm} maxWidth="md" >
      <DialogTitle>
        {initialData ? "Update Dictionary Entry" : "Add Dictionary Entry"}
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(submitData)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 12}}>
              <CustomInput label="Name" name="name" register={register} required />
            </Grid>
            <Grid size={{ xs: 12, md: 12}}>
              <CustomInput label="Description" name="description" register={register} />
            </Grid>
            <Grid size={{ xs: 12, md: 12}}>
              <FormControl fullWidth size="small">
                <InputLabel>Category</InputLabel>
                <Select
                  value={watch("category") || ""}
                  label="Category"
                  onChange={(e) => setValue("category", e.target.value)}
                >
                  {DICTIONARY_CATEGORIES.map((c) => (
                    <MenuItem key={c.id} value={c.value}>
                      {c.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <DialogActions sx={{ mt: 2 }}>
            <Button
              disabled={isLoading}
              type="submit"
              variant="contained"
              color="primary"
            >
              {initialData ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DictionaryForm;