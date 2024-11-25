import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const TablePagination = ({
  lastOfIndex,
  firstOfindex,
  page,
  totalData,
  setPagination,
  totalPage,
}) => {
  const pageNumber = [];
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  for (let i = 1; i <= totalPage; i++) {
    pageNumber.push(i);
  }

  const startPage =
    page === totalPage ? Math.max(1, page - 2) : Math.max(1, page - 1);

  const endPage =
    page === 1 ? Math.min(totalPage, page + 2) : Math.min(totalPage, page + 1);

  const visiblePage = pageNumber.slice(startPage - 1, endPage);

  return (
    <div className=" absolute h-9 left-0 bottom-5 border-t pt-4 w-full flex-between px-3">
      <div className="flex">
        <p className="text-[10px] sm:text-xs">{`Menampilkan ${
          totalData === 0 ? 0 : firstOfindex + 1
        } - ${
          page === totalPage ? totalData : totalData === 0 ? 0 : lastOfIndex
        } dari ${totalData} data`}</p>
      </div>
      <div className="flex-center space-x-4">
        <div className="flex gap-2 ">
          <button
            onClick={() => {
              if (page === 2) {
                searchParams.delete("page");

                navigate(`/admin/data-siswa?${searchParams.toString()}`);

                setPagination((prev) => ({ ...prev, page: 1 }));
              } else if (page > 1) {
                searchParams.set("page", (page - 1).toString());

                navigate(`/admin/data-siswa?${searchParams.toString()}`, {
                  replace: true,
                });
              }
            }}
            className="disabled:cursor-auto bg-neutral text-white rounded-sm disabled:bg-backup"
            disabled={page === 1 || totalData === 0}
          >
            <ChevronLeft width={20} height={20} />
          </button>

          {visiblePage.map((number) => (
            <div
              key={number}
              className={`page-item ${page === number ? "" : ""}`}
            >
              <button
                onClick={() =>
                  navigate(`/admin/data-siswa?page=${number}`, {
                    replace: true,
                  })
                }
                className={`${
                  number === page &&
                  "rounded-full border-b shadow border-gray-500"
                } w-5 text-sm h-5`}
              >
                {number}
              </button>
            </div>
          ))}

          <button
            onClick={() => {
              searchParams.set("page", (page + 1).toString());

              navigate(`/admin/data-siswa?${searchParams.toString()}`, {
                replace: true,
              });
            }}
            className="disabled:cursor-auto bg-neutral text-white rounded-sm disabled:bg-backup"
            disabled={page === pageNumber.length || totalData === 0}
          >
            <ChevronRight width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TablePagination;
