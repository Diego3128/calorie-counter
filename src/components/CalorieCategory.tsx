type CalorieCategoryProps = {
  calories: number;
  title: string;
  borderColor: string;
  textColor: string;
};

export default function CalorieCategory({
  calories,
  title,
  borderColor,
  textColor,
}: CalorieCategoryProps) {
  return (
    <div className={`text-gray-100 font-bold rounded-lg grid grid-cols-1 gap-3 text-center p-6 border-2 ${borderColor} bg-gray-700 w-full md:w-1/3 transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}>
      <span className={`font-black text-4xl md:text-5xl ${textColor} transition-all duration-300`}>
        {calories}
      </span>
      <span className="text-xl md:text-2xl capitalize transition-all duration-300">
        {title}
      </span>
    </div>
  );
}