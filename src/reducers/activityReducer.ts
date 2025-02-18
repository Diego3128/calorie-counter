import { Activity } from "../types/index";

export type ActivityActions =
  | {
      type: "save-activity";
      payload: { newActivity: Activity };
    }
  | {
      type: "set-activeId";
      payload: { activeId: Activity["id"] };
    }
  | {
      type: "delete-activity";
      payload: { acitivityId: Activity["id"] };
    };

export type ActivityState = {
  activities: Activity[];
  activeId: Activity["id"];
};

export const getLocalActivities = (): Activity[] => {
  const activities = localStorage.getItem("activities");
  return activities ? JSON.parse(activities) : [];
};

export const initialState: ActivityState = {
  activities: getLocalActivities(),
  activeId: "",
};

export const activityReducer = (
  state: ActivityState,
  action: ActivityActions
): ActivityState => {
  switch (action.type) {
    case "save-activity":
      let updatedActivities: Activity[] = [];

      if (action.payload.newActivity.id === state.activeId) {
        // edit existing activity
        updatedActivities = state.activities.map((activity) => {
          return activity.id === state.activeId
            ? action.payload.newActivity
            : activity;
        });
      } else {
        //add new activity
        updatedActivities = [...state.activities, action.payload.newActivity];
      }

      return {
        ...state,
        activities: updatedActivities,
        activeId: "",
      };
    case "set-activeId":
      return {
        ...state,
        activeId: action.payload.activeId,
      };

    case "delete-activity":
      const activityId = action.payload.acitivityId;

      return {
        ...state,
        activities: state.activities.filter(
          (activity) => activity.id !== activityId
        ),
        activeId: state.activeId === activityId ? "" : state.activeId,
      };

    default:
      return state;
  }
};
