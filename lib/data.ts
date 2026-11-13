export const BRAND = {
  name: "MiniByte",
  logo: "minibyte",
  tagline: "AI R&D, SaaS platforms, robotics and embedded intelligence.",
};

export const NAV = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/how-we-work", label: "How we work" },
  { href: "/labs", label: "Labs" },
  { href: "/company", label: "Company" },
  { href: "/careers", label: "Careers" },
];

export const MOBILE_NAV = [
  ...NAV,
  { href: "/articles", label: "Articles" },
];

export const PAGE_NAMES: Record<string, string> = {
  "/": "Home",
  "/services": "Services",
  "/work": "Work",
  "/how-we-work": "How we work",
  "/labs": "Labs",
  "/company": "Company",
  "/articles": "Articles",
  "/careers": "Careers",
  "/contact": "Contact",
  "/privacy": "Privacy",
};

export const STATS = [
  { value: "7", label: "countries in our international footprint", count: true },
  { value: "9", label: "industries served", count: true },
  { value: "15", label: "partner companies", count: true },
  { value: "25+", label: "emotional voice styles in our TTS engine", count: true },
  { value: "< 1 hr", label: "well-log digitization, down from several days", blue: true },
];

// lon/lat of each office, for the dot map
// TODO: confirm HQ with client
export interface Office {
  n: number;
  name: string;
  role: string;
  region: "Asia" | "Middle East" | "North America" | "Europe";
  lon: number;
  lat: number;
}

export const OFFICES: Office[] = [
  { n: 1, name: "Pakistan", role: "Office", region: "Asia", lon: 70.0, lat: 30.0 },
  { n: 2, name: "USA", role: "Office", region: "North America", lon: -98.0, lat: 39.0 },
  { n: 3, name: "South Korea", role: "Office", region: "Asia", lon: 127.8, lat: 36.5 },
  { n: 4, name: "UAE", role: "Office", region: "Middle East", lon: 54.4, lat: 24.3 },
  { n: 5, name: "United Kingdom", role: "Office", region: "Europe", lon: -1.5, lat: 53.0 },
  { n: 6, name: "Germany", role: "Office", region: "Europe", lon: 10.4, lat: 51.2 },
  { n: 7, name: "Sweden", role: "Office", region: "Europe", lon: 15.0, lat: 62.0 },
];

export interface Person {
  name: string;
  role: string;
  photo?: string;
  tone?: "mist" | "ink" | "blue" | "paper";
  bio?: string;
  linkedin?: string;
  cofounder?: boolean;
}

export const PEOPLE: Person[] = [
  {
    name: "Danish Ashraf",
    role: "Chief Executive Officer",
    photo: "/team/danish-ashraf.jpg",
    tone: "blue",
    cofounder: true,
    // TODO(add bio)
  },
  {
    name: "Owais Kaifi",
    role: "Chief Technology Officer",
    photo: "/team/owais-kaifi.jpg",
    tone: "blue",
    // TODO(add bio)
  },
  {
    name: "Sarmad Sultan",
    role: "Chief Business Officer",
    photo: "/team/sarmad-sultan.jpg",
    tone: "blue",
    // TODO(add bio)
  },
];

// TODO(confirm with team)
export interface ValueItem {
  title: string;
  text: string;
}

export const VALUES: ValueItem[] = [
  {
    title: "Creativity",
    text: "Fresh thinking applied to hard problems.",
  },
  {
    title: "Technical expertise",
    text: "Researchers and engineers who go deep.",
  },
  {
    title: "Collaboration",
    text: "Working alongside our clients, not at arm's length.",
  },
];

// TODO(confirm whether each is a partner, a client, or both)
export interface Partner {
  name: string;
  logo?: string;
  case?: string;
}

export const PARTNERS: Partner[] = [
  { name: "VOXR", logo: "/partners/voxr.png", case: "voxr-ai" },
  { name: "Ringly.io", logo: "/partners/ringly.png", case: "ringly-io" },
  { name: "Innovista", logo: "/partners/innovista.png" },
  { name: "Riddermark", logo: "/partners/riddermark.png" },
  { name: "AIOBC", logo: "/partners/aiobc.png" },
  { name: "Chatley.ai", case: "chatley-ai" },
  { name: "Quantum Edge", logo: "/partners/quantum-edge.png" },
  { name: "Qubed", logo: "/partners/qubed.png", case: "qubed-pk" },
  { name: "Spec Legacy", logo: "/partners/spec-legacy.png" },
  { name: "Aethero", case: "aethero-radiation-shield" },
  { name: "Automateq", logo: "/partners/automateq.png", case: "lisa" },
  { name: "Hoki", logo: "/partners/hoki.png" },
  { name: "Automizer AI", logo: "/partners/automizer-ai.png" },
  { name: "Stackfuse", logo: "/partners/stackfuse.png", case: "stackfuse" },
  { name: "La Fragancia", logo: "/partners/la-fragancia.png", case: "lafragancia" },
];

export interface MilestoneItem {
  title: string;
  text: string;
  slug: string;
  year?: string; // TODO(add year)
}

export const MILESTONES: MilestoneItem[] = [
  {
    title: "Reached orbit",
    text: "The NxN edge-compute module for Aethero launched on SpaceX's Falcon-9 Transporter-11.",
    slug: "aethero-radiation-shield",
    // TODO(add year)
  },
  {
    title: "Technology being acquired",
    text: "Our well-log digitization technology is currently being acquired by a leading graph-based digitization provider.",
    slug: "well-log-digitization",
    // TODO(add year)
  },
  {
    title: "5,000 devices in the field",
    text: "Hail-detection devices deployed across the United States.",
    slug: "smart-hail-guard",
    // TODO(add year)
  },
  {
    title: "In production",
    text: "La Fragancia's retail-operations platform runs across 11+ US stores.",
    slug: "lafragancia",
    // TODO(add year)
  },
  {
    title: "Flagship product",
    text: "The Autonomous Agricultural UGV is actively seeking seed funding.",
    slug: "agricultural-ugv",
    // TODO(add year)
  },
];

export interface Industry {
  name: string;
  slug: string;
}

export const INDUSTRIES: Industry[] = [
  { name: "Enterprise SaaS & Automation", slug: "enterprise-saas" },
  { name: "Defense & Aerospace", slug: "defense-aerospace" },
  { name: "Energy, Mining & Geospatial", slug: "energy-mining" },
  { name: "B2B Sales & Marketing Technology", slug: "b2b-sales" },
  { name: "Agriculture & Environmental", slug: "agriculture" },
  { name: "Media & Entertainment", slug: "media-entertainment" },
  { name: "Smart Cities & Infrastructure", slug: "smart-cities" },
  { name: "HealthTech", slug: "healthtech" },
  { name: "Insurance & Risk Management", slug: "insurance" },
];

export interface CapabilityGroup {
  group: string;
  items: string[];
}

export const CAPABILITIES: CapabilityGroup[] = [
  {
    group: "AI product development: software & hardware",
    items: [
      "Complete AI engineering",
      "Web development",
      "UI/UX",
      "SEO",
      "Graphic design",
      "Marketing",
    ],
  },
  {
    group: "AI/ML and full-stack",
    items: [
      "AI research and development",
      "SaaS development",
      "Custom model development",
    ],
  },
];

