import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { signInFailure, signInSuccess, signInStart } from "../redux/user/user.slice.js";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth.jsx";
export default function SignIn() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const { loading, error: errMsg } = useSelector(state => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim()
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("Please fill out all the fields."));
    }

    try {
      dispatch(signInStart());

      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        // Handle server errors or unexpected responses
        throw new Error("Failed to sign in. Please try again later.");
      }

      const data = await res.json();

      if (data.success === false) {
        // Handle failed sign-in attempts
        dispatch(signInFailure(data.message));
      } else {
        // Handle successful sign-in
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      // Handle network errors or other unexpected errors
      console.error("Sign-in error:", error);
      dispatch(signInFailure("Failed to sign in. Please try again later."));
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
              <Label value='Your Email' />
              <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange} />
            </div>
            <div>
              <Label value='Your Password' />
              <TextInput type="password" placeholder="*******" id="password" onChange={handleChange} />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Dont have an account?</span>
            <Link to="/sign-up" className="text-blue-500">
              Sign Up
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
