// "use client";
import clsx from "clsx";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { range } from "@/lib/utils";

export default async function Paginator({
  currentPage,
  className,
  limit,
  total,
}: {
  currentPage: number;
  limit: number;
  total: number;
  className?: string;
}) {
  let pageIndexes: number[] = [];

  const totalPageNumber = Math.ceil(total / limit);
  console.log(totalPageNumber);

  if (totalPageNumber < 1) return;

  if (totalPageNumber <= 5) {
    pageIndexes = range(1, totalPageNumber);
  } else if (currentPage <= 3) {
    pageIndexes = range(1, 5);
  } else if (currentPage + 2 <= totalPageNumber) {
    pageIndexes = range(currentPage - 2, currentPage + 2);
  } else {
    pageIndexes = range(totalPageNumber - 4, totalPageNumber);
  }

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={clsx({
              "pointer-events-none cursor-none text-gray-500":
                currentPage - 1 < 1,
            })}
            href={`.?page=${currentPage - 1}`}
          />
        </PaginationItem>

        {pageIndexes[0] > 1 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {pageIndexes.map((i) => (
          <PaginationItem key={i}>
            <PaginationLink isActive={currentPage === i} href={`.?page=${i}`}>
              {i}
            </PaginationLink>
          </PaginationItem>
        ))}
        {pageIndexes[pageIndexes.length - 1] < totalPageNumber && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext
            className={clsx({
              "pointer-events-none cursor-none text-gray-500":
                currentPage >= totalPageNumber,
            })}
            href={`.?page=${currentPage + 1}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
