// Central mock data store for the demo. Swap this file for real API/database
// calls when wiring up a backend — every screen reads from here.

export function img(id, w = 1200, h = 800) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

export const BUSINESS = {
  name: "Dad's Demos and Renovations",
  shortName: "Dad's Demos",
  phone: "716-997-7483",
  phoneHref: "tel:+17169977483",
  email: "info@dadsdemosrenovations.com",
  serviceArea: "the US",
  yearsInBusiness: 3,
  hours: "Mon–Fri 7am–6pm, Sat 8am–2pm",
  licensed: true,
  insured: true,
};

export const TRUST_POINTS = [
  { label: "Licensed & Insured", detail: "Fully licensed and insured for every job, big or small." },
  {
    label: `${BUSINESS.yearsInBusiness} Years in Business`,
    detail: "Three years of dependable craftsmanship nationwide.",
  },
  {
    label: `Local to ${BUSINESS.serviceArea}`,
    detail: "We live and work in the communities we serve.",
  },
  { label: "Free On-Site Estimates", detail: "No pressure, no obligation — just an honest number." },
];

export const SERVICES = [
  {
    slug: "kitchens",
    name: "Kitchens",
    description:
      "Full gut renovations to targeted updates — cabinetry, counters, layout changes, and finishes built to last.",
    image: img("1556911220-e15b29be8c8f"),
  },
  {
    slug: "bathrooms",
    name: "Bathrooms",
    description:
      "Tile, vanities, showers, and full layout reworks. We handle the plumbing coordination so you don't have to.",
    image: img("1620626011761-996317b8d101"),
  },
  {
    slug: "basements",
    name: "Basements",
    description:
      "Turn unused square footage into a finished living space — framing, egress, flooring, and lighting.",
    image: img("1600585154340-be6161a56a0c"),
  },
  {
    slug: "flooring",
    name: "Flooring",
    description:
      "Hardwood, engineered, tile, and luxury vinyl — installed clean and level, room by room or whole-house.",
    image: img("1581858726788-75bc0f6a952d"),
  },
  {
    slug: "decks",
    name: "Decks",
    description:
      "Custom-built decks sized and framed for how you actually use your backyard, in wood or low-maintenance composite.",
    image: img("1512917774080-9991f1c4c750"),
  },
  {
    slug: "siding-roofing",
    name: "Siding & Roofing",
    description:
      "Weather-tight exteriors that hold up through every season — siding replacement, repair, and roofing.",
    image: img("1505873242700-f289a29e1e0f"),
  },
  {
    slug: "additions",
    name: "Additions",
    description:
      "Room additions and structural expansions, from permitting and framing through final finishes.",
    image: img("1518481612222-68bbe828ecd1"),
  },
  {
    slug: "general-repairs",
    name: "General Repairs",
    description:
      "Drywall, trim, doors, small structural fixes — the everyday repair work that keeps a house running right.",
    image: img("1631889993959-41b4e9c6e3c5"),
  },
];

export function getServiceBySlug(slug) {
  return SERVICES.find((s) => s.slug === slug);
}

export const BUDGET_RANGES = [
  "Under $2,000",
  "$2,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000 – $40,000",
  "$40,000+",
  "Not sure",
];

export const STATUS_STEPS = [
  "Pending review",
  "Quote sent",
  "Accepted",
  "Scheduled",
  "In progress",
  "Complete",
  "Paid",
];

