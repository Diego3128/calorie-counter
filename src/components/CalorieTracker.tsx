import { useMemo } from "react";
import type { Activity } from "../types";
import CalorieCategory from "./CalorieCategory";
import { ChartBarIcon } from "@heroicons/react/24/solid";

type CalorieTrackerProps = {
  activities: Activity[];
};

export default function CalorieTracker({ activities }: CalorieTrackerProps) {
  // counters
  const consumedCalories = useMemo(() => {
    return activities.reduce((accumulator, activity) => {
      return activity.category === 1
        ? accumulator + activity.calories
        : accumulator;
    }, 0);
  }, [activities]);

  const burnedCalories = useMemo(() => {
    return activities.reduce((accumulator, activity) => {
      return activity.category === 2
        ? accumulator + activity.calories
        : accumulator;
    }, 0);
  }, [activities]);

  const calorieBalance = useMemo(() => consumedCalories - burnedCalories, [consumedCalories, burnedCalories]);

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-lg transition-all duration-300 hover:shadow-emerald-900/20">
      <h2 className="text-3xl md:text-4xl font-bold text-emerald-400 text-center flex items-center justify-center mb-8 transition-all duration-300">
        <ChartBarIcon className="w-8 h-8 mr-2 text-emerald-500" />
        Calorie summary
      </h2>

      <div className="flex items-center gap-5 mt-8 flex-col md:justify-between md:flex-row transition-all duration-500 ease-in-out">
        <CalorieCategory 
          calories={consumedCalories} 
          title={"consumed"} 
          borderColor="border-red-500"
          textColor="text-red-400" 
        />

        <CalorieCategory 
          calories={burnedCalories} 
          title={"burned"} 
          borderColor="border-green-500"
          textColor="text-green-400"
        />

        <CalorieCategory 
          calories={calorieBalance} 
          title={"balance"} 
          borderColor="border-blue-500"
          textColor="text-blue-400"
        />
      </div>
    </div>
  );
}