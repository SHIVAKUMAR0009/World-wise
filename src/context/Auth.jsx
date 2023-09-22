/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from "react";

const initialstate = {
  user: null,
  isauthenticated: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isauthenticated: true };
    case "logout":
      return { ...state, user: null, isauthenticated: false };
    default:
      throw new Error("some thing went wrong");
  }
}
const FAKE_USER = {
  name: "shivu",
  email: "shivu@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
const Authcontext = createContext();
function Auth({ children }) {
  const [{ user, isauthenticated }, dispatch] = useReducer(
    reducer,
    initialstate
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password)
      dispatch({ type: "login", payload: FAKE_USER });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <Authcontext.Provider
      value={{
        user,
        isauthenticated,
        login,
        logout,
        avatar: FAKE_USER.avatar,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
}

function useAuth() {
  const context = useContext(Authcontext);
  if (context === undefined) throw new Error("used outside the context");
  return context;
}

export { Auth, useAuth };
