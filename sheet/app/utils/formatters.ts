import type { AccountData } from '../api/mock';
import type { FormattedInvoiceData } from '../types/invoice';

// 格式化發票ID (加上#前綴並補零)
export function formatInvoiceId(id: number): string {
  return `#${id.toString().padStart(4, '0')}`;
}

// 格式化日期 (timestamp轉為可讀格式)
export function formatDate(timestamp: number): string {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}

// 格式化金額 (加上$符號和千分位)
export function formatCurrency(amount: number): string {
  return `$${amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}`;
}

// 格式化Balance (正負數顯示)
export function formatBalance(balance: number): string {
  const formatted = formatCurrency(Math.abs(balance));
  return balance < 0 ? `-${formatted}` : formatted;
}

// 將AccountData轉換為格式化的顯示資料
export function formatInvoiceData(data: AccountData): FormattedInvoiceData {
  return {
    ...data,
    formattedId: formatInvoiceId(data.id),
    formattedDate: formatDate(data.issueDate),
    formattedBalance: formatBalance(data.balance),
    formattedTotal: formatCurrency(data.totalBalance),
  };
}

// 批量格式化發票資料
export function formatInvoiceDataList(
  dataList: AccountData[]
): FormattedInvoiceData[] {
  return dataList.map(formatInvoiceData);
}

// 生成頭像顏色 (根據名字生成一致的顏色)
export function generateAvatarColor(name: string): string {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-yellow-500',
    'bg-red-500',
    'bg-gray-500',
  ];

  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }

  return colors[Math.abs(hash) % colors.length];
}

// 生成名字縮寫 (用於頭像顯示)
export function generateInitials(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}
