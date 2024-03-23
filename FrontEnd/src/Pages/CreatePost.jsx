import { useState } from "react";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
export default function CreatePost() {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imgUploadErr, setImgUploadErr] = useState(null);
    const [formData, setFormData] = useState("");
    console.log(imageUrl);
    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type;
            if (fileType.startsWith('image/')) {
                // Handle the image file
                setFile(file);
                setImageUrl(URL.createObjectURL(file));
                setImageUploadProgress(null); // Clear any previous upload progress
            } else {

                // Reset file state
                setFile(null);
            }
        }
    };


    const handleUploadImage = async () => {
        try {
            if (!file) {
                setImgUploadErr("Please select an image");
                setTimeout(() => {
                    setImgUploadErr(null)
                }, 4000);
                return;
            }
            const storage = getStorage();
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setImgUploadErr("Couldn't upload image (file size must be less than 2MB)");
                    console.log(error);
                    setImageUploadProgress(null);
                    setImageUrl(null);
                    setFile(null);
                    console.log(imgUploadErr);

                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUrl(downloadURL);
                        setImageUploadProgress(null);
                        setImgUploadErr(null);
                        setFormData({ ...formData, image: downloadURL });
                    });
                }
            );
            console.log("something uploading ...");
        } catch (error) {
            setImgUploadErr("Image upload failed");
            setImageUploadProgress(null);

        }
    };

    return (
        <div className="p-3 mx-auto min-h-screen max-w-3xl">
            <h1 className="text-3xl text-center my-7 font-semibold">Create a post</h1>
            <form className="flex flex-col gap-4 mb-10">

                <div className="flex flex-col gap-4 sm:flex-row justigy-between">
                    <TextInput className="flex-1" type="text" placeholder="title" required id="title" />
                    <Select>
                        <option value="uncategorized">Select a category</option>
                        <option value="javascript">Javascript</option>
                        <option value="react">React Js</option>
                        <option value="mobiledev">Mobile App Development</option>
                        <option value="web3.0">WEB3.0</option>
                        <option value="blockchain">BlockChain</option>
                        <option value="technology">Technology</option>
                    </Select>
                </div>
                <div className="flex gap-4 items-center justify-between border-2 border-teal-500 border-dotted p-3">
                    <FileInput type="file" accept="image/*" onChange={handleImage} />
                    <Button disabled={imageUploadProgress} onClick={handleUploadImage} type="button" gradientDuoTone="purpleToBlue" outline size="sm">
                        {imageUploadProgress ? (
                            <div className="w-16 h-16">
                                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}`} />
                            </div>
                        ) : (
                            "Uplaod Image"
                        )}
                    </Button>
                </div>
                {imgUploadErr && <Alert color="failure">{imgUploadErr}</Alert>}
                {formData.image && (
                    <img src={formData.image} alt="upload" className="w-full h-72 object-cover" />
                )}
                <ReactQuill theme="snow" placeholder="Write something..." className="h-72 mb-12" required />
                <Button type="submit" gradientDuoTone="purpleToPink">Publish</Button>
            </form>
            {/* Add alert error  */}


        </div>
    );
}
