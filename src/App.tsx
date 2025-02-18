import { useEffect, useMemo, useReducer } from "react";
import Form from "./components/Form";
import { activityReducer, initialState } from "./reducers/activityReducer";
import { ActivityList } from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";
import { ArrowPathIcon } from "@heroicons/react/24/solid";

function App() {
  const [activityState, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem(
      "activities",
      JSON.stringify(activityState.activities)
    );
  }, [activityState]);

  const canRestartApp = useMemo(() => activityState.activities.length, [activityState.activities]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 transition-colors duration-300">
      <header className="bg-gray-800 py-4 shadow-lg sticky top-0 z-10 transition-all duration-300">
        <div className="flex justify-between items-center max-w-4xl mx-auto px-4">
          <h1 className="font-bold text-emerald-400 text-2xl tracking-wide transition-all duration-300 hover:text-emerald-300">
            Calorie Counter
          </h1>
          <button
            disabled={!canRestartApp}
            onClick={() => dispatch({ type: "restart-app" })}
            className="p-2.5 font-medium bg-red-600 text-white rounded-lg cursor-pointer capitalize transition-all duration-300 flex items-center space-x-1 shadow-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-red-700 active:scale-95"
          >
            <ArrowPathIcon className="w-5 h-5 mr-1" />
            <span>Reset Record</span>
          </button>
        </div>
      </header>

      <section className="bg-gray-800 py-12 px-4 transition-all duration-300">
        <div className="max-w-lg mx-auto bg-gray-700 p-6 rounded-xl shadow-xl transform transition-all duration-300 hover:shadow-emerald-900/30">
          <Form dispatch={dispatch} activityState={activityState} />
        </div>
      </section>

      <section className="bg-gray-900 py-10 px-4 transition-all duration-300">
        <div className="max-w-3xl mx-auto px-4">
          <CalorieTracker activities={activityState.activities} />
        </div>
      </section>

      <section className="bg-gray-800 py-12 px-4 transition-all duration-300">
        <div className="max-w-4xl mx-auto">
          <ActivityList activities={activityState.activities} dispatch={dispatch} />
        </div>
      </section>
    </div>
  );
}

export default App;