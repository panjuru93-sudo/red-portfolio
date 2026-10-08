const BASE_URL = 'https://panjuru93-sudo.github.io';

/**
 * 포트폴리오 프로젝트 목록 (최신순)
 * - type: 필터 분류 ('webapp' | 'design' | 'platform')
 * - tone: 썸네일 색 조합 ('red' | 'dark' | 'light')
 * - shape: 썸네일 도형 ('circle' | 'diamond' | 'half' | 'ring' | 'pill' | 'quarter')
 */
export const PROJECTS = [
  {
    index: '01',
    title: 'My Portfolio',
    type: 'webapp',
    tags: ['React', 'MUI', 'Supabase'],
    year: '2026.09',
    description: '종이 질감과 레드 브랜드 테마의 포트폴리오. Supabase로 프로젝트·스킬 데이터를 관리합니다.',
    href: `${BASE_URL}/my-portfolio/`,
    tone: 'red',
    shape: 'circle',
  },
  {
    index: '02',
    title: 'Couple Diary',
    type: 'design',
    tags: ['React', 'MUI'],
    year: '2026.09',
    description: 'D-day, 오늘의 편지, 메모 보드, 사진 스트립으로 구성된 커플 다이어리 UI.',
    href: `${BASE_URL}/couple-diary/`,
    tone: 'light',
    shape: 'half',
  },
  {
    index: '03',
    title: 'Dark Mood Portfolio',
    type: 'design',
    tags: ['React', 'MUI'],
    year: '2026.08',
    description: '미니멀한 다크 무드로 디자인한 원페이지 포트폴리오 사이트.',
    href: `${BASE_URL}/my-react-app/`,
    tone: 'dark',
    shape: 'ring',
  },
  {
    index: '04',
    title: 'Olday Class',
    type: 'platform',
    tags: ['React', 'MUI', 'Router'],
    year: '2026.07',
    description: '꽃꽂이·베이킹·글라스아트·댄스 등 원데이 클래스 통합 예약 플랫폼. 실시간 예약, 선물하기, 리뷰 기능.',
    href: `${BASE_URL}/olday-class/`,
    tone: 'red',
    shape: 'pill',
  },
  {
    index: '05',
    title: 'Mini SNS',
    type: 'webapp',
    tags: ['React', 'Supabase', 'Auth'],
    year: '2026.06',
    description: '스터디 모임 SNS ‘같이하자’. 로그인/회원가입, 게시판, 상세, 마이페이지 구현.',
    href: `${BASE_URL}/pingiping/mini_sns/`,
    tone: 'dark',
    shape: 'diamond',
  },
  {
    index: '06',
    title: 'My Community',
    type: 'webapp',
    tags: ['React', 'Supabase', 'Auth'],
    year: '2026.06',
    description: '게시글·댓글·좋아요·별점 CRUD와 Supabase Auth 로그인을 갖춘 커뮤니티 게시판.',
    href: `${BASE_URL}/pingiping/my-community/`,
    tone: 'light',
    shape: 'quarter',
  },
  {
    index: '07',
    title: 'My Guestbook',
    type: 'webapp',
    tags: ['React', 'Supabase'],
    year: '2026.06',
    description: '이모지와 별점을 남길 수 있는 블루-퍼플 그라데이션 테마의 방명록 앱.',
    href: `${BASE_URL}/pingiping/my-guestbook/`,
    tone: 'red',
    shape: 'ring',
  },
  {
    index: '08',
    title: 'My First Website',
    type: 'design',
    tags: ['HTML', 'CSS'],
    year: '2026.06',
    description: '바이브코딩으로 처음 만들고 배포한 랜딩페이지.',
    href: `${BASE_URL}/my-first-website/`,
    tone: 'dark',
    shape: 'circle',
  },
];

/** 필터 탭 목록 */
export const FILTERS = [
  { value: 'all', label: 'ALL' },
  { value: 'webapp', label: 'WEB APP' },
  { value: 'design', label: 'UI DESIGN' },
  { value: 'platform', label: 'PLATFORM' },
];
