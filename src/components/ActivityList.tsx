import { PencilSquareIcon, TrashIcon, FireIcon, CakeIcon, ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
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
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-400 capitalize text-center mb-10 flex items-center justify-center transition-all duration-300">
        <ClipboardDocumentListIcon className="w-10 h-10 mr-3 text-emerald-500" />
        <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
          Food and Exercises
        </span>
      </h2>

      <div 
        className={`
          ${emptyActivities ? 'border-dashed border-2 border-gray-600 rounded-xl bg-gray-800/30' : ''} 
          p-4 transition-all duration-500 ease-in-out
        `}
      >
        {emptyActivities ? (
          <div className="flex flex-col items-center justify-center h-60 text-center">
            <p className="text-2xl md:text-3xl mx-auto font-semibold text-gray-400 mb-4 transition-all duration-300">
              Start by creating a food or exercise
            </p>
            <div className="w-16 h-16 border-t-4 border-emerald-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="px-6 py-7 bg-gray-700 mt-2 flex justify-between items-center rounded-xl shadow-lg transition-all duration-300 transform hover:translate-y-[-5px] hover:shadow-emerald-900/20 relative overflow-hidden group"
              >
                {/* Background glow effect */}
                <div 
                  className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 ${
                    activity.category === 1 ? "bg-emerald-500" : "bg-orange-500"
                  }`}
                ></div>
                
                <div className="space-y-3 relative z-10">
                  <div
                    className={`absolute -top-10 -left-10 uppercase font-bold text-white rounded-br-2xl p-3 pr-6 pb-4 text-sm tracking-wider transition-all duration-300 group-hover:shadow-lg ${
                      activity.category === 1 ? "bg-emerald-600" : "bg-orange-600"
                    }`}
                  >
                    <div className="flex items-center pl-3.5 pt-2.5">
                      {activity.category === 1 ? (
                        <CakeIcon className="w-4 h-4 mr-1" />
                      ) : (
                        <FireIcon className="w-4 h-4 mr-1" />
                      )}
                      <span>
                        {categories.find((cat) => cat.id === activity.category)?.type || "unknown"}
                      </span>
                    </div>
                  </div>
                  
                  <p
                    className={`text-xl md:text-2xl font-bold pt-6 capitalize transition-all duration-300 ${
                      activity.category === 1
                        ? "text-emerald-400"
                        : "text-orange-400"
                    }`}
                  >
                    {activity.type}
                  </p>
                  
                  <p
                    className={`font-black text-3xl md:text-4xl transition-all duration-300 ${
                      activity.category === 1
                        ? "text-emerald-400"
                        : "text-orange-400"
                    }`}
                  >
                    {activity.calories} <span className="text-xl md:text-2xl">Calories</span>
                  </p>
                </div>

                <div className="flex gap-4 transition-all duration-300">
                  <button
                    onClick={() =>
                      dispatch({
                        type: "set-activeId",
                        payload: { activeId: activity.id },
                      })
                    }
                    className="hover:cursor-pointer p-2 rounded-full bg-gray-600 hover:bg-gray-500 transition-all duration-300 transform hover:scale-110 active:scale-95"
                    aria-label="Edit activity"
                  >
                    <PencilSquareIcon className="w-5 h-5 text-gray-200" />
                  </button>

                  <button
                    onClick={() =>
                      dispatch({
                        type: "delete-activity",
                        payload: { acitivityId: activity.id },
                      })
                    }
                    className="hover:cursor-pointer p-2 rounded-full bg-red-600/80 hover:bg-red-500 transition-all duration-300 transform hover:scale-110 active:scale-95"
                    aria-label="Delete activity"
                  >
                    <TrashIcon className="w-5 h-5 text-white" />
                  </button>
                </div>
                
                {/* Activity glow line */}
                <div 
                  className={`absolute bottom-0 left-0 h-1 group-hover:h-2 transition-all duration-500 ${
                    activity.category === 1 ? "bg-emerald-500" : "bg-orange-500"
                  }`} 
                  style={{ width: `${Math.min(100, activity.calories / 10)}%` }}
                ></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};