/* =========================================================================
   PORTFOLIO CATEGORIES
   ========================================================================= */
export type CategoryKey = "vision" | "edge" | "rnd" | "robotics" | "voice" | "platforms" | "web";

export interface CategoryInfo {
  key: CategoryKey;
  label: string;
  blurb: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    key: "vision",
    label: "Computer vision & spatial intelligence",
    blurb: "Automated analysis of aerial imagery, 3D point clouds, video feeds and high-speed visual tracking.",
  },
  {
    key: "edge",
    label: "Edge AI & embedded intelligence",
    blurb: "On-device intelligence, custom IoT hardware and hardware-accelerated quantization without cloud dependency.",
  },
  {
    key: "rnd",
    label: "Applied R&D & innovation",
    blurb: "Deep learning applied to proprietary datasets, procedural simulation and novel domain architectures.",
  },
  {
    key: "robotics",
    label: "Autonomous systems & robotics",
    blurb: "Autonomous ground and aerial vehicles, kinetic defense systems and precision robotic manipulators.",
  },
  {
    key: "voice",
    label: "Voice AI & conversational",
    blurb: "High-volume conversational AI, multi-tier phone triage, and expressive speech synthesis engines.",
  },
  {
    key: "platforms",
    label: "AI/ML platforms & infrastructure",
    blurb: "Deterministic multi-agent orchestration, synthetic data generation and enterprise AI operations.",
  },
  {
    key: "web",
    label: "Web, SaaS & retail automation",
    blurb: "Full-stack SaaS platforms, automated business pipelines and multi-store retail synchronization.",
  },
];

/* =========================================================================
   FULL PORTFOLIO CASES
   ========================================================================= */
export interface CaseItem {
  slug: string;
  title: string;
  category: CategoryKey;
  tag: string;
  text: string;
  outcome: string | null;
  stack?: string[];
  art: "text" | "flow" | "grid" | "wave";
  featured?: boolean;
  hidden?: boolean;
  todo?: string;
  // Legacy / detail helpers
  kind?: string;
  meta?: [string, string][];
  problem?: string;
  approach?: string;
  result?: string;
}

