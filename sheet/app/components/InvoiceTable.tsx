'use client';

import { useState, useCallback } from 'react';
import { type AccountData } from '../api/mock';
import type {
  SelectionState,
  PaginationState,
  SearchState,
  LoadingState,
} from '../types/invoice';

// InvoiceRow 組件
interface InvoiceRowProps {
  item: AccountData;
  isSelected: boolean;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleBalance: (id: number) => void;
}

function InvoiceRow({
  item,
  isSelected,
  onSelect,
  onDelete,
  onToggleBalance,
}: InvoiceRowProps) {
  const avatarColor = item.name;
  const initials = item.name;

  return (
    <tr className={`hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}>
      {/* 選取 Checkbox */}
      <td className="px-6 py-2 align-middle">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(item.id)}
          className="w-4 h-4 mt-2 text-blue-600 border-[rgba(58,53,65,0.68)] border-6 rounded focus:ring-blue-500"
        />
      </td>

      {/* ID */}
      <td className="px-6 py-2 whitespace-nowrap">
        <span className="text-sm font-medium text-[rgba(145,85,253,1)]">
          {item.id}
        </span>
      </td>

      {/* CLIENT */}
      <td className="px-6 py-2 whitespace-nowrap ">
        <div className="flex items-center justify-left">
          <div
            className={`w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center text-white text-sm font-medium mr-3`}
          >
            {initials}
          </div>
          <div className="text-left">
            <div className="text-sm font-medium text-[rgba(58,53,65,0.87)]">
              {item.name}
            </div>
            <div className="text-sm text-[rgba(58,53,65,0.68)]">
              {item.mail}
            </div>
          </div>
        </div>
      </td>

      {/* TOTAL */}
      <td className="px-6 py-2 whitespace-nowrap text-center">
        <span className="text-sm text-[rgba(58,53,65,0.68)]">
          {item.totalBalance}
        </span>
      </td>

      {/* ISSUED DATE */}
      <td className="px-6 py-2 whitespace-nowrap text-center">
        <span className="text-sm text-[rgba(58,53,65,0.68)]">
          {item.issueDate}
        </span>
      </td>

      {/* BALANCE */}
      <td className="px-6 py-2 whitespace-nowrap text-center">
        <button
          onClick={() => onToggleBalance(item.id)}
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full cursor-pointer transition-colors ${
            item.hasPaid
              ? 'text-[rgba(86,202,0,1)] bg-[rgb(234,245,234)] hover:bg-green-200'
              : 'bg-[rgba(254,114,114,1)] text-white hover:bg-red-200'
          }`}
        >
          {item.hasPaid ? 'Paid' : 'Unpaid'}
        </button>
        {/* <div className="text-xs text-gray-500 mt-1">
          {formatBalance(item.balance)}
        </div> */}
      </td>

      {/* ACTION */}
      <td className="px-6 py-2 whitespace-nowrap text-center text-sm font-medium">
        <div className="flex items-center space-x-8 justify-center">
          <button
            onClick={() => onDelete(item.id)}
            className="hover:bg-gray-200 p-1 rounded transition-colors w-8 h-8 flex items-center justify-center"
            title="Delete invoice"
          >
            <svg
              width="14"
              height="18"
              viewBox="0 0 14 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 16C1 17.1 1.9 18 3 18H11C12.1 18 13 17.1 13 16V4H1V16ZM3 6H11V16H3V6ZM10.5 1L9.5 0H4.5L3.5 1H0V3H14V1H10.5Z"
                fill="#3A3541"
                fillOpacity="0.54"
              />
            </svg>
          </button>
          <button
            className="hover:bg-gray-200 p-1 rounded transition-colors w-8 h-8 flex items-center justify-center"
            title="View details"
          >
            <svg
              width="22"
              height="15"
              viewBox="0 0 22 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 2C14.79 2 18.17 4.13 19.82 7.5C18.17 10.87 14.79 13 11 13C7.21 13 3.83 10.87 2.18 7.5C3.83 4.13 7.21 2 11 2ZM11 0C6 0 1.73 3.11 0 7.5C1.73 11.89 6 15 11 15C16 15 20.27 11.89 22 7.5C20.27 3.11 16 0 11 0ZM11 5C12.38 5 13.5 6.12 13.5 7.5C13.5 8.88 12.38 10 11 10C9.62 10 8.5 8.88 8.5 7.5C8.5 6.12 9.62 5 11 5ZM11 3C8.52 3 6.5 5.02 6.5 7.5C6.5 9.98 8.52 12 11 12C13.48 12 15.5 9.98 15.5 7.5C15.5 5.02 13.48 3 11 3Z"
                fill="#3A3541"
                fillOpacity="0.54"
              />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}

export default function InvoiceTable() {
  // 主要資料狀態
  const [invoiceData, setInvoiceData] = useState<AccountData[]>([
    {
      id: 1,
      name: 'Alice Chen',
      mail: 'alice.chen@example.com',
      totalBalance: 10230.75,
      issueDate: 1714003200000, // 2024-04-25
      balance: 230.75,
      hasPaid: false,
    },
    {
      id: 2,
      name: 'Brian Lee',
      mail: 'brian.lee@example.com',
      totalBalance: 15480.0,
      issueDate: 1711411200000, // 2024-03-26
      balance: 480.0,
      hasPaid: true,
    },
    {
      id: 3,
      name: 'Cathy Wu',
      mail: 'cathy.wu@example.com',
      totalBalance: 9200.5,
      issueDate: 1706745600000, // 2024-02-01
      balance: 1200.5,
      hasPaid: true,
    },
    {
      id: 4,
      name: 'David Ho',
      mail: 'david.ho@example.com',
      totalBalance: 18900.0,
      issueDate: 1704067200000, // 2024-01-01
      balance: 1900.0,
      hasPaid: true,
    },
    {
      id: 5,
      name: 'Eva Lin',
      mail: 'eva.lin@example.com',
      totalBalance: 6600.35,
      issueDate: 1716768000000, // 2024-05-27
      balance: 600.35,
      hasPaid: false,
    },
    {
      id: 6,
      name: 'Frank Tsai',
      mail: 'frank.tsai@example.com',
      totalBalance: 13200.0,
      issueDate: 1710374400000, // 2024-03-14
      balance: 200.0,
      hasPaid: false,
    },
    {
      id: 7,
      name: 'Grace Hsu',
      mail: 'grace.hsu@example.com',
      totalBalance: 8750.75,
      issueDate: 1698796800000, // 2023-11-01
      balance: 750.75,
      hasPaid: true,
    },
    {
      id: 8,
      name: 'Henry Yang',
      mail: 'henry.yang@example.com',
      totalBalance: 10050.0,
      issueDate: 1709251200000, // 2024-02-29
      balance: 50.0,
      hasPaid: true,
    },
    {
      id: 9,
      name: 'Ivy Chang',
      mail: 'ivy.chang@example.com',
      totalBalance: 14560.6,
      issueDate: 1701388800000, // 2023-12-01
      balance: 1560.6,
      hasPaid: false,
    },
    {
      id: 10,
      name: 'Jack Wang',
      mail: 'jack.wang@example.com',
      totalBalance: 3900.2,
      issueDate: 1719878400000, // 2024-08-02
      balance: 900.2,
      hasPaid: false,
    },
    {
      id: 11,
      name: 'Karen Liu',
      mail: 'karen.liu@example.com',
      totalBalance: 12700.0,
      issueDate: 1712294400000, // 2024-04-05
      balance: 700.0,
      hasPaid: false,
    },
    {
      id: 12,
      name: 'Leo Chou',
      mail: 'leo.chou@example.com',
      totalBalance: 7600.9,
      issueDate: 1722470400000, // 2024-08-31
      balance: 600.9,
      hasPaid: false,
    },
    {
      id: 13,
      name: 'Mia Kuo',
      mail: 'mia.kuo@example.com',
      totalBalance: 11110.11,
      issueDate: 1720915200000, // 2024-08-13
      balance: 110.11,
      hasPaid: true,
    },
  ]);

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

  // 搜尋狀態管理
  const [search, setSearch] = useState<SearchState>({
    query: '',
    filteredData: [],
  });

  // 載入狀態管理
  const [loading, setLoading] = useState<LoadingState>({
    isLoading: false,
    error: null,
  });

  // 獲取發票資料
  const fetchInvoiceData = useCallback(async () => {}, [
    pagination.currentPage,
    pagination.pageSize,
  ]);

  // 處理個別項目選取
  const handleItemSelect = (id: number) => {};

  // 處理全選
  const handleSelectAll = () => {};

  // 處理刪除選取的項目
  const handleDeleteSelected = () => {};

  // 處理單項刪除
  const handleDeleteItem = (id: number) => {};

  // 處理Balance狀態切換
  const handleToggleBalance = (id: number) => {};

  // 處理搜尋
  const handleSearch = (query: string) => {};

  // 處理重新整理
  const handleRefresh = () => {};

  // 處理分頁變更
  const handlePageChange = (newPage: number) => {};

  // 計算分頁相關數據
  const currentPageData = search.filteredData;

  const totalPages = 1;
  const hasNextPage = pagination.currentPage < totalPages;
  const hasPrevPage = pagination.currentPage > 1;

  return (
    <div className="bg-white rounded-[6px] shadow-sm ">
      {/* 頂部控制列 */}
      <div className="p-6">
        <div className="flex items-center justify-end gap-4">
          <div className=" max-w-md">
            <input
              type="text"
              placeholder="Search Invoice"
              value={search.query}
              onChange={(e) => handleSearch(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-[6px]  focus:border-gray-600  text-[rgb(58,63,25)] text-opacity-75"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDeleteSelected}
              disabled={selection.selectedIds.size === 0}
              className="px-10 py-2 shadow-sm shadow-black/40 bg-[rgb(253,85,88)] text-white  rounded-[5px] hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-[15px]"
            >
              DELETE
            </button>
            <button
              onClick={handleRefresh}
              disabled={loading.isLoading}
              className="px-4 py-2 shadow-sm shadow-black/40 bg-purple-500 text-white rounded-[5px] hover:bg-purple-600 disabled:opacity-50"
            >
              {loading.isLoading ? 'Loading...' : 'REFRESH INVOICE'}
            </button>
          </div>
        </div>
      </div>

      {/* 錯誤狀態 */}
      {loading.error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
          Error: {loading.error}
        </div>
      )}

      {/* 載入狀態 */}
      {loading.isLoading && (
        <div className="p-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
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
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-700">
                {/* Showing {currentPageData.length} of {search.filteredData.length}{' '}
                results
                {totalPages > 1 && (
                  <span className="ml-2">
                    (Page {pagination.currentPage} of {totalPages})
                  </span>
                )} */}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!hasPrevPage}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <span className="text-sm text-gray-700">
                  Page {pagination.currentPage}
                </span>
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!hasNextPage}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
