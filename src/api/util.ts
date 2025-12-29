import type { QueryParamsType } from "../models/CommonType";
export const datawithmeta = (response: any, meta: any) => {
  const pagination = meta.response.headers.get("pagination");
  if (pagination) {
    const parsedPagination = JSON.parse(pagination);
    return {
      items: response,
      metaData: parsedPagination,
    };
  }
  return {
    items: response,
    metaData: null,
  };
};
export function getAxiosParamsA(dictionaryParams: QueryParamsType) {
  const params: any = {};
  params["pageNumber"] = dictionaryParams?.pageNumber?.toString();
  params["pageSize"] = dictionaryParams?.pageSize?.toString();
  params["PageNumber"] = dictionaryParams?.PageNumber?.toString();
  params["PageSize"] = dictionaryParams?.PageSize?.toString();
  if (dictionaryParams?.orderBy) params["orderBy"] = dictionaryParams?.orderBy;
  if (dictionaryParams?.OrderBy) params["OrderBy"] = dictionaryParams?.OrderBy;
  if (dictionaryParams?.searchTerm)
    params["searchTerm"] = dictionaryParams?.searchTerm;
  if (dictionaryParams?.Role) params["Role"] = dictionaryParams?.Role;
  if (dictionaryParams?.SearchTerm)
    params["SearchTerm"] = dictionaryParams?.SearchTerm;
  if (dictionaryParams?.Code) params["Code"] = dictionaryParams?.Code;
  if (dictionaryParams?.category)
    params["category"] = dictionaryParams?.category?.toString();
  if (dictionaryParams?.Category)
    params["Category"] = dictionaryParams?.Category?.toString();
  if (dictionaryParams?.CatId)
    params["CatId"] = dictionaryParams?.CatId?.toString();
  if (dictionaryParams?.GradeID)
    params["GradeID"] = dictionaryParams?.GradeID?.toString();

  if (dictionaryParams?.reportType)
    params["reportType"] = dictionaryParams?.reportType?.toString();

  if (dictionaryParams?.role)
    params["role"] = dictionaryParams?.role?.toString();
  if (dictionaryParams?.animalType)
    params["animalType"] = dictionaryParams?.animalType?.toString();
  if (dictionaryParams?.paymentMethod)
    params["paymentMethod"] = dictionaryParams?.paymentMethod?.toString();
  if (dictionaryParams?.gender)
    params["gender"] = dictionaryParams?.gender?.toString();
  if (dictionaryParams?.healthStatus)
    params["healthStatus"] = dictionaryParams?.healthStatus?.toString();



  if (dictionaryParams?.ParentId)
    params["ParentId"] = dictionaryParams?.ParentId?.toString();
  if (dictionaryParams?.IsActive)
    params["IsActive"] = dictionaryParams?.IsActive?.toString();
  if (typeof dictionaryParams?.IsActive === "boolean") {
    params["IsActive"] = dictionaryParams.IsActive.toString();
  }
  if (dictionaryParams?.GetHistory)
    params["GetHistory"] = dictionaryParams?.GetHistory?.toString();

  if (dictionaryParams?.ExcludeStatus)
    params["ExcludeStatus"] = dictionaryParams?.ExcludeStatus?.toString();

  if (dictionaryParams?.currencyCode)
    params["currencyCode"] = dictionaryParams?.currencyCode?.toString();
  if (dictionaryParams?.IsLinked !== undefined)
    params["IsLinked"] = dictionaryParams?.IsLinked?.toString();
  if (dictionaryParams?.condition)
    params["condition"] = dictionaryParams?.condition?.toString();

  if (dictionaryParams?.fromDate)
    params["fromDate"] = dictionaryParams?.fromDate?.toString();
  if (dictionaryParams?.toDate)
    params["toDate"] = dictionaryParams?.toDate?.toString();
  if (dictionaryParams?.startDate)
    params["startDate"] = dictionaryParams?.startDate?.toString();
  if (dictionaryParams?.endDate)
    params["endDate"] = dictionaryParams?.endDate?.toString();
  if (dictionaryParams?.StoreId)
    params["StoreId"] = dictionaryParams?.StoreId?.toString();
  if (dictionaryParams?.category)
    params["category"] = dictionaryParams?.category?.toString();
  if (dictionaryParams?.Statuses?.toString())
    params["Statuses"] = dictionaryParams?.Statuses?.toString();
  if (dictionaryParams?.Status)
    params["Status"] = dictionaryParams?.Status?.toString();
  if (dictionaryParams?.search)
    params["search"] = dictionaryParams?.search?.toString();
  if (dictionaryParams?.arrayStatus)
    params["arrayStatus"] = dictionaryParams?.arrayStatus;
  if (dictionaryParams?.IsNew)
    params["IsNew"] = dictionaryParams?.IsNew?.toString();

  if (dictionaryParams?.fromCurrency)
    params["fromCurrency"] = dictionaryParams?.fromCurrency?.toString();
  if (dictionaryParams?.toCurrency)
    params["toCurrency"] = dictionaryParams?.toCurrency?.toString();
  if (dictionaryParams?.effectiveDate)
    params["effectiveDate"] = dictionaryParams?.effectiveDate?.toString();

  if (typeof dictionaryParams?.GetHistory === "boolean")
    params["GetHistory"] = dictionaryParams?.GetHistory?.toString();
  return params;
}
