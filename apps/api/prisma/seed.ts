import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 1. Create Users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@vastlink.com' },
    update: {},
    create: {
      email: 'admin@vastlink.com',
      password: 'hashed_password_placeholder', // In real app, use bcrypt
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
    },
  });

  const user1 = await prisma.user.upsert({
    where: { email: 'user@vastlink.com' },
    update: {},
    create: {
      email: 'user@vastlink.com',
      password: 'hashed_password_placeholder',
      firstName: 'John',
      lastName: 'Doe',
      role: 'USER',
    },
  });

  console.log({ admin, user1 });

  // 2. Create Ledger Accounts (Base Chart of Accounts)
  const chartOfAccounts = [
    { name: 'Operating Cash', type: 'ASSET', currency: 'USD' },
    { name: 'User Wallets Liability', type: 'LIABILITY', currency: 'USD' }, // Internal liability representing user funds
    { name: 'Service Revenue', type: 'REVENUE', currency: 'USD' },
    { name: 'Operating Expense', type: 'EXPENSE', currency: 'USD' },
    { name: 'Shareholder Equity', type: 'EQUITY', currency: 'USD' },
  ];

  for (const acc of chartOfAccounts) {
    // We use name + currency as a pseudo-unique check for seeding since we don't have unique constraint on name
    // Ideally we'd store these IDs or look them up. For now, we just create if not exists equivalent (upsert hard with logic)
    // Changing to simple createMany or check-then-create
    const exists = await prisma.ledgerAccount.findFirst({
      where: { name: acc.name, currency: acc.currency }
    });

    if (!exists) {
      await prisma.ledgerAccount.create({
        data: {
          name: acc.name,
          type: acc.type as any, // Cast to enum
          currency: acc.currency,
        }
      });
    }
  }

  // 3. Create Virtual Accounts for User
  const va = await prisma.virtualAccount.create({
    data: {
      userId: user1.id,
      currency: 'USD',
      balance: 1000.00,
    }
  });

  console.log('Seeded Virtual Account:', va);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
