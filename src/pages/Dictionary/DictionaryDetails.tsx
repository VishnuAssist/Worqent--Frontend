import { Card, Divider } from "@mui/material";
import { useState } from "react";
import DictionarySearch from "./DictionarySearch";
import DictionaryTable from "./DictionaryTable";
import { useGetDictionariesQuery } from "../../api/DictionaryApi";
import type { QueryParamsType } from "../../models/CommonType";
import { defaultparams } from "../../constants/defaultvalues";
import AppPagination from "../../components/AppPagination";
import { getAxiosParamsA } from "../../api/util";
import TableSkeleton from "../../components/Skeletons/TableSkeleton";
import NoDataCard from "../../components/NoDataCard";

const DictionaryDetails = () => {
  const [searchParams, setSearchParams] = useState<QueryParamsType>({
    ...defaultparams,
    PageSize: 5,    
    SearchTerm: "",
    Category: "",
  });

  const {
    data: dictData,
    isFetching,
  } = useGetDictionariesQuery(getAxiosParamsA(searchParams));

  const hasData = dictData?.items && dictData.items.length > 0;

  return (
    <Card>
      <DictionarySearch params={searchParams} setParams={setSearchParams} />
      <Divider />
      {isFetching ? (
        <TableSkeleton />
      ) : hasData ? (
        <>
          <DictionaryTable dictionaryData={dictData.items} />
          {dictData.metaData && (
            <AppPagination
              metaData={dictData.metaData}
              onPageChange={(page) =>
                setSearchParams({ ...searchParams, PageNumber: page })
              }
            />
          )}
        </>
      ) : (
        <NoDataCard sx={{ height: 300, m: 1, width: "100%" }} text="No Data" />
      )}
    </Card>
  );
};

export default DictionaryDetails;