export const CASES: CaseItem[] = [
  /* -------------------- 1. Computer Vision & Spatial Intelligence -------------------- */
  {
    slug: "well-log-digitization",
    title: "Well Log Digitization",
    category: "vision",
    tag: "Computer vision · Energy & geospatial",
    art: "grid",
    featured: true,
    text: "A multi-stage pipeline that converts legacy raster well logs into industry-standard LAS files. Phase 1, digitization: U-Net segmentation isolates the curves, an SVM refines the data, YOLO detects headers and OCR extracts metadata. Phase 2, interpretation: automated classification of geological material against predefined legends.",
    outcome: "Digitization time cut from several days to under one hour, unlocking decades of subsurface data. The technology is currently being acquired by a leading graph-based digitization provider.",
    stack: ["U-Net", "SVM", "YOLO", "OCR", "Python"],
  },
  {
    slug: "satellite-imagery",
    title: "Satellite Imagery Analytics",
    category: "vision",
    tag: "Computer vision · Defense & disaster response",
    art: "grid",
    featured: true,
    text: "A custom AI model pipeline that turns satellite and aerial imagery into time-critical intelligence: automated mine detection, on-the-fly ortho-map generation and rapid pre/post-event damage assessment.",
    outcome: "Defense and disaster-response teams detect mines, map terrain and assess damage faster, for better situational awareness and decisions in high-stakes scenarios.",
    stack: ["TensorFlow", "Computer vision", "Ortho-mapping"],
  },
  {
    slug: "autospin-360",
    title: "AutoSpin 360 (Autofox.ai)",
    category: "vision",
    tag: "Computer vision · Automotive",
    art: "grid",
    text: "Turns eight dealer photos into a 360° spin video and a 3D viewer for Autofox GmbH (Stuttgart), a Cool Agency client serving 3,500+ dealerships. Two pipelines run in parallel: classical 3D reconstruction from multi-view images, and generative video for view synthesis.",
    outcome: "Autofox can offer 360° spin videos and 3D viewers from just eight dealer photos, extending its AI car photography to 3,500+ dealerships.",
    stack: ["Classical 3D reconstruction", "Generative video", "Multi-view synthesis"],
  },
  {
    slug: "urban-guard",
    title: "Urban Guard",
    category: "vision",
    tag: "Computer vision · Smart cities",
    art: "grid",
    todo: "Source deck outcome had placeholder text; confirm final text with client.",
    text: "An AI smart-city platform that detects vehicles and monitors traffic density from live camera feeds in real time, with a central dashboard, license-plate detection and tracking, and automated accident detection.",
    outcome: "City operators get actionable analytics for faster incident response and smarter resource allocation, improving public safety and traffic flow.",
    stack: ["Computer vision", "License plate recognition", "Real-time streaming"],
  },
  {
    slug: "lidarview",
    title: "LiDARView",
    category: "vision",
    tag: "Spatial intelligence · 3D",
    art: "grid",
    text: "A platform that uses LiDAR for precise 3D mapping and tracking of vehicles, drones and environments. It processes high-throughput point-cloud streams in real time for object tracking and distance measurement.",
    outcome: "Turns high-throughput LiDAR data into instant, actionable analysis.",
    stack: ["TensorFlow", "Keras", "OpenCV", "Python", "Custom detection models"],
  },
  {
    slug: "trackzella",
    title: "Trackzella",
    category: "vision",
    tag: "Computer vision · Sports analytics",
    art: "grid",
    text: "Sports analytics using computer vision and NVIDIA optical flow to track players and the ball with high accuracy, generating real-time insights and statistics from game footage.",
    outcome: "Coaches and players get instant, objective performance data for strategy and tactical adaptation during or right after play.",
    stack: ["Computer vision", "NVIDIA optical flow", "Sports analytics"],
  },
  {
    slug: "trackue",
    title: "Trackue",
    category: "vision",
    tag: "Computer vision · Security",
    art: "grid",
    text: "A security platform for identity verification using deep-learning face recognition and eye-landmark detection, with real-time capture and automated access control. Eye movement and facial landmark tracking also support interaction analysis, fatigue detection and VR.",
    outcome: "Automates identity verification and access control in real time, with uses beyond security.",
    stack: ["Deep learning", "Face recognition", "Eye-landmark tracking"],
  },
  {
    slug: "riddermark-trade-in",
    title: "Riddermark Trade-In Validation Engine",
    category: "vision",
    tag: "Computer vision · Automotive retail",
    art: "grid",
    hidden: true,
    todo: "Deck slide reused the Trackzella text. Get the real description from the team.",
    text: "TODO",
    outcome: null,
  },
  {
    slug: "netauto",
    title: "NetAuto",
    category: "vision",
    tag: "Computer vision · Security",
    art: "grid",
    text: "AI-powered checkpoint security that automates vehicle verification at controlled access points. Real-time license plate recognition cross-references vehicle databases to monitor entry and exit points, flag unauthorized vehicles and keep timestamped audit logs. Built for gated communities, corporate campuses, border crossings and secure facilities.",
    outcome: "Automates vehicle verification at checkpoints with real-time plate recognition, instantly flagging unauthorized vehicles and keeping timestamped audit logs, with minimal human oversight.",
    stack: ["License plate recognition", "Real-time alerting", "Audit logging"],
  },
  {
    slug: "object-tracker",
    title: "Ultra-Fast Generic Object Tracker",
    category: "vision",
    tag: "Computer vision · Tracking",
    art: "grid",
    text: "A modular, GPU-optimized tracking engine that follows objects with sub-second latency, from multi-vehicle urban traffic to aerial surveillance of highways and harbors. Sliced inference splits large, high-resolution frames so the detector can find small targets such as UAVs, and custom tracking algorithms follow each object across frames.",
    outcome: "One core tracker that adapts quickly to defense, logistics, sports analytics and surveillance instead of a separate system for each, with sub-second latency and reliable tracking of small objects in large images.",
    stack: ["TensorFlow", "OpenCV", "Python"],
  },
  {
    slug: "gps-denied-navigation",
    title: "GPS-Denied Navigation",
    category: "vision",
    tag: "Spatial intelligence · Defense",
    art: "grid",
    text: "A mission-critical visual positioning system that lets drones navigate in GPS-jammed environments. Sensor fusion combines the live drone camera feed with a satellite imagery map for real-time position triangulation, using optical flow, object segmentation, feature-based visual odometry, homography estimation and Kalman filtering.",
    outcome: "Keeps drones navigating accurately when GPS is jammed, giving defense operators resilient positioning for high-stakes missions and establishing foundational IP for Minibyte in multi-sensor fusion.",
    stack: ["Optical flow", "Visual odometry", "Homography", "Kalman filter"],
  },

  /* -------------------- 2. Edge AI & Embedded Intelligence -------------------- */
  {
    slug: "smart-hail-guard",
    title: "Smart Hail Guard",
    category: "edge",
    tag: "Edge AI · Insurance",
    art: "wave",
    featured: true,
    text: "An AI-powered hail detection system with 5,000 devices deployed across the United States for insurance verification. A PyTorch/OpenCV pipeline analyzes high-speed camera feeds to identify hail events in real time, telling hail apart from rain and debris. MQTT transmission to ThingsBoard gives insurers timestamped, geolocated evidence.",
    outcome: "Deployed on 5,000 devices across the United States, it gives insurers timestamped, geolocated evidence of real hail events, enabling rapid approval of legitimate claims while preventing fraud.",
    stack: ["PyTorch", "OpenCV", "MQTT", "ThingsBoard"],
  },
  {
    slug: "guardio",
    title: "Guardio",
    category: "edge",
    tag: "Edge AI · Security",
    art: "wave",
    text: "TensorFlow models for face detection, recognition and intrusion detection, deployed with TF-Lite and TensorRT for quantization and compilation. Hardware-aware optimization delivered a 10x performance increase over the baseline implementation, turning a theoretical concept into a commercially viable product. Real-time monitoring with no cloud dependency, for high-stakes environments that need privacy and zero-latency response.",
    outcome: "A 10x performance gain turned a concept into a commercially viable product: real-time, private, zero-latency security monitoring with no cloud dependency or cloud costs.",
    stack: ["TensorFlow", "TF-Lite", "TensorRT"],
  },
  {
    slug: "drive-pulse",
    title: "Drive Pulse",
    category: "edge",
    tag: "IoT · Fleet management",
    art: "wave",
    text: "An IoT platform for remote OBD-II diagnostics and fleet management. A custom hardware dongle plugs into the vehicle's OBD-II port and continuously sends engine status, fuel efficiency and emissions data to a cloud platform, with a central dashboard for fleet-wide monitoring and real-time alerts.",
    outcome: "Lets fleet operators monitor every vehicle remotely, cutting maintenance costs and downtime through remote diagnostics, predictive maintenance and real-time alerts, for measurable fleet ROI.",
    stack: ["Custom OBD-II hardware", "Cloud platform", "Real-time alerts"],
  },
  {
    slug: "aethero-radiation-shield",
    title: "Aethero Radiation Shield",
    category: "edge",
    tag: "Space hardware · Edge compute",
    art: "wave",
    featured: true,
    text: "Minibyte engineered the NxN edge-compute module for Aethero, a San Francisco space-computing startup. It runs an NVIDIA Jetson Orin NX inside Cosmic Shielding Corporation's Plasteel radiation shielding, launched to orbit on SpaceX's Falcon-9 Transporter-11 rideshare, and was positioned at launch as the fastest AI-capable chip in space. Minibyte's engineering credit is etched into the module hardware itself: Danish Ashraf, Minibyte cofounder, is named on the flight article.",
    outcome: "Flight-proven space hardware: the NxN module reached orbit on SpaceX's Falcon-9 Transporter-11, with Minibyte's engineering credited on the flight article itself.",
    stack: ["NVIDIA Jetson Orin NX", "Plasteel radiation shielding"],
  },

  /* -------------------- 3. Applied R&D & Innovation -------------------- */
  {
    slug: "facial-animation",
    title: "3D Facial Animation System",
    category: "rnd",
    tag: "Deep learning · Gaming & media",
    art: "flow",
    text: "A deep-learning system that generates 3D facial animation and lip-sync from audio for gaming and interactive media. A PyTorch sequence-to-sequence model turns audio features (mel-spectrograms) into blend-shape coefficients for facial animation rigs, trained on paired audio-animation datasets to learn phoneme-to-facial-movement mappings.",
    outcome: "A production alternative to costly motion capture for dialogue-heavy content, generating lip-sync and facial animation directly from audio for faster iteration and dynamic content in game engines such as Unreal Engine and Unity.",
    stack: ["PyTorch", "Seq2seq", "Mel-spectrograms", "Blend shapes"],
  },
  {
    slug: "vr-pilot-training",
    title: "VR simulators for pilot training",
    category: "rnd",
    tag: "VR · Aviation training",
    art: "flow",
    text: "An end-to-end VR flight-training project: custom headset design, lens selection and optical optimization, controller integration and an Unreal Engine flight simulation. Complex scenarios (night flying, zero visibility, severe weather, emergencies) are overlaid on physical cockpit controls for muscle-memory training.",
    outcome: "Delivers immersive procedural training at a fraction of full-motion simulator costs, making advanced pilot training accessible to aviation schools.",
    stack: ["Unreal Engine", "Custom VR hardware"],
  },
  {
    slug: "dyseye",
    title: "DysEye",
    category: "rnd",
    tag: "HealthTech · AI/ML",
    art: "flow",
    text: "A HealthTech platform that uses AI and ML to detect dyslexia indicators for early intervention and personalized treatment planning. Algorithms analyze reading patterns, cognitive responses and behavioral metrics against established benchmarks, and provide tailored intervention recommendations.",
    outcome: "Enables earlier dyslexia detection, personalized intervention and continuous monitoring, with benchmark-based analysis that improves learning outcomes and quality of life.",
    stack: ["Eye tracking", "MediaPipe Face Mesh", "ML"],
  },

  /* -------------------- 4. Autonomous Systems & Robotics -------------------- */
  {
    slug: "agricultural-ugv",
    title: "Autonomous Agricultural UGV",
    category: "robotics",
    tag: "Robotics · Agriculture",
    art: "flow",
    featured: true,
    text: "A fully autonomous unmanned ground vehicle for precision seeding, weeding, irrigation and fertilization on large farms. GPS/vision/IMU sensor fusion enables real-time obstacle avoidance in dynamic field conditions, a custom 6-DOF robotic arm with dual end-effectors handles diverse tasks, and a proprietary lightweight AI model runs on-device to tell weeds from plants for targeted chemical application.",
    outcome: "Enables 24/7 autonomous operation, dramatically reducing labor costs, applying chemicals only where weeds are detected and improving crop-yield consistency. Minibyte's flagship product, actively seeking seed funding.",
    stack: ["GPS / vision / IMU fusion", "6-DOF arm", "On-device AI"],
  },
  {
    slug: "counter-uas-interceptor",
    title: "Counter-UAS Interceptor",
    category: "robotics",
    tag: "Defense · Autonomous systems",
    art: "flow",
    todo: "Defense-related: confirm with leadership that it should be public.",
    text: "The SD Interceptor is Minibyte's answer to a cost problem: militaries are downing cheap, disposable drones with missiles that cost orders of magnitude more. It is an autonomous, all-weather kinetic interceptor that detects, locks, launches and tracks hostile drones with no human piloting after launch, and works day or night, through fog, smoke and rain.",
    outcome: "Closes the cost gap of downing cheap drones with expensive missiles, using an autonomous interceptor that needs no human piloting after launch and works day or night, through fog, smoke and rain.",
    stack: ["Autonomous guidance", "CFD-driven airframe design"],
  },
  {
    slug: "arm-lift",
    title: "Arm Lift",
    category: "robotics",
    tag: "Robotics · Accessibility",
    art: "flow",
    text: "A robotic arm system that makes kiosks accessible using AI-driven face tracking. Computer vision detects the user's face and height in real time and automatically moves the kiosk interface to the best ergonomic position. Designed for cost-effective mass production with a scalable deployment architecture.",
    outcome: "Makes self-service kiosks comfortable for every user regardless of size or mobility, adjusting automatically in real time, with scalable rollout across retail, information centers and public services.",
    stack: ["Face tracking", "Computer vision", "Robotic arm"],
  },
  {
    slug: "fabsky",
    title: "FabSky",
    category: "robotics",
    tag: "Drone design & fabrication",
    art: "flow",
    text: "A custom drone design and fabrication division that combines mechanical engineering with precision manufacturing. It designs drone structures for aerodynamics, stability and mission-specific requirements, then fabricates them with CNC machining, 3D printing (FDM, SLA) and laser cutting, in carbon fiber, aluminum and specialized polymers.",
    outcome: "Gives Minibyte in-house design-to-fabrication capability for mission-specific drones, producing high-tolerance carbon fiber, aluminum and polymer components.",
    stack: ["CNC machining", "FDM / SLA 3D printing", "Laser cutting"],
  },

  /* -------------------- 5. Voice AI & Conversational -------------------- */
  {
    slug: "lisa",
    title: "LISA",
    category: "voice",
    tag: "Voice AI · German SMEs",
    art: "wave",
    text: "LISA is an AI phone agent for German small and mid-sized businesses, built for automateq. It runs on VAPI with custom Flask middleware that manages the GoHighLevel integration, multi-tier service classification (regular, maintenance, installation, emergency) and German business-system workflows.",
    outcome: "Handles service calls inside German business workflows, classifying each request as regular, maintenance, installation or emergency and syncing it into GoHighLevel, so urgent jobs are prioritized without manual triage.",
    stack: ["VAPI", "Flask", "GoHighLevel"],
  },
  {
    slug: "chatley-ai",
    title: "Chatley.ai",
    category: "voice",
    tag: "Voice AI · Field services",
    art: "wave",
    text: "VAPI-based voice AI with custom Flask middleware for service contractors (HVAC, plumbing, electrical). Advanced NLU handles free-form customer inquiries with emergency-versus-routine triage and automated technician scheduling. A custom integration layer connects field-service management systems, CRMs and calendar platforms.",
    // TODO(verify): revenue claim of $1.2M+ ARR combined portfolio
    outcome: "Gives contractors automated call handling with emergency triage and technician scheduling, connected to their field-service, CRM and calendar systems. Part of a $1.2M+ ARR combined portfolio.",
    stack: ["VAPI", "Flask", "NLU", "CRM integrations"],
  },
  {
    slug: "ringly-io",
    title: "Ringly.io",
    category: "voice",
    tag: "Voice AI · E-commerce",
    art: "wave",
    text: "A voice AI platform that resolves 70%+ of calls without human intervention for Shopify merchants. White-label deployment automates order-status inquiries, returns and exchanges, and product questions, with deep Shopify integration for real-time order lookup, automated return authorization and inventory checks.",
    outcome: "Resolves 70%+ of calls without human intervention for Shopify merchants, automating order status, returns and exchanges, and product questions.",
    stack: ["Voice AI", "Shopify integration"],
  },
  {
    slug: "voxr-ai",
    title: "Voxr.ai: Enterprise Conversational AI",
    category: "voice",
    tag: "Conversational AI · Enterprise",
    art: "wave",
    text: "An enterprise conversational-AI platform for high-volume customer interactions. A partner introduced the end client after seeing Minibyte's own CallAxa product; the client wanted something similar, so Minibyte built Voxr.ai on the CallAxa white-label backend. Minibyte was paid for development and the client operates Voxr.ai.",
    // TODO(verify): revenue claim that product reportedly reached $1M+ in annual recurring revenue for the client
    outcome: "Minibyte's technology powered a product that reportedly reached $1M+ in annual recurring revenue for the client.",
    stack: ["CallAxa white-label backend"],
  },
  {
    slug: "callaxa",
    title: "CallAxa",
    category: "voice",
    tag: "Voice AI · Campaigns & booking",
    art: "wave",
    text: "Minibyte's own voice-AI platform. Data-driven campaign optimization covers A/B testing, personalized email marketing and variable testing, and a real-time booking system with automated workflows handles routine interactions so human agents can focus on complex enquiries. A dashboard shows call volume, sentiment and recordings, with CRM and collaboration-tool integrations.",
    outcome: "Lets businesses scale appointment volume without adding staff, through instant 24/7 service, real-time booking and data-driven campaigns that raise conversion and customer satisfaction.",
    stack: ["Voice AI", "Booking automation", "CRM integrations"],
  },

  /* -------------------- 6. AI/ML Platforms & Infrastructure -------------------- */
  {
    slug: "emotive-tts",
    title: "Emotive Text-to-Speech",
    category: "platforms",
    tag: "AI/ML platform · Media & entertainment",
    art: "text",
    text: "A text-to-speech engine producing voice in 25+ distinct emotional styles. Data strategy: 25 professional voice actors recorded targeted emotional performances, and Demucs source separation extracted clean expressive vocals from open-source movie audio. Built with the Coqui TTS framework on PyTorch.",
    outcome: "Gives gaming, media and entertainment studios expressive synthetic voices in 25+ emotional styles.",
    stack: ["Coqui TTS", "PyTorch", "Demucs", "Dataset curation"],
  },
  {
    slug: "imagate",
    title: "Imagate",
    category: "platforms",
    tag: "AI/ML platform · Synthetic data",
    art: "text",
    text: "A Data-as-a-Service platform that generates unlimited, perfectly annotated training data programmatically. A pipeline of Unreal Engine, Houdini and Blender builds scenes procedurally with multi-layered ground-truth annotations, and an LLM interface generates complex scenes from simple text prompts.",
    outcome: "Replaces manual data collection and labelling with unlimited annotated synthetic data on demand, accelerating AI development.",
    stack: ["Unreal Engine", "Houdini", "Blender", "LLM procedural generation"],
  },
  {
    slug: "acwire-ma",
    title: "Acwire AI M&A System",
    category: "platforms",
    tag: "AI SaaS · M&A",
    art: "text",
    text: "A multi-tenant SaaS for M&A professionals covering AI-driven deal analysis, valuation, CIM generation and client delivery. A 24-agent LangGraph pipeline orchestrates the AI layer across four phases. A pure-Python financial core handles DCF, LBO, comps and Monte Carlo as deterministic math with full audit trails, not LLM arithmetic, and Temporal manages durable long-running workflows.",
    outcome: "Speeds up deal analysis, valuation and CIM generation while keeping the numbers trustworthy: deterministic, fully audited math, and weeks-long deals that survive server restarts and human review gates.",
    stack: ["LangGraph", "Temporal", "Python"],
  },
  {
    slug: "stackfuse",
    title: "StackFuse",
    category: "platforms",
    tag: "AI SaaS · Sales",
    art: "text",
    text: "A unified AI sales engine that closes the 'context gap' between siloed sales tools. A shared memory and stateful orchestration layer runs outreach natively across email, LinkedIn, Instagram, WhatsApp and voice AI. When a lead engages on any channel, every sequence adapts instantly and the CRM updates itself. Modules cover lead ingestion and enrichment, stateful outbound campaigns, a unified inbox and a 24/7 inbound concierge that answers queries and books meetings.",
    // TODO(verify): pricing ($199–$529/mo vs $1,250+/mo) and 89.7% gross margin claim
    outcome: "Brings enterprise-grade omnichannel orchestration to the underserved middle market at $199–$529/mo, against $1,250+/mo for legacy tools. A bring-your-own-key, model-routed architecture delivers an 89.7% gross margin on the Business tier.",
    stack: ["Stateful orchestration", "Multi-channel outreach", "Model routing"],
  },
  {
    slug: "anna",
    title: "Anna",
    category: "platforms",
    tag: "Data annotation platform",
    art: "text",
    text: "A data annotation platform supporting text, images, audio and video, with flexible labeling workflows and team collaboration. Customizable interfaces enable project-specific annotation with review and commenting. Semi-automated labeling integrates ML models that suggest annotations a human approves, dramatically accelerating annotation speed.",
    outcome: "Significantly reduces the time and cost of building high-quality datasets across text, images, audio and video, improving model accuracy and development velocity for computer vision and NLP projects.",
    stack: ["ML-assisted labeling", "Review workflows"],
  },
  {
    slug: "nolmt-ai",
    title: "nolmt.ai",
    category: "platforms",
    tag: "AI SaaS · Generative media",
    art: "text",
    hidden: true,
    todo: "Public site markets uncensored adult content. Client decision needed before this goes on the company site.",
    text: "A multi-tenant SaaS platform for text-to-image, text-to-video, image-to-image and image-to-video generation through Wavespeed API integration, with user management, workspace isolation and subscription payments.",
    outcome: "One subscription platform for several generation modalities, with isolated workspaces and built-in payments, so users create visual content without managing AI infrastructure.",
    stack: ["Wavespeed API", "Multi-tenancy", "Payments"],
  },

  /* -------------------- 7. Web, SaaS & Retail Automation -------------------- */
  {
    slug: "seb-pixel-grid",
    title: "Seb Million Pixel Grid",
    category: "web",
    tag: "Web platform · Art",
    art: "text",
    text: "An end-to-end 'million-pixel canvas' website for artist Sebastian Lewis Jones. A 1,000 × 1,000 pixel grid where visitors buy pixels for a dollar each, upload images and see the grid update in real time. The moderation pipeline, payment flow and image storage are all handled in-platform. Delivered end to end: frontend, backend, infrastructure, integrations and moderation.",
    outcome: "Gave the artist a complete, self-running platform where visitors buy pixels for a dollar each, upload images and watch the grid update live, with payments, moderation and storage handled in-platform.",
    stack: ["Real-time grid", "Payments", "Moderation pipeline"],
  },
  {
    slug: "cail-ai",
    title: "CAIL AI",
    category: "web",
    tag: "AI automation · Automotive",
    art: "text",
    text: "A multi-channel car-acquisition platform deployed with a Dubai-based partner. The first end client is Autowelt Prusseit, a large German used-car dealer. The pipeline runs unattended from raw listing to booked meeting: sourcing vehicles, scoring them against market comparables, contacting sellers by voice and WhatsApp, booking callbacks, and syncing the resulting pipeline into the dealer's task board.",
    outcome: "Runs car acquisition unattended for Autowelt Prusseit, from raw listing to booked meeting: sourcing and scoring vehicles, contacting sellers by voice and WhatsApp, and syncing the pipeline to the dealer's task board.",
    stack: ["Voice AI", "WhatsApp", "Market-comparable scoring"],
  },
  {
    slug: "lafragancia",
    title: "La Fragancia",
    category: "web",
    tag: "Retail automation",
    art: "text",
    featured: true,
    todo: "Deck spells it La Fragancia / LaFragrancia / La Fragrancia. Confirm the correct spelling.",
    text: "A complete retail-operations AI platform for La Fragancia, a multi-store fragrance retailer with 11+ US stores, Canadian operations and a wholesale arm. Gmail-monitored supplier invoices are AI-parsed on arrival, line items are matched against a catalog of about 153,860 SKUs, and Lightspeed purchase orders are created automatically. A nightly inventory sync runs across all stores, a reorder agent flags low stock, WhatsApp and email approval gates keep humans in the loop for edge cases, and a live 8-screen dashboard shows the state of the operation. Deployed on AWS and delivered end to end.",
    outcome: "In production across 11+ US stores, Canadian operations and a wholesale arm, it automates supplier invoices, purchase orders, inventory sync and reordering, with human approval gates for edge cases. A live proof point in retail automation.",
    stack: ["AWS", "Lightspeed", "Gmail", "WhatsApp", "Reorder agent"],
  },
  {
    slug: "qubed-pk",
    title: "Qubed.pk",
    category: "web",
    tag: "Web · Hospitality",
    art: "text",
    todo: "Deck outcome had placeholder text. Write a real outcome.",
    text: "A website for Qubed, a sustainable container-based retreat in Khyber Pakhtunkhwa, Pakistan, presenting the destinations (Nathiagali, Thandiani) with room, guest and date search for booking.",
    outcome: null,
    stack: ["Web platform", "Search & booking", "Responsive UI"],
  },
  {
    slug: "perfume-loft",
    title: "Perfume Loft",
    category: "web",
    tag: "Retail operations",
    art: "text",
    todo: "Deck 'outcome' restated the problem. Write what we built and the result.",
    text: "Perfume Loft is a fragrance retailer with five physical stores and an online shop. Each store is on its own separate point-of-sale account, so no single login sees all five and nobody has a consolidated view of stock or sales. Keeping the website roughly aligned with the tills meant retyping inventory by hand, and splitting one supplier delivery across the five stores took the better part of an hour of reading a PDF invoice and keying quantities into five accounts.",
    outcome: null,
    stack: ["Retail operations", "Inventory synchronization", "POS integration"],
  },
];

