import { useEffect, useMemo, useReducer } from "react";
import Form from "./components/Form";
import { activityReducer, initialState } from "./reducers/activityReducer";
import { ActivityList } from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

function App() {

  const [activityState, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem(
      "activities",
      JSON.stringify(activityState.activities)
    );
  }, [activityState]);

  const canRestartApp = useMemo(()=> activityState.activities.length, [activityState.activities])

  return (
    <>
      <header className="bg-lime-600 py-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto px-3">
          <h1 className="capitalize font-bold text-amber-50 text-2xl ">
            calorie counter
          </h1>
          <button
          disabled={!canRestartApp}
          onClick={()=> dispatch({type: "restart-app"})}
          className=" p-2.5 font-bold bg-slate-800 text-white rounded-xl cursor-pointer capitalize  disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-950 "
          >
            reset record
          </button>
        </div>
      </header>

      <section className="bg-lime-200 py-20 px-4">
        <div className="max-w-lg mx-auto">
          <Form dispatch={dispatch} activityState={activityState} />
        </div>
      </section>

      <section className="bg-slate-800 py-8 px-4">
        <div className="max-w-3xl mx-auto px-4">
          <CalorieTracker
          activities={activityState.activities}
          />
        </div>
      </section>

      <section className="bg-lime-100 py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <ActivityList
            activities={activityState.activities}
            dispatch={dispatch}
          />
        </div>
      </section>
    </>
  );
}
export default App;
