import React, { useMemo, useState, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  Play,
  X,
  Image,
  Film,
  Headphones,
} from "lucide-react";
import { RESOURCES_MENU_ITEMS } from "../data/resourcesData";

/* ---------------------------
   Utilities
--------------------------- */
const truncate = (text, n = 140) =>
  text && text.length > n ? text.slice(0, n) + "…" : text;

/* ---------------------------
   Resource Card
--------------------------- */
const ResourceCard = ({ item, onOpen }) => {
  return (
    <div className="rounded-3xl overflow-hidden bg-white shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="h-44 bg-gradient-to-br from-[#0d8db9] to-[#7c3aed] p-4 flex items-end">
        <div className="flex items-center gap-3 text-white">
          <div className="w-14 h-14 rounded-xl overflow-hidden bg-white/20">
            <img
              src={item.image || "/images/resources/default.jpg"}
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold leading-tight">{item.title}</h3>
            <span className="text-xs opacity-90">{item.category}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm text-gray-600 min-h-[3.5rem]">
          {truncate(item.description)}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => onOpen(item)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d8db9] text-white text-sm font-semibold hover:bg-[#0b769a]"
          >
            <Play size={14} /> Open
          </button>
          <span className="text-xs text-gray-400">ID: {item.id}</span>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------
   Resource Detail Modal
--------------------------- */
const ResourceDetailModal = ({ item, onClose }) => {
  if (!item) return null;

  const requestAsset = () => {
    window.dispatchEvent(
      new CustomEvent("open-consultation", {
        detail: {
          source: "resources",
          asset: item.title,
        },
      })
    );
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl">
        <div className="relative">
          <img
            src={item.image || "/images/resources/default.jpg"}
            alt={item.title}
            className="w-full h-56 object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/90 rounded-full p-2 shadow"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-[#0f1724]">
            {item.title}
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            {item.description}
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div>
              <h4 className="font-semibold mb-2">
                What this resource provides
              </h4>
              <p className="text-sm text-gray-600">
                A professionally curated asset created by our research and
                strategy teams for founders, growth teams and decision makers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">How to access</h4>
              <p className="text-sm text-gray-600">
                Click request and our advisory team will share this asset and
                guide you on applying it to your specific use case.
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={requestAsset}
              className="bg-[#0d8db9] hover:bg-[#0b769a] text-white px-6 py-3 rounded-full font-semibold shadow-lg"
            >
              Request This Asset
            </button>
            <span className="ml-auto text-sm text-gray-500">
              Category:{" "}
              <span className="font-medium text-gray-700">
                {item.category}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------
   Main Page (FIXED)
--------------------------- */
const ResourcesPage = ({ setCurrentPage }) => {
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);

  const PER_PAGE = 9;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return RESOURCES_MENU_ITEMS.filter((r) => {
      if (category !== "All" && r.category !== category) return false;
      if (!q) return true;
      return (
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const items = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => setPage(1), [query, category]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1220] to-[#0b1724] text-white">
      {/* HEADER */}
      <div className="pt-24 pb-10 max-w-7xl mx-auto px-6">
        <button
          onClick={() => setCurrentPage("home")}
          className="flex items-center gap-2 text-sm text-[#9fe6ff] mb-4"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <h1 className="text-4xl font-extrabold">
          Resources & Knowledge Hub
        </h1>
        <p className="text-gray-300 mt-2 max-w-3xl">
          Curated playbooks, templates, media and research assets built for
          founders, operators and investors.
        </p>

        <div className="mt-6 flex flex-col md:flex-row gap-4">
          <div className="relative w-full md:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search resources..."
              className="w-full pl-10 pr-4 py-3 rounded-full text-black"
            />
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-full px-4 py-3 text-black"
          >
            <option value="All">All</option>
            {[...new Set(RESOURCES_MENU_ITEMS.map(r => r.category))].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <ResourceCard
              key={item.id}
              item={item}
              onOpen={() => setSelected(item)}
            />
          ))}
        </div>

        {/* PAGINATION */}
        <div className="mt-10 flex items-center justify-between text-sm text-gray-300">
          <span>
            Showing {(page - 1) * PER_PAGE + 1}–
            {Math.min(page * PER_PAGE, filtered.length)} of{" "}
            {filtered.length}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-3 py-2 rounded bg-white/10 disabled:opacity-40"
            >
              Prev
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-3 py-2 rounded bg-white/10 disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <ResourceDetailModal
        item={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
};

export default ResourcesPage;
