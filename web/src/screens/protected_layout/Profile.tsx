import UserCircleIcon from "@heroicons/react/24/outline/UserCircleIcon";
import { useState } from "react";
import LogoutButton from "./LogoutButton";

const Profile = () => {
    const [show, setShow] = useState(false);

    return (
        <div>
            <div className="relative inline-block text-left">
                <div>
                    <UserCircleIcon
                        onClick={() => setShow(prev => !prev)}
                        className="w-10 cursor-pointer rounded-full"
                    />
                </div>
                {show ? (
                    <div
                        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-[#525355] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="menu-button"
                        tabIndex={-1}
                    >
                        <div className="py-1" role="none">
                            <a
                                href="/settings"
                                className="block px-4 py-2 text-sm text-white"
                                role="menuitem"
                                tabIndex={-1}
                                id="menu-item-0"
                            >
                                Settings
                            </a>
                            <LogoutButton />
                        </div>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default Profile;
