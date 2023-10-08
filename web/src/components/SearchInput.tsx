import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";

const SearchInput = () => {
    return (
        <div className="group flex w-[750px] items-center gap-5 rounded-lg bg-[#525355] px-5 py-3 hover:bg-[#fcfcfc] hover:text-gray-600">
            <MagnifyingGlassIcon className="w-5 group-hover:text-[#525355]" />
            <input
                className="w-full border-none bg-transparent text-lg outline-none"
                type="text"
                name="search"
                id="search"
                placeholder="Search"
            />
        </div>
    );
};

export default SearchInput;
