import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import OAuth from "../components/OAuth";
// import { set } from "mongoose";
// import axios from "axios";

export default function Signup() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [errMsg, setErrMsg] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value.trim()
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.username || !formData.email || !formData.password) {
            return setErrMsg("Please fill out all the fields.");
        }
        try {
            setLoading(true)
            setErrMsg(null)
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(formData)
            })
            const data = await res.json();
            if (data.success === false) {
                return setErrMsg(data.message)
            }

            setLoading(false);
            if (res.ok) {
                navigate("/sign-in")
            }
        } catch (error) {
            setErrMsg(error.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen mt-20">
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 ">
                <div className="flex-1">
                    <Link to="/" className="whitespace-nowrap self-center font-bold dark:text-white text-4xl">
                        <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Saad&apos;s</span> Blog
                    </Link>
                    <p className="text-sm mt-5">Embrace the Future with The Future Tech! Sign up now and explore cutting-edge innovations, connect with tech enthusiasts, and shape tomorrows world. Join us on the journey towards a brighter tomorrow!</p>
                </div>
                <div className="flex-1">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div>
                            <Label value='Your Username' />
                            <TextInput type="text" placeholder="Username" id="username" onChange={handleChange} />
                        </div>
                        <div>
                            <Label value='Your Email' />
                            <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange} />
                        </div>
                        <div>
                            <Label value='Your Password' />
                            <TextInput type="password" placeholder="Password" id="password" onChange={handleChange} />
                        </div>
                        <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Spinner size="sm" />
                                    <span className="pl-3">Loading...</span>
                                </>
                            ) : (
                                "Sign up"
                            )}
                        </Button>
                        <OAuth />

                    </form>
                    <div className="flex gap-2 text-sm mt-5">
                        <span>Have an account?</span>
                        <Link to="/sign-in" className="text-blue-500">
                            Sign In
                        </Link>
                    </div>
                    {errMsg && (
                        <Alert className="mt-5" color="failure">
                            {errMsg}
                        </Alert>
                    )}
                </div>
            </div>
        </div >
    );
}
