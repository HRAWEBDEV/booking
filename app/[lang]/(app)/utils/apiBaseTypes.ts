type Pagination = {
 limit: number;
 offset: number;
};
type PagedData<T> = {
 rows: T[];
 rowsCount: number;
} & Pagination;

type Combo = {
 key: string;
 value: string;
};

type ErrorInfo = {
 errorInfo: {
  code: number | null;
  description: string;
 };
};

export type { PagedData, Pagination, Combo, ErrorInfo };
