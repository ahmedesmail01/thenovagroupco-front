import { createLazyFileRoute } from "@tanstack/react-router";
// import { useQuery } from "@tanstack/react-query";
// import { useStore } from "../store/useStore";
// import { ContactForm } from "../components/ContactForm";
// import api from "../lib/axios";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  //   const {
  //     data: posts,
  //     isLoading,
  //     error,
  //   } = useQuery<Post[]>({
  //     queryKey: ["posts"],
  //     queryFn: async () => {
  //       const response = await api.get(
  //         "https://jsonplaceholder.typicode.com/posts?_limit=3",
  //       );
  //       return response.data;
  //     },
  //   });

  return (
    <>
      <p className="bg-primary p-4 m-10 border-2 hover:bg-mint-500 hover:text-white">
        {" "}
        Hello nova group
      </p>
    </>
  );
}