export const GALLERY_PROJECTS = [
  {
    id: "g1",
    title: "Kitchen Remodel",
    location: "US",
    category: "kitchens",
    description: "A closed-off galley kitchen opened into a bright, functional gathering space.",
    before: img("1779170396908-b361760c56e0"),
    after: img("1682888813913-e13f18692019"),
  },
  {
    id: "g2",
    title: "Primary Bath Refresh",
    location: "US",
    category: "bathrooms",
    description: "Dated tile and a cramped vanity replaced with a spa-like, low-maintenance layout.",
    before: img("1556228149-d8f523f77b5a"),
    after: img("1638799869566-b17fa794c4de"),
  },
  {
    id: "g3",
    title: "Basement Finish",
    location: "US",
    category: "basements",
    description: "Unfinished storage space converted into a family room with a full egress window.",
    before: img("1782353921981-bb73a53a7482"),
    after: img("1704040686433-b1c45e9f4104"),
  },
  {
    id: "g4",
    title: "Hardwood Refinish",
    location: "US",
    category: "flooring",
    description: "Worn original hardwood sanded, repaired, and refinished to its original character.",
    before: img("1594038021230-f02fc7c59bd5"),
    after: img("1607403219525-6c60fa4f20fa"),
  },
  {
    id: "g5",
    title: "Backyard Deck Build",
    location: "US",
    category: "decks",
    description: "A new composite deck built for entertaining, sized to the full width of the yard.",
    before: img("1634829036082-a8935ec22a02"),
    after: img("1613544723371-23b514a78c85"),
  },
  {
    id: "g6",
    title: "Roof & Siding Replacement",
    location: "US",
    category: "siding-roofing",
    description: "Full tear-off roof and siding replacement ahead of a rough winter.",
    before: img("1562183142-73aa8b490a19"),
    after: img("1518966870461-3b4d5b868fdd"),
  },
  {
    id: "g7",
    title: "Two-Story Addition",
    location: "US",
    category: "additions",
    description: "A ground-up addition adding a first-floor family room and second-floor bedroom.",
    before: img("1632097934242-b0395012f7eb"),
    after: img("1754063257992-bb9eabdbdd86"),
  },
  {
    id: "g8",
    title: "Full Interior Repair",
    location: "US",
    category: "general-repairs",
    description: "Water-damage drywall, trim, and flooring repair after a plumbing leak.",
    before: img("1635513262547-520ac21726ce"),
    after: img("1779119507174-377fd3d44785"),
  },
];

export const REVIEWS = [
  {
    id: "r1",
    name: "Sarah T.",
    town: "US",
    rating: 5,
    category: "kitchens",
    quote:
      "They turned our outdated kitchen into the room we actually wanted to spend time in. Clean job site every single day.",
  },
  {
    id: "r2",
    name: "Mike D.",
    town: "US",
    rating: 5,
    category: "bathrooms",
    quote:
      "Communication was the best part — we always knew what was happening and why. The bathroom looks better than the photos we sent them.",
  },
  {
    id: "r3",
    name: "Jennifer R.",
    town: "US",
    rating: 4,
    category: "basements",
    quote: "Fair pricing and they stuck to the timeline they gave us. Would hire again for the next project.",
  },
  {
    id: "r4",
    name: "Tom W.",
    town: "US",
    rating: 5,
    category: "flooring",
    quote: "Our hardwood floors look brand new. They matched the stain perfectly to the rest of the house.",
  },
  {
    id: "r5",
    name: "Priya N.",
    town: "US",
    rating: 5,
    category: "decks",
    quote: "Built exactly what we described, and the quote process made it easy to know what we were paying for.",
  },
  {
    id: "r6",
    name: "Carlos M.",
    town: "US",
    rating: 5,
    category: "siding-roofing",
    quote: "Got our roof and siding done before the snow hit. Professional crew, no surprises on price.",
  },
  {
    id: "r7",
    name: "Emily C.",
    town: "US",
    rating: 4,
    category: "additions",
    quote: "A big project handled without the stress we expected. They walked us through every decision.",
  },
  {
    id: "r8",
    name: "David K.",
    town: "US",
    rating: 5,
    category: "general-repairs",
    quote: "Quick turnaround on repair work after a leak. Showed up on time and left the place spotless.",
  },
];

// The signed-in demo customer — used by the customer dashboard.
export const DEMO_CUSTOMER = {
  id: "cust-sarah",
  name: "Sarah Thompson",
  email: "sarah.thompson@example.com",
  phone: "907-555-2814",
};

