import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function DashPosts() {
    const { currentUser } = useSelector((state) => state.user);
    const [userPosts, setUserPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch(`/api/post/getposts?userId-${currentUser._id}`);
                const data = await res.json();
                if (res.ok) {
                    setUserPosts(data.posts);
                    console.log(data.posts);
                }
            } catch (error) {
                console.log(error.message);
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
        <div className=" mb-5 table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            {currentUser.isAdmin && userPosts.length > 0 ? (
                <>
                    <Table hoverable className="shadow-md">
                        <Table.Head>
                            <Table.HeadCell>Data Updated</Table.HeadCell>
                            <Table.HeadCell>Post Image</Table.HeadCell>
                            <Table.HeadCell>Post Title</Table.HeadCell>
                            <Table.HeadCell>Category</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                            <Table.HeadCell>
                                <span>Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        {userPosts.map((post) => (
                            <Table.Body className="divide-y" key={post._id}>
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell>
                                        {new Date(post.updatedAt).toLocaleDateString()}
                                    </Table.Cell>
                                    <Link to={`/post/${post.slug}`}>
                                        <Table.Cell>
                                            <img src={post.image} alt={post.title} className="w-20 h-10 object-cover bg-gray-500" />
                                        </Table.Cell>
                                    </Link>

                                    <Table.Cell>
                                        <Link className="text-medium text-gray-900 dark:text-white" to={`/post/${post.slug}`}>
                                            {post.title}</Link>
                                    </Table.Cell>
                                    <Table.Cell>{post.category}</Table.Cell>
                                    <Table.Cell>
                                        <span className="font-medium hover:underline cursor-pointer text-red-500 ">Delete</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link className="text-teal-500 hover:underline" to={`/update-post/${post._id}`}><span>Edit</span></Link>

                                    </Table.Cell>


                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                </>
            ) : (
                <p>There are no posts!</p>
            )}
        </div>
    );
}
