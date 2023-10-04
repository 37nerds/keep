import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";

const SearchInput = () => {
  return (
    <div className="flex items-center bg-slate-100 p-3 rounded-lg w-[500px] gap-3">
      <MagnifyingGlassIcon className="w-5" />
      <input
        className="bg-slate-100 border-none outline-none w-full"
        type="text"
        name="search"
        id="search"
        placeholder="search"
      />
    </div>
  );
};

export default SearchInput;
