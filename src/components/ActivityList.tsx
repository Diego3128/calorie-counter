import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Dispatch, useMemo } from "react";
import type { Activity } from "../types";
import { categories } from "../data/categories";
import type { ActivityActions } from "../reducers/activityReducer";

type ActivityListProps = {
  activities: Activity[];
  dispatch: Dispatch<ActivityActions>;
};

export const ActivityList = ({ activities, dispatch }: ActivityListProps) => {
  const emptyActivities = useMemo(() => activities.length === 0, [activities]);
  return (
    <>
      <h2 className="text-3xl md:text-4xl  lg:text-5xl font-bold text-slate-800 capitalize text-center mb-12">
        food and exercises
      </h2>

      <div className={`${emptyActivities ? 'border-dashed border rounded-xl' : ''} p-3.5`}>
        {emptyActivities ? (
          <p className="text-4xl mx-auto font-bold text-slate-600 text-center h-48 mt-32">
            Start by creating a food or exercise</p>
        ) : (
          activities.map((activity) => (
            <div
              key={activity.id}
              className="px-5 py-6 bg-white mt-5 flex justify-between items-center rounded-xl shadow-2xl"
            >
              <div className="space-y-2 relative">
                <p
                  className={`absolute -top-8 -left-3 uppercase font-bold text-white rounded-xl p-1.5 text-[14px] tracking-widest
                ${activity.category === 1 ? "bg-lime-400" : "bg-orange-400"}`}
                >
                  {categories.find((cat) => cat.id === activity.category)
                    ?.type || "unkhown"}
                </p>
                <p
                  className={`text-2xl font-bold pt-4 capitalize ${
                    activity.category === 1
                      ? "text-lime-400"
                      : "text-orange-400"
                  }`}
                >
                  {activity.type}
                </p>
                <p
                  className={`font-black text-4xl text-lime-400 ${
                    activity.category === 1
                      ? "text-lime-400"
                      : "text-orange-400"
                  }`}
                >
                  {activity.calories} <span>Calories</span>
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    dispatch({
                      type: "set-activeId",
                      payload: { activeId: activity.id },
                    })
                  }
                  className="hover:cursor-pointer"
                >
                  <PencilSquareIcon className="size-7 text-gray-700 hover:text-gray-950" />
                </button>

                <button
                  onClick={() =>
                    dispatch({
                      type: "delete-activity",
                      payload: { acitivityId: activity.id },
                    })
                  }
                  className="hover:cursor-pointer"
                >
                  <TrashIcon className="size-7 text-red-500 hover:text-red-700" />
                </button>

              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};