// 9 seeded jobs spanning every dashboard status. Jobs J-1001..J-1003 belong
// to the signed-in demo customer; the rest populate the owner's inbox.
export const INITIAL_JOBS = [
  {
    id: "J-1001",
    customer: { name: "Sarah Thompson", email: "sarah.thompson@example.com", phone: "907-555-2814" },
    category: "kitchens",
    description:
      "Our kitchen layout is closed off from the dining room and the cabinets are original to the house (1970s). We'd like to open up the wall if possible and replace cabinets, counters, and flooring.",
    photos: [img("1622021142947-da7dedc7c39a"), img("1600121848594-d8644e57abab")],
    address: { street: "48 Maple Ridge Dr", city: "Amherst", state: "NY", zip: "14226" },
    budgetRange: "$15,000 – $40,000",
    submittedDate: "2026-07-29",
    status: "Pending review",
    unread: true,
    quote: null,
    declineReason: null,
    scheduledMonth: null,
    scheduledDate: null,
    depositPaid: false,
    balancePaid: false,
    completedDate: null,
  },
  {
    id: "J-1002",
    customer: { name: "Sarah Thompson", email: "sarah.thompson@example.com", phone: "907-555-2814" },
    category: "bathrooms",
    description:
      "Guest bathroom needs a full refresh — new vanity, tile shower surround, and flooring. Tub can stay or go, open to suggestions.",
    photos: [img("1613977257363-707ba9348227"), img("1584622650111-993a426fbf0a")],
    address: { street: "48 Maple Ridge Dr", city: "Amherst", state: "NY", zip: "14226" },
    budgetRange: "$5,000 – $15,000",
    submittedDate: "2026-07-10",
    status: "Accepted",
    unread: false,
    quote: {
      price: 9800,
      scope:
        "Demo existing tub/surround, install new tile shower with glass door, new vanity + fixtures, LVP flooring, repaint.",
      deposit: 2000,
      estimatedTime: "6 working days",
      sentDate: "2026-07-14",
    },
    declineReason: null,
    scheduledMonth: null,
    scheduledDate: null,
    depositPaid: false,
    balancePaid: false,
    completedDate: null,
  },
  {
    id: "J-1003",
    customer: { name: "Sarah Thompson", email: "sarah.thompson@example.com", phone: "907-555-2814" },
    category: "decks",
    description:
      "Looking to replace our old wood deck (rotting in a few spots) with a low-maintenance composite deck, same footprint is fine.",
    photos: [img("1541123437800-1bb1317badc2"), img("1512917774080-9991f1c4c750")],
    address: { street: "48 Maple Ridge Dr", city: "Amherst", state: "NY", zip: "14226" },
    budgetRange: "$15,000 – $40,000",
    submittedDate: "2026-04-02",
    status: "Paid",
    unread: false,
    quote: {
      price: 18500,
      scope: "Full tear-out of existing wood deck, new composite decking, railing, and stair rebuild.",
      deposit: 4000,
      estimatedTime: "8 working days",
      sentDate: "2026-04-05",
    },
    declineReason: null,
    scheduledMonth: { month: "May", year: 2026 },
    scheduledDate: "2026-05-18",
    depositPaid: true,
    balancePaid: true,
    completedDate: "2026-05-27",
  },
  {
    id: "J-1004",
    customer: { name: "Mike Delgado", email: "mike.delgado@example.com", phone: "512-555-7039" },
    category: "basements",
    description:
      "Unfinished basement, about 700 sq ft. Want to add a family room and a small office nook. There's already an egress window.",
    photos: [img("1600585154340-be6161a56a0c"), img("1600566752355-35792bedcfea")],
    address: { street: "112 Heather Ln", city: "Clarence", state: "NY", zip: "14031" },
    budgetRange: "$15,000 – $40,000",
    submittedDate: "2026-07-30",
    status: "Pending review",
    unread: false,
    quote: null,
    declineReason: null,
    scheduledMonth: null,
    scheduledDate: null,
    depositPaid: false,
    balancePaid: false,
    completedDate: null,
  },
  {
    id: "J-1005",
    customer: { name: "Jennifer Ruiz", email: "jennifer.ruiz@example.com", phone: "224-555-6182" },
    category: "flooring",
    description:
      "Original hardwood throughout the first floor is scratched up and has some water staining near the kitchen. Would like it sanded and refinished.",
    photos: [img("1581591524425-c7e0978865fc"), img("1449844908441-8829872d2607")],
    address: { street: "76 Cayuga St", city: "Lancaster", state: "NY", zip: "14086" },
    budgetRange: "$2,000 – $5,000",
    submittedDate: "2026-07-22",
    status: "Quote sent",
    unread: false,
    quote: {
      price: 3200,
      scope: "Sand and refinish approx. 900 sq ft of existing hardwood flooring, matching stain to trim.",
      deposit: 500,
      estimatedTime: "3 working days",
      sentDate: "2026-07-25",
    },
    declineReason: null,
    scheduledMonth: null,
    scheduledDate: null,
    depositPaid: false,
    balancePaid: false,
    completedDate: null,
  },
  {
    id: "J-1006",
    customer: { name: "Tom Whitfield", email: "tom.whitfield@example.com", phone: "630-555-4457" },
    category: "siding-roofing",
    description:
      "Roof is original to the house (18 years old) and starting to show granule loss. Siding on the north side has some storm damage too.",
    photos: [img("1505873242700-f289a29e1e0f"), img("1568605114967-8130f3a36994")],
    address: { street: "9 Fieldstone Ct", city: "Orchard Park", state: "NY", zip: "14127" },
    budgetRange: "$15,000 – $40,000",
    submittedDate: "2026-06-18",
    status: "Declined",
    unread: false,
    quote: {
      price: 21500,
      scope: "Full tear-off and reroof with architectural shingle, replace storm-damaged siding on north elevation.",
      deposit: 5000,
      estimatedTime: "5 working days",
      sentDate: "2026-06-21",
    },
    declineReason: "Decided to go with a different contractor.",
    scheduledMonth: null,
    scheduledDate: null,
    depositPaid: false,
    balancePaid: false,
    completedDate: null,
  },
  {
    id: "J-1007",
    customer: { name: "Carlos Mendez", email: "carlos.mendez@example.com", phone: "385-555-9021" },
    category: "additions",
    description:
      "We'd like to add a first-floor family room addition, roughly 300 sq ft, off the back of the house.",
    photos: [img("1518481612222-68bbe828ecd1"), img("1493809842364-78817add7ffb")],
    address: { street: "224 Southwestern Blvd", city: "West Seneca", state: "NY", zip: "14224" },
    budgetRange: "$40,000+",
    submittedDate: "2026-06-02",
    status: "Scheduled",
    unread: false,
    quote: {
      price: 62000,
      scope:
        "Permitting, foundation, framing, roofing tie-in, windows, insulation, drywall, and paint for a 300 sq ft family room addition.",
      deposit: 10000,
      estimatedTime: "6 weeks",
      sentDate: "2026-06-06",
    },
    declineReason: null,
    scheduledMonth: { month: "September", year: 2026 },
    scheduledDate: null,
    depositPaid: true,
    balancePaid: false,
    completedDate: null,
  },
  {
    id: "J-1008",
    customer: { name: "Emily Carter", email: "emily.carter@example.com", phone: "470-555-3368" },
    category: "general-repairs",
    description:
      "Drywall and trim damage in the living room and hallway from a slow plumbing leak upstairs. Leak has already been fixed by a plumber.",
    photos: [img("1592194996308-7b43878e84a6"), img("1600585152220-90363fe7e115")],
    address: { street: "18 Lake Ave", city: "Hamburg", state: "NY", zip: "14075" },
    budgetRange: "$2,000 – $5,000",
    submittedDate: "2026-07-08",
    status: "In progress",
    unread: false,
    quote: {
      price: 4100,
      scope: "Remove and replace damaged drywall and trim in living room and hallway, prime and paint to match.",
      deposit: 800,
      estimatedTime: "4 working days",
      sentDate: "2026-07-11",
    },
    declineReason: null,
    scheduledMonth: { month: "August", year: 2026 },
    scheduledDate: "2026-08-11",
    depositPaid: true,
    balancePaid: false,
    completedDate: null,
  },
  {
    id: "J-1009",
    customer: { name: "David Kim", email: "david.kim@example.com", phone: "702-555-8845" },
    category: "kitchens",
    description:
      "Small galley kitchen, would like new countertops and backsplash. Cabinets are in good shape and can stay.",
    photos: [img("1556911220-e15b29be8c8f"), img("1556912167-f556f1f39fdf")],
    address: { street: "355 Union Rd", city: "Cheektowaga", state: "NY", zip: "14225" },
    budgetRange: "$5,000 – $15,000",
    submittedDate: "2026-06-25",
    status: "Complete",
    unread: false,
    quote: {
      price: 7400,
      scope: "Remove existing laminate counters, install quartz countertops and tile backsplash.",
      deposit: 1500,
      estimatedTime: "3 working days",
      sentDate: "2026-06-28",
    },
    declineReason: null,
    scheduledMonth: { month: "July", year: 2026 },
    scheduledDate: "2026-07-21",
    depositPaid: true,
    balancePaid: false,
    completedDate: "2026-07-24",
  },
];

// Owner-managed month availability for scheduling.
export const INITIAL_AVAILABILITY = [
  { month: "August", year: 2026, open: true, maxJobs: 3, booked: 2 },
  { month: "September", year: 2026, open: true, maxJobs: 3, booked: 1 },
  { month: "October", year: 2026, open: true, maxJobs: 3, booked: 0 },
  { month: "November", year: 2026, open: true, maxJobs: 2, booked: 0 },
  { month: "December", year: 2026, open: false, maxJobs: 2, booked: 0 },
  { month: "January", year: 2027, open: true, maxJobs: 2, booked: 0 },
];

export function formatCurrency(amount) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

export function formatDate(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}
