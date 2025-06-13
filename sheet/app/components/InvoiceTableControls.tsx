'use client';

interface InvoiceTableControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCount: number;
  onDeleteSelected: () => void;
  onRefresh: () => void;
  isLoading: boolean;
  searching: boolean;
}

export default function InvoiceTableControls({
  searchQuery,
  onSearchChange,
  selectedCount,
  onDeleteSelected,
  onRefresh,
  isLoading,
  searching,
}: InvoiceTableControlsProps) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-end gap-4">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="Search Invoice"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-[150px] px-4 py-2 border border-gray-300 rounded-[6px]  focus:border-gray-600  text-[rgb(58,63,25)] text-opacity-75"
          />
          {searching && (
            <div className="inline-block animate-spin border-t-transparent rounded-full h-3 w-3 border-2 border-purple-500 -ml-6 absolute top-1/2 -translate-y-1/2"></div>
          )}
        </div>
        <div className="flex gap-3">
          <button
            onClick={onDeleteSelected}
            disabled={selectedCount === 0}
            className="w-[150px] px-10 py-2 shadow-sm shadow-black/40 bg-[rgb(253,85,88)] text-white  rounded-[5px] hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed text-[15px]"
          >
            DELETE
          </button>
          <button
            onClick={onRefresh}
            disabled={isLoading}
            className="w-[150px]  py-2 shadow-sm shadow-black/40 bg-purple-500 text-white rounded-[5px] hover:bg-purple-600 disabled:opacity-50"
          >
            {isLoading ? 'Loading...' : 'REFRESH INVOICE'}
          </button>
        </div>
      </div>
    </div>
  );
}
