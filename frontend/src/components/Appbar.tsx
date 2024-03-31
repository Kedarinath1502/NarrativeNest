import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Appbar = () => {
    return (
        <div className="flex justify-between border py-2 px-10 bg-gradient-to-r from-blue-400 to-purple-500">
            <Link to={"/blogs"}>
                <div className="text-lg mt-1 font-bold text-white">NarrativeNest</div>
            </Link>
            <div className="flex items-center space-x-4">
                <Link to={`/publish`}>
                    <button
                        type="button"
                        className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center"
                    >
                        New Post
                    </button>
                </Link>
                <Avatar name={"H"} />
            </div>
        </div>
    );
};

function Avatar({ name }: { name: string }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowDropdown(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/signin");
        }
    }, []);

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            <div
                className="inline-flex items-center justify-center w-9 h-9 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer"
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <span className="font-medium text-gray-600 dark:text-gray-300">{name[0]}</span>
            </div>
            {showDropdown && (
                <div className="absolute z-10 right-0 mt-2 w-40 bg-white rounded-md shadow-lg">
                    <div className="p-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>
                        Logout
                    </div>
                </div>
            )}
        </div>
    );
}