/* Helper queries */
export const visibleCases = CASES.filter((c) => !c.hidden);

export function casesByCategory(key: CategoryKey): CaseItem[] {
  return visibleCases.filter((c) => c.category === key);
}

/* =========================================================================
   SERVICES
   ========================================================================= */
export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  text: string;
  long: string;
  points: string[];
  cases: string[];
  icon: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "0001",
    slug: "ai-product-development",
    title: "AI product development",
    text: "Complete AI engineering for software and hardware products, from first prototype to production.",
    long: "We design and build AI-powered products end to end: the models, the software around them and, where needed, the hardware they run on. One team covers engineering, interface design and launch.",
    points: [
      "Complete AI engineering",
      "Software and embedded / hardware products",
      "Prototype to production hand-over",
      "Documentation and training for your team",
    ],
    cases: ["trackzella", "trackue", "autospin-360"],
    icon: "product",
  },
  {
    id: "0010",
    slug: "computer-vision",
    title: "Computer vision & spatial intelligence",
    text: "Systems that see: detection, tracking, 3D reconstruction and sensor fusion.",
    long: "From satellite imagery and LiDAR point clouds to live camera feeds, we build vision pipelines that turn raw sensor data into decisions. Our work spans detection, segmentation, OCR, optical flow and 3D reconstruction.",
    points: [
      "Object detection, segmentation and tracking",
      "Satellite, aerial and LiDAR analytics",
      "Face recognition and eye-landmark tracking",
      "3D reconstruction and view synthesis",
    ],
    cases: ["satellite-imagery", "well-log-digitization", "urban-guard", "lidarview"],
    icon: "vision",
  },
  {
    id: "0011",
    slug: "ai-ml-platforms",
    title: "AI/ML platforms & infrastructure",
    text: "SaaS platforms, custom models and data pipelines built to scale.",
    long: "When no existing model fits, we design, train and evaluate one. We also build the platforms and data infrastructure around it, including synthetic data generation and custom speech models.",
    points: [
      "AI research and development",
      "Custom model development",
      "SaaS platform development",
      "Synthetic data and dataset creation",
    ],
    cases: ["emotive-tts", "imagate"],
    icon: "platforms",
  },
  {
    id: "0100",
    slug: "process-automation",
    title: "Business process automation",
    text: "Multi-agent orchestration and workflows that streamline operations.",
    long: "We automate complex, multi-step work with agents and workflows, and design the hand-off so people only see the exceptions that need judgement.",
    points: [
      "Multi-agent orchestration",
      "Workflow and agent design with human hand-off",
      "Integration with the tools you already use",
      "Gradual roll-out alongside existing teams",
    ],
    cases: [],
    icon: "automation",
  },
  {
    id: "0101",
    slug: "web-design-growth",
    title: "Web, design & growth",
    text: "Web development, UI/UX, SEO, graphic design and marketing for AI products.",
    long: "A good model still needs a good product around it. We design and build the interface, the website and the go-to-market assets, and make sure people can find them.",
    points: [
      "Web development",
      "UI/UX design",
      "SEO",
      "Graphic design and marketing",
    ],
    cases: [],
    icon: "web",
  },
];

