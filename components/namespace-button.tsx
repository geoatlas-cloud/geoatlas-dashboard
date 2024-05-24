import { Pencil, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
// import { deleteInvoice } from '@/app/lib/actions';

export function CreateNamespace() {
  return (
    <Link
      href="/namespaces/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Namespace</span>{' '}
      <Plus className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
    href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <Pencil className="w-5" />
    </Link>
  );
}

// export function DeleteInvoice({ id }: { id: string }) {
//   const deleteInvoiceWithId = deleteInvoice.bind(null, id);
//   return (
//     <form action={deleteInvoiceWithId}>
//       <button className="rounded-md border p-2 hover:bg-gray-100">
//         <span className="sr-only">Delete</span>
//         <Trash2 className="w-5" />
//       </button>
//     </form>
//   );
// }


export function CreateDatastore() {
  return (
    <Link
      href="/datastores/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Datastore</span>{' '}
      <Plus className="h-5 md:ml-4" />
    </Link>
  );
}