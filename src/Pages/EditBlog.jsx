import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5175/blogs/${id}`)
      .then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch((err) => console.log("Failed to load blog",err));
  }, [id]);

  const handleSubmit = () => {
    const updateBlog = {
      title,
      content,
    };
    axios
      .put(`http://localhost:5175/blogs/${id}`, updateBlog)
      .then(() => {
        console.log("Successfully update data");
        navigate("/");
      })
      .catch((err) => console.log("Update failed",err));
  };
  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl text-center mb-5 font-extrabold">Update Blog</h1>
      <input
        type="text"
        placeholder="Blog Title"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border border-[#ccc] w-full py-4 px-3 rounded-lg mb-5 placeholder:opacity-50"
      />
      <textarea
        name="content"
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Blog Content"
        className="border border-[#ccc] px-3 py-2 w-full h-35 rounded-lg placeholder:opacity-50 mb-2"
      />
      <button
        className="w-full bg-blue-600 py-2 text-white rounded-lg cursor-pointer"
        onClick={handleSubmit}
      >
        Update Blog
      </button>
    </div>
  );
};

export default EditBlog;
