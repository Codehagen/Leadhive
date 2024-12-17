import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";

const prisma = new PrismaClient();

interface AustralianPostcode {
  id: string;
  postcode: string;
  locality: string;
  state: string;
  long: string;
  lat: string;
  sa3: string;
  sa3name: string;
  sa4: string;
  sa4name: string;
  region: string;
  status: string;
  type: string;
  dc: string;
}

async function seedAustralianPostcodes() {
  console.log("Starting Australian postcodes seed...");

  try {
    // Create or get Australia country record
    const australia = await prisma.country.upsert({
      where: { code: "AU" },
      update: {},
      create: {
        code: "AU",
        name: "Australia",
      },
    });

    // Read and parse CSV file
    const csvPath = path.join(__dirname, "australian_postcodes.csv");
    console.log("Reading CSV file from:", csvPath);

    const fileContent = fs.readFileSync(csvPath, "utf-8");
    console.log("File content length:", fileContent.length);

    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    }) as AustralianPostcode[];

    console.log(`Parsed ${records.length} records from CSV`);

    // Group postcodes by state and SA3
    const stateGroups = new Map<string, Map<string, AustralianPostcode[]>>();

    for (const record of records) {
      if (!record.state || !record.sa3 || !record.sa3name) continue;

      if (!stateGroups.has(record.state)) {
        stateGroups.set(record.state, new Map());
      }

      const stateGroup = stateGroups.get(record.state)!;
      const sa3Key = `${record.sa3}_${record.sa3name}`;

      if (!stateGroup.has(sa3Key)) {
        stateGroup.set(sa3Key, []);
      }

      stateGroup.get(sa3Key)!.push(record);
    }

    console.log(`Grouped postcodes into ${stateGroups.size} states`);

    // Process each state
    for (const [state, sa3Groups] of stateGroups) {
      console.log(`\nProcessing state: ${state}`);
      console.log(`Found ${sa3Groups.size} SA3 regions`);

      // Create zones for each SA3 region
      for (const [sa3Key, postcodes] of sa3Groups) {
        const firstPostcode = postcodes[0];
        const uniquePostcodes = [...new Set(postcodes.map((p) => p.postcode))];

        console.log(
          `Creating/updating zone for ${firstPostcode.sa3name} (${uniquePostcodes.length} postcodes)`
        );

        try {
          await prisma.zone.upsert({
            where: {
              id: `AU_${state}_${firstPostcode.sa3}`,
            },
            update: {
              postalCodes: uniquePostcodes,
              updatedAt: new Date(),
            },
            create: {
              id: `AU_${state}_${firstPostcode.sa3}`,
              name: firstPostcode.sa3name,
              state: state,
              countryId: australia.id,
              postalCodes: uniquePostcodes,
              sa3Code: firstPostcode.sa3,
              sa3Name: firstPostcode.sa3name,
              sa4Code: firstPostcode.sa4,
              sa4Name: firstPostcode.sa4name,
              region: firstPostcode.region,
              latitude: parseFloat(firstPostcode.lat) || null,
              longitude: parseFloat(firstPostcode.long) || null,
            },
          });
        } catch (error) {
          console.error(
            `Error processing SA3 region ${firstPostcode.sa3name}:`,
            error
          );
          // Continue with other regions
        }
      }
    }

    console.log("\nAustralian postcodes seed completed successfully");
  } catch (error) {
    console.error("Error seeding Australian postcodes:", error);
    throw error;
  }
}

export { seedAustralianPostcodes };
