import type { AccountData } from '../api/mock';

// 狀態管理相關型別定義
export interface SelectionState {
  selectedIds: Set<number>;
  isAllSelected: boolean;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

export interface SearchState {
  query: string;
  filteredData: (AccountData & { viewBalance: boolean })[];
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// UI 狀態相關型別
export interface TableProps {
  data: AccountData[];
  selection: SelectionState;
  loading: LoadingState;
  onItemSelect: (id: number) => void;
  onSelectAll: () => void;
  onDeleteItem: (id: number) => void;
  onToggleBalance: (id: number) => void;
}

export interface InvoiceItemProps {
  item: AccountData;
  isSelected: boolean;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleBalance: (id: number) => void;
}

// 格式化相關的輔助型別
export interface FormattedInvoiceData extends AccountData {
  formattedId: string;
  formattedDate: string;
  formattedBalance: string;
  formattedTotal: string;
}
