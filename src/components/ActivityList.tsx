import type { Activity } from "../types";

import { categories } from "../data/categories";

type ActivityListProps = {
  activities: Activity[];
};

export const ActivityList = ({ activities }: ActivityListProps) => {
  console.log(activities);
  return (
    <>
      <h2 className="text-3xl md:text-4xl  lg:text-5xl font-bold text-slate-800 capitalize text-center mb-12">
        food and exercises
      </h2>

      <div>
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="px-5 py-10 bg-white mt-5 flex justify-between items-center rounded-xl shadow-2xl"
          >
            <div className="space-y-2 relative">
              <p className={`absolute -top-8 -left-3 uppercase font-bold text-white rounded-xl p-1.5 text-[14px] tracking-widest
                ${activity.category === 1 ? 'bg-lime-400' : 'bg-orange-400'}`}>
                {categories.find((cat) => cat.id === activity.category)?.type ||
                  "unkhown"}
              </p>
              <p className="text-2xl font-bold pt-4 capitalize">
                {activity.type}
              </p>
              <p className="font-black text-4xl text-lime-400">
                {activity.calories} <span>Calories</span>
              </p>
            </div>

            <div className="">
              <p>options</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
