// pages/ResourcesPage.jsx
import React, { useMemo, useState, useEffect } from "react";
import {
  ArrowLeft,
  Search,
  Play,
  X,
  Layers,
  BookOpen,
  FileText,
  Headphones,
  Speaker,
  Film,
  Image,
  Users,
} from "lucide-react";

/**
 * Premium Resources Page — Option B (colorful gradients + animations)
 * Drop this file at /pages/ResourcesPage.jsx and import like before.
 *
 * Props:
 *  - setCurrentPage(pageName)  // used to navigate back to home
 *
 * No downloads or external network calls. Replace images in /public/images/resources/ if you want.
 */

/* ---------------------------
   Data: 29 resources (concise, meaningful descriptions)
   --------------------------- */
const RESOURCES_ITEMS = [
  { id: "content_creation", title: "Content Creation", category: "Content", image: "/images/resources/content.jpg",
    description: "End-to-end content production: strategy, long-form articles, short-form social, and conversion copywriting to drive engagement and leads." },
  { id: "image_creation", title: "Image Creation", category: "Media", image: "/images/resources/image.jpg",
    description: "High-quality commercial photography and on-brand image generation (creative art direction, retouching and vector assets)." },
  { id: "avatar_creation", title: "Avatar Creation", category: "Media", image: "/images/resources/avatar.jpg",
    description: "Custom avatars & brand personas for social, apps and presentations — vector/raster deliverables with multiple poses." },
  { id: "blog", title: "Blog", category: "Content", image: "/images/resources/blog.jpg",
    description: "Editorial blog builds: strategy, pillar pages, SEO-driven posts and editorial calendars to grow organic traffic." },
  { id: "info_graphic", title: "Info Graphic", category: "Design", image: "/images/resources/infographic.jpg",
    description: "Visually compelling infographics that simplify complex data for reports, pitches and social distribution." },
  { id: "ebook", title: "E-Book", category: "Research", image: "/images/resources/ebook.jpg",
    description: "Long-form gated assets — research-driven eBooks and downloadable playbooks to capture qualified leads." },
  { id: "audio_book", title: "Audio-Book", category: "Audio", image: "/images/resources/audiobook.jpg",
    description: "Narrated audio versions of your eBooks and guides with professional voice artists and clean mastering." },
  { id: "play_book", title: "Play Book", category: "Guides", image: "/images/resources/playbook.jpg",
    description: "Operational playbooks and templates your team can follow — from GTM plays to investor outreach workflows." },
  { id: "articles", title: "Articles", category: "Content", image: "/images/resources/articles.jpg",
    description: "Thought leadership pieces and guest article placement that position your leadership in target publications." },
  { id: "white_paper", title: "White Paper", category: "Research", image: "/images/resources/whitepaper.jpg",
    description: "Technical and industry white papers tailored to decision-makers and institutional readers." },
  { id: "news_letter", title: "News Letter", category: "Media", image: "/images/resources/newsletter.jpg",
    description: "Branded newsletters and cadence strategy to nurture audiences and maintain top-of-mind presence." },
  { id: "news_room", title: "News Room", category: "PR", image: "/images/resources/newsroom.jpg",
    description: "Press kits, media pages and a newsroom structure for consistent press coverage and asset distribution." },
  { id: "journalist", title: "Journalist", category: "PR", image: "/images/resources/journalist.jpg",
    description: "Access to journalists & curated PR outreach to place stories in the right industry outlets." },
  { id: "case_studies", title: "Case Studies", category: "Content", image: "/images/resources/casestudy.jpg",
    description: "Client case studies that spotlight ROI, process and the measurable impact of your services." },
  { id: "magazine", title: "Magazine", category: "Media", image: "/images/resources/magazine.jpg",
    description: "Digital or print magazine creation — curated issues, editorials and long-form storytelling." },
  { id: "animation_video", title: "Animation Video", category: "Video", image: "/images/resources/animation.jpg",
    description: "Explainer animations and animated product demos that communicate complex ideas simply." },
  { id: "cartoon_video", title: "Cartoon Video", category: "Video", image: "/images/resources/cartoon.jpg",
    description: "Lighthearted cartoon shorts for social engagement and brand personality." },
  { id: "3d_animation", title: "3D Animation Video", category: "Video", image: "/images/resources/3d.jpg",
    description: "High-fidelity 3D assets and animated sequences for product showcases and investor decks." },
  { id: "stories", title: "Stories", category: "Content", image: "/images/resources/stories.jpg",
    description: "Short narrative formats & brand stories optimized for social platforms and campaigns." },
  { id: "reports", title: "Reports", category: "Research", image: "/images/resources/report.jpg",
    description: "Data-driven reports and market research that position your company as an authority." },
  { id: "guides", title: "Guides", category: "Guides", image: "/images/resources/guides.jpg",
    description: "Hands-on, how-to guides for customers, partners or internal teams — practical and ready to use." },
  { id: "library", title: "Library", category: "Repository", image: "/images/resources/library.jpg",
    description: "Organized collection of templates, assets and playbooks for self-serve access." },
  { id: "glossary", title: "Glossary", category: "Reference", image: "/images/resources/glossary.jpg",
    description: "Domain-specific glossary to make technical terms accessible to all stakeholders." },
  { id: "knowledge_bank", title: "Knowledge Bank", category: "Repository", image: "/images/resources/knowledge.jpg",
    description: "Curated internal knowledge bank with SOPs, checklists and domain expertise." },
  { id: "resources", title: "Resources", category: "Repository", image: "/images/resources/resources.jpg",
    description: "A handpicked selection of must-have templates, checklists and reference assets." },
  { id: "podcast", title: "Podcast", category: "Audio", image: "/images/resources/podcast.jpg",
    description: "Hosted podcast production: concept, recording, editing and distribution to listeners." },
  { id: "rules_note", title: "Rules Note", category: "Reference", image: "/images/resources/rules.jpg",
    description: "Policy notes, governance checklists and operational rules compiled for compliance." },
  { id: "rules_archive", title: "Rules Archives", category: "Reference", image: "/images/resources/archive.jpg",
    description: "Archived governance and policy documents maintained with versioning and date stamps." },
  { id: "document_centre", title: "Document Centre", category: "Repository", image: "/images/resources/doccenter.jpg",
    description: "Centralized document center for contracts, templates and legal-ready resources." },
];

