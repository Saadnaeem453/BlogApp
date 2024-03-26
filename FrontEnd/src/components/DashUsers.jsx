import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi"
import { FaCheck, FaTimes } from "react-icons/fa";


export default function Dashusers() {
    const { currentUser } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [visibleUsers, setVisibleUsers] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [showLess, setShowLess] = useState(false);
    const [showModel, setShowModel] = useState(false);
    const [userIdDelete, setUserIdDelete] = useState("")


    const usersPerPage = 9;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`/api/user/getusers`, {
                    method: "GET"
                });
                const data = await res.json();
                if (res.ok) {
                    setUsers(data.users);
                    setVisibleUsers(data.users.slice(0, usersPerPage)); // Display first 9 users initially
                    setShowMore(data.users.length > usersPerPage); // Show "Show more" button if there are more than 9 users
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        if (currentUser.isAdmin) {
            fetchUsers();
        }
    }, [currentUser._id]);

    const handleShowMore = () => {
        const nextIndex = visibleUsers.length + usersPerPage;
        setVisibleUsers(users.slice(0, nextIndex)); // Show next set of users
        setShowMore(nextIndex < users.length);
        setShowLess(true)
        // Show "Show more" button if there are more users to display
    };

    const handleShowLess = () => {
        setVisibleUsers(users.slice(0, usersPerPage)); // Show only first 9 users
        setShowMore(true);
        setShowLess(false);// Show "Show more" button
    };
    // Delete user=======================

    const handleDeleteUser = async () => {

        console.log("Deleting user...");
        console.log("user ID to delete:", userIdDelete);
        console.log("Current user ID:", currentUser._id);
        setShowModel(false)
        try {
            const res = await fetch(`/api/user/delete/${userIdDelete}`, {
                method: "DELETE"
            }
            );
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                setUsers((prev) =>
                    prev.filter((user) => user._id !== userIdDelete)
                )
            }
        } catch (error) {
            console.log(error);
        }
    }




    return (
        <div className="mb-5 table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            {currentUser.isAdmin && visibleUsers.length > 0 ? (
                <>
                    <Table hoverable className="shadow-md">
                        <Table.Head>
                            <Table.HeadCell>ID</Table.HeadCell>

                            <Table.HeadCell>Date Created</Table.HeadCell>
                            <Table.HeadCell>User Image</Table.HeadCell>
                            <Table.HeadCell>Username</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Admin</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>


                        </Table.Head>
                        {visibleUsers.map((user, index) => (
                            <Table.Body className="divide-y" key={user._id}>
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell>{index + 1}</Table.Cell>

                                    <Table.Cell>{new Date(user.updatedAt).toLocaleDateString()}</Table.Cell>

                                    <Table.Cell>
                                        <Link to={`/user/${user.slug}`}>
                                            <img src={user.profilePicture} alt={user.title} className="w-10 h-10 object-cover bg-gray-500 rounded-full" />
                                        </Link>
                                    </Table.Cell>

                                    <Table.Cell>
                                        <Link className="text-medium text-gray-900 dark:text-white" to={`/user/${user.slug}`}>
                                            {user.username}
                                        </Link>
                                    </Table.Cell>

                                    <Table.Cell>{user.email}</Table.Cell>
                                    <Table.Cell>{user.isAdmin ? <FaCheck className="text-green-500" /> : <FaTimes className="text-red-500" />}
                                    </Table.Cell>

                                    <Table.Cell>
                                        <span onClick={() => {
                                            setUserIdDelete(user._id)
                                            setShowModel(true);
                                        }

                                        } className="font-medium hover:underline cursor-pointer text-red-500">Delete</span>
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
                <p>There are no users!</p>
            )}
            <Modal show={showModel} onClose={() => setShowModel(false)} popup size="md" >
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-14 w-14 text-fray-400 dark:text-gray-200 mb-4 mx-auto" />
                        <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200 ">Are you sure you want to delete this user permanently</h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleDeleteUser}>Yes, I am sure</Button>
                            <Button color="gray" onClick={() => setShowModel(false)}>No, close</Button>
                        </div>

                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
