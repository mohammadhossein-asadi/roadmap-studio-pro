export interface RoadmapMeta {
  id: string;
  label: string;
  description: string;
  icon: string;
  color: string;
  category: "role" | "skill";
}

export const ROADMAP_CATEGORIES = {
  role: "Role-based Roadmaps",
  skill: "Skill-based Roadmaps",
} as const;

export const ROADMAPS: RoadmapMeta[] = [
  // ── Role-based Roadmaps ──
  { id: "frontend", label: "Frontend Developer", description: "Build beautiful, performant user interfaces for the web", icon: "Layout", color: "violet", category: "role" },
  { id: "backend", label: "Backend Developer", description: "Design and build scalable server-side applications and APIs", icon: "Server", color: "emerald", category: "role" },
  { id: "fullstack", label: "Full Stack Developer", description: "Master both frontend and backend to build complete web applications", icon: "Layers", color: "blue", category: "role" },
  { id: "devops", label: "DevOps Engineer", description: "Automate infrastructure, CI/CD pipelines, and cloud deployments", icon: "Cloud", color: "orange", category: "role" },
  { id: "devsecops", label: "DevSecOps", description: "Integrate security into every stage of the development lifecycle", icon: "Shield", color: "red", category: "role" },
  { id: "dataanalyst", label: "Data Analyst", description: "Analyze data and create visualizations to drive business decisions", icon: "BarChart3", color: "cyan", category: "role" },
  { id: "aiengineer", label: "AI Engineer", description: "Build and deploy AI-powered applications with LLMs and ML models", icon: "Brain", color: "violet", category: "role" },
  { id: "aidatascientist", label: "AI & Data Scientist", description: "Apply machine learning and statistics to extract insights from data", icon: "Sparkles", color: "blue", category: "role" },
  { id: "dataengineering", label: "Data Engineer", description: "Build data pipelines, warehouses, and lakehouse platforms", icon: "Database", color: "amber", category: "role" },
  { id: "android", label: "Android Developer", description: "Build native Android apps with Kotlin and Jetpack Compose", icon: "Smartphone", color: "emerald", category: "role" },
  { id: "ios", label: "iOS Developer", description: "Build native iOS apps with Swift and SwiftUI", icon: "Smartphone", color: "blue", category: "role" },
  { id: "mobile", label: "Mobile Developer", description: "Create cross-platform mobile applications with React Native", icon: "Smartphone", color: "pink", category: "role" },
  { id: "machinelearning", label: "Machine Learning Engineer", description: "Build, train, and deploy machine learning models at scale", icon: "Brain", color: "cyan", category: "role" },
  { id: "mlops", label: "MLOps", description: "Operationalize ML models with CI/CD, monitoring, and infrastructure", icon: "Settings", color: "orange", category: "role" },
  { id: "cloud", label: "Cloud Architect", description: "Design and deploy multi-cloud infrastructure with AWS, GCP, and Azure", icon: "Cloud", color: "cyan", category: "role" },
  { id: "security", label: "Cybersecurity", description: "Protect systems and networks through ethical hacking and defense", icon: "Shield", color: "red", category: "role" },
  { id: "postgresql", label: "PostgreSQL", description: "Master PostgreSQL database administration and optimization", icon: "Database", color: "blue", category: "role" },
  { id: "blockchain", label: "Blockchain Developer", description: "Build decentralized applications with Solidity and Web3", icon: "Link", color: "amber", category: "role" },
  { id: "qa", label: "QA Engineer", description: "Ensure software quality through manual and automated testing", icon: "CheckCircle", color: "emerald", category: "role" },
  { id: "softwarearchitect", label: "Software Architect", description: "Design scalable, maintainable software systems and architectures", icon: "Boxes", color: "violet", category: "role" },
  { id: "uxdesign", label: "UX Designer", description: "Create intuitive, user-centered digital experiences", icon: "Palette", color: "pink", category: "role" },
  { id: "technicalwriter", label: "Technical Writer", description: "Create clear, effective technical documentation and guides", icon: "FileText", color: "blue", category: "role" },
  { id: "gamedeveloper", label: "Game Developer", description: "Build games with Unity, Unreal Engine, or custom engines", icon: "Gamepad2", color: "violet", category: "role" },
  { id: "serversidegamedev", label: "Server-Side Game Developer", description: "Build game backends, multiplayer systems, and real-time servers", icon: "Server", color: "orange", category: "role" },
  { id: "productmanager", label: "Product Manager", description: "Lead product strategy, roadmap, and cross-functional delivery", icon: "Target", color: "blue", category: "role" },
  { id: "engineeringmanager", label: "Engineering Manager", description: "Lead engineering teams, hiring, and technical strategy", icon: "Users", color: "emerald", category: "role" },
  { id: "devrel", label: "Developer Relations", description: "Build developer communities through content, advocacy, and events", icon: "Megaphone", color: "pink", category: "role" },
  { id: "bianalyst", label: "BI Analyst", description: "Create business intelligence reports and dashboards", icon: "PieChart", color: "cyan", category: "role" },
  { id: "networkengineer", label: "Network Engineer", description: "Design, implement, and manage network infrastructure", icon: "Network", color: "orange", category: "role" },
  { id: "forwarddeployedengineer", label: "Forward Deployed Engineer", description: "Work directly with clients to implement technical solutions", icon: "Rocket", color: "violet", category: "role" },
  { id: "sre", label: "Site Reliability Engineer", description: "Ensure system reliability through monitoring, automation, and incident response", icon: "Activity", color: "red", category: "role" },

  // ── Skill-based Roadmaps ──
  { id: "python", label: "Python", description: "Learn Python from basics to advanced patterns and frameworks", icon: "Code", color: "blue", category: "skill" },
  { id: "sql", label: "SQL", description: "Master SQL queries, joins, aggregation, and database design", icon: "Database", color: "cyan", category: "skill" },
  { id: "react", label: "React", description: "Build modern UIs with React components, hooks, and ecosystem", icon: "Atom", color: "cyan", category: "skill" },
  { id: "vue", label: "Vue.js", description: "Progressive framework for building user interfaces", icon: "Code", color: "emerald", category: "skill" },
  { id: "angular", label: "Angular", description: "Platform for building mobile and desktop web applications", icon: "Code", color: "red", category: "skill" },
  { id: "javascript", label: "JavaScript", description: "The language of the web — ES6+, async, DOM, and beyond", icon: "Code", color: "amber", category: "skill" },
  { id: "typescript", label: "TypeScript", description: "Type-safe JavaScript with static typing and modern tooling", icon: "Code", color: "blue", category: "skill" },
  { id: "nodejs", label: "Node.js", description: "Server-side JavaScript runtime for APIs and microservices", icon: "Server", color: "emerald", category: "skill" },
  { id: "java", label: "Java", description: "Enterprise-grade programming language for large-scale applications", icon: "Coffee", color: "orange", category: "skill" },
  { id: "springboot", label: "Spring Boot", description: "Build production-ready Java applications with Spring ecosystem", icon: "Leaf", color: "emerald", category: "skill" },
  { id: "flutter", label: "Flutter", description: "Build cross-platform mobile apps with Dart and Material Design", icon: "Smartphone", color: "cyan", category: "skill" },
  { id: "c", label: "C Programming", description: "Low-level systems programming and memory management", icon: "Terminal", color: "blue", category: "skill" },
  { id: "cpp", label: "C++", description: "High-performance programming with OOP, STL, and modern features", icon: "Terminal", color: "blue", category: "skill" },
  { id: "rust", label: "Rust", description: "Safe, concurrent systems programming with zero-cost abstractions", icon: "Terminal", color: "orange", category: "skill" },
  { id: "go", label: "Go", description: "Simple, fast language for cloud-native and concurrent systems", icon: "Terminal", color: "cyan", category: "skill" },
  { id: "graphql", label: "GraphQL", description: "Query language for APIs with schemas, resolvers, and subscriptions", icon: "GitBranch", color: "pink", category: "skill" },
  { id: "reactnative", label: "React Native", description: "Build cross-platform mobile apps with React and native modules", icon: "Smartphone", color: "cyan", category: "skill" },
  { id: "mongodb", label: "MongoDB", description: "NoSQL document database with flexible schemas and aggregation", icon: "Database", color: "emerald", category: "skill" },
  { id: "linux", label: "Linux", description: "Linux administration, shell scripting, and system management", icon: "Terminal", color: "amber", category: "skill" },
  { id: "kubernetes", label: "Kubernetes", description: "Container orchestration, deployments, services, and cluster management", icon: "Cloud", color: "blue", category: "skill" },
  { id: "docker", label: "Docker", description: "Containerization with images, Dockerfile, compose, and networking", icon: "Box", color: "cyan", category: "skill" },
  { id: "aws", label: "AWS", description: "Amazon Web Services — EC2, S3, Lambda, and cloud architecture", icon: "Cloud", color: "orange", category: "skill" },
  { id: "terraform", label: "Terraform", description: "Infrastructure as Code with HCL, providers, and state management", icon: "Layers", color: "violet", category: "skill" },
  { id: "redis", label: "Redis", description: "In-memory data store for caching, pub/sub, and real-time apps", icon: "Database", color: "red", category: "skill" },
  { id: "git", label: "Git & GitHub", description: "Version control, branching, workflows, and collaboration", icon: "GitBranch", color: "orange", category: "skill" },
  { id: "php", label: "PHP", description: "Server-side scripting for web development with Laravel and WordPress", icon: "Code", color: "violet", category: "skill" },
  { id: "kotlin", label: "Kotlin", description: "Modern JVM language for Android, server-side, and multiplatform", icon: "Code", color: "violet", category: "skill" },
  { id: "html", label: "HTML", description: "Semantic markup, accessibility, forms, and document structure", icon: "FileCode", color: "orange", category: "skill" },
  { id: "css", label: "CSS", description: "Styling with Flexbox, Grid, animations, and responsive design", icon: "Paintbrush", color: "blue", category: "skill" },
  { id: "swift", label: "Swift & SwiftUI", description: "Apple's modern language and declarative UI framework for iOS", icon: "Code", color: "orange", category: "skill" },
  { id: "shell", label: "Shell / Bash", description: "Command-line scripting, automation, and system administration", icon: "Terminal", color: "emerald", category: "skill" },
  { id: "laravel", label: "Laravel", description: "Elegant PHP framework with Eloquent, Blade, and ecosystem", icon: "Code", color: "red", category: "skill" },
  { id: "elasticsearch", label: "Elasticsearch", description: "Full-text search engine with indexing, queries, and analytics", icon: "Search", color: "amber", category: "skill" },
  { id: "wordpress", label: "WordPress", description: "CMS development with themes, plugins, and REST API", icon: "Globe", color: "blue", category: "skill" },
  { id: "django", label: "Django", description: "Python web framework with ORM, templates, and REST API", icon: "Code", color: "emerald", category: "skill" },
  { id: "ruby", label: "Ruby", description: "Elegant, productive language with OOP and metaprogramming", icon: "Gem", color: "red", category: "skill" },
  { id: "rubyonrails", label: "Ruby on Rails", description: "Full-stack web framework with MVC, ActiveRecord, and conventions", icon: "Train", color: "red", category: "skill" },
  { id: "scala", label: "Scala", description: "Functional + OOP language for big data and distributed systems", icon: "Code", color: "red", category: "skill" },
  { id: "nextjs", label: "Next.js", description: "React framework with App Router, Server Components, and SSR", icon: "Code", color: "blue", category: "skill" },
  { id: "systemdesign", label: "System Design", description: "Architecture patterns, scalability, caching, and distributed systems", icon: "Boxes", color: "violet", category: "skill" },
  { id: "leetcode", label: "LeetCode", description: "Data structures and algorithms practice for coding interviews", icon: "Puzzle", color: "amber", category: "skill" },
  { id: "codereview", label: "Code Review", description: "Best practices for reviewing code, giving feedback, and quality gates", icon: "Eye", color: "emerald", category: "skill" },
  { id: "cssharp", label: "C#", description: "Microsoft's language for .NET, game dev, and enterprise apps", icon: "Code", color: "violet", category: "skill" },
  { id: "aspnetcore", label: "ASP.NET Core", description: "High-performance .NET framework for web APIs and web apps", icon: "Server", color: "blue", category: "skill" },
  { id: "apidesign", label: "API Design", description: "REST best practices, versioning, documentation, and GraphQL", icon: "Plug", color: "cyan", category: "skill" },
  { id: "designsystem", label: "Design System", description: "Tokens, components, documentation, and accessibility patterns", icon: "Layout", color: "pink", category: "skill" },
  { id: "promptengineering", label: "Prompt Engineering", description: "Design effective prompts for LLMs and AI systems", icon: "MessageSquare", color: "violet", category: "skill" },
  { id: "aiproductbuilders", label: "AI Product Builders", description: "Build products powered by LLMs, RAG, and AI agents", icon: "Sparkles", color: "cyan", category: "skill" },
  { id: "airedteaming", label: "AI Red Teaming", description: "Test AI systems for vulnerabilities, prompt injection, and jailbreaks", icon: "ShieldAlert", color: "red", category: "skill" },
  { id: "aiagents", label: "AI Agents", description: "Build autonomous agents with tools, planning, and memory", icon: "Bot", color: "violet", category: "skill" },
  { id: "claudecode", label: "Claude Code", description: "Use Claude Code CLI for AI-assisted development workflows", icon: "Terminal", color: "violet", category: "skill" },
  { id: "vibecoding", label: "Vibe Coding", description: "AI-assisted development with prompt-driven code generation", icon: "Wand", color: "pink", category: "skill" },
  { id: "computervision", label: "Computer Vision", description: "Image processing, CNNs, object detection, and YOLO", icon: "Eye", color: "cyan", category: "skill" },
  { id: "nlp", label: "Natural Language Processing", description: "Text processing, transformers, BERT, GPT, and fine-tuning", icon: "MessageSquare", color: "blue", category: "skill" },
  { id: "datascience", label: "Data Science", description: "Python, statistics, ML, visualization, and storytelling with data", icon: "BarChart3", color: "cyan", category: "skill" },
  { id: "cybersec", label: "Cyber Security", description: "Networking, pentesting, forensics, and defense strategies", icon: "ShieldAlert", color: "red", category: "skill" },
  { id: "cloudarchitecture", label: "Cloud Architecture", description: "Multi-cloud design, networking, compute, storage, and security patterns", icon: "Cloud", color: "orange", category: "skill" },
];

export function getRoadmapMeta(id: string): RoadmapMeta | undefined {
  return ROADMAPS.find((r) => r.id === id);
}

export function getRoadmapsByCategory(category: "role" | "skill"): RoadmapMeta[] {
  return ROADMAPS.filter((r) => r.category === category);
}
