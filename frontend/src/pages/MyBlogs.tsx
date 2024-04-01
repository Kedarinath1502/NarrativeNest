import { useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { UseMyblogs } from "../hooks"
import { useNavigate } from "react-router-dom";

export const MyBlogs = () => {
    const { loading, blogs } = UseMyblogs();
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/signin")
        }
    }, [])
    if (loading) {
        return (
            <div className="bg-gray-100 min-h-screen">
                <Appbar />
                <div className="container mx-auto py-8">
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        );
    }
    return (
        <div className="bg-gray-200 min-h-screen">
            <Appbar />
            <div className="container mx-auto py-2">
                {blogs.map((blog) => (
                    <BlogCard
                        key={blog.id}
                        id={blog.id}
                        authorName={blog.author.name || "Anonymous"}
                        title={blog.title}
                        content={blog.content}
                        createdAt={blog.createdAt}
                    />
                ))}
            </div>
        </div>
    );
}