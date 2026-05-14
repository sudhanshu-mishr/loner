import { PrismaClient, UserRole } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const admin = await prisma.user.upsert({ where: { email: 'admin@loners.example' }, update: {}, create: { email: 'admin@loners.example', role: UserRole.ADMIN, trustScore: 95, profile: { create: { username: 'admin', displayName: 'Loners Admin', ageConfirmed: true, interests: ['safety', 'language'], languages: ['en'] } }, adminUser: { create: { permissions: ['reports:read', 'sanctions:write', 'analytics:read'] } } } });
  await prisma.user.upsert({ where: { email: 'moderator@loners.example' }, update: {}, create: { email: 'moderator@loners.example', role: UserRole.MODERATOR, trustScore: 90, profile: { create: { username: 'moderator', displayName: 'Safety Moderator', ageConfirmed: true, interests: ['community'], languages: ['en', 'es'] } }, adminUser: { create: { permissions: ['reports:read', 'flags:review'] } } } });
  console.log({ seededAdmin: admin.email });
}
main().finally(() => prisma.$disconnect());
