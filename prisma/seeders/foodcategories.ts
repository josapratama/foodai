import { Prisma, PrismaClient } from "@prisma/client";

export default async function run(prisma: PrismaClient) {
  console.info("Seeding food categories...");

  const foodCategories: Array<Prisma.FoodCategoryCreateManyInput> = [
    {
      id: "food-category-id-1",
      type: "Vegetables",
      description: "Green and leafy vegetables, root vegetables, etc.",
    },
    {
      id: "food-category-id-2",
      type: "Fruits",
      description: "All types of fruits like apples, bananas, berries, etc.",
    },
    {
      id: "food-category-id-3",
      type: "Grains",
      description: "Grains like rice, wheat, and quinoa.",
    },
    {
      id: "food-category-id-4",
      type: "Meats",
      description: "Animal-based proteins such as chicken, beef, fish, etc.",
    },
    {
      id: "food-category-id-5",
      type: "Legumes",
      description: "Beans, lentils, soy-based foods like tofu and tempeh.",
    },
  ];

  await Promise.all(
    foodCategories.map(async (category) => {
      await prisma.foodCategory.upsert({
        where: { id: category.id }, // Use the id field for upserting
        update: category,
        create: category,
      });
    })
  );
}
