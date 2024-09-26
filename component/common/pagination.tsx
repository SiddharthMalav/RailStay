/**
 * Custom pagination component using ReactPaginate library.
 * Handles page navigation and displays pagination controls.
 */
import ReactPaginate from "react-paginate";

export default function Pagination(props: any) {
  const { itemsPerPage, items, setCurrentPage, onPageChange, initialPage } =
    props;

  const pageCount = Math.ceil(items / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event: any) => {
    if (onPageChange) {
      onPageChange(event.selected + 1);
    }
    if (setCurrentPage) setCurrentPage(event.selected + 1);
  };
  if (pageCount <= 0) {
    return null;
  }
  return (
    <>
      <ReactPaginate
        className="flex gap-[20px] py-2"
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        initialPage={initialPage - 1}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        activeClassName="bg-blue-300 px-2"
      />
    </>
  );
}
