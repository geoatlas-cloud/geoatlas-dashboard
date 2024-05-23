'use client';

import clsx from 'clsx';
import { generatePagination } from '@/lib/utils';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function DynamicPagination({ totalPages }: { totalPages: number }) {
  // NOTE: comment in this code when you get to this point in the course

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const allPages = generatePagination(currentPage, totalPages);

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  {/* NOTE: comment in this code when you get to this point in the course */ }
  return (
    <Pagination className='mb-4'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(currentPage - 1)}
            className={clsx({
              'pointer-events-none text-gray-300': currentPage <= 1,
              'hover:bg-gray-100': currentPage > 1
            })}
          />
        </PaginationItem>
        {allPages.map(page => {
          return (
            <PaginationItem key={page}>
              <PaginationLink
                key={page}
                href={createPageURL(page)}
                isActive={currentPage === page}
              >{page}</PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            href={createPageURL(currentPage + 1)}
            className={clsx({
              'pointer-events-none text-gray-300': currentPage >= totalPages,
              'hover:bg-gray-100': currentPage < totalPages
            })}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
