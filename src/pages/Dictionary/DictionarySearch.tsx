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
import { useState } from "react";
import type { QueryParamsType } from "../../models/CommonType";

import { DICTIONARY_CATEGORIES } from "../../constants/defaultvalues";



interface Props {
  params: QueryParamsType;
  setParams: React.Dispatch<React.SetStateAction<QueryParamsType>>;
}



const DictionarySearch = ({ params, setParams }: Props) => {
  const [searchTerm, setSearchTerm] = useState(params.SearchTerm || "");

  const debouncedSearch = debounce(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setParams({ ...params, SearchTerm: event.target.value, PageNumber: 1 });
    },
    500
  );

  return (
    <Box margin={2}>
      <Grid container spacing={2} alignItems="center" justifyContent={"flex-end"}>
        <Grid size={{xs:12,sm:6,md:3}}>
          <TextField
            size="small"
            fullWidth
            value={searchTerm}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              debouncedSearch(e);
            }}
            placeholder="Search by Name or Description"
          />
        </Grid>

        <Grid size={{xs:12,sm:6,md:3}}>
          <FormControl fullWidth size="small">
            <InputLabel>Category</InputLabel>
            <Select
              value={params.Category || ""}
              label="Category"
              onChange={(e) =>
                setParams({
                  ...params,
                  Category: e.target.value,
                  PageNumber: 1,
                })
              }
            >
              <MenuItem value="">All</MenuItem>
              {DICTIONARY_CATEGORIES.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

       
      </Grid>
    </Box>
  );
};

export default DictionarySearch;
