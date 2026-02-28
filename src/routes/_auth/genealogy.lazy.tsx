import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/genealogy')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_auth/genealogy"!</div>
}
