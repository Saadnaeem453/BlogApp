import { Button, Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CallToAction from "../components/CallToAction.jsx";

export default function PostPage() {
    const { postSlug } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
                const data = await res.json();
                if (!res.ok) {
                    setError(true);
                    setLoading(false);
                } else {
                    setPost(data.posts[0]);
                    setLoading(false);
                    setError(false);
                }
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchPost();
    }, [postSlug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spinner size="xl" />
            </div>
        );
    }

    if (error) {
        return <div>Error occurred while fetching data.</div>;
    }

    // Render only when post is available
    return (
        post && (
            <main className="p-3 flex flex-col max-w-6xl mx-auto min-h-screen">
                <h1 className="text-3xl mt-10 text-center font-serif max-w-2xl mx-auto lg:text-4xl">{post.title}</h1>
                <Link className="self-center mt-5" to={`/search?category=${post.category}`}>
                    <Button color="gray" pill size="xs">{post.category}</Button>
                </Link>
                <img src={post.image} alt={post.title} className="mt-10 p-5 max-h-[400px] w-full  object-cover" />
                <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-4xl text-xs">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <span className="italic">{(post.content.length / 1000).toFixed(0)} mins-read</span>
                </div>

                <div dangerouslySetInnerHTML={{ __html: post.content }} className="p-3 max-w-2xl mx-auto w-full post-content">
                </div>

                <div className="max-w-4xl mx-auto w-full">
                    <CallToAction data={post.category} />
                </div>
            </main>
        )
    );
}
