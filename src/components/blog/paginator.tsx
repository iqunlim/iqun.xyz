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
import Link from "next/link";

export default async function Paginator({
  paginationUrlPrefix,
  currentPage,
  className,
  limit,
  tabsCount,
  total,
}: {
  paginationUrlPrefix: string;
  currentPage: number;
  limit: number;
  total: number;
  tabsCount: number;
  className?: string;
}) {
  if (total < 1) throw new Error("Total cannot be less than 1");
  if (limit < 1) throw new Error("Limit cannot be less than 1");
  if (tabsCount < 1) throw new Error("tabsCount cannot be less than 1");
  // I'm not sure how to make this less spaghetti right now. It's quite late.
  const [pageIndexes, totalPageNumber] = getPageNumbers(
    currentPage,
    total,
    limit,
    tabsCount,
  );
  if (currentPage > totalPageNumber)
    // If somebody wandered out...
    // TODO: change to actual 404 page when made
    return (
      //<NotFoundPage />
      <div>
        <h1>You are out of bounds my friend!</h1>
        <Link
          href="/"
          className="text-purple-500 underline hover:text-purple-300"
        >
          Return
        </Link>
      </div>
    );

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            className="hover:bg-accent align-center flex w-fit justify-center border-none px-2"
            isActive={currentPage === 1}
            href={`${paginationUrlPrefix}1`}
          >
            First
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            className={clsx({
              "pointer-events-none cursor-none text-gray-500":
                currentPage - 1 < 1,
            })}
            href={`${paginationUrlPrefix}${currentPage - 1}`}
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
            href={`${paginationUrlPrefix}${currentPage + 1}`}
          />
        </PaginationItem>

        <PaginationItem>
          <PaginationLink
            className="hover:bg-accent align-center flex w-fit justify-center border-none px-2"
            isActive={currentPage === totalPageNumber}
            href={`${paginationUrlPrefix}${totalPageNumber}`}
          >
            Last
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

function getPageNumbers(
  currentPage: number,
  total: number,
  limit: number,
  tabsCount: number,
): [number[], number] {
  const totalPageNumber = Math.ceil(total / limit);
  const half = Math.floor(tabsCount / 2);
  let pageIndexes: number[] = [];
  // Split the number in half, if its even the lower number will be the first half
  const [bottom, top] = tabsCount % 2 === 0 ? [half - 1, half] : [half, half];
  // If currentpage - the bottom of the range is less than 1, then were at a page
  // before needing to bump the range
  if (currentPage - bottom < 1) {
    // the ternary also covers if the total page number is less than our max tabsCount
    pageIndexes = range(
      1,
      totalPageNumber < tabsCount ? totalPageNumber : tabsCount,
    );
    // If we've exceeded the final page, we set it to the top bound
  } else if (currentPage + top > totalPageNumber) {
    // Making sure that the case of totalPageNumber < tabsCount
    const bottomEnd = totalPageNumber - tabsCount + 1;
    pageIndexes = range(bottomEnd >= 1 ? bottomEnd : 1, totalPageNumber);
  } else {
    // Else we're in the middle, and we should extrapolate it via the halves
    pageIndexes = range(currentPage - bottom, currentPage + top);
  }
  return [pageIndexes, totalPageNumber];
}
