// pages/ResourcesPage.jsx
import React, { useMemo, useState, useEffect } from "react";
import { RESOURCES_MENU_ITEMS } from "../data/resourcesData";
import {
  ArrowLeft,
  Search,
  Play,
  X,
  Film,
  Image,
  Headphones,
} from "lucide-react";

/* ---------------------------
   Small util
--------------------------- */
const truncate = (txt, n = 120) =>
  txt && txt.length > n ? txt.slice(0, n - 1) + "…" : txt;

/* ---------------------------
   Resource Card
--------------------------- */
const ResourceCard = ({ item, onOpen }) => {
  const seed = item.id?.charCodeAt(0) % 5;
  const gradients = [
    "from-[#ff7a8a] via-[#ffb86b] to-[#ffd86b]",
    "from-[#8b5cf6] via-[#06b6d4] to-[#06d6a0]",
    "from-[#06b6d4] via-[#7c3aed] to-[#a78bfa]",
    "from-[#ff7a8a] via-[#ffb86b] to-[#7c3aed]",
    "from-[#00c3ff] via-[#0066ff] to-[#7c3aed]",
  ];
  const g = gradients[seed];

  return (
    <article className="relative overflow-hidden rounded-3xl shadow-2xl transform hover:-translate-y-2 transition-all">
      <div className={`h-48 bg-gradient-to-br ${g} flex items-end p-4`}>
        <div className="flex gap-3 items-center">
          <div className="w-14 h-14 rounded-lg overflow-hidden border bg-white/10">
            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
          </div>
          <div className="text-white">
            <h3 className="font-semibold">{item.title}</h3>
            <span className="text-xs bg-white/10 px-2 py-1 rounded-full">
              {item.category || "General"}
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white p-4">
        <p className="text-sm text-gray-700">{truncate(item.description, 140)}</p>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => onOpen(item)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0d8db9] text-white rounded-full text-sm font-semibold"
          >
            <Play size={14} /> Open
          </button>
          <span className="text-xs text-gray-400">{item.id}</span>
        </div>
      </div>
    </article>
  );
};

/* ---------------------------
   Detail Modal
--------------------------- */
const ResourceDetailModal = ({ item, onClose, onRequest }) => {
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white max-w-4xl w-full rounded-2xl overflow-hidden shadow-2xl">
        <div className="relative">
          <img src={item.image} alt={item.title} className="w-full h-56 object-cover" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2"
          >
            <X />
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold">{item.title}</h2>
          <p className="mt-2 text-gray-600">{item.description}</p>

          <div className="mt-6 flex justify-between items-center">
            <button
              onClick={onRequest}
              className="bg-[#0d8db9] hover:bg-[#0b769a] text-white px-6 py-3 rounded-full font-semibold"
            >
              Request This Asset
            </button>
            <span className="text-sm text-gray-500">
              Category: {item.category || "General"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ---------------------------
   Page Component
--------------------------- */
const ResourcesPage = ({ setCurrentPage }) => {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 9;

  const openConsultationModal = () => {
    window.dispatchEvent(
      new CustomEvent("open-consultation", {
        detail: { source: "resources", asset: selected?.title || null },
      })
    );
  };

  const filtered = useMemo(() => {
    const search = q.toLowerCase();
    return RESOURCES_MENU_ITEMS.filter((r) => {
      if (filter !== "All" && r.category?.toLowerCase() !== filter.toLowerCase()) return false;
      if (!search) return true;
      return (
        r.title.toLowerCase().includes(search) ||
        r.description.toLowerCase().includes(search) ||
        r.id.toLowerCase().includes(search)
      );
    });
  }, [q, filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => setPage(1), [q, filter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1220] to-[#0b1724] text-white">
      <header className="pt-24 pb-12 max-w-7xl mx-auto px-6">
        <button
          onClick={() => setCurrentPage?.("home")}
          className="flex items-center gap-2 text-[#9fe6ff] mb-4"
        >
          <ArrowLeft size={16} /> Back to Home
        </button>

        <h1 className="text-4xl font-extrabold">Resources & Knowledge Hub</h1>
        <p className="text-gray-300 mt-2">
          Browse premium assets, guides and media.
        </p>

        <div className="mt-6 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black" size={18} />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full text-black"
            placeholder="Search resources..."
          />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paged.map((item) => (
            <ResourceCard key={item.id} item={item} onOpen={setSelected} />
          ))}
        </div>
      </main>

      <ResourceDetailModal
        item={selected}
        onClose={() => setSelected(null)}
        onRequest={openConsultationModal}
      />
    </div>
  );
};

export default ResourcesPage;
