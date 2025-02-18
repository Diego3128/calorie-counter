import { useReducer } from "react";
import Form from "./components/Form";
import { activityReducer, initialState } from "./reducers/activityReducer";
import { ActivityList } from "./components/ActivityList";

function App() {
  const [activityState, dispatch] = useReducer(activityReducer, initialState);

  return (
    <>
      <header className="bg-lime-600 py-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto px-3">
          <h1 className="capitalize font-bold text-amber-50 text-2xl ">
            calorie counter
          </h1>
        </div>
      </header>

      <section className="bg-lime-200 py-20 px-4">
        <div className="max-w-lg mx-auto">
          <Form 
          dispatch={dispatch} 
          activityState={activityState}          
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
