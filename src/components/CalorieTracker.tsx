import { useMemo } from "react";
import type { Activity } from "../types";
import CalorieCategory from "./CalorieCategory";

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

  const calorieBalance = useMemo(()=> consumedCalories - burnedCalories, [consumedCalories, burnedCalories]);

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Calorie summary
      </h2>

      <div className=" flex items-center gap-5 mt-8 flex-col md:justify-between md:flex-row ">

        <CalorieCategory calories={consumedCalories} title={"consumed"} />

        <CalorieCategory calories={burnedCalories} title={"burned"} />

        <CalorieCategory calories={calorieBalance} title={"balance"} />

      </div>
    </>
  );
}
