import { Alert, Button, TextInput } from "flowbite-react"
import { useEffect, useRef, useState } from "react";
import { MdCancel } from "react-icons/md";
import { useSelector } from "react-redux"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "../firebase";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
// 

export default function DashProfile() {
    const { currentUser } = useSelector((state) => state.user);
    const [image, setImage] = useState(null)
    const [imageUrl, setImageUrl] = useState(null)
    const [imageUploadProgress, setImageUploadProgress] = useState(null)
    const [imgUploadErr, setImgUplaodErr] = useState(null)
    const [OtherMediaUploadError, setOtherMediaUploadError] = useState(null)
    const [showSuccessAlert, setShowSuccessAlert] = useState(false)
    console.log(imageUploadProgress, imgUploadErr);
    const filePickerRef = useRef()
    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const fileType = file.type;
            if (fileType.startsWith('image/')) {
                // Handle the image file
                setImage(file)
                setImageUrl(URL.createObjectURL(file))
                setOtherMediaUploadError(null);
                // imageUploadProgress(null)
            } else {
                setOtherMediaUploadError("Please upload only image(file size must be less then 2MB)");
            }
        }
    };
    const dismissAlert = () => {
        setOtherMediaUploadError(null);
    };
    useEffect(() => {
        if (image) {
            uploadImage();
        }
    }, [image])
    const uploadImage = async () => {
        const storage = getStorage(app)
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image)
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageUploadProgress(progress.toFixed(0));

            },
            (error) => {
                setImgUplaodErr("Couldn't Upload image(file size must be less then 2MB)")
                console.log(error);
                setImageUploadProgress(null)
                setImageUrl(null)
                setImage(null)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downlaodURL) => {
                    setImageUrl(downlaodURL)
                    setShowSuccessAlert(true)
                    setTimeout(() => {
                        setShowSuccessAlert(false)

                    }, 4000);
                })
            }
        );
        console.log("something uplaoding ...");
    };
    return (
        <div className="max-w-lg mx-auto p-3 w-full">
            <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
            <form className="flex flex-col gap-4">
                <input type="file" accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden />
                <div className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full" onClick={() => filePickerRef.current.click()}>
                    {imageUploadProgress && (
                        <CircularProgressbar value={imageUploadProgress || 0} text={`${imageUploadProgress}%`}
                            strokeWidth={5}
                            styles={{
                                root: {
                                    width: "100%",
                                    height: "100%",
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                },
                                path: {
                                    stroke: `rgba(61,152,190, ${imageUploadProgress / 100})`
                                },
                            }}
                        />
                    )}
                    <img src={imageUrl || currentUser.profilePicture} alt="user" className={`rounded-full w-full h-full object-cover border-8 border-[lightgray] ${imageUploadProgress && imageUploadProgress < 100 && 'opacity-50'}`} />
                </div>
                {/* Add Success alert */}
                {showSuccessAlert && (
                    <div className="flex align-center">
                        <Alert color="success" className="w-full">
                            Image successfully added
                        </Alert>
                    </div>
                )}
                {/* Add alert error  */}

                {OtherMediaUploadError && (
                    <div className="flex align-center">
                        <Alert color="failure" className="w-full">
                            <div className="flex align-center gap-8">
                                {OtherMediaUploadError}
                                <span className="close-button ms-12 my-auto" onClick={dismissAlert}><MdCancel /></span>
                            </div>
                        </Alert>
                    </div>
                )}
                <TextInput id="username" type="text" defaultValue={currentUser.username} placeholder="username" />
                <TextInput id="email" type="email" defaultValue={currentUser.email} placeholder="abc@gmail.com" />
                <TextInput id="password" type="password" placeholder="password" />
                <Button type="submit" gradientDuoTone="purpleToBlue" outline >
                    Update
                </Button>
                <div className="text-red-500  flex justify-between mt-5">
                    <span className="cursor-pointer">Delete account</span>
                    <span className="cursor-pointer">Sign out</span>
                </div>
            </form>
        </div>
    )
}
