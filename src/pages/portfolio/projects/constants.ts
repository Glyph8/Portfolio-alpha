export interface Skill {
  name: string;
}

export interface ProjectSkill {
  skill_reason: string | null;
  skills: Skill; 
}

export interface ProjectCardProps {
  project_id: number;     
  slug: string;           
  title: string;
  duration: string;       
  contribution: string;   
  role: string;           
  overview: string;       
  img_url: string | null; 
  readme: string;         
  
  project_skills: ProjectSkill[]; 
  
  // projectUrl?: string; 
  // githubUrl?: string;  
}

// 3. DB 응답을 완벽히 모방한 새로운 더미 데이터
export const PROJECT_LIST: ProjectCardProps[] = [
  {
    project_id: 1,
    slug: "portfolio",
    title: "Personal Portfolio Website",
    duration: "2026.02 - 2026.03",
    contribution: "100%",
    role: "Front-end Developer",
    overview: "나만의 개성을 담은 개인 포트폴리오 사이트입니다. 반응형 디자인과 애니메이션을 구현했습니다.",
    img_url: "https://placehold.co/600x400/6366f1/ffffff?text=Frontend+Project",
    readme: "# Personal Portfolio\n\n이 프로젝트는...",
    project_skills: [
      { skill_reason: "UI 컴포넌트 구성", skills: { name: "React" } },
      { skill_reason: "정적 타입 검사", skills: { name: "TypeScript" } },
      { skill_reason: "유틸리티 클래스 기반 스타일링", skills: { name: "Tailwind CSS" } }
    ]
  },
  {
    project_id: 2,
    slug: "health-tracker",
    title: "Health Tracker App",
    duration: "2025.10 - 2025.12",
    contribution: "100%",
    role: "Mobile Developer",
    overview: "사용자의 걸음 수와 칼로리 소모량을 실시간으로 추적하는 모바일 애플리케이션입니다.",
    img_url: "https://placehold.co/600x400/10b981/ffffff?text=Mobile+App",
    readme: "# Health Tracker\n\n건강 관리 앱입니다.",
    project_skills: [
      { skill_reason: "크로스 플랫폼 앱 개발", skills: { name: "React Native" } },
      { skill_reason: "빠른 빌드 및 배포", skills: { name: "Expo" } },
      { skill_reason: "전역 상태 관리", skills: { name: "Redux" } }
    ]
  },
  {
    project_id: 3,
    slug: "ecommerce-api",
    title: "E-Commerce API Server",
    duration: "2025.05 - 2025.08",
    contribution: "80%",
    role: "Back-end Developer",
    overview: "대규모 트래픽을 견딜 수 있는 커머스 백엔드 시스템입니다. 결제 모듈 연동을 포함합니다.",
    img_url: "https://placehold.co/600x400/f59e0b/ffffff?text=Backend+API",
    readme: "# E-Commerce API\n\n대용량 트래픽 처리를 위한...",
    project_skills: [
      { skill_reason: "비동기 I/O 처리", skills: { name: "Node.js" } },
      { skill_reason: "웹 서버 프레임워크", skills: { name: "Express" } },
      { skill_reason: "관계형 데이터 관리", skills: { name: "PostgreSQL" } }
    ]
  }
];