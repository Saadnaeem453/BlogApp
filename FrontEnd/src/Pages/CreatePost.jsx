import { Button, FileInput, Select, TextInput } from "flowbite-react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function CreatePost() {
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
                    <FileInput type="file" accept="image/*" />
                    <Button type="button" gradientDuoTone="purpleToBlue" outline size="sm">Upload Image</Button>
                </div>
                <ReactQuill theme="snow" placeholder="Write something..." className="h-72 mb-12" required />
                <Button type="submit" gradientDuoTone="purpleToPink">Publish</Button>
            </form>
        </div>
    )
}
