export interface QueryParamsType {
  [x: string]: any;
  CatId?: number | null;
  role?: string;
  category?: number | null;
  Category?:string;
  orderBy?: string;
  OrderBy?: string;
  searchTerm?: string;
  SearchTerm?: string;
  pageNumber?: number;
  PageNumber?: number;
  reportType?: string;
  IsLinked?: boolean;
  IsUrgent?: boolean;
  pageSize?: number;
  PageSize?: number;
  DepartmentID?: number;
  IsActive?: string | boolean;
  StoreId?: string | number;
  currencyCode?: string;
  ExcludeStatus?: boolean;
  condition?: string | number; 
  startDate?: string;
  endDate?: string;
  fromDate?: string;
  toDate?: string;
  ParentId?: string;
  Role?: string;
  Code?: string;
  search?: string;
  GradeID?: number;
vehicleType?: number;
  Status?: string | number;
  arrayStatus?: Number[];
  Statuses?: number[] | string[];
  GetHistory?: boolean;
  fromCurrency?: string;
  toCurrency?: string;
  effectiveDate?: string;
  IsNew?: boolean;
}
export interface approverUpdateSteps {
  entityId: number | string;
  ApprovalSteps: {
    approverId: string;
    approverLevel: number;
    requestDate?: string;
    approverNote: string;
    approvalState: number;
    approvalDate: string;
  }[];
}

export interface currencyType {
  cc?: "string";
  symbol?: "string";
  name?: "string";
}
export interface SettingsDTO {
  googleMapsApiKey: string
  locationIqApiKey: string
  activeMapProvider: number 
}
export type BulkUploadEntry = {
  id: number
  createdOn?: string
  userName?: string
  page?: string
  successCount?: number
  failedCount?: number
  totalCount?: number
}