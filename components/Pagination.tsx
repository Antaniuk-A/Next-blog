import { useRef, useEffect } from "react";
import Link from "next/link";

type TProps = {
  hasNext: boolean;
  hasPrev: boolean;
  page: number;
}

export default function Pagination({
  hasNext,
  hasPrev,
  page
}: TProps) {
  const nextButton = useRef(null);
  const prevButton = useRef(null);

  useEffect(() => {
    if (hasNext) nextButton.current.disabled = false;
    else nextButton.current.disabled = true;
  }, [hasNext]);

  useEffect(() => {
    if (hasPrev) prevButton.current.disabled = false;
    else prevButton.current.disabled = true;
  }, [hasPrev]);

  return (
    <div className="flex m-20">
      <Link as={`/page/${page - 1}`} href="/page/[page]">
        <button
          ref={prevButton}
          className="border border-blue-500 text-blue-500 rounded-sm font-bold 
          py-4 px-6 mr-2 flex items-center hover:bg-blue-500 hover:text-white 
          disabled:cursor-default disabled:opacity-50 disabled:bg-white 
          dark:disabled:bg-gray-900 disabled:text-blue-500"
        >
          <svg
            className="h-6 w-6 mr-2 mt-1 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Previous page
        </button>
      </Link>
      <Link as={`/page/${page + 1}`} href="/page/[page]">
        <button
          ref={nextButton}
          className="border border-blue-500 text-blue-500 rounded-sm font-bold 
          py-4 px-6 mr-2 flex items-center hover:bg-blue-500 hover:text-white
          disabled:cursor-default disabled:opacity-50 disabled:bg-white 
          dark:disabled:bg-gray-900 disabled:text-blue-500"
        >
          Next page
          <svg
            className="h-6 w-6 ml-2 mt-1 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>
      </Link>
    </div>
  );
}
