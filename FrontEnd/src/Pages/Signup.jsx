import { Link } from "react-router-dom"
import { Button, Label, TextInput } from "flowbite-react"
export default function Signup() {
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
          <form className="flex flex-col gap-4">
            <div>
              <Label value='Your Username' />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label value='Your Email' />
              <TextInput type="text" placeholder="name@company.com" id="email" />
            </div><div>
              <Label value='Your Password' />
              <TextInput type="text" placeholder="Password" id="password" />
            </div>
            <Button gradientDuoTone="purpleToPink" type="submit">Sign Up</Button>
          </form>

          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-500">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
