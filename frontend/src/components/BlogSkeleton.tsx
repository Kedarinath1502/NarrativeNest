

export const BlogSkeleton = () => {
    return <div role="status" className="flex justify-center my-2 animate-pulse">
        <div className="w-screen max-w-screen-sm ">
            <div className="flex">
                <div className="h-4 w-4 bg-gray-200 rounded-full  mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>

                <div className="pl-2 font-thin text-slate-500 text-sm flex justify-center flex-col">
                    <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                </div>
            </div>
            <div className="text-xl font-semibold pt-2">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="text-md font-thin">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <div className="text-slate-500 text-sm font-thin pt-4">
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    </div>



}