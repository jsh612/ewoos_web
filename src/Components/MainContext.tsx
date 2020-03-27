import React, { createContext, useReducer, useContext, Dispatch } from "react";

interface IContext {
  dispatch: Dispatch<IAction> | undefined;
  state: any;
}

const MainContext = createContext<IContext>({ dispatch: undefined, state: "" });

interface IPayLoad {
  [key: string]: any;
}

interface IAction {
  type: "GET_ME_REFETCH";
  payload: IPayLoad;
}

function reducer(state: IAction, action: IAction): any {
  switch (action.type) {
    case "GET_ME_REFETCH":
      return {
        ...state,
        getMeRefetch: action.payload
      };
    default:
      return { ...state };
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

export const useReducerState = () => {
  const { state } = useContext(MainContext);
  return state;
};

export default MainProvider;
