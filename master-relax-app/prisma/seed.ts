import prisma from './prisma-client';

async function up() {
  await prisma.massage.createMany({
    data: [
      {
        name: 'Авторський масаж',
        durationMin: 60,
        price: 800,
        discountPrice: 600,
        discountFrom: 5,
      },
      {
        name: 'Відновлювальний (Лікувальний) масаж',
        durationMin: 30,
        price: 500,
        discountPrice: 450,
        discountFrom: 5,
      },
      {
        name: 'Відновлювальний (Лікувальний) - попереково крижової зони',
        durationMin: 30,
        price: 500,
        discountPrice: 450,
        discountFrom: 5,
      },
      {
        name: 'Вакуумно градієнтна терапія',
        durationMin: 30,
        price: 500,
        discountPrice: 450,
        discountFrom: 5,
      },
      {
        name: 'Перкурсійний масаж',
        durationMin: 30,
        price: 500,
        discountPrice: 450,
        discountFrom: 5,
      },
      {
        name: 'Релакс масаж',
        durationMin: 60,
        price: 800,
        discountPrice: 600,
        discountFrom: 5,
      },
    ],
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "AppointmentSlot" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Massage" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Client" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
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
