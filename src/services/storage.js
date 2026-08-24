// ─── Default & Clean Portfolio States ──────────────────────────────────────
const STORAGE_KEY = 'portfolioforge_data_v1';

export const blankPortfolioData = {
  themeId: 'sage-cream',
  layout: 'classic',
  profile: {
    name: '',
    title: '',
    about: '',
    imageUrl: '',
    email: '',
    github: '',
    linkedin: '',
    twitter: '',
    resumeLink: '',
    slug: '',
  },
  education: [
    {
      id: 'edu-1',
      degree: '',
      institution: '',
      startYear: '',
      endYear: '',
      gpa: '',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      role: '',
      company: '',
      startDate: '',
      endDate: '',
      current: true,
      responsibilities: '',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: '',
      description: '',
      imageUrl: '',
      techStack: [],
      link: '',
      featured: true,
    },
  ],
  skills: [],
  certifications: [],
};

export const defaultPortfolioData = {
  themeId: 'sage-cream',
  layout: 'classic',
  profile: {
    name: 'Alex Vance',
    title: 'Senior Distributed Systems & Cloud Architect',
    about: 'Specializing in high-throughput distributed architectures, real-time telemetry systems, and resilient cloud-native infrastructure. Passionate about systems programming, performance engineering, and open-source tooling.',
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    email: 'alex.vance@devmail.io',
    github: 'https://github.com/alexvance-dev',
    linkedin: 'https://linkedin.com/in/alex-vance-eng',
    twitter: 'https://x.com/alexvance_dev',
    resumeLink: 'https://example.com/alex-vance-resume.pdf',
    slug: 'alex-vance',
  },
  education: [
    {
      id: 'edu-1',
      degree: 'M.S. Computer Science (Distributed Systems)',
      institution: 'Stanford University',
      startYear: '2017',
      endYear: '2019',
      gpa: '3.94',
    },
    {
      id: 'edu-2',
      degree: 'B.S. Software Engineering & Mathematics',
      institution: 'UC Berkeley',
      startYear: '2013',
      endYear: '2017',
      gpa: '3.88',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Principal Systems Architect',
      company: 'NeuralCloud Labs',
      startDate: '2022',
      endDate: 'Present',
      current: true,
      responsibilities: '• Designed and orchestrated a distributed event streaming engine processing 1.2M events/sec with sub-5ms p99 latency.\n• Migrated monolithic services to Kubernetes microservices cluster with zero downtime across 4 global regions.\n• Implemented automated multi-region failover and real-time observability telemetry using Prometheus and OpenTelemetry.',
    },
    {
      id: 'exp-2',
      role: 'Lead Backend Engineer',
      company: 'Apex Data Infrastructure',
      startDate: '2019',
      endDate: '2022',
      current: false,
      responsibilities: '• Led backend engineering for real-time analytics engine, cutting query response time by 65% via custom columnar caching.\n• Spearheaded Golang & Rust migration for core query engine, reducing memory footprint by 40%.\n• Mentored 8 software engineers and established architectural RFC review processes across 4 squads.',
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'HyperMesh Distributed KV Store',
      description: 'A high-performance Raft-consensus distributed key-value store with LSM-tree storage engine, zero-copy networking, and dynamic cluster auto-rebalancing.',
      imageUrl: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
      techStack: ['Rust', 'Raft Consensus', 'gRPC', 'RocksDB', 'Docker'],
      link: 'https://github.com/alexvance-dev/hypermesh',
      featured: true,
    },
    {
      id: 'proj-2',
      title: 'KubeTelemetry Observability Mesh',
      description: 'Real-time eBPF-based network traffic observer and Prometheus telemetry exporter for Kubernetes clusters with microsecond anomaly detection.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
      techStack: ['Go', 'eBPF', 'Kubernetes', 'Prometheus', 'Grafana'],
      link: 'https://github.com/alexvance-dev/kubetelemetry',
      featured: true,
    },
    {
      id: 'proj-3',
      title: 'AuraDB Columnar Engine',
      description: 'Embedded analytical columnar storage engine written in Rust with SIMD vectorization and Arrow memory format for sub-millisecond query scans.',
      imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
      techStack: ['Rust', 'Apache Arrow', 'SIMD', 'WebAssembly'],
      link: 'https://github.com/alexvance-dev/auradb',
      featured: false,
    },
  ],
  skills: [
    'Rust', 'Go (Golang)', 'Distributed Systems', 'Kubernetes & Docker',
    'Microservices Architecture', 'Raft Consensus', 'eBPF & Linux Internals',
    'PostgreSQL & RocksDB', 'Kafka & Event Streaming', 'OpenTelemetry & Prometheus',
    'gRPC & Protobuf', 'Cloud-Native Infrastructure (AWS/GCP)'
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Certified Kubernetes Security Specialist (CKS)',
      issuer: 'Cloud Native Computing Foundation (CNCF)',
      year: '2024',
      link: 'https://www.cncf.io/certification/cks/',
      imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 'cert-2',
      name: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      year: '2023',
      link: 'https://aws.amazon.com/certification/certified-solutions-architect-professional/',
      imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
    },
  ],
};

// ─── Local Storage Operations ───────────────────────────────────────────────
export function loadPortfolio() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultPortfolioData;
    return { ...defaultPortfolioData, ...JSON.parse(raw) };
  } catch (err) {
    console.error('Failed to load portfolio from localStorage:', err);
    return defaultPortfolioData;
  }
}

export function savePortfolio(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save portfolio to localStorage:', err);
  }
}

export function clearPortfolio() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear portfolio:', err);
  }
}

// ─── Slug Generator ────────────────────────────────────────────────────────
export function generateSlug(name) {
  if (!name || !name.trim()) return 'portfolio';
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
