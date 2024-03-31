import { Signupschema } from "@kedarinath/blog-common"
import { ChangeEvent, useEffect, useState } from "react"
import { Link, useNavigate, } from "react-router-dom"
import { BACKEND_URL } from "../config"
import axios, { AxiosError } from "axios"
import { Spinner } from "./Spinner"

export const Auth = ({ type }: { type: "signin" | "signup" }) => {
    const [postinputs, setPostinputs] = useState<Signupschema>({
        email: "",
        password: "",
        name: ""
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/blogs");
        }
    }, []);
    async function Sendrequest() {
        try {
            setLoading(true);
            const response = await axios.post(`${BACKEND_URL}api/v1/user/${type == "signup" ? "signup" : "signin"}`, postinputs);
            const jwt = response.data;
            console.log(jwt);
            localStorage.setItem("token", jwt);
            navigate('/blogs');
        } catch (error: unknown) {
            setLoading(false);
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response?.status === 404) {
                    setError("User not found");
                } else {
                    setError("Something went wrong. Please try again.");
                }
                console.log(axiosError);
            }
        }
    }
    return <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
            <div className="max-w-lg">
                <div className="text-4xl font-bold px-10">
                    {/* {JSON.stringify(signinputs)} */}
                    {type === "signup" ? "Create your Account" : "Login to your Account"}
                </div>
                <div className="text-slate-400 mt-3 px-12 text-center">
                    {type === "signup" ? "Already have an account?" : "Dont Have an account?"}
                    <Link to={type === "signup" ? "/signin" : "/signup"} className="ml-2 underline">
                        {type === "signup" ? "signin" : "signup"}
                    </Link>
                </div>
                <LabelledInput label="Email" placeholder="enter your email" onChange={(e) => {
                    setPostinputs({
                        ...postinputs,
                        email: e.target.value,
                    })
                }} />
                <LabelledInput label="Password" placeholder="enter pasword..." type="password" onChange={(e) => {
                    setPostinputs({
                        ...postinputs,
                        password: e.target.value
                    })
                }} />
                {type === "signup" ? <LabelledInput label="Name" placeholder="Enter your name" onChange={(e) => {
                    setPostinputs({
                        ...postinputs,
                        name: e.target.value
                    })
                }} /> : ""}
                <button onClick={Sendrequest} type="button" className="mt-4 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                    {loading ? <Spinner /> : (type === "signup" ? "signup" : "signin")}
                </button>
                {error && <div className="text-red-500">{error}</div>}             </div>
        </div>
    </div>
}

interface labelInputs {
    label: string,
    placeholder: string,
    type?: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;

}

const LabelledInput = ({ label, placeholder, type, onChange }: labelInputs) => {
    return <div className="flex justify-center flex-col">
        <label className="mt-4 font-bold ">{label}</label>
        <input type={type || "text"} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={placeholder} onChange={onChange} />
    </div>
}