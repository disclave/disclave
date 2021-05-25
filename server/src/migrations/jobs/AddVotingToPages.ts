import { pagesDbCollection } from "@/database/pages";
import { Job } from "../Job";

export const AddVotingToPages: Job = {
  id: "AddVotingToPages",

  run: async () => {
    console.info("Migrating pages voting.");

    const collection = await pagesDbCollection();
    const result = await collection.updateMany(
      {
        votesSum: { $exists: false },
      },
      {
        $set: {
          votesUp: [],
          votesDown: [],
          votesSum: 0,
        },
      }
    );

    console.info(
      `Pages voting migration modified ${result.modifiedCount} documents.`
    );
  },
};
