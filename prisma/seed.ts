import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

interface PostalCode {
  code: string;
  postalName: string;
  municipalityNumber: string;
  municipalityName: string;
  category: string;
}

interface Municipality {
  number: string;
  name: string;
  postalCodes: string[];
  county: {
    number: string;
    name: string;
  };
}

async function parsePostalCodes(): Promise<PostalCode[]> {
  console.log("Starting to parse postal codes file...");
  const filePath = path.join(__dirname, "Postal-codes-Norway-ansi.txt");
  const fileContent = fs.readFileSync(filePath, "latin1");

  const postalCodes = fileContent
    .split("\n")
    .filter((line) => line.trim())
    .map((line) => {
      const [code, postalName, municipalityNumber, municipalityName, category] =
        line.split("\t");
      return {
        code,
        postalName,
        municipalityNumber,
        municipalityName,
        category,
      };
    });

  console.log(`Successfully parsed ${postalCodes.length} postal codes`);
  return postalCodes;
}

function groupByMunicipality(postalCodes: PostalCode[]): Municipality[] {
  const municipalityMap = new Map<string, Municipality>();

  postalCodes.forEach((pc) => {
    const countyNumber = pc.municipalityNumber.substring(0, 2);

    if (!municipalityMap.has(pc.municipalityNumber)) {
      municipalityMap.set(pc.municipalityNumber, {
        number: pc.municipalityNumber,
        name: pc.municipalityName,
        postalCodes: [],
        county: {
          number: countyNumber,
          name: getCountyName(countyNumber),
        },
      });
    }

    const municipality = municipalityMap.get(pc.municipalityNumber)!;
    if (!municipality.postalCodes.includes(pc.code)) {
      municipality.postalCodes.push(pc.code);
    }
  });

  return Array.from(municipalityMap.values());
}

function getCountyName(countyNumber: string): string {
  // Norwegian county numbers and names (as of 2024)
  const counties: Record<string, string> = {
    "03": "Oslo",
    "11": "Rogaland",
    "15": "Møre og Romsdal",
    "18": "Nordland",
    "21": "Svalbard",
    "30": "Viken",
    "34": "Innlandet",
    "38": "Vestfold og Telemark",
    "42": "Agder",
    "46": "Vestland",
    "50": "Trøndelag",
    "54": "Troms og Finnmark",
  };

  return counties[countyNumber] || "Unknown";
}

async function createZones(municipalities: Municipality[]) {
  console.log("\nStarting zone creation...");

  try {
    // Create Norway country record
    console.log("Creating/updating Norway country record...");
    const norway = await prisma.country.upsert({
      where: { code: "NO" },
      update: {},
      create: {
        code: "NO",
        name: "Norway",
      },
    });

    // Process municipalities in batches
    const batchSize = 10;
    console.log(
      `Processing ${municipalities.length} municipalities in batches of ${batchSize}...`
    );

    for (let i = 0; i < municipalities.length; i += batchSize) {
      const batch = municipalities.slice(i, i + batchSize);

      await Promise.all(
        batch.map(async (municipality) => {
          try {
            await prisma.zone.upsert({
              where: {
                id: municipality.number, // Using municipality number as zone ID
              },
              update: {
                name: municipality.name,
                postalCodes: municipality.postalCodes,
              },
              create: {
                id: municipality.number,
                name: municipality.name,
                countryId: norway.id,
                postalCodes: municipality.postalCodes,
              },
            });
          } catch (error) {
            console.error(
              `Error processing municipality ${municipality.name}:`,
              error
            );
            throw error;
          }
        })
      );

      console.log(`Processed municipalities ${i + 1} to ${i + batch.length}`);
      // Small delay between batches
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    console.log("\nZone creation completed successfully");
  } catch (error) {
    console.error("Error in createZones:", error);
    throw error;
  }
}

async function main() {
  console.log("=== Starting seed process ===\n");

  try {
    const postalCodes = await parsePostalCodes();
    const municipalities = groupByMunicipality(postalCodes);
    await createZones(municipalities);

    console.log("\n=== Seed completed successfully ===");
  } catch (error) {
    console.error("\n=== Error in seed process ===");
    console.error(error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error("Fatal error in seed process:", e);
    process.exit(1);
  })
  .finally(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("\nClosing database connection...");
    await prisma.$disconnect();
    console.log("Database connection closed");
  });