/* ---------------------------
   Small util: truncate
   --------------------------- */
const truncate = (txt, n = 120) =>
  txt && txt.length > n ? txt.slice(0, n - 1) + "…" : txt;

/* ---------------------------
   UI components
   --------------------------- */
const IconBubble = ({ children }) => (
  <div className="w-12 h-12 rounded-lg bg-white/8 backdrop-blur-sm flex items-center justify-center shadow-md">
    {children}
  </div>
);

/* ---------------------------
   Resource Card (gradient heavy)
   --------------------------- */
const ResourceCard = ({ item, onOpen }) => {
  // color seeds to vary card gradient, purely visual
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
    <article
      className={`relative overflow-hidden rounded-3xl shadow-2xl transform hover:-translate-y-2 transition-all duration-400`}
      aria-labelledby={item.id}
    >
      <div className={`h-48 w-full bg-gradient-to-br ${g} bg-cover bg-center`}>
        {/* slight overlay + image */}
        <div className="h-full w-full bg-gradient-to-b from-transparent to-black/8 flex items-end p-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-lg overflow-hidden border border-white/20 bg-white/10 flex-shrink-0">
              <img
                src={item.image || "/images/resources/default.jpg"}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="text-white">
              <h3 id={item.id} className="text-base font-semibold leading-tight">
                {item.title}
              </h3>
              <div className="text-xs opacity-90 mt-1 flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full bg-white/10 text-[11px]">{item.category}</span>
                <span className="text-[11px]">•</span>
                <span className="text-[11px] opacity-90">View</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-4">
        <p className="text-sm text-gray-700 min-h-[3.1rem]">{truncate(item.description, 140)}</p>

        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={() => onOpen(item)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0d8db9] text-white text-sm font-semibold hover:bg-[#0b769a] transition"
          >
            <Play size={14} /> Open
          </button>
          <div className="text-xs text-gray-400">ID: {item.id}</div>
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
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-b from-white to-white p-0">
        <div className="relative">
          <img src={item.image || "/images/resources/default.jpg"} alt={item.title} className="w-full h-56 object-cover" />
          <button onClick={onClose} className="absolute top-4 right-4 bg-white/80 rounded-full p-2 shadow hover:bg-white">
            <X />
          </button>
        </div>

        <div className="p-6 bg-white">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-xl overflow-hidden border">
              <img src={item.image || "/images/resources/default.jpg"} alt={item.title} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-[#0f1724]">{item.title}</h2>
              <div className="mt-2 text-sm text-gray-600">{item.description}</div>

              <div className="mt-6 grid gap-4 grid-cols-1 md:grid-cols-2">
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">What this is</h4>
                  <p className="text-sm text-gray-600">A premium, professionally crafted asset maintained by our creative & research teams for use in marketing, investor outreach, and internal enablement.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">How to use</h4>
                  <p className="text-sm text-gray-600">Review the asset, adapt brand tokens (logo, colors, fonts) and execute the checklist or template included when you request the asset from our team.</p>
                </div>
              </div>

              <div className="mt-6 flex gap-3 items-center">
    <button
  onClick={onRequest}
  className="bg-[#0d8db9] hover:bg-[#0b769a] text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg transition"
>
  Request This Asset
</button>

                
                <div className="ml-auto text-sm text-gray-500">Category: <span className="font-medium text-gray-700">{item.category}</span></div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold mb-2">Related resources</h4>
            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-2 bg-[#f4f6ff] rounded-md text-sm">Template</span>
              <span className="px-3 py-2 bg-[#f4f6ff] rounded-md text-sm">Checklist</span>
              <span className="px-3 py-2 bg-[#f4f6ff] rounded-md text-sm">Guide</span>
            </div>
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
  const PER_PAGE = 9; // 3x3 grid

  const openConsultationModal = () => {
  window.dispatchEvent(
    new CustomEvent("open-consultation", {
      detail: {
        source: "resources",
        asset: selected?.title || null,
      },
    })
  );
};


  // search + filter
  const filtered = useMemo(() => {
    const search = q.trim().toLowerCase();
    return RESOURCES_ITEMS.filter((r) => {
      if (filter !== "All" && r.category.toLowerCase() !== filter.toLowerCase()) return false;
      if (!search) return true;
      return (
        r.title.toLowerCase().includes(search) ||
        r.description.toLowerCase().includes(search) ||
        (r.id && r.id.toLowerCase().includes(search))
      );
    });
  }, [q, filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  // When query/filter change, reset page
  useEffect(() => setPage(1), [q, filter]);

  // reveal-on-scroll (simple)
  useEffect(() => {
    const els = document.querySelectorAll(".reveal-on-scroll");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("revealed");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [page, q, filter]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b1220] to-[#0b1724] text-white font-sans">
      {/* HERO */}
      <header className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gradient-to-br from-[#111827] via-[#0b1220] to-[#111827] rounded-3xl p-8 shadow-2xl border border-white/6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <button onClick={() => setCurrentPage("home")} className="inline-flex items-center gap-2 text-sm text-[#9fe6ff] mb-3 font-medium">
                <ArrowLeft size={16} /> Back to Home
              </button>

              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#00c3ff] to-[#7c3aed]">
                Resources & Knowledge Hub
              </h1>
              <p className="mt-3 text-gray-300 max-w-3xl">
                Premium assets, playbooks and media — built for founders, growth teams and investor-ready companies. Browse, preview and request any item.
              </p>

            
            </div>

            <div className="w-full md:w-96">
              <div className="relative">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search: 'white paper', 'podcast', '3d animation'..."
                  className="w-full rounded-full px-4 py-3 text-black"
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0b1220]">
                  <Search size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold">All Resources</h2>
            <p className="text-sm text-gray-300 mt-1">{filtered.length} assets — curated & maintained by our studio</p>
          </div>

          <div className="flex items-center gap-3">
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-full px-4 py-2 text-black">
              <option value="All">All</option>
              <option value="Content">Content</option>
              <option value="Media">Media</option>
              <option value="Guides">Guides</option>
              <option value="Research">Research</option>
              <option value="Audio">Audio</option>
              <option value="Video">Video</option>
              <option value="Repository">Repository</option>
              <option value="Reference">Reference</option>
              <option value="PR">PR</option>
              <option value="Design">Design</option>
            </select>

            <div className="text-sm text-gray-300">Page {page} / {totalPages}</div>
          </div>
        </div>

        {/* GRID */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paged.map((item) => (
            <div key={item.id} className="reveal-on-scroll">
              <ResourceCard item={item} onOpen={(it) => setSelected(it)} />
            </div>
          ))}
        </section>

        {/* Pagination controls */}
        <div className="mt-8 flex items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => 1)}
              disabled={page === 1}
              className={`px-3 py-2 rounded-md ${page === 1 ? "bg-white/6 text-gray-400" : "bg-white/8 hover:bg-white/12"}`}
            >
              First
            </button>
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-3 py-2 rounded-md ${page === 1 ? "bg-white/6 text-gray-400" : "bg-white/8 hover:bg-white/12"}`}
            >
              Prev
            </button>
            <div className="px-3 py-2 rounded-md bg-white/6 text-sm text-gray-300">Showing {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}</div>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`px-3 py-2 rounded-md ${page === totalPages ? "bg-white/6 text-gray-400" : "bg-white/8 hover:bg-white/12"}`}
            >
              Next
            </button>
            <button
              onClick={() => setPage(totalPages)}
              disabled={page === totalPages}
              className={`px-3 py-2 rounded-md ${page === totalPages ? "bg-white/6 text-gray-400" : "bg-white/8 hover:bg-white/12"}`}
            >
              Last
            </button>
          </div>

          <div className="text-sm text-gray-300">Tips: Enter keyword or choose category to refine results</div>
        </div>

        {/* Team / credits area */}
        <section className="mt-12 bg-white/6 rounded-2xl p-6 border border-white/4">
          <div className="flex items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold">Production Studio</h3>
              <p className="text-sm text-gray-300">Our in-house creative & research teams produce and maintain these assets. Reach out to request bespoke versions.</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-white/8 rounded-lg">
                <Image size={18} /> Creative
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white/8 rounded-lg">
                <Film size={18} /> Video
              </div>
              <div className="flex items-center gap-2 px-3 py-2 bg-white/8 rounded-lg">
                <Headphones size={18} /> Audio
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modal */}
      <ResourceDetailModal
  item={selected}
  onClose={() => setSelected(null)}
  onRequest={openConsultationModal}
/>

      {/* small styles for reveal + helpers */}
      <style jsx>{`
        .reveal-on-scroll { opacity: 0; transform: translateY(18px) scale(.995); transition: all 700ms cubic-bezier(.2,.9,.2,1); }
        .reveal-on-scroll.revealed { opacity: 1; transform: translateY(0) scale(1); }
      `}</style>
    </div>
  );
};

export default ResourcesPage;
