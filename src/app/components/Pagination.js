import React from "react";

const getPageWindow = (page, totalPages, windowSize = 5) => {
  const half = Math.floor(windowSize / 2);
  let start = Math.max(1, page - half);
  let end = Math.min(totalPages, start + windowSize - 1);
  start = Math.max(1, end - windowSize + 1);

  const pages = [];
  for (let p = start; p <= end; p++) pages.push(p);
  return pages;
};

export const Pagination = ({ page, totalPages, onPageChange }) => {
  if (!totalPages || totalPages <= 1) return null;

  const pages = getPageWindow(page, totalPages);

  const isFirstPageInWindow = pages.includes(1);
  const isLastPageInWindow = pages.includes(totalPages);

  return (
    <div className="flex justify-end">
      {/* Previous товчлуур */}
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="flex items-center gap-1 text-[14px] font-light px-2 py-1 rounded-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        <span aria-hidden="true">&lt;</span>
        Previous
      </button>

      {/* Хуудасны тоонууд */}
      <div className="flex items-center gap-2">
        {!isFirstPageInWindow && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className={`w-8 h-8 rounded-md text-[14px] cursor-pointer border ${
                page === 1
                  ? "border-[#09090B] font-medium"
                  : "border-[#E4E4E7] font-light hover:bg-gray-100"
              }`}
            >
              1
            </button>
            <span className="px-1 text-[#71717A] text-sm">...</span>
          </>
        )}

        {/* Одоогийн идэвхтэй харагдах хуудсууд */}
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            aria-current={p === page ? "page" : undefined}
            className={`w-8 h-8 rounded-md text-[14px] cursor-pointer border ${
              p === page
                ? "border-[#09090B] font-medium"
                : "border-[#E4E4E7] font-light hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        ))}

        {!isLastPageInWindow && (
          <>
            <span className="px-1 text-[#71717A] text-sm">...</span>
            <button
              onClick={() => onPageChange(totalPages)}
              className={`w-8 h-8 rounded-md text-[14px] cursor-pointer border ${
                page === totalPages
                  ? "border-[#09090B] font-medium"
                  : "border-[#E4E4E7] font-light hover:bg-gray-100"
              }`}
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      {/* Next */}
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="flex items-center gap-1 text-[14px] font-light px-2 py-1 rounded-md cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
      >
        Next
        <span aria-hidden="true">&gt;</span>
      </button>
    </div>
  );
};