export interface StepItem {
  n: string;
  title: string;
  text: string;
  proof?: { label: string; slug: string };
}

// TODO(confirm with team): Process descriptions reflect real case workflows
export const STEPS: StepItem[] = [
  {
    n: "01",
    title: "Discover",
    text: "We study the problem, the data and the constraints with your team: the sensor, the device, the workflow. Then we agree what success looks like.",
    proof: { label: "Well-log digitization", slug: "well-log-digitization" },
  },
  {
    n: "02",
    title: "Prove",
    text: "A working prototype on your own data, benchmarked before anything is scaled. On AutoSpin 360 we ran two pipelines in parallel and benchmarked both on real dealer photo sets.",
    proof: { label: "AutoSpin 360", slug: "autospin-360" },
  },
  {
    n: "03",
    title: "Build",
    text: "We engineer the production system across software and, where needed, hardware: models, platforms, devices and integrations.",
    proof: { label: "Acwire AI M&A System", slug: "acwire-ma" },
  },
  {
    n: "04",
    title: "Deploy",
    text: "Cloud, on-premises or on the device itself. We hand it over or run it with you.",
    proof: { label: "Smart Hail Guard · 5,000 devices", slug: "smart-hail-guard" },
  },
];

export interface PrincipleItem {
  title: string;
  text: string;
  proof?: { label: string; slug: string };
}

