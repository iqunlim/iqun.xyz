"use client";
import * as React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./form";
import { Input } from "./input";
import { useRouter } from "next/navigation";
import { PopoverClose } from "@radix-ui/react-popover";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex flex-row items-center gap-1", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<React.ComponentProps<typeof Button>, "size"> &
  React.ComponentProps<typeof Link>;

function PaginationLink({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) {
  return (
    <Link
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={cn(
        buttonVariants({
          variant: isActive ? "outline" : "ghost",
          size,
        }),
        className,
      )}
      {...props}
    />
  );
}

function PaginationPrevious({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className="hidden sm:block">Previous</span>
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={cn("gap-1 px-2.5 sm:pr-2.5", className)}
      {...props}
    >
      <span className="hidden sm:block">Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  );
}

function PaginationEllipsis({
  className,
  pageCount,
  ...props
}: React.ComponentProps<"span"> & { pageCount: number }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const PageVerifier = z.object({
    page: z.coerce
      .number()
      .min(1)
      .max(
        pageCount,
        `Must be Less than or equal to total pages (${pageCount}) `,
      ),
  });

  const form = useForm<z.infer<typeof PageVerifier>>({
    resolver: zodResolver(PageVerifier),
    defaultValues: { page: 1 },
  });

  const onSubmit: SubmitHandler<z.infer<typeof PageVerifier>> = async (
    data,
  ) => {
    if (!data.page) return;
    router.push(`?page=${data.page}`);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <span
          aria-hidden
          data-slot="pagination-ellipsis"
          className={cn(
            "hover:bg-accent flex size-9 cursor-pointer items-center justify-center rounded-md",
            className,
          )}
          {...props}
        >
          <MoreHorizontalIcon className="size-4" />
          <span className="sr-only">More pages</span>
        </span>
      </PopoverTrigger>
      <PopoverContent side="top">
        <Form {...form}>
          <form
            className="flex flex-col gap-2"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <h1 className="text-xl">Navigate to page...</h1>
            <FormField
              control={form.control}
              name="page"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      className="bg-background-transparent"
                      placeholder="..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-destructive" />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <PopoverClose asChild>
                <Button className="cursor-pointer" variant="secondary">
                  Close
                </Button>
              </PopoverClose>
              <Button className="cursor-pointer" type="submit">
                Go
              </Button>
            </div>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
