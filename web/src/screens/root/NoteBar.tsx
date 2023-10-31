import ListIcon from "@/components/icons/ListIcon";
import PencilIcon from "@/components/icons/PencilIcon";
import PhotoIcon from "@/components/icons/PhotoIcon";

const NoteBar = () => {
    return (
        <div className="mb[16px] mt-[32px] flex w-[598px] resize-y justify-between rounded-lg border border-[#5f6367] bg-[#202124] px-[16px] py-[12px] text-[16px] text-[#bdbdbe] shadow-lg focus:outline-none">
            <div>Take a note...</div>
            <div className="flex gap-5">
                <div className="w-6">
                    <ListIcon />
                </div>
                <div className="w-6 p-1">
                    <PencilIcon />
                </div>
                <div className="w-6">
                    <PhotoIcon />
                </div>
            </div>
        </div>
    );
};

export default NoteBar;