// TODO(confirm with team): Principles verified against real case studies
export const PRINCIPLES: PrincipleItem[] = [
  {
    title: "Prototype to production",
    text: "We build things that ship and keep running: 5,000 hail-detection devices in the field, a retail platform live across 11+ stores.",
    proof: { label: "Smart Hail Guard", slug: "smart-hail-guard" },
  },
  {
    title: "Software and hardware, one team",
    text: "Models, platforms, circuit boards and airframes, from a single team.",
    proof: { label: "Aethero Radiation Shield", slug: "aethero-radiation-shield" },
  },
  {
    title: "Runs where it has to",
    text: "In the cloud, on the device with no cloud dependency, or in orbit.",
    proof: { label: "Guardio", slug: "guardio" },
  },
  {
    title: "Humans stay in the loop",
    text: "Approval gates, review steps and hand-offs, so people decide the edge cases.",
    proof: { label: "La Fragancia", slug: "lafragancia" },
  },
  {
    title: "Deterministic where it matters",
    text: "In financial analysis the math is audited Python, not LLM arithmetic.",
    proof: { label: "Acwire AI M&A System", slug: "acwire-ma" },
  },
  {
    title: "Research-minded engineering",
    text: "We benchmark competing approaches on real data before committing to one.",
    proof: { label: "AutoSpin 360", slug: "autospin-360" },
  },
];

export interface EngagementItem {
  id: string;
  title: string;
  text: string;
  example: {
    slug: string;
    label: string;
    note: string;
  };
  eyebrow?: string;
}

// TODO(confirm with team): Engagement models and client contract types
export const ENGAGEMENT: EngagementItem[] = [
  {
    id: "0001",
    title: "Build for you",
    text: "You bring the problem; we design, build and deliver the system.",
    example: {
      slug: "voxr-ai",
      label: "VOXR",
      note: "Minibyte was paid for development; the client operates the product.",
    },
  },
  {
    id: "0010",
    title: "White-label platforms",
    text: "Start from a platform we already run and make it yours.",
    example: {
      slug: "callaxa",
      label: "Callaxa & Ringly.io",
      note: "Pre-built conversational triage and voice engines adapted to your brand and stack.",
    },
  },
  {
    id: "0011",
    title: "R&D partnerships",
    text: "Applied research with a partner on a hard, open problem.",
    eyebrow: "Applied R&D & Innovation Partnerships",
    example: {
      slug: "gps-denied-navigation",
      label: "GPS-Denied Navigation",
      note: "Joint sensor-fusion R&D yielding foundational IP in multi-sensor triangulation.",
    },
  },
  {
    id: "0100",
    title: "Studio companies",
    text: "Products we build and operate ourselves.",
    eyebrow: "Studio Companies",
    example: {
      slug: "agricultural-ugv",
      label: "Agricultural UGV & Stackfuse",
      note: "Minibyte's flagship autonomous robotics product and developer tooling.",
    },
  },
];

