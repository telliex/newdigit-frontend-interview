'use client';

// InvoiceTable 元件：發票管理主表格，整合發票資料的顯示、搜尋、分頁、刪除、狀態切換等功能。
// 此元件負責所有發票相關的狀態管理、資料流與 UI 組合。

import { useState, useEffect, useCallback, useRef } from 'react';
import { mockFetch, type AccountData } from '../api/mock';
import type {
  SelectionState,
  PaginationState,
  LoadingState,
} from '../types/invoice';
import InvoiceRow from './InvoiceRow';
import InvoiceTableControls from './InvoiceTableControls';
import PaginationControls from './PaginationControls';
import ConfirmDialog from './ConfirmDialog';

export default function InvoiceTable() {
  // 主要資料狀態
  const [invoiceData, setInvoiceData] = useState<
    (AccountData & { isBalanceViewed: boolean })[]
  >([]);

  // 選取狀態管理
  const [selection, setSelection] = useState<SelectionState>({
    selectedIds: new Set(),
    isAllSelected: false,
  });

  // 分頁狀態管理
  const [pagination, setPagination] = useState<PaginationState>({
    currentPage: 1,
    pageSize: 10,
    totalItems: 0,
  });

  // 載入狀態管理
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: false,
    error: null,
  });

  // 確認對話框狀態管理
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {},
  });
  // 是否為第一次載入
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  // 搜尋 input loading 狀態
  const [searching, setSearching] = useState(false);
  // 原始資料狀態
  const [oriData, setOriData] = useState<
    (AccountData & { isBalanceViewed: boolean })[]
  >([]);
  // 新增 searchInput 狀態
  const [searchInput, setSearchInput] = useState('');
  // 搜尋結果狀態
  const [filteredData, setFilteredData] = useState<
    (AccountData & { isBalanceViewed: boolean })[]
  >([]);
  // debounce 搜尋 timer
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // 計算分頁相關數據
  const currentPageData = filteredData;
  const totalPages = Math.ceil(pagination.totalItems / pagination.pageSize);
  const hasNextPage = pagination.currentPage < totalPages;
  const hasPrevPage = pagination.currentPage > 1;

  // 獲取發票資料
  const fetchInvoiceData = useCallback(async () => {
    setLoading({ isLoading: true, error: null });

    try {
      const response = await mockFetch({
        page: pagination.currentPage,
        pageSize: pagination.pageSize,
      });
      const newData = response.data.map((item) => {
        return {
          ...item,
          isBalanceViewed: false,
        };
      });
      setInvoiceData(newData);
      setOriData(newData);
      // 從 API 回傳的資料中獲取總筆數
      setPagination((prev) => ({ ...prev, totalItems: response.totalItems }));
    } catch (error) {
      setLoading({
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch data',
      });
    } finally {
      setLoading((prev) => ({ ...prev, isLoading: false }));
    }
  }, [pagination.currentPage, pagination.pageSize]);

  // 初始載入資料
  useEffect(() => {
    fetchInvoiceData();
    setIsFirstLoad(false);
  }, [fetchInvoiceData]);

  // 當 invoiceData 變動時，預設顯示全部
  useEffect(() => {
    setFilteredData(invoiceData);
  }, [invoiceData]);

  // 處理個別項目選取
  const handleItemSelect = (id: number) => {
    setSelection((prev) => {
      const newSelectedIds = new Set(prev.selectedIds);

      if (newSelectedIds.has(id)) {
        newSelectedIds.delete(id);
      } else {
        newSelectedIds.add(id);
      }

      // 檢查當前頁面的所有項目是否都被選取
      const currentPageIds = currentPageData.map((item) => item.id);
      const isAllSelected =
        currentPageIds.length > 0 &&
        currentPageIds.every((pageId) => newSelectedIds.has(pageId));

      return {
        selectedIds: newSelectedIds,
        isAllSelected,
      };
    });
  };

  // 處理全選
  const handleSelectAll = () => {
    setSelection((prev) => {
      if (prev.isAllSelected) {
        return {
          selectedIds: new Set(),
          isAllSelected: false,
        };
      } else {
        const currentPageIds = new Set(currentPageData.map((item) => item.id));
        return {
          selectedIds: currentPageIds,
          isAllSelected: true,
        };
      }
    });
  };

  // 處理刪除選取的項目
  const handleDeleteSelected = () => {
    if (selection.selectedIds.size === 0) return;

    const selectedCount = selection.selectedIds.size;
    setConfirmDialog({
      isOpen: true,
      title: 'Confirm Delete',
      message: `Are you sure you want to delete ${selectedCount} selected invoices? This action cannot be undone.`,
      onConfirm: () => {
        const newData = filteredData.filter(
          (item) => !selection.selectedIds.has(item.id)
        );
        setInvoiceData(newData);

        const newOriData = oriData.filter(
          (item) => !selection.selectedIds.has(item.id)
        );
        setOriData(newOriData);

        setSelection({ selectedIds: new Set(), isAllSelected: false });
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  // 處理單項刪除
  const handleDeleteItem = (id: number) => {
    const item = invoiceData.find((item) => item.id === id);
    const invoiceId = item ? `#${String(item.id).padStart(5, '0')}` : `#${id}`;

    setConfirmDialog({
      isOpen: true,
      title: 'Confirm Delete',
      message: `Are you sure you want to delete invoice ${invoiceId}? This action cannot be undone.`,
      onConfirm: () => {
        const newData = filteredData.filter((item) => item.id !== id);
        setInvoiceData(newData);
        const newOriData = oriData.filter((item) => item.id !== id);
        setOriData(newOriData);

        setSelection((prev) => ({
          selectedIds: new Set(
            [...prev.selectedIds].filter((selectedId) => selectedId !== id)
          ),
          isAllSelected: false,
        }));
        setConfirmDialog((prev) => ({ ...prev, isOpen: false }));
      },
    });
  };

  // 處理 Balance 狀態切換
  const handleToggleBalance = (id: number) => {
    const newData = filteredData.map((item) =>
      item.id === id
        ? { ...item, isBalanceViewed: !item.isBalanceViewed }
        : item
    );
    setInvoiceData(newData);
  };

  // debounce 搜尋
  useEffect(() => {
    if (isFirstLoad) return;
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    setSearching(true);

    debounceTimer.current = setTimeout(() => {
      handleSearch(searchInput);
      setSearching(false);
    }, 1000);
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [searchInput]);

  // 處理搜尋
  // 搜尋條件：id、name、mail、hasPaid
  const handleSearch = (query: string) => {
    const searchQuery = query.trim();
    const filteredData =
      searchQuery === ''
        ? oriData
        : invoiceData.filter(
            (item) =>
              item.id.toString().includes(searchQuery.toLowerCase()) ||
              item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.mail.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (item.hasPaid ? 'Paid' : 'Unpaid').includes(searchQuery)
          );

    setFilteredData(filteredData);
    setSelection({ selectedIds: new Set(), isAllSelected: false });
  };

  // 處理重新整理
  const handleRefresh = () => {
    fetchInvoiceData();
    setSelection({ selectedIds: new Set(), isAllSelected: false });
  };

  // 處理分頁變更
  const handlePageChange = (newPage: number) => {
    if (newPage < 1) return;
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
    setSelection({ selectedIds: new Set(), isAllSelected: false });
  };

  return (
    <div className="bg-white rounded-[6px] shadow-sm ">
      {/* 頂部控制列 */}
      <InvoiceTableControls
        searchQuery={searchInput}
        onSearchChange={setSearchInput}
        selectedCount={selection.selectedIds.size}
        onDeleteSelected={handleDeleteSelected}
        onRefresh={handleRefresh}
        isLoading={loading.isLoading}
        searching={searching}
      />

      {/* 錯誤狀態 */}
      {loading.error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
          Error: {loading.error}
        </div>
      )}

      {/* 載入狀態 */}
      {loading.isLoading && (
        <div className="p-8 text-center">
          <div className="inline-block animate-spin border-t-transparent rounded-full h-8 w-8 border-4 border-purple-500"></div>
          <p className="mt-2 text-gray-600">Loading invoices...</p>
        </div>
      )}

      {/* 表格內容 */}
      {!loading.isLoading && !loading.error && (
        <>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="w-12 px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selection.isAllSelected}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      disabled={currentPageData.length === 0}
                    />
                  </th>
                  <th className="px-6 py-4 relative text-center text-xs text-[rgba(58,53,65,0.87)]   uppercase tracking-wider font-semibold [&::before]:content-[''] [&::before]:inline-block [&::before]:absolute [&::before]:w-[2px] [&::before]:h-[14px] [&::before]:bg-[rgba(58,53,65,0.12)] [&::before]:right-0">
                    ID
                  </th>
                  <th className="px-6 py-4 relative text-center text-xs text-[rgba(58,53,65,0.87)]   uppercase tracking-wider font-semibold [&::before]:content-[''] [&::before]:inline-block [&::before]:absolute [&::before]:w-[2px] [&::before]:h-[14px] [&::before]:bg-[rgba(58,53,65,0.12)] [&::before]:right-0">
                    CLIENT
                  </th>
                  <th className="px-6 py-4 relative text-center text-xs text-[rgba(58,53,65,0.87)]   uppercase tracking-wider font-semibold [&::before]:content-[''] [&::before]:inline-block [&::before]:absolute [&::before]:w-[2px] [&::before]:h-[14px] [&::before]:bg-[rgba(58,53,65,0.12)] [&::before]:right-0">
                    TOTAL
                  </th>
                  <th className="px-6 py-4 relative text-center text-xs text-[rgba(58,53,65,0.87)]   uppercase tracking-wider font-semibold [&::before]:content-[''] [&::before]:inline-block [&::before]:absolute [&::before]:w-[2px] [&::before]:h-[14px] [&::before]:bg-[rgba(58,53,65,0.12)] [&::before]:right-0">
                    ISSUED DATE
                  </th>
                  <th className="px-6 py-4 relative text-center text-xs text-[rgba(58,53,65,0.87)]   uppercase tracking-wider font-semibold [&::before]:content-[''] [&::before]:inline-block [&::before]:absolute [&::before]:w-[2px] [&::before]:h-[14px] [&::before]:bg-[rgba(58,53,65,0.12)] [&::before]:right-0">
                    BALANCE
                  </th>
                  <th className="px-6 py-4 relative text-center text-xs text-[rgba(58,53,65,0.87)]   uppercase tracking-wider font-semibold">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentPageData.length > 0 ? (
                  currentPageData.map((item) => (
                    <InvoiceRow
                      key={item.id}
                      item={item}
                      isSelected={selection.selectedIds.has(item.id)}
                      onSelect={handleItemSelect}
                      onDelete={handleDeleteItem}
                      onToggleBalance={handleToggleBalance}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <svg
                          className="w-12 h-12 mx-auto mb-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        <p className="text-lg font-medium">No invoices found</p>
                        <p className="text-sm">
                          Try adjusting your search criteria
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* 分頁控制器 */}
          <PaginationControls
            currentPage={pagination.currentPage}
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {/* 確認刪除對話框 */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        title={confirmDialog.title}
        message={confirmDialog.message}
        onConfirm={confirmDialog.onConfirm}
        onCancel={() =>
          setConfirmDialog((prev) => ({ ...prev, isOpen: false }))
        }
      />
    </div>
  );
}
