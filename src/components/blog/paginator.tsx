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

// TODO: Allow dynamic amounts of pages allowed. Right now it's hard coded to 5
export default async function Paginator({
  paginationUrlPrefix,
  currentPage,
  className,
  limit,
  total,
}: {
  paginationUrlPrefix: string;
  currentPage: number;
  limit: number;
  total: number;
  className?: string;
}) {
  if (total < 1) return; // no Div/0 errors please
  let pageIndexes: number[] = [];
  const totalPageNumber = Math.ceil(total / limit);

  // Handling the page numbers displayed
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
            <PaginationEllipsis
              pageCount={totalPageNumber}
              formSubmitUrl={paginationUrlPrefix}
            />
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
            <PaginationEllipsis
              pageCount={totalPageNumber}
              formSubmitUrl={paginationUrlPrefix}
            />
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