export interface RunsOnItem {
  title: string;
  text: string;
  cases: string[];
}

export const RUNS_ON: RunsOnItem[] = [
  {
    title: "In the cloud",
    text: "SaaS platforms and pipelines on AWS and other clouds.",
    cases: ["lafragancia", "acwire-ma"],
  },
  {
    title: "On the device",
    text: "Optimized models and custom hardware, with no cloud dependency.",
    cases: ["guardio", "drive-pulse", "agricultural-ugv"],
  },
  {
    title: "In the field and in orbit",
    text: "Thousands of units outdoors, and flight hardware that reached orbit.",
    cases: ["smart-hail-guard", "aethero-radiation-shield"],
  },
];

export interface ProofStatItem {
  value: string;
  label: string;
  slug: string;
}

export const PROOF_STATS: ProofStatItem[] = [
  // TODO(verify): 5,000 devices deployed across the US
  {
    value: "5,000",
    label: "hail-detection devices deployed across the US",
    slug: "smart-hail-guard",
  },
  // TODO(verify): 10x speed-up on-device
  {
    value: "10x",
    label: "on-device speed-up over the baseline",
    slug: "guardio",
  },
  // TODO(verify): < 1 hr well-log digitization
  {
    value: "< 1 hr",
    label: "well-log digitization, down from several days",
    slug: "well-log-digitization",
  },
  // TODO(verify): 70%+ of Shopify merchant calls resolved without a human
  {
    value: "70%+",
    label: "of Shopify merchant calls resolved without a human",
    slug: "ringly-io",
  },
];

export interface FAQItem {
  q: string;
  a: string;
  cases?: string[];
}

// TODO(confirm with team): Client FAQ phrasing and engagement policies
export const FAQ: FAQItem[] = [
  {
    q: "Do you only build software?",
    a: "No. We also design and build hardware, from custom OBD-II telematics dongles (Drive Pulse) and IoT hail sensors (Smart Hail Guard) to robotic ground vehicles (Agricultural UGV) and space radiation shields (Aethero).",
    cases: ["drive-pulse", "smart-hail-guard", "agricultural-ugv", "aethero-radiation-shield"],
  },
  {
    q: "Where does our code and model run?",
    a: "Wherever the workload demands: in the cloud (AWS, GCP, Azure), on-premises, or on the edge (Jetson, TensorRT, TF-Lite) with zero external network dependency.",
    cases: ["lafragancia", "guardio", "smart-hail-guard"],
  },
  {
    q: "How do you approach open-ended research problems?",
    a: "We build a benchmarked prototype on your real data before scaling. When multiple approaches are plausible, we test parallel pipelines against objective metrics before committing.",
    cases: ["autospin-360", "well-log-digitization"],
  },
  {
    q: "What engagement models do you support?",
    a: "We work through direct custom engineering, white-label platform adaptation, collaborative R&D partnerships, and incubated studio products.",
    cases: ["voxr-ai", "callaxa", "gps-denied-navigation", "agricultural-ugv"],
  },
  {
    q: "Can human operators remain in the loop for high-stakes decisions?",
    a: "Yes. We build automated approval gates, review stages, and WhatsApp or email alert queues so people decide the exceptions while routine flows execute autonomously.",
    cases: ["lafragancia", "cail-ai"],
  },
];

export type LabKind = "flagship" | "studio" | "product" | "rnd" | "capability";

export interface LabItem {
  slug: string;
  kind: LabKind;
  label: string;
  headline?: string;
  status?: string;
}

// TODO(confirm with team): which of these are studio companies vs in-house products.
export const LABS: LabItem[] = [
  {
    slug: "agricultural-ugv",
    kind: "flagship",
    label: "Flagship product",
    status: "Actively seeking seed funding",
  },
  {
    slug: "stackfuse",
    kind: "studio",
    label: "Studio company",
  },
  {
    slug: "anna",
    kind: "studio",
    label: "Studio company",
  },
  {
    slug: "callaxa",
    kind: "product",
    label: "In-house product",
  },
  {
    slug: "fabsky",
    kind: "capability",
    label: "In-house fabrication",
  },
  {
    slug: "facial-animation",
    kind: "rnd",
    label: "Applied R&D",
  },
  {
    slug: "vr-pilot-training",
    kind: "rnd",
    label: "Applied R&D",
  },
  {
    slug: "dyseye",
    kind: "rnd",
    label: "Applied R&D",
  },
  {
    slug: "gps-denied-navigation",
    kind: "rnd",
    label: "Applied R&D",
    headline: "Foundational IP in multi-sensor fusion",
  },
];

export interface ArticleItem {
  slug: string;
  tag: string;
  title: string;
  text: string;
  words: string[];
  case: string;
  keyFact?: { value: string; label: string };
  body: string[];
}

