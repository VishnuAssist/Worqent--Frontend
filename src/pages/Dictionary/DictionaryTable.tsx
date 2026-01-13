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
import type { DictionaryType } from "../../models/DictionaryType";
import { useDeleteDictionaryMutation } from "../../api/DictionaryApi";
import DictionaryForm from "./DictionaryForm";
import DictionaryPreview from "./DictionaryPreview";
import DeleteDialog from "../../components/Delete";
import { toast } from "react-toastify";

interface Props {
  dictionaryData: DictionaryType[];
}

const DictionaryTable = ({ dictionaryData }: Props) => {
  const [initialData, setInitialData] = useState<DictionaryType | null>(null);
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(false);
  const [previewData, setPreviewData] = useState<DictionaryType | null>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteDictionary] = useDeleteDictionaryMutation();

  const handleDelete = async () => {
    try {
      if (deleteId) await deleteDictionary(deleteId).unwrap();
      toast.success("Deleted successfully");
    } catch {
      toast.error("Failed to delete");
    }
    setDeleteDialog(false);
  };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Active</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <AnimatePresence>
            {dictionaryData.length ? (
              dictionaryData.map((item) => (
                <TableRow
                  key={item._id}
                  component={motion.tr}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.isActive ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => {
                        setPreviewData(item);
                        setPreview(true);
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="warning"
                      onClick={() => {
                        setInitialData(item);
                        setOpen(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => {
                        setDeleteDialog(true);
                        setDeleteId(item._id);
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
                  <Typography>No dictionary entries found.</Typography>
                </TableCell>
              </TableRow>
            )}
          </AnimatePresence>
        </TableBody>
      </Table>

      <DeleteDialog
        deleteConfirmationOpen={deleteDialog}
        handleDeleteConfirmationClose={() => setDeleteDialog(false)}
        handleDeleteConfirmed={handleDelete}
      />

      <DictionaryForm
        form={open}
        closeForm={() => setOpen(false)}
        initialData={initialData}
      />

      <DictionaryPreview
        preview={preview}
        closePreview={() => setPreview(false)}
        data={previewData}
      />
    </>
  );
};

export default DictionaryTable;
