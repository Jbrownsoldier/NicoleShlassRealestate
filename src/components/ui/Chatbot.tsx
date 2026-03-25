"use client";

import { useState, useRef, useEffect, useCallback, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";
import { NSMonogram } from "@/components/ui/NSMonogram";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────────────────────

type ChatAction =
  | { type: "node"; id: string }
  | { type: "link"; href: string }
  | { type: "phone" }
  | { type: "email" }
  | { type: "reset" };

type ChatButton = {
  label: string;
  action: ChatAction;
  variant?: "default" | "human" | "cta";
};

type ChatNode = {
  id: string;
  messages: string[];
  buttons: ChatButton[];
};

type Message = { from: "bot" | "user"; text: string };

// ─── Constants ────────────────────────────────────────────────────────────────

const PHONE_HREF = "tel:4162716316";

const HUMAN_BTN: ChatButton = {
  label: "I want to talk to a human",
  action: { type: "phone" },
  variant: "human",
};

// ─── Conversation nodes ───────────────────────────────────────────────────────

const NODES: Record<string, ChatNode> = {
  greeting: {
    id: "greeting",
    messages: [
      "Hi there — I'm Nicole's assistant. 👋",
      "How can I help you today?",
    ],
    buttons: [
      { label: "I'm looking to buy", action: { type: "node", id: "buying_q1" } },
      { label: "I'm looking to sell", action: { type: "node", id: "selling_q1" } },
      { label: "I'm looking to lease", action: { type: "node", id: "leasing_q1" } },
      { label: "Show me available properties", action: { type: "node", id: "properties" } },
      { label: "Just browsing", action: { type: "node", id: "just_browsing" } },
      HUMAN_BTN,
    ],
  },

  // ── BUYING ──────────────────────────────────────────────────────────────────

  buying_q1: {
    id: "buying_q1",
    messages: [
      "Exciting! Quick question — is this your first time purchasing, or have you bought before?",
    ],
    buttons: [
      { label: "First-time buyer", action: { type: "node", id: "buying_first_time" } },
      { label: "I've purchased before", action: { type: "node", id: "buying_experienced" } },
      HUMAN_BTN,
    ],
  },

  buying_first_time: {
    id: "buying_first_time",
    messages: [
      "Welcome — you're in the right hands. Nicole loves working with first-time buyers and will walk you through every step.",
      "What's your approximate budget?",
    ],
    buttons: [
      { label: "Under $600K", action: { type: "node", id: "buying_preapproval" } },
      { label: "$600K – $800K", action: { type: "node", id: "buying_preapproval" } },
      { label: "$800K – $1.2M", action: { type: "node", id: "buying_preapproval" } },
      { label: "Over $1.2M", action: { type: "node", id: "buying_preapproval" } },
      { label: "Not sure yet", action: { type: "node", id: "buying_preapproval" } },
      HUMAN_BTN,
    ],
  },

  buying_experienced: {
    id: "buying_experienced",
    messages: [
      "Great — experience helps. Are you looking to upsize, downsize, or move to a new neighbourhood?",
    ],
    buttons: [
      { label: "Upsize — growing family", action: { type: "node", id: "buying_preapproval" } },
      { label: "Downsize — simplify life", action: { type: "node", id: "buying_preapproval" } },
      { label: "New neighbourhood / lifestyle change", action: { type: "node", id: "buying_preapproval" } },
      { label: "Investment property", action: { type: "node", id: "buying_preapproval" } },
      HUMAN_BTN,
    ],
  },

  buying_preapproval: {
    id: "buying_preapproval",
    messages: [
      "Good to know. Have you spoken with a mortgage broker or been pre-approved yet?",
    ],
    buttons: [
      { label: "Yes, I'm pre-approved", action: { type: "node", id: "buying_area" } },
      { label: "Not yet — I'd like help with that", action: { type: "node", id: "buying_needs_broker" } },
      { label: "I'm a cash buyer", action: { type: "node", id: "buying_area" } },
      HUMAN_BTN,
    ],
  },

  buying_needs_broker: {
    id: "buying_needs_broker",
    messages: [
      "No worries at all — it's very common at this stage.",
      "Nicole works closely with trusted mortgage advisors in Toronto and can point you in the right direction.",
    ],
    buttons: [
      { label: "Book a free consultation with Nicole", action: { type: "link", href: "/concierge" }, variant: "cta" },
      { label: "Get Nicole's contact info", action: { type: "node", id: "contact_info" } },
      { label: "Continue — I'll sort pre-approval later", action: { type: "node", id: "buying_area" } },
      HUMAN_BTN,
    ],
  },

  buying_area: {
    id: "buying_area",
    messages: ["Which part of Toronto are you focused on?"],
    buttons: [
      { label: "West End (Liberty Village, Roncesvalles...)", action: { type: "node", id: "buying_ready" } },
      { label: "Downtown / Central (King West, Annex, Midtown...)", action: { type: "node", id: "buying_ready" } },
      { label: "East End (Leslieville, The Beaches, Danforth...)", action: { type: "node", id: "buying_ready" } },
      { label: "North (Lawrence Park, North York, Forest Hill...)", action: { type: "node", id: "buying_ready" } },
      { label: "Open to anywhere in the GTA", action: { type: "node", id: "buying_ready" } },
      HUMAN_BTN,
    ],
  },

  buying_ready: {
    id: "buying_ready",
    messages: [
      "Nicole knows this city well — she's closed deals across Toronto and has a sharp eye for value.",
      "What would you like to do next?",
    ],
    buttons: [
      { label: "Book a private consultation", action: { type: "link", href: "/concierge" }, variant: "cta" },
      { label: "Send me relevant listings first", action: { type: "email" } },
      { label: "Browse available properties", action: { type: "link", href: "/properties" } },
      { label: "I have more questions", action: { type: "node", id: "what_else" } },
      HUMAN_BTN,
    ],
  },

  // ── SELLING ─────────────────────────────────────────────────────────────────

  selling_q1: {
    id: "selling_q1",
    messages: [
      "Thinking of selling — smart move to start exploring. What type of property are you selling?",
    ],
    buttons: [
      { label: "Condo or apartment", action: { type: "node", id: "selling_timeline" } },
      { label: "Semi-detached or detached house", action: { type: "node", id: "selling_timeline" } },
      { label: "Townhouse", action: { type: "node", id: "selling_timeline" } },
      HUMAN_BTN,
    ],
  },

  selling_timeline: {
    id: "selling_timeline",
    messages: ["Got it. When are you thinking of listing?"],
    buttons: [
      { label: "As soon as possible", action: { type: "node", id: "selling_asap" } },
      { label: "Within 3–6 months", action: { type: "node", id: "selling_planning" } },
      { label: "6–12 months from now", action: { type: "node", id: "selling_future" } },
      { label: "Just exploring my options", action: { type: "node", id: "selling_exploring" } },
      HUMAN_BTN,
    ],
  },

  selling_asap: {
    id: "selling_asap",
    messages: [
      "Nicole specialises in fast, above-asking results — her average is 21 days on market.",
      "Let's move quickly. Would you like to connect right away?",
    ],
    buttons: [
      { label: "Book a free home valuation", action: { type: "link", href: "/concierge" }, variant: "cta" },
      { label: "Call Nicole now", action: { type: "phone" }, variant: "human" },
      { label: "How does the selling process work?", action: { type: "node", id: "how_selling_works" } },
      { label: "Something else", action: { type: "node", id: "what_else" } },
    ],
  },

  selling_planning: {
    id: "selling_planning",
    messages: [
      "Planning ahead puts you in a great position.",
      "Nicole offers a free market evaluation and can walk you through what buyers are looking for right now — so you can prep your home to maximise value.",
    ],
    buttons: [
      { label: "Book a free market evaluation", action: { type: "link", href: "/concierge" }, variant: "cta" },
      { label: "Keep me informed on the market", action: { type: "email" } },
      { label: "Walk me through the selling process", action: { type: "node", id: "how_selling_works" } },
      { label: "Something else", action: { type: "node", id: "what_else" } },
      HUMAN_BTN,
    ],
  },

  selling_future: {
    id: "selling_future",
    messages: [
      "You've got time to prepare — and that's a real advantage.",
      "Nicole can share what today's buyers are prioritising so you can get ahead of the curve.",
    ],
    buttons: [
      { label: "Get Nicole's selling insights", action: { type: "email" } },
      { label: "Book a no-obligation strategy call", action: { type: "link", href: "/concierge" }, variant: "cta" },
      { label: "Walk me through the selling process", action: { type: "node", id: "how_selling_works" } },
      { label: "Something else", action: { type: "node", id: "what_else" } },
      HUMAN_BTN,
    ],
  },

  selling_exploring: {
    id: "selling_exploring",
    messages: [
      "No pressure at all. Nicole is always happy to give you a free, no-obligation sense of what your home is worth in today's market.",
    ],
    buttons: [
      { label: "Get a free home estimate", action: { type: "link", href: "/concierge" }, variant: "cta" },
      { label: "Just keep me in the loop", action: { type: "email" } },
      { label: "Tell me how selling works", action: { type: "node", id: "how_selling_works" } },
      { label: "Something else", action: { type: "node", id: "what_else" } },
      HUMAN_BTN,
    ],
  },

  // ── LEASING ─────────────────────────────────────────────────────────────────

  leasing_q1: {
    id: "leasing_q1",
    messages: [
      "Are you looking to rent a property, or do you have a property you'd like to lease out?",
    ],
    buttons: [
      { label: "I'm a tenant — looking to rent", action: { type: "node", id: "leasing_tenant_budget" } },
      { label: "I'm a landlord — want to lease my unit", action: { type: "node", id: "leasing_landlord_type" } },
      HUMAN_BTN,
    ],
  },

  leasing_tenant_budget: {
    id: "leasing_tenant_budget",
    messages: ["Got it. What's your approximate monthly budget for rent?"],
    buttons: [
      { label: "Under $2,000/mo", action: { type: "node", id: "leasing_tenant_area" } },
      { label: "$2,000 – $3,000/mo", action: { type: "node", id: "leasing_tenant_area" } },
      { label: "$3,000 – $4,500/mo", action: { type: "node", id: "leasing_tenant_area" } },
      { label: "Over $4,500/mo", action: { type: "node", id: "leasing_tenant_area" } },
      HUMAN_BTN,
    ],
  },

  leasing_tenant_area: {
    id: "leasing_tenant_area",
    messages: ["Which part of Toronto are you looking in?"],
    buttons: [
      { label: "Downtown core", action: { type: "node", id: "leasing_tenant_ready" } },
      { label: "West End", action: { type: "node", id: "leasing_tenant_ready" } },
      { label: "East End", action: { type: "node", id: "leasing_tenant_ready" } },
      { label: "Midtown / North York", action: { type: "node", id: "leasing_tenant_ready" } },
      { label: "Flexible — wherever fits", action: { type: "node", id: "leasing_tenant_ready" } },
      HUMAN_BTN,
    ],
  },

  leasing_tenant_ready: {
    id: "leasing_tenant_ready",
    messages: [
      "Nicole works with tenants to find quality rentals — sometimes before they even hit the market.",
      "Would you like her to keep an eye out for you?",
    ],
    buttons: [
      { label: "Yes — book a consultation", action: { type: "link", href: "/concierge" }, variant: "cta" },
      { label: "Send me available rentals", action: { type: "email" } },
      { label: "Browse current listings", action: { type: "link", href: "/properties" } },
      { label: "I have more questions", action: { type: "node", id: "what_else" } },
      HUMAN_BTN,
    ],
  },

  leasing_landlord_type: {
    id: "leasing_landlord_type",
    messages: ["Are you leasing a condo, a house, or a multi-unit building?"],
    buttons: [
      { label: "Condo or apartment", action: { type: "node", id: "leasing_landlord_ready" } },
      { label: "House or townhouse", action: { type: "node", id: "leasing_landlord_ready" } },
      { label: "Multi-unit building", action: { type: "node", id: "leasing_landlord_ready" } },
      HUMAN_BTN,
    ],
  },

  leasing_landlord_ready: {
    id: "leasing_landlord_ready",
    messages: [
      "Nicole handles landlord leasing start-to-finish — pricing, tenant screening, and all the paperwork.",
      "Would you like a free rental assessment?",
    ],
    buttons: [
      { label: "Book a free rental assessment", action: { type: "link", href: "/concierge" }, variant: "cta" },
      { label: "Stay in touch", action: { type: "email" } },
      { label: "Walk me through how leasing works", action: { type: "node", id: "how_leasing_works" } },
      { label: "Something else", action: { type: "node", id: "what_else" } },
      HUMAN_BTN,
    ],
  },

  // ── PROPERTIES ──────────────────────────────────────────────────────────────

  properties: {
    id: "properties",
    messages: [
      "Nicole currently has active listings in Liberty Village, Mimico, and the Bay St corridor.",
      "Would you like help narrowing things down, or prefer to browse on your own?",
    ],
    buttons: [
      { label: "Help me find the right fit", action: { type: "node", id: "properties_intent" } },
      { label: "I'll browse on my own", action: { type: "link", href: "/properties" } },
      HUMAN_BTN,
    ],
  },

  properties_intent: {
    id: "properties_intent",
    messages: ["Are you looking to buy or to rent?"],
    buttons: [
      { label: "Buy", action: { type: "node", id: "buying_q1" } },
      { label: "Rent", action: { type: "node", id: "leasing_tenant_budget" } },
      HUMAN_BTN,
    ],
  },

  // ── JUST BROWSING ────────────────────────────────────────────────────────────

  just_browsing: {
    id: "just_browsing",
    messages: [
      "Of course — take your time. What are you curious about?",
    ],
    buttons: [
      { label: "Tell me about Nicole", action: { type: "node", id: "about_nicole" } },
      { label: "How does buying work?", action: { type: "node", id: "how_buying_works" } },
      { label: "How does selling work?", action: { type: "node", id: "how_selling_works" } },
      { label: "How does leasing work?", action: { type: "node", id: "how_leasing_works" } },
      { label: "See available properties", action: { type: "node", id: "properties" } },
      HUMAN_BTN,
    ],
  },

  // ── ABOUT NICOLE ─────────────────────────────────────────────────────────────

  about_nicole: {
    id: "about_nicole",
    messages: [
      "Nicole Shlass is a Toronto Sales Representative at The Boulevard powered by Property.ca.",
      "She specialises in first-time buyers, upsizers, and families across the city — known for being straightforward, deeply local, and genuinely invested in her clients' outcomes.",
      "What would you like to know more about?",
    ],
    buttons: [
      { label: "Her track record & stats", action: { type: "node", id: "about_nicole_stats" } },
      { label: "What areas she covers", action: { type: "node", id: "about_nicole_areas" } },
      { label: "I'd like to work with her", action: { type: "node", id: "buying_q1" } },
      { label: "Read her full bio", action: { type: "link", href: "/about" }, variant: "cta" },
      HUMAN_BTN,
    ],
  },

  about_nicole_stats: {
    id: "about_nicole_stats",
    messages: [
      "Nicole's numbers speak for themselves:",
      "• 95%+ client satisfaction rate\n• Average 21 days on market for sellers\n• Dozens of successful GTA transactions\n• 5-star reviews from first-time buyers and families alike",
      "Ready to be her next success story?",
    ],
    buttons: [
      { label: "Book a free consultation", action: { type: "link", href: "/concierge" }, variant: "cta" },
      { label: "Tell me more about the process", action: { type: "node", id: "what_else" } },
      { label: "I'm still just browsing", action: { type: "node", id: "just_browsing" } },
      HUMAN_BTN,
    ],
  },

  about_nicole_areas: {
    id: "about_nicole_areas",
    messages: [
      "Nicole is active across Toronto and the GTA — from Liberty Village and the West End to the Beaches, Midtown, North York, and the downtown core.",
      "She has deep knowledge of neighbourhood-level pricing, school catchments, and transit access.",
      "Is there a specific area you're interested in?",
    ],
    buttons: [
      { label: "Yes — I have an area in mind", action: { type: "node", id: "buying_q1" } },
      { label: "I'm still figuring that out", action: { type: "node", id: "buying_preapproval" } },
      { label: "Book a call to discuss", action: { type: "link", href: "/concierge" }, variant: "cta" },
      HUMAN_BTN,
    ],
  },

  // ── HOW IT WORKS ─────────────────────────────────────────────────────────────

  how_buying_works: {
    id: "how_buying_works",
    messages: [
      "Here's the simple version of how buying works with Nicole:",
      "1️⃣ Free consultation — she learns your needs, budget, and timeline.\n2️⃣ Pre-approval — she connects you with trusted brokers if needed.\n3️⃣ Search — she curates listings and gets you into showings fast.\n4️⃣ Offer — she crafts a competitive offer strategy.\n5️⃣ Close — she guides you through conditions, lawyers, and keys.",
      "Does this sound like what you need?",
    ],
    buttons: [
      { label: "Yes — let's start the process", action: { type: "node", id: "buying_q1" } },
      { label: "I have more questions first", action: { type: "node", id: "what_else" } },
      { label: "Book a free consultation", action: { type: "link", href: "/concierge" }, variant: "cta" },
      HUMAN_BTN,
    ],
  },

  how_selling_works: {
    id: "how_selling_works",
    messages: [
      "Here's how selling works with Nicole:",
      "1️⃣ Free home evaluation — she gives you a realistic market value.\n2️⃣ Prep strategy — staging tips to maximise your sale price.\n3️⃣ Marketing — professional photography, MLS, and her buyer network.\n4️⃣ Offers — she negotiates hard on your behalf.\n5️⃣ Close — paperwork handled, keys transferred, money in your account.",
      "Would you like to explore selling?",
    ],
    buttons: [
      { label: "Yes — I'm thinking of selling", action: { type: "node", id: "selling_q1" } },
      { label: "Just exploring for now", action: { type: "node", id: "selling_exploring" } },
      { label: "Book a free home valuation", action: { type: "link", href: "/concierge" }, variant: "cta" },
      HUMAN_BTN,
    ],
  },

  how_leasing_works: {
    id: "how_leasing_works",
    messages: [
      "Leasing with Nicole — whether you're a tenant or a landlord — is straightforward:",
      "🏠 Tenants: She finds quality rentals, sometimes before they hit the market, and handles applications.\n🔑 Landlords: She handles pricing, listings, tenant screening, and all paperwork end-to-end.",
      "Which side of the lease are you on?",
    ],
    buttons: [
      { label: "I'm looking to rent", action: { type: "node", id: "leasing_tenant_budget" } },
      { label: "I want to lease out my property", action: { type: "node", id: "leasing_landlord_type" } },
      { label: "Just curious for now", action: { type: "node", id: "what_else" } },
      HUMAN_BTN,
    ],
  },

  // ── WHAT ELSE / RE-ENTRY HUB ──────────────────────────────────────────────────

  what_else: {
    id: "what_else",
    messages: [
      "No problem — is there anything else I can help you with?",
    ],
    buttons: [
      { label: "I'm looking to buy", action: { type: "node", id: "buying_q1" } },
      { label: "I'm looking to sell", action: { type: "node", id: "selling_q1" } },
      { label: "I'm looking to lease", action: { type: "node", id: "leasing_q1" } },
      { label: "Tell me more about Nicole", action: { type: "node", id: "about_nicole" } },
      { label: "Book a consultation", action: { type: "link", href: "/concierge" }, variant: "cta" },
      HUMAN_BTN,
    ],
  },

  // ── CONTACT INFO ─────────────────────────────────────────────────────────────

  contact_info: {
    id: "contact_info",
    messages: [
      "You can reach Nicole directly:",
      "📞 416-271-6316",
      "📧 nicole@nicoleshlassrealestate.ca",
    ],
    buttons: [
      { label: "Book a consultation online", action: { type: "link", href: "/concierge" }, variant: "cta" },
      { label: "Call Nicole now", action: { type: "phone" }, variant: "human" },
      { label: "Start over", action: { type: "reset" } },
    ],
  },

  // ── EMAIL DONE ────────────────────────────────────────────────────────────────

  email_done: {
    id: "email_done",
    messages: [
      "You're all set — Nicole will be in touch soon.",
      "Is there anything else I can help you with?",
    ],
    buttons: [
      { label: "Book a consultation now", action: { type: "link", href: "/concierge" }, variant: "cta" },
      { label: "Yes — I have more questions", action: { type: "node", id: "what_else" } },
      { label: "Browse properties", action: { type: "link", href: "/properties" } },
      { label: "Start over", action: { type: "reset" } },
    ],
  },
};

// ─── Typing indicator ─────────────────────────────────────────────────────────

function TypingDots() {
  return (
    <div
      className="flex items-center gap-1 px-4 py-3 rounded-2xl rounded-tl-sm w-fit"
      style={{ background: "var(--color-surface-c-high)" }}
    >
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "var(--color-outline)" }}
          animate={{ y: [0, -4, 0] }}
          transition={{
            duration: 0.7,
            repeat: Infinity,
            delay: i * 0.14,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Chatbot component ────────────────────────────────────────────────────────

export function Chatbot() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [nodeId, setNodeId] = useState("greeting");
  const [history, setHistory] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showEmailCapture, setShowEmailCapture] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [widgetPulsing, setWidgetPulsing] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);
  const deliveryToken = useRef<{ cancelled: boolean }>({ cancelled: false });

  // Stop widget pulse ring after 6s
  useEffect(() => {
    const t = setTimeout(() => setWidgetPulsing(false), 6000);
    return () => clearTimeout(t);
  }, []);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history, isTyping, showEmailCapture, showButtons]);

  // Sequential message delivery with typing simulation
  const deliverMessages = useCallback(
    async (messages: string[], userLabel?: string) => {
      deliveryToken.current.cancelled = true;
      const token = { cancelled: false };
      deliveryToken.current = token;

      setShowButtons(false);
      setShowEmailCapture(false);
      setIsTyping(false);

      if (userLabel) {
        setHistory((prev) => [...prev, { from: "user", text: userLabel }]);
      }

      for (let i = 0; i < messages.length; i++) {
        if (token.cancelled) return;
        setIsTyping(true);
        await new Promise((r) => setTimeout(r, 820));
        if (token.cancelled) return;
        setIsTyping(false);
        setHistory((prev) => [...prev, { from: "bot", text: messages[i] }]);
        if (i < messages.length - 1) {
          await new Promise((r) => setTimeout(r, 380));
        }
      }

      if (!token.cancelled) {
        setShowButtons(true);
      }
    },
    [],
  );

  // Trigger greeting on first open
  useEffect(() => {
    if (isOpen && !initialized.current) {
      initialized.current = true;
      deliverMessages(NODES.greeting.messages);
    }
  }, [isOpen, deliverMessages]);

  const handleButton = useCallback(
    (btn: ChatButton) => {
      const { action, label } = btn;

      if (action.type === "phone") {
        window.location.href = PHONE_HREF;
        return;
      }

      if (action.type === "link") {
        setIsOpen(false);
        router.push(action.href);
        return;
      }

      if (action.type === "email") {
        setShowButtons(false);
        setHistory((prev) => [
          ...prev,
          { from: "user", text: label },
          {
            from: "bot",
            text: "Drop your email below and Nicole will follow up — no spam, just relevant updates when it makes sense.",
          },
        ]);
        setShowEmailCapture(true);
        return;
      }

      if (action.type === "reset") {
        setHistory([]);
        setNodeId("greeting");
        setShowEmailCapture(false);
        setEmailValue("");
        deliverMessages(NODES.greeting.messages);
        return;
      }

      if (action.type === "node") {
        const node = NODES[action.id];
        if (!node) return;
        setNodeId(action.id);
        deliverMessages(node.messages, label);
      }
    },
    [router, deliverMessages],
  );

  const handleEmailSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!emailValue.trim()) return;
    const submitted = emailValue.trim();
    setEmailValue("");
    setShowEmailCapture(false);
    setHistory((prev) => [...prev, { from: "user", text: submitted }]);
    setNodeId("email_done");
    deliverMessages(NODES.email_done.messages);
  };

  const currentNode = NODES[nodeId];

  // ─── Render button ─────────────────────────────────────────────────────────

  function renderButton(btn: ChatButton, i: number) {
    const isPhone = btn.action.type === "phone" || btn.variant === "human";
    const isCta = btn.variant === "cta";

    const cls = cn(
      "w-full text-left text-label-md py-2.5 px-4 rounded-full transition-all duration-200 text-[0.72rem] font-medium leading-snug",
      isCta
        ? "gradient-cta text-on-secondary hover:opacity-90"
        : isPhone
          ? "border border-secondary/35 text-secondary hover:bg-secondary/8"
          : "border border-outline-variant/30 text-on-surface-variant hover:border-secondary/40 hover:text-on-surface",
    );

    const motionProps = {
      initial: { opacity: 0, y: 5 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: i * 0.045, duration: 0.22, ease: "easeOut" },
    };

    // Phone buttons → real <a href="tel:"> anchor
    if (isPhone) {
      return (
        <motion.a key={i} href={PHONE_HREF} className={cls} {...motionProps}>
          {btn.label}
        </motion.a>
      );
    }

    // Link buttons → Next.js Link (closes chatbot on click)
    if (btn.action.type === "link") {
      return (
        <motion.div key={i} {...motionProps}>
          <Link
            href={btn.action.href}
            onClick={() => setIsOpen(false)}
            className={cls + " block"}
          >
            {btn.label}
          </Link>
        </motion.div>
      );
    }

    // All other buttons → <button>
    return (
      <motion.button
        key={i}
        onClick={() => handleButton(btn)}
        className={cls}
        {...motionProps}
      >
        {btn.label}
      </motion.button>
    );
  }

  // ─── JSX ───────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Chat Window ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            style={{
              transformOrigin: "bottom right",
              maxHeight: "min(540px, calc(100vh - 110px))",
            }}
            className="fixed bottom-[5.5rem] right-4 md:right-6 z-[9997] w-[356px] max-w-[calc(100vw-2rem)] flex flex-col glass-deep rounded-2xl shadow-ambient overflow-hidden border border-outline-variant/20"
          >
            {/* Header */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-outline-variant/15 shrink-0">
              <NSMonogram size={24} className="text-on-surface shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-serif text-on-surface text-sm font-semibold leading-none">
                  Nicole
                </p>
                <p className="text-outline text-[9px] tracking-widest uppercase mt-0.5">
                  Sales Representative
                </p>
              </div>
              <div className="flex items-center gap-1.5 mr-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                <span className="text-[9px] text-outline uppercase tracking-wider">Online</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-c-high transition-colors"
                aria-label="Close"
              >
                <X size={15} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4 flex flex-col gap-2.5 scroll-smooth">
              <AnimatePresence initial={false}>
                {history.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className={cn(
                      "max-w-[86%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed",
                      msg.from === "bot"
                        ? "self-start rounded-tl-sm text-on-surface"
                        : "self-end rounded-tr-sm text-on-surface",
                    )}
                    style={{
                      background:
                        msg.from === "bot"
                          ? "var(--color-surface-c-high)"
                          : "rgba(240,185,179,0.14)",
                    }}
                  >
                    {msg.text}
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  key="typing"
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="self-start"
                >
                  <TypingDots />
                </motion.div>
              )}

              {/* Email capture */}
              <AnimatePresence>
                {showEmailCapture && (
                  <motion.form
                    key="email-form"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleEmailSubmit}
                    className="flex flex-col gap-2 mt-1 w-full"
                  >
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                      required
                      className="w-full px-4 py-2.5 rounded-xl text-sm text-on-surface placeholder:text-outline border border-outline-variant/30 focus:border-secondary/60 focus:outline-none transition-colors"
                      style={{ background: "var(--color-surface-c-high)" }}
                    />
                    <button
                      type="submit"
                      className="gradient-cta text-on-secondary text-label-md font-semibold px-4 py-2.5 rounded-full flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                    >
                      Send <Send size={13} />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Button choices */}
            <AnimatePresence>
              {showButtons && currentNode && !showEmailCapture && (
                <motion.div
                  key="buttons"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="px-4 pb-4 pt-2.5 flex flex-col gap-1.5 border-t border-outline-variant/10 shrink-0"
                >
                  {currentNode.buttons.map((btn, i) => renderButton(btn, i))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Widget trigger ────────────────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-[9998]">
        {/* Ambient pulse ring on initial load */}
        <AnimatePresence>
          {widgetPulsing && !isOpen && (
            <motion.div
              key="pulse"
              className="absolute inset-0 rounded-full gradient-cta"
              animate={{ scale: [1, 1.55], opacity: [0.45, 0] }}
              transition={{ duration: 1.8, repeat: 2, ease: "easeOut" }}
              exit={{ opacity: 0 }}
            />
          )}
        </AnimatePresence>

        <button
          onClick={() => setIsOpen((o) => !o)}
          aria-label={isOpen ? "Close chat" : "Open chat assistant"}
          className="relative shimmer gradient-cta text-on-secondary font-semibold text-label-md px-5 py-3 rounded-full flex items-center gap-2.5 shadow-ambient hover:opacity-90 transition-opacity"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <X size={17} className="shrink-0" />
              </motion.span>
            ) : (
              <motion.span
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <MessageCircle size={17} className="shrink-0" />
              </motion.span>
            )}
          </AnimatePresence>
          <span>{isOpen ? "Close" : "Ask Nicole"}</span>
        </button>
      </div>
    </>
  );
}
