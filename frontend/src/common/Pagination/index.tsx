import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { PaginationType } from '../../interfaces/pagination';
import { useSearchParams } from 'react-router-dom';

interface PaginationProps {
  paginationData: PaginationType;
  getService: (page?: number) => void;
}

const PAGE_SIZE = 20;

function Pagination({ paginationData, getService }: PaginationProps) {
  const previousHandler = () => {
    if (paginationData.previous) {
      const url = new URL(paginationData.previous);
      const searchParams = new URLSearchParams(url.search);
      const pageNumber = Number(searchParams.get('page'));
      getService(pageNumber ? pageNumber : 1);
    }
  };

  const nextHandler = () => {
    if (paginationData.next) {
      const url = new URL(paginationData.next);
      const searchParams = new URLSearchParams(url.search);
      const pageNumber = Number(searchParams.get('page'));
      getService(pageNumber);
    }
  };
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            <span className="font-medium">{paginationData.count}</span> نتیجه
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={previousHandler}
              disabled={paginationData.previous ? false : true}
              className="bg-meta-5 text-black disabled:bg-white relative inline-flex items-center rounded-r-md px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <FaChevronRight className="h-5 w-5" aria-hidden="true" />
              <span className="">صفحه قبل</span>
            </button>

            <button
              onClick={nextHandler}
              disabled={paginationData.next ? false : true}
              className="bg-meta-5 text-black disabled:bg-white relative inline-flex items-center rounded-l-md px-2 py-2 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="">صفحه بعد</span>
              <FaChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
