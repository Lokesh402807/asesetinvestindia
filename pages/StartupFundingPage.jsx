// pages/StartupFundingPage.jsx
import React, { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

/**
 * Premium Startup Funding page.
 * Accepts onServiceSelect (callback when a service card clicked)
 * and setCurrentPage (to go back home or other pages).
 *
 * Make sure images referenced here exist under public/images/startup/...
 */

const StartupFundingPage = ({ onServiceSelect, setCurrentPage }) => {
  const clientLogos = [
    "/images/startup/clients/client1.png",
    "/images/startup/clients/client2.png",
    "/images/startup/clients/client3.png",
    "/images/startup/clients/client4.png",
    "/images/startup/clients/client5.png",
    "/images/startup/clients/client6.png",
  ];

  const industries = [
    "Fintech","Proptech","Insurtech","Wealthtech",
    "Autotech","Legaltech","Edtech","Foodtech",
    "Ecommerce","Biotech","Healthtech","Agritech"
  ];

  const blogs = [
    { title: "From Idea to Market: Mastering Validation", img: "/images/startup/blog1.jpg" },
    { title: "A 50/50 Split Among Co-founders: A Mistake", img: "/images/startup/blog2.jpg" },
    { title: "Angel Investing 101: Your Guide", img: "/images/startup/blog3.jpg" },
  ];

  const counters = [
    { id: "c1", end: 500, label: "Startups Made Investment Ready" },
    { id: "c2", end: 1500, label: "Startup Founders Impacted" },
    { id: "c3", end: 20000000, label: "Capital Raised (₹)" },
    { id: "c4", end: 1000, label: "Jobs Created" },
  ];

  useEffect(() => {
    const els = document.querySelectorAll(".reveal-on-scroll");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("revealed");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const animateCounter = (el, end) => {
      const duration = 1400;
      let start = 0;
      const stepTime = Math.max(Math.floor(duration / Math.abs(end - start)), 12);
      const startTime = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        if (end >= 1000000) {
          el.innerText = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(value);
        } else {
          el.innerText = value.toLocaleString();
        }
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const counterEls = document.querySelectorAll(".counter");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          const end = parseInt(entry.target.dataset.end, 10) || 0;
          animateCounter(entry.target, end);
          entry.target.dataset.animated = "1";
        }
      });
    }, { threshold: 0.4 });

    counterEls.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7f9ff] to-white font-sans">
      <style jsx="true">{`
        .floating-shape { position: absolute; border-radius: 24px; filter: blur(20px); transform: rotate(15deg); }
        .ribbon-wrap {
  overflow: hidden;
  pointer-events: none;
}

.ribbon-track {
  display: flex;
  gap: 24px;
  width: max-content;
  padding: 8px 40px;
  animation: ribbonScroll 20s linear infinite;
}

.ribbon {
  transform: rotate(-6deg);
  background: linear-gradient(90deg, #01d2c8, #00b0ff);
  color: #012;
  font-weight: 700;
  display: inline-block;
  padding: 14px 30px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.08);
  white-space: nowrap;
}

@keyframes ribbonScroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

        .reveal-on-scroll { opacity: 0; transform: translateY(18px) scale(0.99); transition: all 700ms cubic-bezier(.2,.9,.2,1); }
        .reveal-on-scroll.revealed { opacity: 1; transform: translateY(0) scale(1); }
        .hero-gradient-text { background: linear-gradient(90deg,#0ea5e9,#7c3aed); -webkit-background-clip:text; color:transparent; }
      `}</style>

      {/* HERO */}
      <section className="relative overflow-hidden pt-24 pb-20">
        <div className="absolute -right-40 -top-10 floating-shape bg-[#7c3aed]" style={{width:220,height:220,opacity:0.06}} />
        <div className="absolute left-8 top-40 floating-shape bg-[#00b0ff]" style={{width:300,height:300,opacity:0.06}} />

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal-on-scroll">
            <button onClick={() => setCurrentPage('home')} className="inline-flex items-center gap-2 text-sm text-[#0b86a6] mb-4">
              <ArrowLeft size={18} /> Back to home
            </button>

            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight text-[#0f1724]">
              World-Class <span className="hero-gradient-text">Fundraising Solutions</span><br /> for your Startup Journey 🚀
            </h1>

            <p className="mt-6 text-gray-600 max-w-2xl">
              Pitch decks, financial models, valuation, investor outreach and coaching — we make you investment-ready with a premium end-to-end service.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
  onClick={() => window.dispatchEvent(new Event("open-consultation"))}
  className="px-7 py-3 bg-[#0066ff] text-white rounded-full shadow-lg hover:scale-[1.02] transition"
>
  Book A Call
</button>

              <button onClick={() => document.querySelector('#about-startup')?.scrollIntoView({behavior:'smooth'})} className="px-7 py-3 rounded-full border border-[#0066ff] text-[#0066ff] bg-white/70 hover:bg-white transition">Learn More</button>
            </div>
          </div>

          <div className="reveal-on-scroll">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src="/images/startup/hero.jpg" alt="hero" className="w-full h-[380px] object-cover" />
              <div className="absolute left-4 bottom-4 bg-white/70 rounded-full px-4 py-2 text-sm font-semibold">Watch our process</div>
            </div>
          </div>
        </div>

     <div className="mt-10 ribbon-wrap">
  <div className="ribbon-track">
    {/* SET 1 */}
    <div className="ribbon">Pitching Is Hell? 😵 We Make It Easy For You — Book A Free Call</div>
    <div className="ribbon">Pitching Is Hell? 😵 We Make It Easy For You — Book A Free Call</div>
    <div className="ribbon">Pitching Is Hell? 😵 We Make It Easy For You — Book A Free Call</div>

    {/* SET 2 (DUPLICATE – REQUIRED) */}
    <div className="ribbon">Pitching Is Hell? 😵 We Make It Easy For You — Book A Free Call</div>
    <div className="ribbon">Pitching Is Hell? 😵 We Make It Easy For You — Book A Free Call</div>
    <div className="ribbon">Pitching Is Hell? 😵 We Make It Easy For You — Book A Free Call</div>
  </div>
</div>

      </section>

      {/* CLIENTS */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm text-gray-500 mb-6">Trusted by startups & partners</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
            {clientLogos.map((l, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl shadow-sm">
                <img src={l} alt={`client-${idx}`} className="mx-auto h-12 object-contain" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT + COUNTERS */}
      <section id="about-startup" className="py-20 px-6 bg-[#f6f9ff]">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div className="reveal-on-scroll">
            <h2 className="text-3xl font-bold mb-4">We help seed-stage startups pitch their story effectively to investors.</h2>
            <p className="text-gray-600 mb-6">From validation to term-sheet, our team prepares everything required to raise capital and scale quickly.</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {counters.map((c) => (
                <div key={c.id} className="bg-white p-6 rounded-2xl shadow">
                  <div className="text-3xl font-extrabold text-[#0066ff] counter" data-end={c.end}>0</div>
                  <div className="text-xs text-gray-600 mt-2">{c.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal-on-scroll">
            <img src="/images/startup/about.jpg" alt="about" className="w-full rounded-2xl shadow-lg object-cover" />
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Industries we've served</h3>
          <p className="text-gray-500 mb-8">We've supported founders across many verticals — we bring sector-specific investor insight.</p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {industries.map((it) => (
              <div key={it} className="bg-white rounded-xl border p-4 hover:shadow-md transition">
                <div className="text-lg font-medium">{it}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PERKS */}
      <section className="py-16 px-6 bg-[#f3f7ff]">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Perks of Working with Us</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow reveal-on-scroll">
              <h4 className="font-bold text-xl mb-3">Say No to Trial & Error</h4>
              <p className="text-gray-600">Proven playbooks — pitch, financials, outreach. Skip wasted cycles.</p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow reveal-on-scroll">
              <h4 className="font-bold text-xl mb-3">We Make You Investment-Ready</h4>
              <p className="text-gray-600">Decks, models, due diligence — all investor-grade outputs.</p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow reveal-on-scroll">
              <h4 className="font-bold text-xl mb-3">Fundraising Made Simpler</h4>
              <p className="text-gray-600">Outreach, intro lists, pitch coaching & call support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BLOGS */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold">Latest from our blog</h3>
            <button className="px-4 py-2 border rounded-full text-sm">View all</button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {blogs.map((b, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow hover:shadow-lg transition reveal-on-scroll">
                <img src={b.img} alt={b.title} className="h-48 w-full object-cover" />
                <div className="p-5">
                  <h4 className="font-semibold">{b.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0b1220] text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Raise funds like the top 1%</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-6">Let's prepare your deck, financials and outreach — and get you investor ready.</p>
        <button onClick={() => setCurrentPage('contact')} className="px-8 py-3 bg-[#00c3ff] rounded-full font-semibold text-black shadow-lg">Get Started</button>
      </section>
    </div>
  );
};

export default StartupFundingPage;
