import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import CustomInput from "../../components/FormComponents/CustomInput";
import { useAddOrUpdateLeaveMutation } from "../../api/LeaveApi";
import { useGetDictionariesQuery } from "../../api/DictionaryApi";
import type { LeaveType } from "../../models/LeaveType";

interface Props {
  open: boolean;
  close: () => void;
  initialData: LeaveType | null;
}

const formatDate = (date?: string) =>
  date ? new Date(date).toISOString().split("T")[0] : "";

const LeaveForm = ({ open, close, initialData }: Props) => {
  const { register, handleSubmit, setValue, watch, reset } = useForm();

  const { data } = useGetDictionariesQuery({
    Category: "LEAVE_TYPE",
    PageSize: 100,
  });

  const [saveLeave, { isLoading }] = useAddOrUpdateLeaveMutation();

  // ✅ FIX: populate form in edit mode
  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        startDate: formatDate(initialData.startDate),
        endDate: formatDate(initialData.endDate),
      });
    }
  }, [initialData, reset]);

  const submit = async (formData: any) => {
    try {
      await saveLeave(formData).unwrap();
      toast.success("Leave saved");
      close();
      reset();
    } catch {
      toast.error("Failed to save leave");
    }
  };

  return (
    <Dialog open={open} onClose={close} maxWidth="md">
      <DialogTitle>{initialData ? "Edit Leave" : "Add Leave"}</DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit(submit)}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <FormControl fullWidth size="small">
                <InputLabel>Leave Type</InputLabel>
                <Select
                  label="Leave Type"
                  value={watch("leaveType") || ""}
                  onChange={(e) => setValue("leaveType", e.target.value)}
                >
                  {data?.items.map((lt) => (
                    <MenuItem key={lt._id} value={lt.name}>
                      {lt.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 6 }}>
              <CustomInput
                label="Start Date"
                name="startDate"
                type="date"
                register={register}
                required
              />
            </Grid>

            <Grid size={{ xs: 6 }}>
              <CustomInput
                label="End Date"
                name="endDate"
                type="date"
                register={register}
                required
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <CustomInput
                label="Reason"
                name="leaveReason"
                register={register}
                required
              />
            </Grid>
          </Grid>

          <DialogActions sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" disabled={isLoading}>
              Save
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveForm;
