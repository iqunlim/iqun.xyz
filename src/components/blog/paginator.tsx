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

export default function Paginator({
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
  const totalPages = Array.from(
    { length: Math.ceil(total / limit) },
    (_, i) => i,
  );

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
        {totalPages.map((i) => (
          <PaginationItem key={i}>
            <PaginationLink
              isActive={currentPage === i + 1}
              href={`.?page=${i + 1}`}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={`.?page=${currentPage + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
