import { createContext, useState } from "react";

export const Context = createContext();

const Provider = ({ children }) => {
  const [listFilms, setListFilms] = useState([]);

  const List = {
    listFilms,
    setListFilms,
  };

  return <Context.Provider value={List}>{children}</Context.Provider>;
};
