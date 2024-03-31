import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    createdAt: string;
    id: string;
}

export const BlogCard = ({
    authorName,
    id,
    title,
    content,
    createdAt,
}: BlogCardProps) => {
    return (
        <div className="flex justify-center my-4">
            <div className="w-full max-w-xl border border-gray-200 rounded-lg shadow-md bg-white dark:bg-gray-800">
                <Link to={`/blog/${id}`} className="block">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                                <Avatar name={authorName} />
                                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {authorName}
                                </div>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                {createdAt}
                            </div>
                        </div>
                        <div className="text-xl font-bold text-gray-900 dark:text-white">
                            {title}
                        </div>
                        <div className="text-gray-700 dark:text-gray-300 mt-1">
                            {content.slice(0, 100) + "..."}
                        </div>
                    </div>
                    <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                        {`${Math.ceil(content.length / 100)} minute(s) read`}
                    </div>
                </Link>
            </div>
        </div>
    );
};

export const Avatar = ({ name }: { name: string }) => {
    return (
        <div className="relative flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {name[0]}
            </span>
        </div>
    );
};
