import React, { useState, useEffect } from "react";
import {
  PaginatorPageChangeEvent,
  PaginatorNextPageLinkOptions,
  PaginatorPageLinksOptions,
  PaginatorPrevPageLinkOptions,
} from "primereact/paginator";

import { classNames } from "primereact/utils";
import { CustomPaginator } from "../../atoms/global.style";
export const Paginatior = ({
  totalRecords,
  initialPageData,
  setInitialPageData,
}: any) => {
  const [first, setFirst] = useState<number[]>([0, 0, 0]);
  const onPageChange = (e: PaginatorPageChangeEvent, index: number) => {
    setFirst(first.map((f, i) => (index === i ? e.first : f)));
    setInitialPageData({
      ...initialPageData,
      currentPage: initialPageData.currentPage + 1,
    });
  };

  const template1 = {
    layout: "PrevPageLink PageLinks NextPageLink ",
    PrevPageLink: (options: PaginatorPrevPageLinkOptions) => {
      return (
        <button
          type="button"
          className={classNames(options.className, "border-round")}
          onClick={(e: any) => {
            options.onClick(e);
            setInitialPageData({
              ...initialPageData,
              currentPage: initialPageData.currentPage - 1,
            });
          }}
          disabled={options.disabled}
        >
          <span className="p-3">
            <i className="pi pi-arrow-left"></i>
          </span>
        </button>
      );
    },
    NextPageLink: (options: PaginatorNextPageLinkOptions) => {
      return (
        <button
          type="button"
          className={classNames(options.className, "border-round")}
          onClick={(e: any) => {
            options.onClick(e);
            setInitialPageData({
              ...initialPageData,
              currentPage: initialPageData.currentPage + 1,
            });
          }}
          disabled={options.disabled}
        >
          <span className="p-3">
            <i className="pi pi-arrow-right"></i>
          </span>
        </button>
      );
    },
    PageLinks: (options: PaginatorPageLinksOptions) => {
      if (
        (options.view.startPage === options.page &&
          options.view.startPage !== 0) ||
        (options.view.endPage === options.page &&
          options.page + 1 !== options.totalPages)
      ) {
        const className = classNames(options.className, { "p-disabled": true });

        return (
          <span className={className} style={{ userSelect: "none" }}>
            ...
          </span>
        );
      }

      return (
        <button
          type="button"
          className={options.className}
          onClick={(e: any) => {
            options.onClick(e);
            setInitialPageData({
              ...initialPageData,
              currentPage: options.page + 1,
            });
          }}
        >
          {options.page + 1}
        </button>
      );
    },
  };

  return (
    <div className="card">
      <CustomPaginator
        template={template1}
        first={first[0]}
        rows={initialPageData?.rowsPerPage}
        totalRecords={totalRecords}
        onPageChange={(e) => onPageChange(e, 0)}
      />
    </div>
  );
};
