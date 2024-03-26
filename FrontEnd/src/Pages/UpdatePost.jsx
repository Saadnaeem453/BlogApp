import { useEffect, useState } from "react";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux";
export default function UpdatePost() {
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [imgUploadErr, setImgUploadErr] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        category: "uncategorized",
        content: ""
    });
    const [publishErr, setPublishErr] = useState("");
    const navigate = useNavigate();
    const { postId } = useParams();
    const { currentUser } = useSelector((state) => state.user)
    console.log(imageUrl);
    useEffect(() => {
        try {
            const fetchPost = async () => {
                const res = await fetch(`/api/post/getposts?postId=${postId}`)
                const data = await res.json()

                if (!res.ok) {
                    setPublishErr(data.message)
                    return;
                }
                if (res.ok) {

                    setPublishErr(null)

                    setFormData(data.posts[0])
                }
            }
            fetchPost();
        } catch (error) {
            console.log(error);
        }
    }, [postId])
    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileType = file.type;
            if (fileType.startsWith('image/')) {
                setFile(file);
                setImageUrl(URL.createObjectURL(file));
                setImageUploadProgress(null);
            } else {
                setFile(null);
                setImgUploadErr("Please select an image file (JPEG, PNG, etc.)");
            }
        }
    };

    const handleUploadImage = async () => {
        try {
            if (!file) {
                setImgUploadErr("Please select an image");
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
                    setImgUploadErr("Couldn't upload image. Please try again later.");
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUrl(downloadURL);
                        alert("Image is uploaded Successfully")
                        setImageUploadProgress(null);
                        setImgUploadErr(null);
                        setFormData(prevState => ({
                            ...prevState,
                            image: downloadURL
                        }));
                    });
                }
            );
        } catch (error) {
            setImgUploadErr("Image upload failed");
            setImageUploadProgress(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("jnb");
        try {

            const res = await fetch(`/api/post/updatepost/${formData._id}/${currentUser._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            console.log("data", data)
            if (!res.ok) {
                console.log("ni thk data");

                setPublishErr(data.message);
                return;
            } else {
                console.log("thk a");

                setPublishErr(null);
                // Optionally, reset form fields after successful submission

                navigate(`/post/${data.slug}`)
            }

        } catch (error) {
            console.log(error);

            setPublishErr("Something went wrong g. Please try again later.");
        }
    };

    return (
        <div className="p-3 mx-auto min-h-screen max-w-3xl">
            <h1 className="text-3xl text-center my-7 font-semibold">Create a post</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-10">
                <div className="flex flex-col gap-4 sm:flex-row justigy-between">
                    <TextInput onChange={(e) =>
                        setFormData(prevState => ({ ...prevState, title: e.target.value }))}
                        className="flex-1" type="text" placeholder="title" required id="title" value={formData.title} />
                    <Select onChange={(e) => setFormData(prevState => ({ ...prevState, category: e.target.value }))} value={formData.category}>
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
                                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
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
                <ReactQuill
                    value={formData.content}
                    onChange={(value) => setFormData(prevState => ({ ...prevState, content: value }))}
                    theme="snow"
                    placeholder="Write something..."
                    className="h-72 mb-12"
                    required
                />

                <Button type="submit" gradientDuoTone="purpleToPink">Update</Button>
            </form>
            {publishErr && (
                <Alert className="mt-5" color="failure">{publishErr}</Alert>
            )}
        </div>
    );
}
