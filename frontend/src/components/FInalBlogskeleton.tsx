export const FinalBlogSkeleton = () => {
    return (
        <div className="flex justify-center">
            <div className="grid grid-cols-12 gap-4 px-10 w-full max-w-screen-xl pt-12">
                <div className="col-span-8">
                    <div className="h-2 bg-gray-300 rounded-full mb-3 animate-pulse"></div>
                    <div className="h-2 bg-gray-300 rounded-full mb-3 animate-pulse"></div>
                    <div className="h-24 bg-gray-300 rounded-lg mb-3 animate-pulse"></div>
                </div>
                <div className="col-span-4">
                    <div className="h-2 bg-gray-300 rounded-full mb-3 animate-pulse"></div>
                    <div className="space-y-4">
                        <div className="h-2 bg-gray-300 rounded-full mb-3 animate-pulse"></div>
                        <div className="h-2 bg-gray-300 rounded-full mb-3 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
