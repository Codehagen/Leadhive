import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// First ensure countries exist
async function ensureCountries() {
  // Check if Norway exists, create if it doesn't
  const norway = await prisma.country.upsert({
    where: { code: "NO" },
    update: {},
    create: {
      code: "NO",
      name: "Norway",
    },
  });

  // Check if Australia exists, create if it doesn't
  const australia = await prisma.country.upsert({
    where: { code: "AU" },
    update: {},
    create: {
      code: "AU",
      name: "Australia",
    },
  });

  console.log("✅ Countries verified");
  return { norway, australia };
}

async function seedPaymentSettings(countries: { norway: any; australia: any }) {
  // Create or update payment settings for Norway
  await prisma.paymentSettings.upsert({
    where: {
      countryId: countries.norway.id,
    },
    update: {
      leadPrice: 50.0,
      currency: "USD",
    },
    create: {
      countryId: countries.norway.id,
      leadPrice: 50.0,
      currency: "USD",
    },
  });

  // Create or update payment settings for Australia
  await prisma.paymentSettings.upsert({
    where: {
      countryId: countries.australia.id,
    },
    update: {
      leadPrice: 50.0,
      currency: "USD",
    },
    create: {
      countryId: countries.australia.id,
      leadPrice: 50.0,
      currency: "USD",
    },
  });

  console.log("✅ Payment settings seeded");
}

async function main() {
  try {
    const countries = await ensureCountries();
    await seedPaymentSettings(countries);
  } catch (error) {
    console.error("Error seeding payment settings:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
