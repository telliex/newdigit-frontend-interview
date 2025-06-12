'use client';

import { useState } from 'react';
import Menu from './components/menu';
import TodoList from './components/todo-list';

type TabType = 'menu' | 'todo';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('menu');

  return (
    <div className="items-center justify-center flex w-screen h-screen text-black ">
      <main className="bg-neutral-100 rounded-md w-64 h-72 p-4">
        <div
          role="tablist"
          className="border-b border-neutral-700 mb-2 flex justify-between gap-4"
        >
          <button
            className={`flex-1 shadow-md my-2 rounded px-4 py-2 transition-colors ${
              activeTab === 'menu'
                ? 'bg-neutral-300 text-black font-bold cursor-default'
                : 'bg-neutral-200 hover:text-blue-500 text-black/50 cursor-pointer text-sm'
            }`}
            onClick={() => setActiveTab('menu')}
            aria-selected={activeTab === 'menu'}
          >
            Menu
          </button>
          <button
            className={`flex-1 shadow-md my-2 rounded px-4 py-2 transition-colors ${
              activeTab === 'todo'
                ? 'bg-neutral-300 text-black font-bold cursor-default'
                : 'bg-neutral-200 hover:text-blue-500 text-black/50 cursor-pointer text-sm'
            }`}
            onClick={() => setActiveTab('todo')}
            aria-selected={activeTab === 'todo'}
          >
            Todo
          </button>
        </div>

        {/* content */}
        <div className="h-full overflow-y-auto">
          {activeTab === 'menu' ? <Menu /> : <TodoList />}
        </div>
      </main>
    </div>
  );
}
