import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import DeleteDialog from "../../components/Delete";
import LeaveForm from "./LeaveForm";
import LeavePreview from "./LeavePreview";
import { useDeleteLeaveMutation } from "../../api/LeaveApi";
import type { LeaveType } from "../../models/LeaveType";

interface Props {
  leaveData: LeaveType[];
}
const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN");

const LeaveTable = ({ leaveData }: Props) => {
  const [editData, setEditData] = useState<LeaveType | null>(null);
  const [previewData, setPreviewData] = useState<LeaveType | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [deleteLeave] = useDeleteLeaveMutation();

  const handleDelete = async () => {
    try {
      if (deleteId) await deleteLeave(deleteId).unwrap();
      toast.success("Leave deleted");
    } catch {
      toast.error("Delete failed");
    }
    setDeleteOpen(false);
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Leave Type</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <AnimatePresence>
            {leaveData.length ? (
              leaveData.map((item) => (
                <TableRow
                  key={item._id}
                  component={motion.tr}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                >
                  <TableCell>{item.leaveType}</TableCell>
               <TableCell>{formatDate(item.startDate)}</TableCell>
<TableCell>{formatDate(item.endDate)}</TableCell>

                  <TableCell>{item.leaveReason}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setPreviewData(item);
                        setPreviewOpen(true);
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>

                    <IconButton
                      color="warning"
                      onClick={() => {
                        setEditData(item);
                        setFormOpen(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => {
                        setDeleteId(item._id);
                        setDeleteOpen(true);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography>No Leave Records</Typography>
                </TableCell>
              </TableRow>
            )}
          </AnimatePresence>
        </TableBody>
      </Table>

      <DeleteDialog
        deleteConfirmationOpen={deleteOpen}
        handleDeleteConfirmationClose={() => setDeleteOpen(false)}
        handleDeleteConfirmed={handleDelete}
      />

      <LeaveForm
        open={formOpen}
        close={() => setFormOpen(false)}
        initialData={editData}
      />

      <LeavePreview
        open={previewOpen}
        close={() => setPreviewOpen(false)}
        data={previewData}
      />
    </>
  );
};

export default LeaveTable;
