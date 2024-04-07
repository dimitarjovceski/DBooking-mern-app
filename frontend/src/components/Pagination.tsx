export type Props = {
  page: number;
  pages: number;
  onPageChanged: (page: number) => void;
};

const Pagination = ({ page, pages, onPageChanged }: Props) => {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center ">
      <ul className="flex border border-slate-300 ">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`px-2 py-1 ${page === number ? "bg-gray-200" : ""} `}
          >
            <button onClick={() => onPageChanged(number)}>{number}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
