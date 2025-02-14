// dependencies
import { v4 as uuidv4 } from 'uuid';

import { categories } from "../data/categories";
import { Dispatch, useMemo, useState } from "react";
import { ChangeEvent, FormEvent } from "react";
import type { Activity } from '../types/index';
import { ActivityActions } from "../reducers/activityReducer";

type FormProps = {
  dispatch: Dispatch<ActivityActions>
}

export default function Form({dispatch}: FormProps) {

  const INITIALSTATE : Activity = {
    id: uuidv4(),
    category: 1,
    type: "",
    calories: 0,
  };

  const [activity, setactivity] = useState<Activity>(INITIALSTATE);


  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement> ) => {
    
    if(e.target.id === "category" || e.target.id === "type" || e.target.id === "calories"){

      const isNumeric = ["category", "calories"].includes(e.target.id);

      const isNan = isNaN(+e.target.value);

      setactivity({
        ...activity,
        [e.target.id] : (isNumeric && !isNan) ? +e.target.value : 
        (!isNumeric) ? e.target.value : activity[e.target.id]
      });
    }
  }

  // validate form inputs
  const isValidActivity = useMemo(() => {
    const {calories, type} = activity;
    return type.trim() !== '' && calories > 0;
  }, [activity]);

  // save an activity in activityState
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({type: "save-activity", payload: {newActivity: activity}});
    // reset form
    setactivity({
      ...INITIALSTATE,
      id: uuidv4()
    });
  }

  return (
    <form 
    className="rounded-xl bg-white text-gray-950 space-y-2.5 py-10 px-7"
    onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-4">
        <label className="font-bold capitalize" htmlFor="category">
          Category
        </label>
        <select
          className="border-slate-300 p-2.5 rounded-xl bg-gray-100 capitalize"
          name="category"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} className="capitalize" value={category.id}>
              {category.type}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label className="font-bold capitalize" htmlFor="type">
          Type
        </label>
        <input
          className="rounded-xl bg-gray-100 p-2.5"
          id="type" type="text"
          placeholder={activity.category === 1 ? "Describe your food" : "Describe your exercise"}
          value={activity.type}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label className="font-bold capitalize" htmlFor="calories">
          Calories
        </label>
        <input
          className="rounded-xl bg-gray-100 p-2.5"
          step={10.0}
          id="calories"
          type="number" placeholder="E.g. 250"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <button
        className="bg-lime-600 hover:bg-lime-500 hover:cursor-pointer text-center mx-auto block mt-10 text-xl px-5 py-3 rounded-lg font-black w-full uppercase text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        type="submit"
        disabled={!isValidActivity}
      >
        Save {activity.category === 1 ? "food" : "exercise"}
      </button>
    </form>
  );
}
