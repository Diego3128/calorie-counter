type CalorieCategoryProps = {
  calories: number;
  title: string;
};

export default function CalorieCategory({
  calories,
  title,
}: CalorieCategoryProps) {
  return (
    <p className="text-white font-bold rounded-full grid grid-cols-1 gap-2 text-center">
      <span className="font-black text-5xl">{calories}</span>
      <span className="text-2xl">{title}</span>
    </p>
  );
}
