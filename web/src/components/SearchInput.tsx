import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";

const SearchInput = () => {
    return (
        <div className="flex items-center group bg-[#525355] px-5 py-3 rounded-lg w-[750px] gap-5 hover:bg-[#fcfcfc]">
            <MagnifyingGlassIcon className="w-5 group-hover:text-[#525355]" />
            <input
                className="bg-transparent border-none outline-none w-full text-lg"
                type="text"
                name="search"
                id="search"
                placeholder="Search"
            />
        </div>
    );
};

export default SearchInput;
