import { PrismaClient } from "@prisma/client";
import { categories } from "./seed/categories";

const prisma = new PrismaClient();

async function main() {
  console.log("=== Starting category seed process ===\n");
  console.log(`Found ${categories.length} main categories to process\n`);

  try {
    for (const category of categories) {
      console.log(`Processing main category: ${category.name}`);
      console.log(`Description: ${category.description}`);
      console.log(`Subcategories to process: ${category.subcategories.length}`);

      const parentCategory = await prisma.category.upsert({
        where: { name: category.name },
        update: {},
        create: {
          name: category.name,
          description: category.description,
        },
      });

      console.log(
        `✓ Created/Updated parent category: ${category.name} (${parentCategory.id})`
      );

      console.log("\nProcessing subcategories:");
      for (const sub of category.subcategories) {
        console.log(`  → Processing: ${sub.name}`);

        const subcategory = await prisma.category.upsert({
          where: { name: sub.name },
          update: {},
          create: {
            name: sub.name,
            description: sub.description,
            parentCategoryId: parentCategory.id,
          },
        });

        console.log(
          `  ✓ Created/Updated subcategory: ${sub.name} (${subcategory.id})`
        );
      }

      console.log(`\n✓ Completed category group: ${category.name}\n`);
      console.log("----------------------------------------\n");
    }

    const totalCategories = await prisma.category.count();
    console.log("\n=== Category seed completed successfully ===");
    console.log(`Total categories in database: ${totalCategories}`);
    console.log("Main categories:", categories.map((c) => c.name).join(", "));
  } catch (error) {
    console.error("\n=== Error in category seed process ===");
    console.error("Error details:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error("Fatal error in category seed process:", e);
    process.exit(1);
  })
  .finally(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("\nClosing database connection...");
    await prisma.$disconnect();
    console.log("Database connection closed");
  });
