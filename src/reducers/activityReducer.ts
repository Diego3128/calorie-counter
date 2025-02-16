import { Activity } from "../types/index";

export type ActivityActions = {
  type: "save-activity";
  payload: { newActivity: Activity };
};

type ActivityState = {
  activities: Activity[];
};

export const initialState: ActivityState = {
  activities: [],
};

export const activityReducer = (
  state: ActivityState,
  action: ActivityActions
): ActivityState => {
  switch (action.type) {
    case "save-activity":
      return {
        ...state,
        activities: [...state.activities, action.payload.newActivity]
      }
    default:
      return state;
  }
};
