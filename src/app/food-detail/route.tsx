import { GetServerSideProps } from "next";
import prisma from "@/lib/prisma"; // Import prisma instance

interface FoodDetailProps {
  food: {
    name: string;
    image: string;
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
  };
}

const FoodDetail: React.FC<FoodDetailProps> = ({ food }) => {
  return (
    <div>
      <h1>{food.name}</h1>
      <img src={food.image} alt={food.name} />
      <p>Calories: {food.calories}</p>
      <p>Protein: {food.protein}g</p>
      <p>Fat: {food.fat}g</p>
      <p>Carbohydrates: {food.carbohydrates}g</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { name } = context.params!;

  const food = await prisma.food.findUnique({
    where: { name: String(name) },
  });

  if (!food) {
    return { notFound: true };
  }

  return {
    props: { food },
  };
};

export default FoodDetail;
