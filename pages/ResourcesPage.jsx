import React, { useState, useMemo, useEffect, useRef } from 'react';


import { 
  Search, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Activity
} from 'lucide-react';

/* -------------------------------------------------------------------------- */
/* DATA (UNTOUCHED RESOURCE DATA)                                             */
/* -------------------------------------------------------------------------- */
const RAW_LIST = [
  "Content Creation", "Image Creation", "Avatar Creation", "Blog", "Info graphic",
  "E-Book", "Audio-Book", "Play Book", "Articles", "White Paper",
  "News Letter", "News Room", "Journalist", "Case Studies", "Magazine",
  "Animation Video", "Cartoon Video", "3D Animation Video", "Stories", "Reports",
  "Guides", "Library", "Glossary", "Knowledge Bank", "Resources",
  "Podcast", "Riles Note", "Riles Archives", "Document Centre"
];

const CATEGORY_MAP = {
  VISUAL: ["Image Creation", "Avatar Creation", "Info graphic", "Animation Video", "Cartoon Video", "3D Animation Video"],
  EDITORIAL: ["Content Creation", "Blog", "Articles", "White Paper", "News Letter", "News Room", "Journalist", "Case Studies", "Magazine", "Stories"],
  LITERARY: ["E-Book", "Audio-Book", "Play Book", "Reports", "Guides"],
  ARCHIVE: ["Library", "Glossary", "Knowledge Bank", "Resources", "Riles Note", "Riles Archives", "Document Centre", "Podcast"]
};

const ASSETS = RAW_LIST.map((name, i) => {
  const category = Object.keys(CATEGORY_MAP).find(cat => CATEGORY_MAP[cat].includes(name)) || "GENERAL";
  return {
    id: i + 1,
    name,
    category,
    description: `Automated ${name.toLowerCase()} pipeline utilizing generative intelligence for rapid, high-fidelity output and global distribution.`
  };
});

/* -------------------------------------------------------------------------- */
/* 3D TILT INTERACTIVE CARD                                                   */
/* -------------------------------------------------------------------------- */
const AssetCard = ({ asset, onSelect }) => {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Calculate rotation (max 15 degrees)
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(asset)}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.02, 1.02, 1.02)`,
        transition: 'transform 0.1s ease-out',
      }}
      className="group relative bg-[#111] border border-white/10 rounded-2xl overflow-hidden cursor-pointer shadow-2xl"
    >
      {/* Dynamic Glare Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${(rotate.y + 15) * 3}% ${(rotate.x + 15) * 3}%, rgba(255,255,255,0.1) 0%, transparent 80%)`
        }}
      />
      
      <div className="p-8 relative z-10">
        <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center mb-6 group-hover:bg-purple-600/40 transition-colors duration-500">
          <Sparkles className="text-purple-400" size={24} />
        </div>
        
        <span className="text-[10px] font-black tracking-[0.25em] text-purple-500/80 uppercase">
          {asset.category}
        </span>
        
        <h3 className="text-2xl font-bold mt-2 text-white group-hover:text-purple-300 transition-colors">
          {asset.name}
        </h3>
        
        <p className="text-sm text-white/40 mt-4 leading-relaxed line-clamp-2 font-light">
          {asset.description}
        </p>

        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
          <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest group-hover:text-white transition-colors">
            Initialize
          </span>
          <ArrowRight size={16} className="text-white/20 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* MAIN PAGE                                                                  */
