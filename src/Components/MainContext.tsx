import React, { createContext, useReducer, useContext, Dispatch } from "react";

interface IContext {
  dispatch: Dispatch<IAction> | undefined;
  state: { nation: string | undefined; dataBool: boolean };
}

const MainContext = createContext<IContext>({
  dispatch: undefined,
  state: { nation: "", dataBool: false }
});

interface IAction {
  type: "LOCATION";
  payload: { location: [string] };
}

function reducer(state: IAction, action: IAction): any {
  switch (action.type) {
    case "LOCATION":
      return {
        ...state,
        location: action.payload.location
      };
    default:
      return { nation: [""] };
  }
}

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, "");

  return (
    <MainContext.Provider value={{ dispatch, state }}>
      {children}
    </MainContext.Provider>
  );
};

export const useDispatch = () => {
  const { dispatch } = useContext(MainContext);
  if (!dispatch) throw new Error("dispatch  없음");
  return dispatch;
};

export const useState = () => {
  const { state } = useContext(MainContext);
  return state;
};

export default MainProvider;
