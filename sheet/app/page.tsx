import InvoiceTable from './components/InvoiceTable';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto flex justify-end">
          <div className="relative">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 ">
              <Image
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="User Avatar"
                className="w-full h-full object-cover"
                width={256}
                height={256}
              />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6">
        <div className="max-w-7xl mx-auto">
          <InvoiceTable />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-base text-[rgba(58,53,65,0.68)]">
            © 2022, Made by{' '}
            <a href="#" className="text-[rgba(145,85,253,1)] font-medium">
              ABC
            </a>
          </div>
          <div className="flex items-center space-x-6 text-base">
            <a
              href="#"
              className="text-[rgba(145,85,253,1)] hover:text-purple-700 transition-colors"
            >
              License
            </a>
            <a
              href="#"
              className="text-[rgba(145,85,253,1)] hover:text-purple-700 transition-colors"
            >
              More Themes
            </a>
            <a
              href="#"
              className="text-[rgba(145,85,253,1)] hover:text-purple-700 transition-colors"
            >
              Documentation
            </a>
            <a
              href="#"
              className="text-[rgba(145,85,253,1)] hover:text-purple-700 transition-colors"
            >
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
