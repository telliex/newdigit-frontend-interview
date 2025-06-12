import { useEffect, useState } from 'react';
import Loading from './loading';

// 假設mockFetch是一個3秒後回傳API結果的function

type MenuItem = {
  id: number;
  name: string;
};

export default function Menu() {
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await mockFetch();
        setMenuList(data);
      } catch (error) {
        console.error('Failed to fetch menu data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="px-4">
      {menuList.map((item) => (
        <ul key={item.id}>
          <li className="list-disc">{item.name}</li>
        </ul>
      ))}
    </div>
  );
}

function mockFetch(): Promise<MenuItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1,
          name: 'steak',
        },
        {
          id: 2,
          name: 'chicken',
        },
      ]);
    }, 3000);
  });
}
