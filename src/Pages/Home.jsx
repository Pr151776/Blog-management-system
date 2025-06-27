import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Blogcontext from "../BlogContext";
import axios from "axios";

const Home = () => {
  const blogs = useContext(Blogcontext);
  const navigate = useNavigate();

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5175/blogs/${id}`)
      .then(() => {
        alert("Are you sure to delete!");
        console.log("Deleted successfull");
      })
      .catch((err) => console.log("Cannot find to Id", err.message));
  };
  return (
    <div className="min-h-screen">
      <div className="px-20 py-5 text-end">
        <NavLink
          to="/newblog"
          className="text-xl border border-blue-700 px-5 py-2 rounded hover:border-none hover:bg-[#970747] hover:text-white"
        >
          Add new blog
        </NavLink>
      </div>
      <section className="py-10 flex flex-wrap gap-10 mx-auto">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-[#970747] text-white w-[300px] mx-5 px-3 py-5 rounded-2xl"
          >
            <h1 className="text-2xl font-bold mb-2">{blog.title}</h1>
            <p>{blog.content}</p>
            <div className="flex justify-end px-5 gap-5 mt-5">
              <button
                className="px-7 py-1.5 rounded-lg text-white bg-blue-600 hover:text-white cursor-pointer"
                onClick={() => navigate(`/edit/${blog.id}`)}
              >
                Edit
              </button>
              <button
                className="px-4 rounded-lg text-white bg-[#aa122e] hover:bg-[#8c0b23] hover:text-white cursor-pointer"
                onClick={() => handleDelete(blog.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
