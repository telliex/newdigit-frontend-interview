'use client';

// InvoiceRow 元件：單一發票資料列，負責顯示發票的詳細資訊（如客戶、金額、狀態）與操作按鈕（刪除、檢視）。

import type { AccountData } from '../api/mock';
import {
  formatInvoiceId,
  formatDate,
  formatCurrency,
  formatBalance,
  generateAvatarColor,
  generateInitials,
} from '../utils/formatters';

// InvoiceRow 組件
interface InvoiceRowProps {
  item: AccountData & { isBalanceViewed: boolean };
  isSelected: boolean;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
  onToggleBalance: (id: number) => void;
}

export default function InvoiceRow({
  item,
  isSelected,
  onSelect,
  onDelete,
  onToggleBalance,
}: InvoiceRowProps) {
  const avatarColor = generateAvatarColor(item.name);
  const initials = generateInitials(item.name);

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
          {formatInvoiceId(item.id)}
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
          {formatCurrency(item.totalBalance)}
        </span>
      </td>

      {/* ISSUED DATE */}
      <td className="px-6 py-2 whitespace-nowrap text-center">
        <span className="text-sm text-[rgba(58,53,65,0.68)]">
          {formatDate(item.issueDate)}
        </span>
      </td>

      {/* BALANCE */}
      <td className="px-6 py-2 whitespace-nowrap text-center">
        {!item.isBalanceViewed ? (
          <div
            className={`inline-flex px-2 py-1 text-xs font-light rounded-full  transition-colors ${
              item.hasPaid
                ? 'text-[rgba(86,202,0,1)] bg-[rgb(234,245,234)] '
                : 'bg-[rgba(254,114,114,1)] text-white '
            }`}
          >
            {item.hasPaid ? 'Paid' : 'Unpaid'}
          </div>
        ) : (
          <div className="text-xs text-gray-500 mt-1">
            {formatBalance(item.balance)}
          </div>
        )}
      </td>

      {/* ACTION */}
      <td className="px-6 py-2 whitespace-nowrap text-center text-sm font-medium">
        <div className="flex items-center space-x-8 justify-center">
          <button
            onClick={() => onDelete(item.id)}
            className={` p-1 rounded transition-colors w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-gray-200`}
            title="Delete invoice"
          >
            <div>
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
            </div>
          </button>
          <button
            className={`hover:bg-gray-200 cursor-pointer p-1 rounded transition-colors w-8 h-8 flex items-center justify-center `}
            title="View details"
            onClick={() => onToggleBalance(item.id)}
          >
            <div
              className={` ${
                !item.isBalanceViewed ? 'opacity-50' : 'opacity-100 '
              }`}
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
            </div>
          </button>
        </div>
      </td>
    </tr>
  );
}
