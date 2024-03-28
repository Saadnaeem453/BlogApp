import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi"

export default function DashPosts() {
    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);
    const [visiblePosts, setVisiblePosts] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [showLess, setShowLess] = useState(false);
    const [showModel, setShowModel] = useState(false);
    const [postIdDelete, setPostIdDelete] = useState("")


    const postsPerPage = 9;

    useEffect(() => {
        const fetchPosts = async () => {
            console.log("data");

            try {
                const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`, {
                    method: "GET"
                });
                const data = await res.json();
                if (res.ok) {
                    setUserPosts(data.posts);
                    setVisiblePosts(data.posts.slice(0, postsPerPage)); // Display first 9 posts initially
                    setShowMore(data.posts.length > postsPerPage); // Show "Show more" button if there are more than 9 posts
                }
                if (!res.ok) {
                    console.log("ni thk response");
                }
            } catch (error) {
                console.log(error.message);
                console.log("jnb");
            }
        };

        if (currentUser.isAdmin) {
            fetchPosts();
        }
    }, [currentUser._id]);

    const handleShowMore = () => {
        const nextIndex = visiblePosts.length + postsPerPage;
        setVisiblePosts(userPosts.slice(0, nextIndex)); // Show next set of posts
        setShowMore(nextIndex < userPosts.length);
        setShowLess(true)
        // Show "Show more" button if there are more posts to display
    };

    const handleShowLess = () => {
        setVisiblePosts(userPosts.slice(0, postsPerPage)); // Show only first 9 posts
        setShowMore(true);
        setShowLess(false);// Show "Show more" button
    };
    // Delete post=======================

    const handleDeletePost = async () => {

        console.log("Deleting post...");
        console.log("Post ID to delete:", postIdDelete);
        console.log("Current user ID:", currentUser._id);
        setShowModel(false)
        try {
            const res = await fetch(`/api/post/deletepost/${postIdDelete}/${currentUser._id}`, {
                method: "DELETE"
            }
            );
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                setUserPosts((prev) =>
                    prev.filter((post) => post._id !== postIdDelete)
                )
            }
        } catch (error) {
            console.log(error);
        }
    }




    return (
        <div className="mb-5 table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            {currentUser.isAdmin && visiblePosts.length > 0 ? (
                <>
                    <Table hoverable className="shadow-md">
                        <Table.Head>
                            <Table.HeadCell>ID</Table.HeadCell>
                            <Table.HeadCell>Data Updated</Table.HeadCell>
                            <Table.HeadCell>Post Image</Table.HeadCell>
                            <Table.HeadCell>Post Title</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                            <Table.HeadCell>Edit</Table.HeadCell>
                        </Table.Head>
                        {visiblePosts.map((post, index) => (
                            <Table.Body className="divide-y" key={post._id}>
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell>{index + 1}</Table.Cell>
                                    <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell>
                                        <Link to={`/post/${post.slug}`}>
                                            <img src={post.image} alt={post.title} className="w-20 h-10 object-cover bg-gray-500" />
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link className="text-medium text-gray-900 dark:text-white" to={`/post/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell>{post.category}</Table.Cell>
                                    <Table.Cell>
                                        <span onClick={() => {
                                            setPostIdDelete(post._id)
                                            setShowModel(true);
                                        }

                                        } className="font-medium hover:underline cursor-pointer text-red-500">Delete</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link className="text-teal-500 hover:underline" to={`/update-post/${post._id}`}>
                                            Edit
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                    {showMore && (
                        <button onClick={handleShowMore} className="w-full text-teal-500 self-center py-7 text-sm">
                            Show more
                        </button>
                    )}
                    {showLess && (
                        <button onClick={handleShowLess} className="w-full text-teal-500 self-center py-7 text-sm">
                            Show Less
                        </button>
                    )}
                </>
            ) : (
                <p>There are no posts!</p>
            )}
            <Modal show={showModel} onClose={() => setShowModel(false)} popup size="md" >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-14 w-14 text-fray-400 dark:text-gray-200 mb-4 mx-auto" />
                        <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200 ">Are you sure you want to delete this post permanently</h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleDeletePost}>Yes, I am sure</Button>
                            <Button color="gray" onClick={() => setShowModel(false)}>No, close</Button>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
