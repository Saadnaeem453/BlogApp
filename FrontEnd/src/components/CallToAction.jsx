import { Button } from "flowbite-react";
import PropTypes from 'prop-types'; // Import PropTypes
export default function CallToAction({ data }) {

    return (
        <div className=" mt-5 flex flex-xol sm:flex-row p-3 text-center justify-center items-center border rounded-tl-3xl rounded-br-3xl border-teal-500">
            <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-2xl font-mono ">Want to learn more about {data === "uncategorized" ? "Technology" : data}</h2>
                <p className="text-gray-500 my-3 font-semibold">Checkout these resources with 100 {data === "uncategorized" ? "Technology" : data} projects</p>
                <Button className="rounded-tl-xl rounded-bl-none" gradientDuoTone="purpleToPink">Learn More</Button>
            </div>
            <div className="p-7 flex-1">
                <img src="https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg" alt="" />
            </div>
        </div>
    )
}
CallToAction.propTypes = {
    data: PropTypes.string.isRequired, // Expecting 'data' prop to be a string and required
};

