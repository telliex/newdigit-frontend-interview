'use client';

import { useState } from 'react';

type TodoItem = {
  id: number;
  name: string;
  isCompleted: boolean;
};

type ButtonProps = {
  id: number;
  name: string;
  isCompleted: boolean;
  onClick: () => void;
};

const initialTodos: TodoItem[] = [
  {
    id: 1,
    name: 'Buy milk',
    isCompleted: false,
  },
  {
    id: 2,
    name: 'Visit doctor',
    isCompleted: false,
  },
  {
    id: 3,
    name: 'Go jogging',
    isCompleted: false,
  },
];

export default function TodoList() {
  const [list, setList] = useState<TodoItem[]>(initialTodos);

  function handleClick(id: number) {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  }

  return (
    <>
      {list.map((item) => (
        <Button
          key={item.id}
          id={item.id}
          name={item.name}
          isCompleted={item.isCompleted}
          onClick={() => handleClick(item.id)}
        />
      ))}
    </>
  );
}

function Button({ id, name, isCompleted, onClick }: ButtonProps) {
  return (
    <button
      key={id}
      className="flex gap-2 mb-1 p-1 hover:bg-gray-100 rounded transition-colors"
      onClick={onClick}
    >
      {isCompleted ? <p>✅</p> : <p>❌</p>}
      <p
        className={
          isCompleted ? 'line-through text-gray-500' : 'hover:text-blue-500'
        }
      >
        {name}
      </p>
    </button>
  );
}