/* -------------------------------------------------------------------------- */
export default function ResourcesPage({ setCurrentPage }) {

  
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 9;

  useEffect(() => {
    if (typeof document === "undefined") return;
    const style = document.createElement("style");
    style.textContent = `
      @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      .animate-marquee { animation: marquee 40s linear infinite; }
      .bg-mesh {
        background-color: #050505;
        background-image: 
          radial-gradient(at 0% 0%, rgba(76, 29, 149, 0.15) 0px, transparent 50%),
          radial-gradient(at 100% 100%, rgba(30, 58, 138, 0.15) 0px, transparent 50%);
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const filteredAssets = useMemo(() => {
    return ASSETS.filter(a => {
      const matchSearch = a.name.toLowerCase().includes(search.toLowerCase());
      const matchFilter = filter === "ALL" || a.category === filter;
      return matchSearch && matchFilter;
    });
  }, [search, filter]);

  const totalPages = Math.ceil(filteredAssets.length / PER_PAGE);
  const currentAssets = filteredAssets.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => { setPage(1); }, [search, filter]);

  return (
    <div className="min-h-screen bg-mesh text-white selection:bg-purple-500/30 font-sans pb-20">
      {/* NAVIGATION */}
      <header className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/5 px-8 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-purple-500 to-blue-600 p-2 rounded-lg">
              <Layers size={20} className="text-white" />
            </div>
            <span className="text-xs font-black tracking-[0.4em] uppercase">AssetIntel</span>
          </div>
 <button
  onClick={() => {
    setCurrentPage('home');
    window.scrollTo(0, 0);
  }}
  className="px-6 py-2 rounded-xl text-[10px] font-black tracking-widest uppercase
             bg-white/5 border border-white/10
             text-white/60 hover:text-white hover:bg-white/10
             transition-all"
>
  Home
</button>



          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-purple-400 transition-colors" size={16} />
            <input
              className="bg-white/5 border border-white/10 rounded-xl pl-12 pr-6 py-2.5 text-sm w-[240px] md:w-[400px] focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:bg-white/10 transition-all"
              placeholder="Search resource archives..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="pt-32 px-8 max-w-7xl mx-auto">
        {/* HERO SECTION */}
        <div className="mb-16">
          <div className="flex items-center gap-2 text-purple-500 mb-4">
            <Activity size={16} />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">System Status: Optimal</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            Resource <span className="text-white/20 font-light">Inventory</span>
          </h1>
        </div>

        {/* TICKER */}
        <div className="mb-12 overflow-hidden border-y border-white/5 py-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-700">
          <div className="flex gap-16 animate-marquee whitespace-nowrap">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex gap-16 text-[10px] font-mono tracking-widest uppercase">
                <span>Neural Engines: <span className="text-purple-400">Online</span></span>
                <span>Data Throughput: <span className="text-blue-400">1.2 TB/s</span></span>
                <span>Global Nodes: <span className="text-green-400">Active</span></span>
              </div>
            ))}
          </div>
        </div>

        {/* CATEGORY FILTERS */}
        <div className="flex gap-3 flex-wrap mb-12">
          {["ALL", ...Object.keys(CATEGORY_MAP)].map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-8 py-3 rounded-xl text-[10px] font-black tracking-widest uppercase transition-all ${
                filter === cat 
                ? "bg-purple-600 text-white shadow-lg shadow-purple-900/20" 
                : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ASSET GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentAssets.map(asset => (
            <AssetCard key={asset.id} asset={asset} onSelect={setSelected} />
          ))}
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-20 flex justify-center items-center gap-12">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="group flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-white/40 hover:text-white disabled:opacity-10 transition-all"
            >
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Prev
            </button>
            <div className="h-1 w-12 bg-white/10 rounded-full relative">
               <div 
                className="absolute h-full bg-purple-500 rounded-full transition-all duration-500" 
                style={{ width: `${(page/totalPages)*100}%` }} 
               />
            </div>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="group flex items-center gap-2 text-[10px] font-black tracking-widest uppercase text-white/40 hover:text-white disabled:opacity-10 transition-all"
            >
              Next <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </main>

      {/* MODAL VIEW */}
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl">
          <div className="relative bg-[#0a0a0a] max-w-2xl w-full rounded-3xl border border-white/10 p-12 overflow-hidden shadow-[0_0_100px_rgba(168,85,247,0.15)]">
            <button onClick={() => setSelected(null)} className="absolute top-8 right-8 text-white/20 hover:text-white transition-colors">
              <X size={24} />
            </button>
            <div className="relative z-10">
              <div className="inline-block px-3 py-1 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400 text-[9px] font-black uppercase tracking-widest mb-6">
                Protocol: {selected.category}
              </div>
              <h2 className="text-5xl font-bold mb-6 tracking-tight">{selected.name}</h2>
              <p className="text-xl text-white/40 font-light leading-relaxed mb-10">
                {selected.description}
              </p>
              <div className="flex gap-4">
                <button className="flex-1 bg-white text-black font-bold py-4 rounded-2xl hover:bg-purple-500 hover:text-white transition-all flex items-center justify-center gap-2">
                  Launch Environment <ExternalLink size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}