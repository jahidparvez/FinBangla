import React, { useEffect, useState } from "react";
import axios from "axios";
import { Save, Trash2, PlusCircle, Move } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const JournalistFooterAdmin = () => {
  const [footer, setFooter] = useState(null);
  const [newTopic, setNewTopic] = useState("");
  const [newLink, setNewLink] = useState({ label: "", url: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/journalistFooter").then((res) => {
      setFooter(res.data);
    });
  }, []);

  const updateField = (field, value) => {
    setFooter((f) => ({ ...f, [field]: value }));
  };

  const updateSocial = (field, value) => {
    setFooter((f) => ({ ...f, [field]: value }));
  };

  const onDragEnd = (result, type) => {
    if (!result.destination) return;

    const items = [...footer[type]];
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);

    setFooter((f) => ({ ...f, [type]: items }));
  };

  const addTopic = () => {
    if (!newTopic.trim()) return;
    setFooter((f) => ({ ...f, topics: [...f.topics, newTopic.trim()] }));
    setNewTopic("");
  };

  const removeTopic = (index) => {
    const updated = [...footer.topics];
    updated.splice(index, 1);
    setFooter((f) => ({ ...f, topics: updated }));
  };

  const addLink = () => {
    if (!newLink.label.trim() || !newLink.url.trim()) return;
    setFooter((f) => ({ ...f, links: [...f.links, { ...newLink }] }));
    setNewLink({ label: "", url: "" });
  };

  const removeLink = (index) => {
    const updated = [...footer.links];
    updated.splice(index, 1);
    setFooter((f) => ({ ...f, links: updated }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.put("http://localhost:3000/journalistFooter", footer);
      alert("Updated successfully!");
    } catch {
      alert("Failed to save. Try again.");
    }
    setSaving(false);
  };

  if (!footer)
    return (
      <div className="flex justify-center items-center h-40 text-indigo-600 font-semibold text-lg">
        Loading...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10 bg-white rounded-xl shadow-lg border border-indigo-100">
      <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 tracking-wide">
        🎤 Journalist Footer Admin
      </h2>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <input
          type="text"
          className="border border-indigo-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 transition"
          placeholder="Name"
          value={footer.name}
          onChange={(e) => updateField("name", e.target.value)}
        />
        <input
          type="text"
          className="border border-indigo-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 transition"
          placeholder="Title"
          value={footer.title}
          onChange={(e) => updateField("title", e.target.value)}
        />
        <input
          type="email"
          className="border border-indigo-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 transition"
          placeholder="Email"
          value={footer.email}
          onChange={(e) => updateField("email", e.target.value)}
        />
      </div>

      <textarea
        rows={3}
        className="w-full border border-indigo-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 transition resize-none"
        placeholder="Bio"
        value={footer.bio}
        onChange={(e) => updateField("bio", e.target.value)}
      />

      {/* Contact & Image Upload */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
        <input
          type="tel"
          className="border border-indigo-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 transition"
          placeholder="Phone"
          value={footer.phone}
          onChange={(e) => updateField("phone", e.target.value)}
        />

        <div className="col-span-2 flex flex-col gap-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  updateField("image", reader.result);
                };
                reader.readAsDataURL(file);
              }
            }}
            className="file:border file:border-indigo-300 file:rounded-md file:px-3 file:py-1.5 file:bg-indigo-50 file:text-indigo-700 file:cursor-pointer text-sm"
          />
          <small className="text-gray-500">Select an image to upload (JPG, PNG, etc.)</small>
        </div>

        <div className="col-span-1 flex justify-center">
          <img
            src={footer.image}
            alt="Profile Preview"
            className="w-24 h-24 rounded-full object-cover border-2 border-indigo-300 shadow"
            loading="lazy"
          />
        </div>
      </div>

      {/* Social Links */}
      <div>
        <h3 className="text-xl font-semibold text-indigo-600 mb-3">Social Links</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["facebook", "instagram", "youtube"].map((key) => (
            <input
              key={key}
              type="url"
              placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
              className="border border-indigo-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 transition"
              value={footer[key]}
              onChange={(e) => updateSocial(key, e.target.value)}
            />
          ))}
        </div>
      </div>

      {/* Topics Section */}
      <div>
        <h3 className="text-xl font-semibold text-indigo-600 mb-3">Topics</h3>
        <div className="flex gap-3 mb-4 max-w-md">
          <input
            className="flex-grow border border-indigo-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Add new topic"
            value={newTopic}
            onChange={(e) => setNewTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTopic()}
          />
          <button
            onClick={addTopic}
            className="bg-indigo-600 text-white rounded-lg p-3 flex items-center gap-2 hover:bg-indigo-700 transition"
          >
            <PlusCircle size={20} /> Add
          </button>
        </div>

        <DragDropContext onDragEnd={(result) => onDragEnd(result, "topics")}>
          <Droppable droppableId="topicsDroppable">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2 max-w-md"
              >
                {footer.topics.map((topic, index) => (
                  <Draggable key={topic} draggableId={topic} index={index}>
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex justify-between items-center rounded-lg p-3 border border-indigo-200 shadow-sm bg-indigo-50 ${
                          snapshot.isDragging ? "bg-indigo-100" : ""
                        }`}
                      >
                        <span className="cursor-move mr-2 text-indigo-700">
                          <Move size={18} />
                        </span>
                        <span className="flex-grow">{topic}</span>
                        <button
                          onClick={() => removeTopic(index)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Links Section */}
      <div>
        <h3 className="text-xl font-semibold text-indigo-600 mb-3">Navigation Links</h3>
        <div className="flex flex-col md:flex-row gap-3 mb-4 max-w-xl">
          <input
            className="flex-grow border border-indigo-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="Label"
            value={newLink.label}
            onChange={(e) => setNewLink({ ...newLink, label: e.target.value })}
          />
          <input
            className="flex-grow border border-indigo-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 transition"
            placeholder="URL"
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
          />
          <button
            onClick={addLink}
            className="bg-indigo-600 text-white rounded-lg p-3 flex items-center gap-2 justify-center hover:bg-indigo-700 transition"
          >
            <PlusCircle size={20} /> Add
          </button>
        </div>

        <DragDropContext onDragEnd={(result) => onDragEnd(result, "links")}>
          <Droppable droppableId="linksDroppable">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2 max-w-xl"
              >
                {footer.links.map((link, index) => (
                  <Draggable
                    key={link.label + index}
                    draggableId={link.label + index}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex justify-between items-center rounded-lg p-3 border border-indigo-200 shadow-sm bg-indigo-50 ${
                          snapshot.isDragging ? "bg-indigo-100" : ""
                        }`}
                      >
                        <span className="cursor-move mr-2 text-indigo-700">
                          <Move size={18} />
                        </span>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-grow truncate hover:underline"
                        >
                          {link.label} &rarr; {link.url}
                        </a>
                        <button
                          onClick={() => removeLink(index)}
                          className="text-red-500 hover:text-red-700 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={20} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default JournalistFooterAdmin;

