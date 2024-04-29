'use client'

import { useEffect, useState } from "react";

const EditBlog = (props) => {
    const blogId = props.params.blogpost;

    const [title, setTitle] = useState('')
    const [introduction, setIntroduction] = useState('')
    const [category, setCategory] = useState('')
    const [subCategory, setSubCategory] = useState('')
    const [bodycontent, setBodyContent] = useState('')
    // const [graphics, setGraphics] = useState('')
    const [links, setLinks] = useState('')
    const [author, setAuthor] = useState('')
    const [date, setDate] = useState('')
    const [mentionedpeoples, setMentionedPoples] = useState('')

    const [blogUpdated, setBlogUpdated] = useState(false);

    const getBlodDetails = async () => {
        try {
            const req = await fetch(`http://localhost:3000/api/blogs/${blogId}`);
            const res = await req.json();
            if (!req.ok) {
                throw new Error("Couldn't fetch!")
            };
            setTitle(res.result[0].title);
            setIntroduction(res.result[0].introduction);
            setCategory(res.result[0].category);
            setSubCategory(res.result[0].subCategory);
            setBodyContent(res.result[0].bodycontent);
            setLinks(res.result[0].links);
            setAuthor(res.result[0].author);
            setDate(res.result[0].date);
            setMentionedPoples(res.result[0].mentionedpeoples);
        }
        catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        getBlodDetails()
    }, []);

    const updateBlogDetails = async (e) => {
        e.preventDefault();
        try {
            const postReq = await fetch(`http://localhost:3000/api/blogs/${blogId}`, {
                method: "PUT",
                body: JSON.stringify(
                    { title, introduction, category, subCategory, bodycontent, links, author, date, mentionedpeoples }
                )
            });
            if (postReq.ok) {
                setTimeout(() => {
                    setBlogUpdated(false)
                }, 2000);
                setBlogUpdated(true)
            }
            console.log('Post Request: ', postReq);
        }
        catch (error) {
            alert("Error: ", error)
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center h-screen">
                {blogUpdated ? (
                    <div className="shadow-md border border-gray-500 rounded-md p-8 bg-green-200 text-blak font-bold font-sans">
                        <p>Blog Updated Successfully!</p>
                    </div>
                ) : ('')}
                <form className="w-1/2 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Title:
                            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder="Title..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Introduction:
                            <input value={introduction} onChange={(e) => setIntroduction(e.target.value)} type="text" placeholder="Introduction..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Category:
                            <input value={category} onChange={(e) => setCategory(e.target.value)} type="text" placeholder="Category..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Sub Category:
                            <input value={subCategory} onChange={(e) => setSubCategory(e.target.value)} type="text" placeholder="Sub Category..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Body Content:
                            <input value={bodycontent} onChange={(e) => setBodyContent(e.target.value)} type="text" placeholder="Body..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Links:
                            <input value={links} onChange={(e) => setLinks(e.target.value)} type="text" placeholder="Links..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Author:
                            <input value={author} onChange={(e) => setAuthor(e.target.value)} type="text" placeholder="Author..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Date:
                            <input value={date} onChange={(e) => setDate(e.target.value)} type="date" placeholder="Date..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </label>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Peoples:
                            <input value={mentionedpeoples} onChange={(e) => setMentionedPoples(e.target.value)} type="text" placeholder="Mention Peoples..." className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </label>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <button onClick={(e) => updateBlogDetails(e)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Update Blog
                        </button>

                    </div>
                </form>
            </div>
        </>
    );

};

export default EditBlog;