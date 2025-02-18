import { v4 as uuidv4 } from "uuid";
import { categories } from "../data/categories";
import {
  Dispatch,
  useEffect,
  useMemo,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import type { Activity } from "../types/index";
import type {
  ActivityActions,
  ActivityState,
} from "../reducers/activityReducer";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  activityState: ActivityState;
};

export default function Form({ dispatch, activityState }: FormProps) {
  const INITIALSTATE: Activity = {
    id: uuidv4(),
    category: 1,
    type: "",
    calories: 0,
  };

  const [activity, setactivity] = useState<Activity>(INITIALSTATE);

  useEffect(() => {
    if (activityState.activeId) {
      //fill out the form with the selected activity
      const selectedActivity = activityState.activities.find(
        (activity) => activity.id === activityState.activeId
      );
      if (selectedActivity) setactivity(selectedActivity);
    } else {
      setactivity(INITIALSTATE);
    }
  }, [activityState.activeId]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    if (
      e.target.id === "category" ||
      e.target.id === "type" ||
      e.target.id === "calories"
    ) {
      const isNumeric = ["category", "calories"].includes(e.target.id);
      const isNan = isNaN(+e.target.value);

      setactivity({
        ...activity,
        [e.target.id]:
          isNumeric && !isNan
            ? +e.target.value
            : !isNumeric
            ? e.target.value
            : activity[e.target.id],
      });
    }
  };

  // validate form inputs
  const isValidActivity = useMemo(() => {
    const { calories, type } = activity;
    return type.trim() !== "" && calories > 0;
  }, [activity]);

  // save an activity in activityState
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "save-activity", payload: { newActivity: activity } });
    // reset form
    setactivity({
      ...INITIALSTATE,
      id: uuidv4(),
    });
  };

  return (
    <form
      className="rounded-xl bg-gray-700 text-gray-100 space-y-4 py-8 px-6 shadow-lg transition-all duration-300 ease-in-out hover:shadow-emerald-900/20"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label className="font-semibold capitalize text-emerald-300" htmlFor="category">
          Category
        </label>
        <select
          className="border border-gray-600 p-3 rounded-lg bg-gray-800 text-gray-200 capitalize focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 outline-none"
          name="category"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option
              key={category.id}
              className="capitalize bg-gray-800"
              value={category.id}
            >
              {category.type}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label className="font-semibold capitalize text-emerald-300" htmlFor="type">
          Type
        </label>
        <input
          className="rounded-lg bg-gray-800 border border-gray-600 p-3 text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 outline-none"
          id="type"
          type="text"
          placeholder={
            activity.category === 1
              ? "Describe your food"
              : "Describe your exercise"
          }
          value={activity.type}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label className="font-semibold capitalize text-emerald-300" htmlFor="calories">
          Calories
        </label>
        <input
          className="rounded-lg bg-gray-800 border border-gray-600 p-3 text-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 outline-none"
          step={10.0}
          id="calories"
          type="number"
          placeholder="E.g. 250"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <button
        className="bg-emerald-600 hover:bg-emerald-500 hover:cursor-pointer text-center mx-auto mt-8 text-lg px-5 py-3 rounded-lg font-bold w-full uppercase text-white transition-all duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed transform hover:translate-y-[-2px] active:translate-y-[1px] flex items-center justify-center"
        type="submit"
        disabled={!isValidActivity}
      >
        <PlusCircleIcon className="w-5 h-5 mr-2" />
        Save {activity.category === 1 ? "food" : "exercise"}
      </button>
    </form>
  );
}