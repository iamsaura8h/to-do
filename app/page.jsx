import { PrismaClient } from '@prisma/client';
import addTodo from './actions/addTodo';
import deleteTodo from './actions/deleteTodo';

const prisma = new PrismaClient();

export default async function Home() {
  const todos = await prisma.todo.findMany();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-10">
      <main className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-4xl font-bold text-center text-purple-900 mb-8 animate-fade-in">
          Todo List
        </h1>
        <form action={addTodo} className="mb-8 flex gap-2 animate-fade-in-up">
          <input
            name="title"
            type="text"
            placeholder="Add a new todo"
            className="flex-1 shadow-sm appearance-none border rounded-lg py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 active:scale-95"
          >
            Add Todo
          </button>
        </form>
        <ul className="space-y-3 animate-fade-in-up">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-white px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
            >
              <span className="text-lg text-gray-800">{todo.title}</span>
              <form action={deleteTodo}>
                <input type="hidden" name="id" id={todo.id} value={todo.id} />
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all transform hover:scale-105 active:scale-95"
                >
                  Delete
                </button>
              </form>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}