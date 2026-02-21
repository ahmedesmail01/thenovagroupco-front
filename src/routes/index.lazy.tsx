import { createLazyFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useStore } from "../store/useStore";
import { ContactForm } from "../components/ContactForm";
import api from "../lib/axios";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

interface Post {
  id: number;
  title: string;
}

function Index() {
  const { count, increment, decrement } = useStore();

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await api.get(
        "https://jsonplaceholder.typicode.com/posts?_limit=3",
      );
      return response.data;
    },
  });

  return (
    <div className="p-6 space-y-8">
      <section>
        <h1 className="text-3xl font-bold mb-4">Modern React Stack Demo</h1>
        <p className="text-gray-600">
          This page demonstrates the integration of all requested libraries.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Zustand Global State</h2>
        <div className="flex items-center gap-4">
          <button onClick={decrement} className="px-3 py-1 bg-red-100 rounded">
            -
          </button>
          <span className="text-2xl font-mono">{count}</span>
          <button
            onClick={increment}
            className="px-3 py-1 bg-green-100 rounded"
          >
            +
          </button>
        </div>
        <p className="text-sm text-gray-500">
          (This count persists across page reloads)
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">TanStack Query + Axios</h2>
        {isLoading ? (
          <p>Loading posts...</p>
        ) : error ? (
          <p className="text-red-500">Error loading posts</p>
        ) : (
          <ul className="list-disc pl-5 space-y-2">
            {posts?.map((post) => (
              <li key={post.id}>
                <span className="font-medium">{post.title}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">React Hook Form + Zod</h2>
        <ContactForm />
      </section>
    </div>
  );
}
