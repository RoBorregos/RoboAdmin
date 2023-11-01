import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

// Maintain only the last 15 history elements
// Type extracted with hover of transaction type
export const cleanSponsorHistory = async ({
  db,
}: {
  db: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
  >;
}) => {
  const maintainItems = await db.sponsorHistory.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
    },
    take: 15,
  });

  await db.sponsorHistory.deleteMany({
    where: {
      id: {
        notIn: maintainItems.map((item) => item.id),
      },
    },
  });
};
