import { Card, Divider } from "@mui/material";
import { useState } from "react";
import LeaveSearch from "./LeaveSearch";
import LeaveTable from "./LeaveTable";
import { useGetLeavesQuery } from "../../api/LeaveApi";
import AppPagination from "../../components/AppPagination";
import TableSkeleton from "../../components/Skeletons/TableSkeleton";
import NoDataCard from "../../components/NoDataCard";

const LeaveDetails = () => {
  const [params, setParams] = useState({
    PageNumber: 1,
    PageSize: 5,
    SearchTerm: "",
    LeaveType: "",
  });

  const { data, isFetching } = useGetLeavesQuery(params);

  const hasData = data?.items && data.items.length > 0;

  return (
    <Card>
      <LeaveSearch params={params} setParams={setParams} />
      <Divider />

      {isFetching ? (
        <TableSkeleton />
      ) : hasData ? (
        <>
          <LeaveTable leaveData={data.items} />
          {data?.metaData && (
            <AppPagination
              metaData={data.metaData}
              onPageChange={(page) =>
                setParams({ ...params, PageNumber: page })
              }
            />
          )}
        </>
      ) : (
        <NoDataCard sx={{ height: 300, m: 1 }} text="No Leave Records" />
      )}
    </Card>
  );
};

export default LeaveDetails;
