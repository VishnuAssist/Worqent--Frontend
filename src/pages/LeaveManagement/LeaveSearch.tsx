import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  debounce,
} from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { useState,  } from "react";

import type { QueryParamsType } from "../../models/CommonType";
import { useGetDictionariesQuery } from "../../api/DictionaryApi";

interface Props {
  params: QueryParamsType;
  setParams: React.Dispatch<React.SetStateAction<QueryParamsType>>;
}

const LeaveSearch = ({ params, setParams }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useGetDictionariesQuery({
    Category: "LEAVE_TYPE",
    PageSize: 100,
  });


    const debouncedSearch = debounce(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setParams({ ...params, SearchTerm: event.target.value, PageNumber: 1 });
      },
      500
    );

  return (
    <Box m={2}>
      <Grid container spacing={2} justifyContent="flex-end">
        <Grid size={{ xs: 12, md: 3 }}>
          <TextField
            size="small"
            fullWidth
            placeholder="Search leave"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                </InputAdornment>
              ),
            }}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              debouncedSearch(e.target.value);
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Leave Type</InputLabel>
            <Select
              label="Leave Type"
              value={params.LeaveType || ""}
              onChange={(e) =>
                setParams({
                  ...params,
                  LeaveType: e.target.value,
                  PageNumber: 1,
                })
              }
            >
              <MenuItem value="">All</MenuItem>
              {data?.items.map((lt) => (
                <MenuItem key={lt._id} value={lt.name}>
                  {lt.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LeaveSearch;
