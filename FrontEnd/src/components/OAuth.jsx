import { Button } from "flowbite-react";
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/user.slice.js";
import { useNavigate } from "react-router-dom";
import axios from 'axios'; // Import axios

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = getAuth(app);
    console.log("hj");

    const handleGoogleClick = async () => {
        console.log("hjjjj");

        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" });

        try {
            const resultFromGoogle = await signInWithPopup(auth, provider);
            console.log("result", resultFromGoogle);

            const res = await axios.post("/api/auth/google", { // Use axios.post instead of fetch
                name: resultFromGoogle.user.displayName,
                email: resultFromGoogle.user.email,
                googlePhotoUrl: resultFromGoogle.user.photoURL
            });

            console.log("Data is sent");
            const data = res.data; // Use res.data to get response data

            if (res.status === 200) { // Check status instead of ok property
                dispatch(signInSuccess(data));
                navigate("/");
                console.log('Signin success:', data);
            } else {
                console.log('Signin failed:', res.statusText);
            }
        } catch (error) {
            console.error('Signin error:', error);
        }
    };

    return (
        <Button type="button" gradientDuoTone="pinkToOrange" outline onClick={handleGoogleClick}>
            <AiFillGoogleCircle className="w-6 h-6 mr-2" />
            Continue With Google
        </Button>
    );
}
