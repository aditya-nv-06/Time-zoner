import { useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import useUserStore from '../zustand/userstate';
import useDashboardStore from '../zustand/dashboard';

function Dashboard() {
  const user = useUserStore((state) => state.user);
  const { data, loading, fetchTodoData, fetchNoteData } = useDashboardStore();
  const chartData = [
    { name: 'Todos', count: data?.totalTodos ?? 0 },
    { name: 'Notes', count: data?.totalNotes ?? 0 }
  ];

  useEffect(() => {
    if (user && user.id) {
      fetchTodoData(user.id);
      fetchNoteData(user.id);
    }
  }, [fetchTodoData, fetchNoteData]);

  return (
    <div className="bg-gradient-to-br from-gray-100 to-blue-100 px-5  rounded-2xl shadow-lg max-w-5xl mx-auto">
      <header className="mb-10 flex flex-col items-center">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-2">Dashboard</h1>
        <p className="text-xl text-gray-700">Welcome back! Here's what's happening today</p>
      </header>

      {loading && <p className="text-center text-blue-600 font-semibold mb-4">Loading data...</p>}
      

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
          <span className="text-4xl font-bold text-blue-600">{data?.totalTodos ?? 0}</span>
          <span className="text-gray-500 mt-2">Todos</span>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
          <span className="text-4xl font-bold text-green-600">{data?.totalNotes ?? 0}</span>
          <span className="text-gray-500 mt-2">Notes</span>
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-lg p-8">
        <div className="max-w-4xl mx-auto">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;