export function readingMinutes(a: ArticleItem): number {
  const words = a.body.join(" ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

// TODO(team): review, expand, assign an author and a date before promoting
export const ARTICLES: ArticleItem[] = [
  {
    slug: "two-pipelines-one-decision",
    tag: "Computer vision",
    title: "Why we ran two pipelines before choosing one",
    case: "autospin-360",
    words: ["spin", "view", "3d"],
    keyFact: {
      value: "8",
      label: "dealer photos in, a 360° spin and 3D viewer out",
    },
    text: "AutoSpin 360 turns eight dealer photos into a 360° spin video and a 3D viewer. Here is why we built two approaches side by side.",
    body: [
      "AutoSpin 360 was built for Autofox GmbH in Stuttgart, a Cool Agency client serving 3,500+ dealerships with AI car photography. The input is demanding: eight photos, mixed lighting, mixed angles.",
      "Rather than bet on a single technique, we ran two pipelines in parallel: classical 3D reconstruction from multi-view images, and generative video for view synthesis.",
      "Both are benchmarked against real dealer photo sets and shipping timelines, so the choice of technique rests on evidence from the actual constraint, not on preference.",
    ],
  },
  {
    slug: "well-logs-days-to-an-hour",
    tag: "Computer vision",
    title: "From several days to under an hour: digitizing legacy well logs",
    case: "well-log-digitization",
    words: ["las", "logs", "ocr"],
    keyFact: {
      value: "< 1 hr",
      label: "digitization time, down from several days",
    },
    text: "Decades of subsurface data sit in raster well logs. A two-phase vision pipeline turns them into analysis-ready LAS files.",
    body: [
      "Decades of subsurface records exist only as legacy raster well logs. To analyze them computationally they must become industry-standard LAS files, which used to take several days.",
      "Phase one digitizes: U-Net semantic segmentation isolates the log curves, an SVM refines the data, YOLO detects headers and OCR extracts the metadata.",
      "Phase two interprets: geological material is classified automatically against predefined legends.",
      "Digitization time fell from several days to under one hour. The technology is currently being acquired by a leading graph-based digitization provider.",
    ],
  },
  {
    slug: "ten-times-faster-on-the-device",
    tag: "Edge AI",
    title: "Getting 10x on the device, with no cloud",
    case: "guardio",
    words: ["edge", "tflite", "trt"],
    keyFact: {
      value: "10x",
      label: "faster than the baseline implementation",
    },
    text: "How hardware-aware optimization turned a security concept into a commercially viable product.",
    body: [
      "Guardio runs face detection, recognition and intrusion detection with TensorFlow models, deployed with TF-Lite and TensorRT for quantization and compilation.",
      "Hardware-aware optimization delivered a 10x performance increase over the baseline implementation, which is what turned a theoretical concept into a commercially viable product.",
      "Because inference runs on the device, monitoring is real time with no cloud dependency and no associated cloud cost, which suits high-stakes environments that need privacy and zero-latency response.",
    ],
  },
  {
    slug: "hail-evidence-in-the-field",
    tag: "Edge AI",
    title: "5,000 devices, one question: was it really hail?",
    case: "smart-hail-guard",
    words: ["hail", "mqtt", "iot"],
    keyFact: {
      value: "5,000",
      label: "devices deployed across the United States",
    },
    text: "Smart Hail Guard gives insurers timestamped, geolocated evidence of hail events.",
    body: [
      "Smart Hail Guard is an AI hail-detection system with 5,000 devices deployed across the United States for insurance verification.",
      "A PyTorch and OpenCV pipeline analyzes high-speed camera feeds to identify hail events in real time, telling hail apart from rain and debris with high accuracy.",
      "Detections travel over MQTT to ThingsBoard, giving insurers timestamped, geolocated evidence. Legitimate claims can be approved quickly while fraud is prevented.",
    ],
  },
  {
    slug: "deterministic-math-in-an-ai-product",
    tag: "AI platforms",
    title: "Why the numbers in an AI product shouldn't come from the model",
    case: "acwire-ma",
    words: ["agents", "audit", "dcf"],
    keyFact: {
      value: "24",
      label: "agents in the LangGraph pipeline",
    },
    text: "In Acwire's M&A system, AI orchestrates the analysis and audited Python does the math.",
    body: [
      "Acwire is a multi-tenant SaaS for M&A professionals covering deal analysis, valuation, CIM generation and client delivery.",
      "A 24-agent LangGraph pipeline orchestrates the AI layer across four phases. The numbers, however, do not come from a language model: a pure-Python financial core handles DCF, LBO, comps and Monte Carlo as deterministic math with full audit trails, not LLM arithmetic.",
      "Temporal manages durable long-running workflows, so deals that span weeks survive server restarts and human review gates.",
    ],
  },
  {
    slug: "finding-small-things-in-big-frames",
    tag: "Computer vision",
    title: "Finding small things in big frames: sliced inference",
    case: "object-tracker",
    words: ["track", "slice", "gpu"],
    keyFact: {
      value: "< 1 s",
      label: "latency, sub-second tracking",
    },
    text: "How a generic tracker finds UAV-sized targets in high-resolution video.",
    body: [
      "Small targets such as UAVs are easy to lose inside large, high-resolution frames.",
      "Sliced inference splits each frame so the detector can find them, and custom tracking algorithms then follow every object across frames with sub-second latency.",
      "The engine is modular and GPU-optimized, built with TensorFlow, OpenCV and Python, so one core tracker adapts to defense, logistics, sports analytics and surveillance rather than a separate system for each.",
    ],
  },
];

// Ensure all articles reference valid, non-hidden cases
export const validArticles: ArticleItem[] = ARTICLES.filter((a) => {
  const c = CASES.find((item) => item.slug === a.case);
  if (!c || c.hidden) {
    if (typeof console !== "undefined") {
      console.warn(`[lib/data] Warning: Article "${a.slug}" references missing or hidden case "${a.case}". Skipping.`);
    }
    return false;
  }
  return true;
});

export interface RoleAreaItem {
  slug: string;
  title: string;
  text: string;
  tech: string[];
  cases: string[];
}

export interface CultureItem {
  title: string;
  text: string;
  link: string;
}

// TODO(confirm with team): replace with real openings, locations and process when they exist
export const ROLE_AREAS: RoleAreaItem[] = [
  {
    slug: "computer-vision",
    title: "Computer vision engineer",
    text: "Build systems that see: detection, segmentation, tracking and 3D reconstruction on satellite, LiDAR and camera data.",
    tech: ["TensorFlow", "PyTorch", "OpenCV", "YOLO", "U-Net"],
    cases: ["well-log-digitization", "urban-guard", "object-tracker"],
  },
  {
    slug: "ml-research",
    title: "Machine learning and research engineer",
    text: "Design, train and evaluate custom models: speech, facial animation and synthetic data.",
    tech: ["PyTorch", "Coqui TTS", "Demucs"],
    cases: ["emotive-tts", "facial-animation", "imagate"],
  },
  {
    slug: "edge-embedded",
    title: "Edge AI and embedded engineer",
    text: "Take models onto the device: quantization, compilation and custom hardware.",
    tech: ["TF-Lite", "TensorRT", "NVIDIA Jetson", "MQTT"],
    cases: ["guardio", "smart-hail-guard", "drive-pulse", "aethero-radiation-shield"],
  },
  {
    slug: "robotics-autonomy",
    title: "Robotics and autonomy engineer",
    text: "Sensor fusion, navigation and manipulation for autonomous machines.",
    tech: ["GPS / vision / IMU fusion", "Kalman filtering", "6-DOF arms"],
    cases: ["agricultural-ugv", "arm-lift", "gps-denied-navigation"],
  },
  {
    slug: "mechanical-fabrication",
    title: "Mechanical and fabrication engineer",
    text: "Design airframes and enclosures, then make them: CNC, 3D printing and laser cutting.",
    tech: ["CNC machining", "FDM / SLA printing", "Laser cutting", "Carbon fiber"],
    cases: ["fabsky", "aethero-radiation-shield"],
  },
  {
    slug: "voice-backend",
    title: "Voice AI and backend engineer",
    text: "Voice and conversational agents wired into CRMs, calendars and e-commerce.",
    tech: ["VAPI", "Flask", "GoHighLevel", "Shopify"],
    cases: ["lisa", "chatley-ai", "ringly-io", "callaxa"],
  },
  {
    slug: "fullstack-agents",
    title: "Full-stack and agent engineer",
    text: "Multi-tenant SaaS and multi-agent pipelines that run unattended.",
    tech: ["LangGraph", "Temporal", "AWS", "Python"],
    cases: ["acwire-ma", "stackfuse", "lafragancia"],
  },
  {
    slug: "design-growth",
    title: "Product designer and growth marketer",
    text: "UI/UX, graphic design, SEO and marketing for AI products and websites.",
    tech: ["UI/UX", "Graphic design", "SEO"],
    cases: ["seb-pixel-grid", "qubed-pk"],
  },
].map((role) => ({
  ...role,
  // Skip any case slug that is hidden
  cases: role.cases.filter((slug) => visibleCases.some((c) => c.slug === slug)),
}));

export const CULTURE: CultureItem[] = [
  {
    title: "See it ship",
    text: "Your work runs in the field: devices across the US, hardware that reached orbit, platforms in production.",
    link: "/work",
  },
  {
    title: "Software and hardware",
    text: "Models, platforms, circuit boards and airframes, often on the same project.",
    link: "/how-we-work",
  },
  {
    title: "A global team",
    text: `Offices in ${OFFICES.length} countries (${OFFICES.map((o) => o.name).join(", ")}).`,
    link: "/company#map",
  },
];
