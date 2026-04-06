import React, { useEffect, useState } from "react";
import axios from "axios";

const BlogsAdminWithComments = () => {
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    author: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [replyText, setReplyText] = useState({});
  const [showComments, setShowComments] = useState(null);

  useEffect(() => {
    fetchBlogs();
    fetchComments();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("https://finbangla-voice-backend-production.up.railway.app/api/posts");
      const blogArray = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.posts)
        ? res.data.posts
        : [];
      setBlogs(blogArray);
    } catch (error) {
      console.error("❌ Failed to fetch blogs:", error);
      setBlogs([]);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get("http://localhost:3000/comments");
      setComments(res.data);
    } catch (error) {
      console.error("❌ Failed to fetch comments:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_upload");
    setUploading(true);
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dpgags9kx/image/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setForm((prev) => ({ ...prev, image: data.secure_url }));
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.author.trim() || !form.excerpt.trim()) {
      return alert("Title, Author, and Excerpt are required!");
    }

    const payload = {
      title: form.title,
      excerpt: form.excerpt,
      author: form.author,
      image: form.image,
    };

    try {
      if (editingId) {
        await axios.put(`https://finbangla-voice-backend-production.up.railway.app/api/posts/${editingId}`, payload);
        alert("✅ Blog updated");
      } else {
        await axios.post("https://finbangla-voice-backend-production.up.railway.app/api/posts", payload);
        alert("✅ Blog added");
      }
      setForm({ title: "", excerpt: "", author: "", image: "" });
      setEditingId(null);
      fetchBlogs();
    } catch (error) {
      console.error("Failed to save blog:", error.response?.data || error.message);
      alert("Failed to save blog");
    }
  };

  const handleEdit = (blog) => {
    setForm({
      title: blog.title || "",
      excerpt: blog.excerpt || "",
      author: blog.author || "",
      image: blog.image || "",
    });
    setEditingId(blog.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`https://finbangla-voice-backend-production.up.railway.app/api/posts/${id}`);
      fetchBlogs();
      alert("Blog deleted");
    } catch (error) {
      console.error("Failed to delete blog:", error);
      alert("Failed to delete blog");
    }
  };

  const handleReplySubmit = async (comment) => {
    const reply = replyText[comment.id];
    if (!reply || reply.trim() === "") return alert("Reply cannot be empty!");

    const updatedReplies = Array.isArray(comment.replies)
      ? [...comment.replies, reply]
      : [reply];

    const updatedComment = { ...comment, replies: updatedReplies };

    try {
      await axios.put(`http://localhost:3000/comments/${comment.id}`, updatedComment);
      setReplyText((prev) => ({ ...prev, [comment.id]: "" }));
      fetchComments();
    } catch (error) {
      console.error("Failed to submit reply:", error);
      alert("Failed to submit reply");
    }
  };

  const handleDeleteReply = async (comment, replyIndex) => {
    const updatedReplies = comment.replies.filter((_, idx) => idx !== replyIndex);
    const updatedComment = { ...comment, replies: updatedReplies };

    try {
      await axios.put(`http://localhost:3000/comments/${comment.id}`, updatedComment);
      fetchComments();
    } catch (error) {
      console.error("Failed to delete reply:", error);
      alert("Failed to delete reply");
    }
  };

  const filteredComments = (blogId) => comments.filter((c) => c.blogId === blogId);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10 text-blue-700">
        {editingId ? "✏️ Update Blog" : "➕ Create New Blog"}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-md grid gap-6 mb-12">
        <div className="grid md:grid-cols-2 gap-4">
          <input name="title" value={form.title} onChange={handleChange} placeholder="Blog Title" className="border border-gray-300 rounded px-3 py-2" />
          <input name="author" value={form.author} onChange={handleChange} placeholder="Author Name" className="border border-gray-300 rounded px-3 py-2" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <input type="file" accept="image/*" onChange={handleImageUpload} className="border border-gray-300 rounded px-3 py-2" />
        </div>
        {uploading && <p className="text-blue-500 text-sm">Uploading image, please wait...</p>}
        {form.image && <img src={form.image} alt="Preview" className="w-full md:w-60 h-40 object-cover rounded-md mt-2" />}
        <textarea name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Blog excerpt / summary" rows={3} className="border border-gray-300 rounded px-3 py-2" />
        <button type="submit" className="bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition">
          {editingId ? "Update Blog" : "Add Blog"}
        </button>
      </form>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(blogs) && blogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-xl shadow p-4 flex flex-col justify-between">
            <div>
              {blog.image && <img src={blog.image} alt={blog.title} className="rounded-md mb-3 h-40 w-full object-cover" />}
              <h3 className="text-lg font-semibold text-gray-800">{blog.title}</h3>
              <p className="text-sm text-gray-600 mb-1">By {blog.author}</p>
              <p className="text-sm text-gray-700 mt-2 line-clamp-3">{blog.excerpt}</p>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button onClick={() => handleEdit(blog)} className="text-xs bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded">Edit</button>
              <button onClick={() => handleDelete(blog.id)} className="text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded">Delete</button>
              <button onClick={() => setShowComments(showComments === blog.id ? null : blog.id)} className="text-xs bg-blue-500 text-white px-3 py-1 rounded">
                {showComments === blog.id ? "Hide" : "Comments"}
              </button>
            </div>

            {showComments === blog.id && (
              <div className="mt-4 border-t pt-4 space-y-4 max-h-96 overflow-y-auto">
                <h4 className="font-semibold text-sm mb-2 text-gray-700">💬 Comments</h4>
                {filteredComments(blog.id).map((c) => (
                  <div key={c.id} className="border p-2 rounded text-sm bg-gray-50">
                    <p><strong>{c.name}</strong>: {c.text}</p>
                    <p className="text-xs text-gray-500">{new Date(c.timestamp).toLocaleString()}</p>
                    {Array.isArray(c.replies) && c.replies.length > 0 && (
                      <div className="mt-2 space-y-1">
                        <p className="text-sm font-medium text-gray-700">Replies:</p>
                        {c.replies.map((reply, index) => (
                          <div key={index} className="bg-white p-2 rounded border flex justify-between items-center">
                            <span className="text-sm text-green-700">{reply}</span>
                            <button onClick={() => handleDeleteReply(c, index)} className="text-xs text-red-500 ml-2 hover:underline">Delete</button>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="mt-2 flex flex-col gap-1">
                      <input type="text" placeholder="Write a reply..." value={replyText[c.id] || ""} onChange={(e) =>
                        setReplyText((prev) => ({ ...prev, [c.id]: e.target.value }))} className="border px-2 py-1 rounded text-sm" />
                      <button onClick={() => handleReplySubmit(c)} className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 w-fit">Reply</button>
                    </div>
                  </div>
                ))}
                {filteredComments(blog.id).length === 0 && <p className="text-sm text-gray-400">No comments yet.</p>}
              </div>
            )}
          </div>
        ))}
      </div>

      {!Array.isArray(blogs) || blogs.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No blogs found. Start adding some!</p>
      )}
    </div>
  );
};

export default BlogsAdminWithComments;










