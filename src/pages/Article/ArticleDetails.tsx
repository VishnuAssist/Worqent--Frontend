import { Card } from "@mui/material"
import ArticleTable from "./ArticleTable"
import type { QueryParamsType } from "../../models/CommonType";
import { useState } from "react";
import { useGetAllArticlesQuery } from "../../api/articleApi";
import { getAxiosParamsA } from "../../api/util";
import { defaultparams } from "../../constants/defaultvalues";

const ArticleDetails = () => {
    const [searchParams, setSearchParams] = useState<QueryParamsType>({
    ...defaultparams,
    PageSize: 5,
  });

  const {
    data: contactData,
   
  // } = useGetAllArticlesQuery(getAxiosParamsA(searchParams));
  } = useGetAllArticlesQuery({});
  console.log(contactData)
  return (
    <div>
        <Card>
      {/* <EmployeeSearch />
      <Divider /> */}
      <ArticleTable />
    </Card>
    </div>
  )
}

export default ArticleDetails
