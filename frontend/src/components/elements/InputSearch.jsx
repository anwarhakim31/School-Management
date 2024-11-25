import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const InputSearch = ({ loading }) => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const updateParams = (search) => {
    if (search) {
      searchParams.set("page", "1");
      searchParams.set("search", search);
    } else if (search === "") {
      searchParams.delete("search");
      if (searchParams.size === 1 && searchParams.get("page") === "1") {
        searchParams.delete("page");
      }
    }

    return searchParams.toString();
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const updatedParams = updateParams(search);
      navigate(`${pathname}?${updatedParams}`, { replace: true });
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="relative flex w-full   sm:max-w-[300px]">
      <input
        type="search"
        placeholder="Cari nama dan nis dari siswa."
        id="search"
        value={search}
        disabled={loading}
        autoComplete="off"
        onChange={handleSearch}
        className="w-full rounded-full disabled:cursor-not-allowed py-2 pr-2 pl-10 text-xs border border-gray-400 outline-offset-0 outline-1 outline-neutral"
      />
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <Search height={20} width={20} className="text-gray-400" />
      </div>
    </div>
  );
};

export default InputSearch;
