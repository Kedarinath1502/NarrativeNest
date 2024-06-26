import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog {
    "title": string,
    "content": string,
    "id": string,
    "createdAt": string,
    "author": {
        "name": string
    }
}

export const UseBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then((response) => {
            setBlog(response.data.blog)
            setLoading(false)
        })
    }, [])

    return {
        loading,
        blog
    }
}
export const UseMyblogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}api/v1/blog/myblogs`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then((response => {
            setBlogs(response.data.blog)
            setLoading(false)
        }))
    }, [])
    return {
        loading,
        blogs
    }
}
export const UseBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then((response) => {
            setBlogs(response.data.blog)
            setLoading(false)
        })
    }, [])
    return {
        loading,
        blogs
    }
}