import { PrismaClient } from "@prisma/client";
import foods from "./foods";
import drinks from "./drinks";
import fruits from "./fruits";
import snacks from "./snacks";
import vegetables from "./vegetables";
import foodCategories from "./foodcategories";

const prisma = new PrismaClient();

(async function () {
  try {
    await foodCategories(prisma);
    await foods(prisma);
    await drinks(prisma);
    await fruits(prisma);
    await snacks(prisma);
    await vegetables(prisma);
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    process.exit();
  }
})();
