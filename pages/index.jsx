// pages/index.jsx
import React, { useState, useEffect } from 'react';
import {
  

  Menu,
  X,
  Lock,
  Handshake,
  Gauge,
  Settings,
  Send,
  Linkedin,
  Facebook,
  Twitter,
  Layers,
  Zap,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';
import ResourcesPage from './ResourcesPage';
import StartupFundingPage from "./StartupFundingPage";


// =========================
// SERVICE DATA
// =========================

const ALL_SERVICES_DATA = [
  // Group 1: General & Startup
  {
    id: 'real_estate',
    title: 'Real Estate Services',
    image: '/images/services/real_estate.jpg',
    description:
      'Expert consultation and management for commercial and residential property investments across India.',
    longDescription:
      'We provide end-to-end advisory on real estate investments, covering due diligence, property valuation, legal documentation, and transaction management for both commercial and residential assets across major Indian cities. Our focus is on maximizing RoI while ensuring compliance with RERA regulations and local land laws. We structure deals for HNI clients and corporate entities looking to build or divest property portfolios, offering clear, actionable insights into market trends and future growth corridors.',
    keyFeatures: [
      'RERA-Compliant Due Diligence & Audits',
      'Commercial and Residential Portfolio Management',
      'Strategic Advisory on Land Acquisition & Sales',
      'Project Finance Structuring for Developers',
    ],
  },
  {
    id: 'dormant_bank',
    title: 'Bank Dormant Account Activation',
    image: 'https://placehold.co/120x80/4f46e5/ffffff?text=Dormant+Acct',
    description:
      'Assistance in reactivating dormant or inoperative bank accounts and managing associated compliance.',
    longDescription:
      'Navigating the process of activating dormant bank accounts or retrieving unclaimed funds can be tedious. We offer professional liaison and documentation services to streamline the process, ensuring compliance with RBI guidelines on KYC and due diligence. This service minimizes the time and complexity involved, enabling swift access to your funds, whether personal or corporate.',
    keyFeatures: [
      'RBI-Compliant KYC Document Submission',
      'Expedited Account Reactivation Process',
      'Retrieval of Unclaimed Deposits & Interest',
      'Liaison with Banking Compliance Teams',
    ],
  },
  {
    id: 'startup_funding',
    title: 'Startup Funding Solutions',
    image: 'https://placehold.co/120x80/4f46e5/ffffff?text=Startup+Fund',
    description:
      'Comprehensive support for raising capital: grants, equity funds, angel investors, and venture capital.',
    longDescription:
      'We specialize in early-stage to growth-stage funding, preparing comprehensive financial models, valuation reports, and pitch decks compliant with SEBI regulations. Our network includes Angel Investors, Micro-VCs, and institutional funds specific to the Indian market. We manage the entire fundraising lifecycle, from investor identification and outreach to term sheet negotiation and final legal closure.',
    keyFeatures: [
      'SEBI-Compliant Valuation & Pitch Deck Creation',
      'Angel/VC/P.E. Investor Introductions',
      'Strategic Structuring for Equity Dilution',
      'Access to Government Startup Grants & Incentives',
    ],
  },
  {
    id: 'govt_schemes',
    title: 'All Government Subsidies & Schemes',
    image: 'https://placehold.co/120x80/4f46e5/ffffff?text=Govt+Subsidies',
    description:
      'Advisory on accessing state and central government subsidy and incentive schemes for your business.',
    longDescription:
      'The Indian government offers numerous incentive schemes (e.g., PLI, MUDRA, state-specific industrial subsidies). We provide expert identification and application support to ensure your business qualifies and successfully obtains maximum benefits. Our team handles documentation, application filing, and continuous follow-up with relevant ministries and state development corporations to unlock non-dilutive capital.',
    keyFeatures: [
      'Identification of Applicable Central/State Schemes',
      'Meticulous Documentation and Application Filing',
      'Compliance Audits for Subsidy Utilization',
      'Liaison for Scheme Approval and Disbursement',
    ],
  },
  {
    id: 'forex',
    title: 'Forex Currency Exchange',
    image: 'https://placehold.co/120x80/4f46e5/ffffff?text=Forex+Exchange',
    description:
      'Reliable services for foreign exchange, currency hedging, and international fund transfers.',
    longDescription:
      'We provide specialized forex services that go beyond simple exchange, offering sophisticated currency hedging strategies to mitigate exchange rate volatility for import/export businesses. Our services ensure adherence to FEMA guidelines for all international transfers, providing competitive rates and fast, secure execution for both corporate and personal remittances.',
    keyFeatures: [
      'FEMA-Compliant International Transfers',
      'Advanced Currency Hedging Strategies',
      'Competitive Spot & Forward Rate Execution',
      'Advisory on Expatriate Remittance Rules',
    ],
  },
  {
    id: 'cibil',
    title: 'CIBIL Problem Resolution',
    image: 'https://placehold.co/120x80/4f46e5/ffffff?text=CIBIL+Fix',
    description:
      'Expert solutions for improving CIBIL/credit scores and resolving related financial history issues.',
    longDescription:
      'A strong credit score is critical for securing future financing at favorable rates. We perform a detailed analysis of your credit report, identify errors, and aggressively pursue dispute resolution with credit bureaus and lending institutions. Our strategies focus on legally repairing damaged credit histories and building the right financial behaviour to reach a strong score.',
    keyFeatures: [
      'In-Depth Credit Report Error Analysis',
      'Aggressive Dispute Resolution with Credit Bureaus',
      'Structured Plan for Score Improvement',
      'Negotiation Support for Debt Settlement',
    ],
  },
  {
    id: 'new_age_loans',
    title: 'New Age Loan Services',
    image: 'https://placehold.co/120x80/4f46e5/ffffff?text=New+Loans',
    description:
      'Innovative and flexible loan products tailored for modern business and personal financial needs.',
    longDescription:
      'This service focuses on leveraging alternative data and advanced fintech underwriting models to provide financing where traditional banks may hesitate. We connect clients with NBFCs and digital lenders for unsecured term loans, merchant cash advances, and invoice financing—characterised by rapid disbursement and customised repayment schedules.',
    keyFeatures: [
      'Fintech-Powered Rapid Disbursement Loans',
      'Access to NBFCs and Digital Lenders',
      'Minimal Documentation Requirements',
      'Repayment Structured Around Cash Flow',
    ],
  },

  // Group 2: Collateral & Finance
  {
    id: 'ipr_loan',
    title: 'IPR Against Loan Services',
    image: 'https://placehold.co/120x80/f59e0b/000000?text=IPR+Loan',
    description:
      'Using Intellectual Property Rights (IPR) such as patents and trademarks as collateral for financing.',
    longDescription:
      'IPR financing is a specialised niche where we help businesses monetise their intangible assets by using them as collateral. We perform rigorous IP valuation to determine financing limits and structure the lending agreement with specialised institutions. This allows innovation-driven companies to unlock capital without diluting equity.',
    keyFeatures: [
      'Rigorous IP Valuation for Collateral Assessment',
      'Loan Structuring Against Patents/Trademarks',
      'Non-Dilutive Capital for R&D-Heavy Businesses',
      'Liaison with Specialised IP-Focused Lenders',
    ],
  },
  {
    id: 'insurance_loan',
    title: 'Insurance Against Loan',
    image: 'https://placehold.co/120x80/f59e0b/000000?text=Insur+Loan',
    description:
      'Structuring insurance coverage tied to loan repayment obligations to mitigate risk.',
    longDescription:
      'We structure loan protection insurance policies that guarantee loan repayment in the event of unforeseen circumstances. This protects both the borrower’s assets and the lender’s risk profile, often resulting in more favourable loan terms.',
    keyFeatures: [
      'Loan Repayment Risk Mitigation Solutions',
      'Cost-Effective Policy Structuring',
      'Assessment of Liability and Coverage Gaps',
      'Favourable Loan Terms via Enhanced Security',
    ],
  },
  {
    id: 'mf_loan',
    title: 'Mutual Fund Against Loan',
    image: '/images/services/mutual_fund.jpg',
    description:
      'Loan services secured against existing Mutual Fund investments for liquidity needs.',
    longDescription:
      'Also known as Loan Against Securities (LAS), this allows investors to obtain liquidity against their existing Mutual Fund portfolio without selling the units. We ensure maximum LTV and manage margin calls while your investments continue to earn returns.',
    keyFeatures: [
      'Loan Against Securities (LAS) Expertise',
      'High LTV and Competitive Interest Rates',
      'Continuation of Investment Earnings',
      'Efficient Management of Margin Requirements',
    ],
  },
  {
    id: 'private_finance',
    title: 'Private Finance Loan',
    image: 'https://placehold.co/120x80/f59e0b/000000?text=Private+Finance',
    description:
      'Access to private sector lending and non-bank financing solutions for quick disbursement.',
    longDescription:
      'We connect clients to a robust network of private lenders and high-net-worth individuals. This channel offers significantly faster sanction and disbursement timelines than traditional banking, with greater flexibility on collateral.',
    keyFeatures: [
      'Rapid Disbursement for Urgent Capital Needs',
      'Access to Non-Institutional Private Lenders',
      'Flexible Collateral and Repayment Terms',
      'Legal Vetting of All Private Lending Agreements',
    ],
  },
  {
    id: 'cheque_loan',
    title: 'Cheque Based Loan Services',
    image: 'https://placehold.co/120x80/f59e0b/000000?text=Cheque+Loan',
    description:
      'Short-term financing solutions based on post-dated or security cheques for immediate working capital.',
    longDescription:
      'Primarily a short-term working capital solution, this service offers quick access to cash based on the security of post-dated cheques or future receivables. Ideal for businesses with cyclical cash flows or those needing bridging finance.',
    keyFeatures: [
      'Short-Term Working Capital Facility',
      'Quick Assessment Based on Bank Statements',
      'Ideal for Bridging Finance Requirements',
      'Legally Sound PDC/Security Cheque Agreements',
    ],
  },
  {
    id: 'plot_loan',
    title: 'Plot Loan Services',
    image: 'https://placehold.co/120x80/f59e0b/000000?text=Plot+Loan',
    description:
      'Specialised financing for purchasing non-agricultural residential or commercial plots.',
    longDescription:
      'Plot loans require specific due diligence regarding land titles, zoning permissions, and municipal clearances. We specialise in sourcing and processing loans for the purchase of compliant plots with competitive interest rates and tenures.',
    keyFeatures: [
      'Title and Zoning Due Diligence',
      'Financing for Non-Agricultural Residential Plots',
      'Competitive Interest Rates and Long Tenure Options',
      'Assistance with Municipal Approvals and Clearances',
    ],
  },
  {
    id: 'overdraft',
    title: 'Over Draft Loan (OD)',
    image: 'https://placehold.co/120x80/f59e0b/000000?text=Over+Draft',
    description:
      'Setting up and managing Overdraft facilities for businesses and high-net-worth individuals.',
    longDescription:
      'An Overdraft facility is a flexible, short-term borrowing arrangement crucial for managing variable working capital. We establish OD limits against security or as clean facilities based on current account performance.',
    keyFeatures: [
      'Highly Flexible Working Capital Management',
      'Setting Optimal Limits Against Collateral',
      'Interest Payable Only on Utilised Amount',
      'Streamlined Documentation for OD Sanction',
    ],
  },

  // Group 3: Business & M&A
  {
    id: 'cash_credit',
    title: 'Cash Credit Loan (CC)',
    image: 'https://placehold.co/120x80/059669/ffffff?text=Cash+Credit',
    description:
      'Working capital finance solutions using Cash Credit to manage operational expenditures.',
    longDescription:
      'Cash Credit is a running finance limit sanctioned against inventory and receivables—ideal for manufacturing and trading companies. We prepare the necessary stock and book debt statements and ensure compliance with stock audit requirements.',
    keyFeatures: [
      'Running Finance Against Inventory and Receivables',
      'Structuring for Manufacturing/Trading Entities',
      'Preparation of Stock & Book Debt Statements',
      'Compliance with Stock Audit Regulations',
    ],
  },
  {
    id: 'sme',
    title: 'SME Loan',
    image: 'https://placehold.co/120x80/059669/ffffff?text=SME+Loan',
    description:
      'Tailored loan products and financial support for Small and Medium Enterprises.',
    longDescription:
      'We source a range of SME products including term loans for fixed assets, working capital limits, and specialised schemes under SIDBI and government mandates. Our expertise lies in presenting financials and growth projections to secure the best terms.',
    keyFeatures: [
      'Specialised SIDBI/Govt. Loan Scheme Access',
      'Unsecured and Secured Term Loan Structuring',
      'Financial Modelling for Growth Projections',
      'Focus on Capital for Expansion and Modernisation',
    ],
  },
  {
    id: 'franchise_model',
    title: 'Franchise Model Creation Services',
    image: 'https://placehold.co/120x80/059669/ffffff?text=Franchise+Model',
    description:
      'Consulting for developing a scalable and legally sound business franchise model.',
    longDescription:
      'We assist businesses in standardising their operations and legal framework to create a replicable franchise model. This includes drafting FDDs, operational manuals, and structuring royalties and fees for rapid expansion.',
    keyFeatures: [
      'Drafting of Franchise Disclosure Document (FDD)',
      'Standardisation of Operational and Training Manuals',
      'Legal Structuring for Royalty and Fee Collection',
      'Financial Modelling for Franchisee Profitability',
    ],
  },
  {
    id: 'brand_franchise',
    title: 'Brand Franchise Services',
    image: 'https://placehold.co/120x80/059669/ffffff?text=Brand+Franchise',
    description:
      'Assistance with brand licensing, franchising agreements, and regional expansion strategies.',
    longDescription:
      'We focus on executing brand franchising: identifying and vetting franchisees, negotiating agreements, and territory planning while protecting brand integrity.',
    keyFeatures: [
      'Franchisee Lead Generation and Vetting',
      'Negotiation and Finalisation of Legal Agreements',
      'Territory Mapping and Master Franchise Structuring',
      'Protecting Brand Integrity During Expansion',
    ],
  },
  {
    id: 'company_buy_sell',
    title: 'Company Buy and Sell Services',
    image: 'https://placehold.co/120x80/059669/ffffff?text=Company+M%26A',
    description:
      'Advisory on Mergers & Acquisitions (M&A) and business transfer agreements.',
    longDescription:
      'We provide comprehensive M&A advisory for mid-market businesses: target identification, valuation, due diligence, negotiation and closure of SPAs/BTAs with full regulatory compliance.',
    keyFeatures: [
      'Buy-Side and Sell-Side M&A Due Diligence',
      'Synergistic Company Valuation and Pricing',
      'Negotiation and Structuring of SPAs/BTAs',
      'Regulatory Compliance for Corporate Restructuring',
    ],
  },

  // Group 4: Professional & Institutional
  {
    id: 'professional_loan',
    title: 'Professional Loan Services',
    image: 'https://placehold.co/120x80/dc2626/ffffff?text=Prof+Loan',
    description:
      'Unsecured loans designed for salaried professionals based on income and qualifications.',
    longDescription:
      'These loans are tailored for professionals with stable income streams (CAs, Doctors, Architects, Lawyers, etc.). Typically unsecured, they offer high limits and flexible repayment for clinic setup, office expansion or working capital.',
    keyFeatures: [
      'High-Value Unsecured Term Loans',
      'Rapid Approval based on Professional Credentials',
      'Flexible Use of Funds',
      'Low Interest Rates for Strong Profiles',
    ],
  },
  {
    id: 'doctor_loan',
    title: 'Doctor Loan',
    image: 'https://placehold.co/120x80/dc2626/ffffff?text=Doctor+Loan',
    description:
      'Specialised loan products tailored to the financial needs of medical practitioners.',
    longDescription:
      'We recognise the unique capital needs of medical professionals—from clinic setup to high-end diagnostic equipment. Our doctor loans offer customised repayment schedules aligned with medical practice cash flows.',
    keyFeatures: [
      'Financing for Clinic Setup and Modernisation',
      'Customised Repayment Schedules',
      'Loan Against Future Card Receivables',
      'Competitive Rates Based on Qualifications',
    ],
  },
  {
    id: 'hospital_loan',
    title: 'Hospital Loan',
    image: 'https://placehold.co/120x80/dc2626/ffffff?text=Hospital+Loan',
    description:
      'Financing solutions for setting up, expanding, or modernising hospitals and clinics.',
    longDescription:
      'We provide large-scale institutional finance for healthcare infrastructure, covering land purchase, construction and renovation, working closely with specialised healthcare finance divisions of banks and NBFCs.',
    keyFeatures: [
      'Large-Scale Infrastructure Project Finance',
      'Long-Tenure Term Loans for Construction',
      'Advisory on Regulatory & Compliance Documentation',
      'Financing for Hospital Acquisition/Takeover',
    ],
  },
  {
    id: 'edu_loan',
    title: 'Educational Institutions Loan',
    image: 'https://placehold.co/120x80/dc2626/ffffff?text=Edu+Loan',
    description:
      'Funding for schools, colleges, and educational trusts for infrastructure development.',
    longDescription:
      'We provide capital for infrastructure, hostels, technology upgrades and working capital for educational institutions, structured to align with the regulatory framework.',
    keyFeatures: [
      'Capital for Infrastructure and Capacity Expansion',
      'Financing for Educational Trusts and Societies',
      'Working Capital Against Fee Receivables',
      'Compliance with Education Regulatory Framework',
    ],
  },
  {
    id: 'hospital_equipment',
    title: 'Hospital Equipment Loan',
    image: 'https://placehold.co/120x80/dc2626/ffffff?text=Equip+Loan',
    description:
      'Financing specifically for purchasing high-value medical and hospital equipment.',
    longDescription:
      'We offer asset-backed loans and leasing for high-value medical equipment, providing up to 100% financing with repayment aligned to equipment life and depreciation.',
    keyFeatures: [
      'Asset-Backed Loans and Leasing Solutions',
      'Up to 100% Financing for High-Value Equipment',
      'Repayment Aligned with Depreciation',
      'Rapid Financing for Technology Upgrades',
    ],
  },
  {
    id: 'machinery_loan',
    title: 'Machinery Loan',
    image: 'https://placehold.co/120x80/dc2626/ffffff?text=Machinery+Loan',
    description:
      'Loans dedicated to the purchase of industrial, construction, or manufacturing machinery.',
    longDescription:
      'We facilitate secured term loans for acquisition of new or used plant and machinery. The machinery itself usually serves as primary collateral with quick disbursal.',
    keyFeatures: [
      'Secured Term Loans for Industrial Assets',
      'Financing for New and Used Machinery',
      'Tenure Matched to Asset Life',
      'Quick Disbursement to Avoid Production Delays',
    ],
  },
  {
    id: 'fundraising',
    title: 'All Kinds of Fundraising Support',
    image: 'https://placehold.co/120x80/dc2626/ffffff?text=Fundraising',
    description:
      'Comprehensive capital sourcing services across debt, equity, and alternative structures.',
    longDescription:
      'We structure complex capital stacks across debt, equity and quasi-equity instruments. Acting as your financial manager, we manage all investor/lender relations to secure an efficient capital structure.',
    keyFeatures: [
      'Structuring of Complex Capital Stacks',
      'End-to-End Investor/Lender Relations Management',
      'Advisory on Quasi-Equity Instruments',
      'Optimising Capital for Long-Term Value Creation',
    ],
  },
];

// =========================
// SERVICE CATEGORIES
// =========================

// Startup & Capital
const STARTUP_SERVICE_IDS = [
  'startup_funding',
  'fundraising',
  'govt_schemes',
  'franchise_model',
  'brand_franchise',
  'company_buy_sell',
  'ipr_loan',
];

// Loans - Business, Collateral, Professional
const LOAN_BUSINESS_IDS = [
  'sme',
  'cash_credit',
  'overdraft',
  'new_age_loans',
  'hospital_loan',
  'edu_loan',
  'hospital_equipment',
  'machinery_loan',
];

const LOAN_COLLATERAL_IDS = [
  'mf_loan',
  'private_finance',
  'cheque_loan',
  'plot_loan',
  'real_estate', // ✅ NOW VISIBLE IN LOANS PAGE
];

const LOAN_PROFESSIONAL_IDS = ['professional_loan', 'doctor_loan'];

// Insurance, Credit & Banking Support
const INSURANCE_SERVICE_IDS = [
  'insurance_loan',
  'cibil',
  'forex',
  'dormant_bank',
];

// Real Estate
const REAL_ESTATE_SERVICE_IDS = ['real_estate'];

// =========================
// REUSABLE COMPONENTS
// =========================

const NavItem = ({ onClick, children, isMobile = false }) => (
  <button
    type="button"
    onClick={onClick}
    className={`${
      isMobile ? 'w-full text-left' : ''
    } text-white/90 hover:text-white transition duration-300 px-3 py-2 rounded-lg font-medium focus:outline-none`}
  >
    {children}
  </button>
);

const ServiceCard = ({ image, title, description, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="bg-[#323370] hover:bg-[#393a7b] transition duration-300 rounded-2xl p-5 shadow-lg border border-[#3f4089]/70 flex flex-col text-left"
  >
    <div className="mb-4">
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="w-full h-32 object-cover rounded-xl shadow-md"
      />
    </div>
    <h3 className="text-base font-semibold text-white mb-2 line-clamp-2">
      {title}
    </h3>
    <p className="text-xs text-[#d6d8ff] flex-grow line-clamp-3">
      {description}
    </p>
    <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#0d8db9]">
      View Details
      <span className="ml-1 text-xs">→</span>
    </span>
  </button>
);

const InfoCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white/95 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 border-b-4 border-[#0d8db9]">
    <Icon className="text-[#0d8db9] mb-3" size={28} />
    <h3 className="text-lg font-semibold text-[#1e1f4f] mb-1">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);

// =========================
// CONTACT FORM
// =========================

const ContactForm = ({
  onSuccess,
  includeInterest = true,
  submitLabel = 'Request Consultation',
}) => {
  const [status, setStatus] = useState(null); // 'success', 'error', 'loading'

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus('loading');

    const form = e.target;
    const formData = {
      name: form.name.value,
      email: form.email.value,
      interest: includeInterest ? form.interest.value : null,
      message: form.message.value,
      timestamp: new Date().toISOString(),
    };

    console.log('Contact Form Data (Simulated Save):', formData);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      setStatus('success');
      form.reset();
      if (onSuccess) onSuccess();
      setTimeout(() => setStatus(null), 3000);
    } catch (error) {
      console.error('Simulated Form Submission Error:', error);
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <label className="block">
        <span className="text-sm font-medium text-gray-700">Full Name</span>
        <input
          name="name"
          required
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:border-[#0d8db9] focus:ring-[#0d8db9] transition duration-150"
          placeholder="John Doe"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Email Address</span>
        <input
          name="email"
          type="email"
          required
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:border-[#0d8db9] focus:ring-[#0d8db9] transition duration-150"
          placeholder="you@example.com"
        />
      </label>

      {includeInterest && (
        <label className="block">
          <span className="text-sm font-medium text-gray-700">
            Area of Interest
          </span>
          <select
            name="interest"
            className="mt-1 block w-full px-4 py-3 border border-gray-300 bg-white rounded-lg shadow-sm focus:border-[#0d8db9] focus:ring-[#0d8db9] transition duration-150"
            required
          >
            <option value="">Select an area...</option>
            <option value="Startup Funding Support">
              Startup Funding Support
            </option>
            <option value="Real Estate Services">Real Estate Services</option>
            <option value="Wealth Management">Wealth Management</option>
            <option value="Mergers & Acquisitions">Mergers & Acquisitions</option>
            <option value="Loan Services (Specific)">
              Loan Services (Specific)
            </option>
            <option value="Other">Other</option>
          </select>
        </label>
      )}

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Your Message</span>
        <textarea
          name="message"
          rows="4"
          className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:border-[#0d8db9] focus:ring-[#0d8db9] transition duration-150"
          placeholder="Tell us about your requirements..."
          required
        ></textarea>
      </label>

      {status === 'success' && (
        <div className="p-3 text-center text-sm font-medium bg-green-100 text-green-700 rounded-lg shadow-inner">
          Thank you! Your enquiry has been received. A specialist will contact you
          shortly.
        </div>
      )}
      {status === 'error' && (
        <div className="p-3 text-center text-sm font-medium bg-red-100 text-red-700 rounded-lg shadow-inner">
          Oops! There was an error sending your message. Please try again.
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className={`w-full text-white px-6 py-3 rounded-xl text-lg font-semibold shadow-xl transition duration-300 flex items-center justify-center 
          ${
            status === 'loading'
              ? 'bg-[#0d8db9]/60 cursor-not-allowed'
              : 'bg-[#0d8db9] hover:bg-[#0b769a] transform hover:scale-[1.01]'
          }`}
      >
        {status === 'loading' ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Sending...
          </>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  );
};

// =========================
// SERVICE DETAIL PAGE
// =========================

const ServiceDetailPage = ({ service, setCurrentPage, setIsModalOpen }) => (
  <div className="pt-24 min-h-screen bg-[#f4f5ff]">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button
  type="button"
  onClick={() => {
    setCurrentPage('loans');
    window.scrollTo(0, 0);
  }}

        className="text-[#0d8db9] hover:text-[#0b769a] font-medium flex items-center mb-6 transition duration-150"
      >
        <ArrowLeft size={20} className="mr-2" /> Back
      </button>

      <div className="bg-white p-8 rounded-2xl shadow-2xl border-t-4 border-[#0d8db9]">
        <div className="flex flex-col md:flex-row items-start md:space-x-6 mb-8">
          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            className="w-full md:w-48 h-auto rounded-xl shadow-lg mb-4 md:mb-0 object-cover flex-shrink-0"
          />
          <div>
            <h1 className="text-4xl font-extrabold text-[#1e1f4f] mb-2">
              {service.title}
            </h1>
            <p className="text-lg text-[#0d8db9] font-semibold">
              {service.description}
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
          Comprehensive Overview
        </h2>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          {service.longDescription}
        </p>

        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 flex items-center">
          <Layers size={24} className="mr-2 text-[#0d8db9]" /> Key Service Features
        </h2>
        <ul className="space-y-3 mb-10 list-none pl-0">
          {service.keyFeatures.map((feature, index) => (
            <li key={index} className="flex items-start text-gray-700">
              <CheckCircle
                size={20}
                className="text-emerald-500 mr-3 mt-1 flex-shrink-0"
              />
              <span className="font-medium">{feature}</span>
            </li>
          ))}
        </ul>

        {service.id === 'startup_funding' && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
              Funding Stages (Coming Soon)
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Detailed pages for each funding stage will be added here.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {['Voucher Funding', 'Grant Funding', 'Series A Round', 'Series B Round'].map(
                (label) => (
                  <div
                    key={label}
                    className="bg-[#f4f5ff] border border-[#dde0ff] rounded-xl px-4 py-3 flex items-center justify-between"
                  >
                    <span className="text-sm font-semibold text-[#1e1f4f]">
                      {label}
                    </span>
                    <span className="text-[10px] px-2 py-1 rounded-full bg-[#ffe8b3] text-[#8a5a00] font-semibold uppercase tracking-wide">
                      Coming Soon
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        <div className="text-center mt-8 p-4 bg-[#e2f5fb] rounded-lg">
          <p className="text-xl font-semibold text-[#0b5468] mb-4">
            Ready to move ahead with this solution?
          </p>
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center bg-[#0d8db9] text-white px-8 py-3 rounded-full text-lg font-semibold shadow-xl hover:bg-[#0b769a] transform hover:scale-105 transition duration-300"
          >
            Request Consultation →
          </button>
        </div>
      </div>
    </div>
  </div>
);

// =========================
// CONTACT MODAL
// =========================

const ContactModal = ({ isOpen, setIsOpen }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50 transition-opacity duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsOpen(false);
      }}
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 md:p-8 transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <h2 className="text-2xl font-bold text-[#1e1f4f]">
            Request a Specialized Consultation
          </h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-700 transition duration-150"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <p className="text-gray-600 mb-4">
          Share a few details below and our team will reach out to discuss the best
          structure for your requirement.
        </p>

        <ContactForm
          includeInterest={false}
          submitLabel="Request Consultation"
          onSuccess={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
};

// =========================
// 4x4 SERVICES CAROUSEL (unchanged core)
// =========================

const ServicesCarousel = ({ onServiceSelect }) => {
  const ITEMS_PER_SLIDE = 4;
  const totalSlides = Math.ceil(ALL_SERVICES_DATA.length / ITEMS_PER_SLIDE);
  const [currentSlide, setCurrentSlide] = useState(0);

  const getSlideServices = (slideIndex) => {
    const start = slideIndex * ITEMS_PER_SLIDE;
    const end = start + ITEMS_PER_SLIDE;
    return ALL_SERVICES_DATA.slice(start, end);
  };

  const goToSlide = (index) => {
    const next = (index + totalSlides) % totalSlides;
    setCurrentSlide(next);
  };

  const handlePrev = () => goToSlide(currentSlide - 1);
  const handleNext = () => goToSlide(currentSlide + 1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % totalSlides);
    }, 8000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <section className="py-16 md:py-24 bg-[#2b2b5e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Explore Our Specialized Services
          </h2>
          <p className="text-base sm:text-lg text-[#c1c4ff] max-w-2xl mx-auto">
            A comprehensive array of financial solutions designed to empower your
            growth.
          </p>
        </div>

        <div className="relative mt-6">
          {/* SUPER SEXY FLOATING ARROWS */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous services"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-10 z-30
              hidden sm:flex items-center justify-center
              w-12 h-12 rounded-full
              bg-white/5 hover:bg-white/10
              border border-white/40
              shadow-[0_14px_40px_rgba(0,0,0,0.45)]
              backdrop-blur-md
              transition-transform transition-colors
              duration-300 hover:-translate-x-11"
          >
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
              <ArrowLeft size={18} className="text-white" />
            </div>
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next services"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-10 z-30
              hidden sm:flex items-center justify-center
              w-12 h-12 rounded-full
              bg-white/5 hover:bg-white/10
              border border-white/40
              shadow-[0_14px_40px_rgba(0,0,0,0.45)]
              backdrop-blur-md
              transition-transform transition-colors
              duration-300 hover:translate-x-11"
          >
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
              <ArrowLeft size={18} className="text-white transform rotate-180" />
            </div>
          </button>

          {/* Slider */}
          <div className="overflow-hidden rounded-3xl bg-[#262762] border border-[#3b3d80] shadow-2xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                const slideServices = getSlideServices(slideIndex);
                return (
                  <div
                    key={slideIndex}
                    className="min-w-full px-4 sm:px-8 py-8 sm:py-10"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {slideServices.map((service) => (
                        <ServiceCard
                          key={service.id}
                          image={service.image}
                          title={service.title}
                          description={service.description}
                          onClick={() => onServiceSelect(service.id)}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide ? 'w-6 bg-[#0d8db9]' : 'w-2 bg-white/40'
                }`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// =========================
// LANDING PAGE (HOME)
// =========================

const LandingPageContent = ({
  setCurrentPage,
  setIsModalOpen,
  onServiceSelect,
}) => {
  const placeholderInfoData = [
    {
      icon: Lock,
      title: 'Secure & Transparent',
      description:
        'Clear fee structures and secure handling of all sensitive financial data.',
    },
    {
      icon: Handshake,
      title: 'Dedicated Partnership',
      description:
        'Personalised advisory with continuous support tailored to your goals.',
    },
    {
      icon: Gauge,
      title: 'Speed & Efficiency',
      description:
        'Rapid processing and streamlined documentation to save your time.',
    },
    {
      icon: Settings,
      title: 'Full Spectrum Service',
      description:
        'From real estate to machinery loans, we cover every financial segment.',
    },
  ];

  const testimonials = [
    {
      name: 'Manufacturing SME – Pune',
      heading: 'Working capital in weeks, not months',
      text: '“AssetInvest helped us secure working capital in weeks, not months. Their team handled complete coordination with the bank and kept us updated at every step.”',
    },
    {
      name: 'Multispeciality Hospital – Gujarat',
      heading: 'Structure aligned to hospital cash flows',
      text: '“They structured our hospital equipment loan so EMI matched our cash flows. Very professional, responsive and detail oriented.”',
    },
    {
      name: 'Individual Borrower – Bengaluru',
      heading: 'From CIBIL repair to final approval',
      text: '“From CIBIL repair to final approval, they guided us step by step. Transparent advice and clear explanations at every stage.”',
    },
  ];

  const faqs = [
    {
      q: 'Are you a bank / lender or an intermediary?',
      a: 'We operate as a professional intermediary and advisory firm. We work with multiple banks, NBFCs and private investors to source and structure the most suitable options for your requirement.',
    },
    {
      q: 'How do you charge your fees?',
      a: 'Our fee structure is transparent and typically linked to the size and complexity of the transaction. In many cases, we work on a success-fee basis once capital is sanctioned or disbursed.',
    },
    {
      q: 'How long does it usually take to get funding approved?',
      a: 'Timelines depend on the product and lender, but most cases range between 7–30 working days once documentation is complete. We focus on avoiding delays by preparing files thoroughly before submission.',
    },
    {
      q: 'What basic documents will you need from me?',
      a: 'Typically we will need KYC documents, financial statements, bank statements, and details of assets / collateral (if applicable). For businesses, we also review GST returns and past loan track record.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f4f5ff] font-sans">
      {/* HERO */}
      <section className="pt-16 relative h-[60vh] md:h-[80vh] flex items-center bg-[#2b2b5e] overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="hero-bg-track">
            <img src="/images/hero/1.png" alt="Financial growth" loading="lazy" />
            <img src="/images/hero/2.png" alt="Business meeting" loading="lazy" />
            <img src="/images/hero/3.jpg" alt="Healthcare finance" loading="lazy" />
            <img src="/images/hero/4.png" alt="Industrial projects" loading="lazy" />
            <img src="/images/hero/1.png" alt="" loading="lazy" />
            <img src="/images/hero/2.png" alt="" loading="lazy" />
            <img src="/images/hero/3.jpg" alt="" loading="lazy" />
            <img src="/images/hero/4.png" alt="" loading="lazy" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#2b2b5e]/95 via-[#2b2b5e]/90 to-[#1d2146]/85" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl text-white">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-4">
              Empowering Your Financial Future
            </h1>
            <p className="text-lg sm:text-2xl font-light text-[#a6e7ff] mb-8">
              Comprehensive investment and financing solutions tailored for businesses and
              professionals across India.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="bg-[#0d8db9] text-white px-8 py-3 text-center rounded-full text-lg font-semibold shadow-xl hover:bg-[#0b769a] transform hover:scale-105 transition duration-300"
              >
                Request Consultation
              </button>
              <button
                type="button"
                onClick={() => setCurrentPage('startupFunding')}
                className="bg-transparent border-2 border-white/80 text-white px-8 py-3 text-center rounded-full text-lg font-semibold hover:bg-white hover:text-[#2b2b5e] transform hover:scale-105 transition duration-300"
              >
                🚀 View Startup Solutions
              </button>
            </div>
          </div>
        </div>

        <style jsx="true" global="true">{`
          @keyframes heroSlide {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .hero-bg-track {
            display: flex;
            width: 200%;
            height: 100%;
            animation: heroSlide 60s linear infinite;
          }
          .hero-bg-track img {
            flex: 0 0 12.5%;
            width: 12.5%;
            height: 100%;
            object-fit: cover;
            filter: grayscale(10%) contrast(1.1);
          }
          .hero-bg-track:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* 4 CATEGORY GLASS CARDS */}
      <section className="py-12 md:py-16 bg-[#f4f5ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1e1f4f] mb-6">
            Choose How You Want to Grow
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button
              type="button"
              onClick={() => setCurrentPage('startupFunding')}
              className="group text-left bg-white/80 backdrop-blur-md border border-[#c9d0ff] rounded-3xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">🚀</span>
                <span className="text-sm font-semibold text-[#0d8db9] uppercase tracking-wide">
                  Startup & Growth Capital
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#1e1f4f] mb-2">
                Startup Funding & Investments
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Grants, fundraising, government schemes and strategic capital for
                high-growth businesses.
              </p>
              <span className="text-sm font-semibold text-[#0d8db9] flex items-center">
                Explore Startup Funding
                <Zap size={16} className="ml-1 group-hover:translate-x-1 transition" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage('loans')}
              className="group text-left bg-white/80 backdrop-blur-md border border-[#c9d0ff] rounded-3xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">💰</span>
                <span className="text-sm font-semibold text-[#0d8db9] uppercase tracking-wide">
                  Business, Collateral & Professional
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#1e1f4f] mb-2">
                Loans & Working Capital
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                SME, CC/OD, asset-backed and professional loans designed around real cash
                flows.
              </p>
              <span className="text-sm font-semibold text-[#0d8db9] flex items-center">
                View Loan Solutions
                <Zap size={16} className="ml-1 group-hover:translate-x-1 transition" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage('insurance')}
              className="group text-left bg-white/80 backdrop-blur-md border border-[#c9d0ff] rounded-3xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">🛡</span>
                <span className="text-sm font-semibold text-[#0d8db9] uppercase tracking-wide">
                  Insurance & Credit Profile
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#1e1f4f] mb-2">
                Insurance, CIBIL & Banking Support
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Clean up your credit, protect loans with insurance and manage forex and
                dormant accounts.
              </p>
              <span className="text-sm font-semibold text-[#0d8db9] flex items-center">
                Explore Protection Services
                <Zap size={16} className="ml-1 group-hover:translate-x-1 transition" />
              </span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentPage('loans')}
              className="group text-left bg-white/80 backdrop-blur-md border border-[#c9d0ff] rounded-3xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">🏢</span>
                <span className="text-sm font-semibold text-[#0d8db9] uppercase tracking-wide">
                  Property & Projects
                </span>
              </div>
              <h3 className="text-xl font-bold text-[#1e1f4f] mb-2">
                Real Estate Services
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Transaction support, due diligence and portfolio strategy across Indian
                commercial and residential assets.
              </p>
              <span className="text-sm font-semibold text-[#0d8db9] flex items-center">
                View Real Estate Support
                <Zap size={16} className="ml-1 group-hover:translate-x-1 transition" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="py-6 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs sm:text-sm font-medium text-gray-500 mb-3">
            Our extended network includes leading Banks, NBFCs and Private Investors
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 opacity-80 text-[10px] sm:text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wide">
            <span>Partner Bank Network</span>
            <span>NBFC Partners</span>
            <span>Private Investor Desk</span>
            <span>Institutional Alliances</span>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-16 md:py-24 bg-[#f4f5ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1e1f4f] mb-6 border-l-4 border-[#0d8db9] pl-4">
                Why Partner with AssetInvest India?
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                We are more than just financial advisors; we are your{' '}
                <span className="font-semibold text-[#1e1f4f]">strategic partners</span>{' '}
                in navigating the complex landscape of Indian finance. Our deep domain
                expertise, coupled with an unwavering commitment to transparency and
                client success, sets us apart. We focus on bringing the right capital at
                the right time, with a structure that truly supports your growth.
              </p>
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="text-lg font-semibold text-[#0d8db9] hover:text-[#0b769a] flex items-center group"
              >
                Speak to an Expert
                <Send
                  size={20}
                  className="ml-2 transform group-hover:translate-x-1 transition duration-200"
                />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {placeholderInfoData.map((data, index) => (
                <InfoCard
                  key={index}
                  icon={data.icon}
                  title={data.title}
                  description={data.description}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <section className="py-20 bg-[#1f2148] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1f2148] via-transparent to-[#1f2148]/90 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center relative z-10">
          <div className="text-white">
            <p className="text-xs font-semibold tracking-[0.3em] text-[#8be6ff] mb-3">
              PREMIUM OVERVIEW
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
              Watch How We Build
              <span className="text-[#0d8db9]"> Funding Success Stories </span>
            </h2>
            <p className="text-sm sm:text-base text-[#d7f3ff] mb-6 leading-relaxed">
              A cinematic breakdown of how AssetInvest India identifies, structures, and
              deploys funding solutions designed for businesses, professionals,
              healthcare, real estate, industrial projects, and high-value ventures.
            </p>
            <ul className="space-y-2 text-sm text-[#c9dcff]">
              <li>• How we structure funding using Bank, NBFC & Private channels</li>
              <li>• Behind-the-scenes of approval & negotiation workflow</li>
              <li>• Real clients → real projects → real results</li>
            </ul>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"></div>
            <video
              className="w-full rounded-3xl shadow-2xl border border-white/10 transform group-hover:scale-[1.02] transition duration-500"
              poster="/images/video-thumbnail.jpg"
              controls
              playsInline
            >
              <source src="/videos/assetinvest.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="group-hover:scale-110 transition transform duration-300 bg-white/20 backdrop-blur-xl w-20 h-20 rounded-full flex items-center justify-center border border-white/30 shadow-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES CAROUSEL */}
      <ServicesCarousel onServiceSelect={onServiceSelect} />

      {/* 4-STEP PROCESS */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold tracking-[0.3em] text-[#0d8db9] mb-2">
            RECEIVE FAST APPROVAL
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e1f4f] mb-10">
            4-Step Funding Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left">
            {[
              {
                step: '01',
                title: 'Consultation',
                icon: Handshake,
                text: 'We discuss your requirement, timelines and current financial position to understand the full picture.',
              },
              {
                step: '02',
                title: 'Structuring',
                icon: Layers,
                text: 'We analyse options across banks, NBFCs and private lenders and design the most efficient structure.',
              },
              {
                step: '03',
                title: 'Approval',
                icon: CheckCircle,
                text: 'Our team prepares a lender-ready file and drives the approval process with regular updates.',
              },
              {
                step: '04',
                title: 'Disbursement',
                icon: Gauge,
                text: 'We coordinate documentation, conditions precedent and disbursement until funds hit your account.',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative bg-[#f6f7ff] rounded-3xl shadow-md hover:shadow-xl transition duration-300 px-6 pt-10 pb-8"
              >
                <div className="absolute -top-7 left-6 flex items-center">
                  <div className="w-12 h-12 rounded-full bg-[#0d8db9] flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {item.step}
                  </div>
                  <div className="ml-2 w-10 h-[2px] bg-[#0d8db9]" />
                </div>
                <div className="mt-4 mb-4">
                  <item.icon className="w-8 h-8 text-[#0d8db9]" />
                </div>
                <h3 className="text-lg font-bold text-[#1e1f4f] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="py-16 md:py-24 bg-[#f4f5ff]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e1f4f] mb-12">
            Our Proven Impact
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Clients Empowered' },
              { value: '₹50CR+', label: 'Capital Raised' },
              { value: '15+', label: 'Years Experience' },
              { value: '98%', label: 'Success Rate' },
            ].map((item) => (
              <div
                key={item.label}
                className="p-4 bg-white rounded-xl shadow-lg border-t-4 border-[#0d8db9]"
              >
                <p className="text-4xl md:text-5xl font-extrabold text-[#0d8db9] mb-1">
                  {item.value}
                </p>
                <p className="text-sm md:text-lg text-gray-600 font-medium">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-16 md:py-24 bg-[#252657]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-stretch">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2b2b5e] via-[#252657] to-[#0d8db9] text-white p-8 md:p-10 flex flex-col justify-center">
            <p className="text-xs font-semibold tracking-[0.3em] text-[#a6e7ff] mb-3">
              OUR TESTIMONIALS
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Customer Experiences with Our Funding Solutions
            </h2>
            <p className="text-sm sm:text-base text-[#d6f5ff] max-w-md">
              Our clients share their positive experiences with our loan and investment
              solutions. See how we’ve helped them secure the best deals and create
              long-term confidence in their financial plans.
            </p>
          </div>

          <div className="grid gap-6 md:gap-8">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl shadow-lg px-6 py-6 md:px-7 md:py-7 border border-[#e1e3ff]"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-xs font-semibold text-[#0d8db9] uppercase tracking-wide">
                      Client Story
                    </p>
                    <p className="text-xs text-gray-500">{t.name}</p>
                  </div>
                  <div className="text-[#0d8db9] text-3xl leading-none">“</div>
                </div>
                <p className="text-sm font-semibold text-[#1e1f4f] mb-2">
                  {t.heading}
                </p>
                <p className="text-sm text-gray-600">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-[#f4f5ff]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1e1f4f] mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Still unsure how we work? These answers cover the most common questions
              our clients ask before we start.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 px-5 py-5 border border-[#e2e4ff]"
              >
                <div className="flex items-start">
                  <div className="mt-1 mr-3">
                    <div className="w-8 h-8 rounded-full bg-[#0d8db9]/10 flex items-center justify-center">
                      <span className="text-xs font-semibold text-[#0d8db9]">
                        {idx + 1}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-[#1e1f4f] mb-1">
                      {item.q}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600">{item.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="py-16 md:py-24 bg-[#2b2b5e]">
        <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-4">
            Ready to Discuss Your Requirement?
          </h2>
          <p className="text-center text-[#a6e7ff] mb-8 text-sm sm:text-base">
            Share a few quick details and our team will connect with you to map out the
            right financing strategy.
          </p>

          <div className="bg-white p-8 rounded-xl shadow-2xl">
            <ContactForm includeInterest submitLabel="Request Consultation" />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1f2148] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-4">
            <div className="text-left">
              <p className="text-lg font-bold text-white">AssetInvest INDIA</p>
              <p className="text-xs text-[#c1c4ff] mt-1">
                Office: 2nd Floor, Example Business Park, Main Road,
                <br />
                Your City, India 600000
              </p>
              <p className="text-xs text-[#c1c4ff] mt-1">
                Phone: +91-00000 00000 · Email: contact@assetinvestindia.com
              </p>
            </div>

            <div className="text-center md:text-right">
              <p className="text-xs text-[#c1c4ff] mb-2">
                Follow us for updates and insights
              </p>
              <div className="flex justify-center md:justify-end space-x-5 mb-2">
                <a
                  href="#"
                  className="text-[#a6b0ff] hover:text-white transition duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={22} />
                </a>
                <a
                  href="#"
                  className="text-[#a6b0ff] hover:text-white transition duration-300"
                  aria-label="Facebook"
                >
                  <Facebook size={22} />
                </a>
                <a
                  href="#"
                  className="text-[#a6b0ff] hover:text-white transition duration-300"
                  aria-label="Twitter"
                >
                  <Twitter size={22} />
                </a>
              </div>
            </div>
          </div>

          <p className="text-center text-[#8b8fff] text-xs">
            &copy; {new Date().getFullYear()} AssetInvest India. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

// =========================
// STARTUP FUNDING PAGE
// =========================

// =========================
// LOANS PAGE
// =========================
const LoansPage = ({ onServiceSelect }) => {
  const sections = [
    {
      title: 'Business & Working Capital Loans',
      desc: 'Funding solutions structured for operating efficiency and growth.',
      items: LOAN_BUSINESS_IDS,
    },
    {
      title: 'Asset & Collateral Backed Loans',
      desc: 'Loans secured against tangible assets and properties.',
      items: LOAN_COLLATERAL_IDS,
    },
    {
      title: 'Professional & Individual Loans',
      desc: 'Tailored credit products for professionals and salaried individuals.',
      items: LOAN_PROFESSIONAL_IDS,
    },
  ];

  return (
    <div className="pt-28 min-h-screen bg-gradient-to-b from-[#020617] via-[#0b1220] to-[#020617] text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">

        {/* Header */}
        <h1 className="text-5xl font-extrabold mb-6">
          Loan Solutions
        </h1>
        <p className="text-gray-300 max-w-3xl text-lg mb-20">
          Institutional-grade loan products designed around cash flow strength,
          collateral quality and long-term sustainability.
        </p>

        {sections.map((section) => (
          <section key={section.title} className="mb-28">
            <h2 className="text-3xl font-semibold mb-3">
              {section.title}
            </h2>
            <p className="text-gray-400 mb-12 max-w-2xl">
              {section.desc}
            </p>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {ALL_SERVICES_DATA.filter((s) =>
                section.items.includes(s.id)
              ).map((loan) => (
                <div
                  key={loan.id}
                  onClick={() => onServiceSelect(loan.id)}
                  className="group cursor-pointer rounded-3xl overflow-hidden
                             bg-gradient-to-b from-[#0f172a] to-[#020617]
                             border border-white/10
                             shadow-[0_30px_80px_rgba(0,0,0,0.5)]
                             hover:shadow-[0_40px_120px_rgba(13,141,185,0.35)]
                             transition-all duration-500"
                >
                  {/* IMAGE */}
                  <div className="h-52 overflow-hidden">
                    <img
                      src={loan.image || '/images/loan-placeholder.jpg'}
                      alt={loan.title}
                      className="w-full h-full object-cover
                                 scale-105 group-hover:scale-125 transition duration-700"
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="p-8">
                    <h3 className="text-2xl font-semibold mb-3">
                      {loan.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-6">
                      {loan.description}
                    </p>

                    <span className="text-[#8be6ff] font-medium">
                      View details →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

// =========================
// INSURANCE / CREDIT PAGE
// =========================

const InsurancePage = ({ onServiceSelect }) => {
  const sections = [
    {
      title: 'Credit Profile & Banking Support',
      desc: 'Clean-up, compliance and operational banking services.',
      items: ['cibil', 'dormant_bank', 'forex'],
    },
    {
      title: 'Loan Protection & Risk Mitigation',
      desc: 'Insurance-backed financial security solutions.',
      items: ['insurance_loan'],
    },
  ];

  return (
    <div className="pt-28 min-h-screen bg-gradient-to-b from-[#020617] via-[#0b1220] to-[#020617] text-white">
      <div className="max-w-7xl mx-auto px-6 py-20">

        <h1 className="text-5xl font-extrabold mb-6">
          Insurance & Credit Support
        </h1>
        <p className="text-gray-300 max-w-3xl text-lg mb-20">
          Protect your loans, improve creditworthiness and manage banking
          operations with compliant, structured advisory.
        </p>

        {sections.map((section) => (
          <section key={section.title} className="mb-28">
            <h2 className="text-3xl font-semibold mb-3">
              {section.title}
            </h2>
            <p className="text-gray-400 mb-12 max-w-2xl">
              {section.desc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {ALL_SERVICES_DATA.filter((s) =>
                section.items.includes(s.id)
              ).map((service) => (
                <div
                  key={service.id}
                  onClick={() => onServiceSelect(service.id)}
                  className="group cursor-pointer rounded-3xl overflow-hidden
                             bg-gradient-to-b from-[#0f172a] to-[#020617]
                             border border-white/10
                             shadow-[0_30px_80px_rgba(0,0,0,0.5)]
                             hover:shadow-[0_40px_120px_rgba(13,141,185,0.35)]
                             transition-all duration-500"
                >
                  <div className="h-52 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover
                                 scale-105 group-hover:scale-125 transition duration-700"
                    />
                  </div>

                  <div className="p-8">
                    <h3 className="text-2xl font-semibold mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <span className="text-[#8be6ff] font-medium">
                      View details →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

// =========================
// REAL ESTATE PAGE
// =========================

const RealEstatePage = ({ onServiceSelect, setCurrentPage }) => {
  const realEstateServices = ALL_SERVICES_DATA.filter((s) =>
    REAL_ESTATE_SERVICE_IDS.includes(s.id)
  );
  const service = realEstateServices[0];

  return (
    <div className="pt-24 min-h-screen bg-[#f4f5ff]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <button
          type="button"
          onClick={() => {
            setCurrentPage('home');
            window.scrollTo(0, 0);
          }}
          className="text-[#0d8db9] hover:text-[#0b769a] font-medium flex items-center mb-6 transition duration-150"
        >
          <ArrowLeft size={20} className="mr-2" /> Back to Home
        </button>

        <h1 className="text-4xl font-extrabold text-[#1e1f4f] mb-6 border-b pb-2">
          Real Estate Services
        </h1>

        {service && (
          <div className="bg-white rounded-2xl shadow-2xl border border-[#dde0ff] p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
            <img
              src={service.image}
              alt={service.title}
              loading="lazy"
              className="w-full md:w-72 h-48 object-cover rounded-xl shadow-md"
            />
            <div>
              <h2 className="text-2xl font-bold text-[#1e1f4f] mb-2">
                {service.title}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                {service.description}
              </p>
              <p className="text-sm text-gray-700 mb-6">
                {service.longDescription}
              </p>
              <button
                type="button"
                onClick={() => onServiceSelect(service.id)}
                className="inline-flex items-center bg-[#0d8db9] text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg hover:bg-[#0b769a] transform hover:scale-105 transition duration-300"
              >
                View Detailed Service Page →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// =========================
// MAIN APP
// =========================

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
  const handler = (e) => {
    console.log("Consultation requested from:", e.detail);
    setIsModalOpen(true);
  };

  window.addEventListener("open-consultation", handler);
  return () => window.removeEventListener("open-consultation", handler);
}, []);


  const selectedService = ALL_SERVICES_DATA.find(
    (s) => s.id === selectedServiceId
  );

  const handleServiceSelect = (serviceId) => {
    setSelectedServiceId(serviceId);
    setCurrentPage('serviceDetail');
    window.scrollTo(0, 0);
  };

  const handleMenuItemClick = (page) => {
    if (page === 'home') {
      setCurrentPage('home');
      setSelectedServiceId(null);
    } else if (
      page === 'startupFunding' ||
      page === 'loans' ||
      page === 'insurance' ||
      page === 'realEstate'||
        page === 'resources'
    ) {
      setCurrentPage(page);
      setSelectedServiceId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (isMenuOpen) setIsMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow =
      isMenuOpen || isModalOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen, isModalOpen]);

 

  const renderContent = () => {
    if (currentPage === 'serviceDetail' && selectedService) {
      return (
        <ServiceDetailPage
          service={selectedService}
          setCurrentPage={setCurrentPage}
          setIsModalOpen={setIsModalOpen}
        />
      );
    }
    if (currentPage === 'startupFunding') {
      return (
        <StartupFundingPage
          onServiceSelect={handleServiceSelect}
          setCurrentPage={setCurrentPage}
        />
      );
    }
    if (currentPage === 'loans') {
      return (
        <LoansPage
          onServiceSelect={handleServiceSelect}
          setCurrentPage={setCurrentPage}
        />
      );
    }
    if (currentPage === 'insurance') {
      return (
        <InsurancePage
          onServiceSelect={handleServiceSelect}
          setCurrentPage={setCurrentPage}
        />
      );
    }
    if (currentPage === 'resources') {
  return <ResourcesPage setCurrentPage={setCurrentPage} />;
}

    return (
      <LandingPageContent
        setCurrentPage={setCurrentPage}
        setIsModalOpen={setIsModalOpen}
        onServiceSelect={handleServiceSelect}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#f4f5ff] font-sans">
      {/* HEADER */}
      <header className="fixed top-0 left-0 w-full z-30 bg-[#2b2b5e] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              type="button"
              onClick={() => handleMenuItemClick('home')}
              className="flex-shrink-0 flex items-center focus:outline-none"
            >
              <span className="text-2xl font-extrabold text-white">
                AssetInvest
              </span>
              <span className="text-sm font-bold text-[#ffb347] ml-1 mt-1">
                INDIA
              </span>
            </button>

            <nav className="hidden md:flex items-center space-x-6 relative">
  <NavItem onClick={() => handleMenuItemClick('home')}>Home</NavItem>
  <NavItem onClick={() => handleMenuItemClick('startupFunding')}>
    Startup Funding
  </NavItem>

  {/* LOANS DROPDOWN */}
  {/* LOANS */}
{/* LOANS */}
<div className="relative">

  {/* Hover wrapper */}
  <div className="group inline-flex items-center gap-1">

    {/* Loans text → GOES TO LOANS PAGE */}
    <button
      type="button"
      onClick={() => handleMenuItemClick('loans')}
      className="text-white/90 hover:text-white font-medium px-3 py-2 rounded-lg"
    >
      Loans
    </button>

    {/* Chevron only → opens dropdown */}
    <span className="text-xs text-white/70 cursor-pointer select-none">
      ▾
    </span>

    {/* DROPDOWN */}
    <div
      className="
        absolute top-full left-1/2 -translate-x-1/2
        mt-2
        w-[760px]
        bg-white rounded-2xl shadow-2xl
        border border-gray-200 z-50

        opacity-0 invisible
        group-hover:opacity-100 group-hover:visible
        transition-opacity duration-200
      "
    >
      {/* hover buffer (IMPORTANT) */}
      <div className="absolute -top-4 left-0 w-full h-4"></div>

      <div className="grid grid-cols-3 gap-8 p-8 text-sm">

        {/* BUSINESS */}
        <div>
          <p className="text-xs font-bold text-[#0d8db9] uppercase mb-4">
            Business Loans
          </p>
          {['sme','cash_credit','overdraft','new_age_loans'].map(id => (
            <button
              key={id}
              onClick={() => handleServiceSelect(id)}
              className="block w-full text-left py-1.5 text-gray-700 hover:text-[#0d8db9]"
            >
              {ALL_SERVICES_DATA.find(s => s.id === id)?.title}
            </button>
          ))}
        </div>

        {/* COLLATERAL */}
        <div>
          <p className="text-xs font-bold text-[#0d8db9] uppercase mb-4">
            Asset / Collateral
          </p>
          {[
            'plot_loan',
            'mf_loan',
            'machinery_loan',
            'private_finance',
            'cheque_loan',
            'real_estate',
          ].map(id => (
            <button
              key={id}
              onClick={() => handleServiceSelect(id)}
              className="block w-full text-left py-1.5 text-gray-700 hover:text-[#0d8db9]"
            >
              {ALL_SERVICES_DATA.find(s => s.id === id)?.title}
            </button>
          ))}
        </div>

        {/* PROFESSIONAL */}
        <div>
          <p className="text-xs font-bold text-[#0d8db9] uppercase mb-4">
            Professional
          </p>
          {[
            'doctor_loan',
            'professional_loan',
            'hospital_loan',
            'edu_loan',
            'hospital_equipment',
          ].map(id => (
            <button
              key={id}
              onClick={() => handleServiceSelect(id)}
              className="block w-full text-left py-1.5 text-gray-700 hover:text-[#0d8db9]"
            >
              {ALL_SERVICES_DATA.find(s => s.id === id)?.title}
            </button>
          ))}
        </div>

      </div>
    </div>
  </div>
</div>


  <NavItem onClick={() => handleMenuItemClick('insurance')}>Insurance</NavItem>
  <NavItem onClick={() => handleMenuItemClick('resources')}>Resources</NavItem>
</nav>


            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="hidden md:block bg-[#0d8db9] text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-[#0b769a] transition duration-300"
            >
              Request Consultation
            </button>

            <button
              type="button"
              className="md:hidden text-white hover:text-gray-200 p-2 rounded-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      <div
        className={`fixed inset-0 bg-white z-20 p-6 pt-20 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <nav className="flex flex-col space-y-4">
  <NavItem 
    onClick={() => { handleMenuItemClick('home'); setIsMenuOpen(false); }} 
    isMobile
  >
    Home
  </NavItem>

  <NavItem 
    onClick={() => { handleMenuItemClick('startupFunding'); setIsMenuOpen(false); }} 
    isMobile
  >
    Startup Funding
  </NavItem>

  <NavItem 
    onClick={() => { handleMenuItemClick('loans'); setIsMenuOpen(false); }} 
    isMobile
  >
    Loans
  </NavItem>

  <NavItem 
    onClick={() => { handleMenuItemClick('insurance'); setIsMenuOpen(false); }} 
    isMobile
  >
    Insurance
  </NavItem>

  <NavItem 
    onClick={() => { handleMenuItemClick('resources'); setIsMenuOpen(false); }} 
    isMobile
  >
    Resources
  </NavItem>

  <button
    type="button"
    onClick={() => {
      setIsModalOpen(true);
      setIsMenuOpen(false);
    }}
    className="mt-6 w-full text-center bg-[#0d8db9] text-white px-4 py-3 rounded-xl text-lg font-semibold shadow-lg hover:bg-[#0b769a] transition duration-300"
  >
    Request Consultation
  </button>
</nav>

      </div>

      {/* PAGE CONTENT */}
      {renderContent()}

      {/* GLOBAL CONTACT MODAL */}
      <ContactModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  );
};

export default App;
