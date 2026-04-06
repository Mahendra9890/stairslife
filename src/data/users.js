export const students = [
  {
    id: 'stu_rian',
    role: 'student',
    name: 'Rian Pratama',
    university: 'BINUS University',
    major: 'Desain Komunikasi Visual',
    skillTier: 'Intermediate',
    ratingAvg: 4.8,
    verifiedStatus: 'pending', // pending | verified | rejected
    avatar: { type: 'initials', value: 'RP' },
    completedProjects: 7,
    earnings: 2350000,
    activeProjects: 1,
  },
  {
    id: 'stu_dimas',
    role: 'student',
    name: 'Dimas Alamsyah',
    university: 'Universitas Indonesia',
    major: 'Ilmu Komputer',
    skillTier: 'Advanced',
    ratingAvg: 4.9,
    verifiedStatus: 'verified',
    avatar: { type: 'initials', value: 'DA' },
    completedProjects: 14,
    earnings: 6250000,
    activeProjects: 2,
  },
  {
    id: 'stu_nadia',
    role: 'student',
    name: 'Nadia Putri',
    university: 'ITS',
    major: 'Sistem Informasi',
    skillTier: 'Beginner',
    ratingAvg: 4.6,
    verifiedStatus: 'verified',
    avatar: { type: 'initials', value: 'NP' },
    completedProjects: 3,
    earnings: 850000,
    activeProjects: 0,
  },
]

export const businesses = [
  {
    id: 'biz_sarah',
    role: 'business',
    companyName: 'KueKita.id',
    ownerName: 'Sarah Wijaya',
    industry: 'F&B (Toko Kue Rumahan)',
    location: 'Jakarta',
    ratingAvg: 4.7,
    avatar: { type: 'initials', value: 'KK' },
  },
  {
    id: 'biz_batik',
    role: 'business',
    companyName: 'BatikRaya',
    ownerName: 'Hendra Saputra',
    industry: 'Fashion UMKM',
    location: 'Yogyakarta',
    ratingAvg: 4.5,
    avatar: { type: 'initials', value: 'BR' },
  },
  {
    id: 'biz_kos',
    role: 'business',
    companyName: 'KosMudah',
    ownerName: 'Anita Lestari',
    industry: 'Properti (Kost)',
    location: 'Bandung',
    ratingAvg: 4.6,
    avatar: { type: 'initials', value: 'KM' },
  },
]

export const usersById = Object.fromEntries(
  [...students, ...businesses].map((u) => [u.id, u]),
)

