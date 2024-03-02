"use client";
import { getFilms } from "@/services/api";
import { useContext, useEffect } from "react";
import { Context } from "../context/provider";

const Home = () => {
  const { listFilms, setListFilms } = useContext(Context);

  useEffect(() => {
    const request = async () => {
      const { results } = await getFilms(1);
      setListFilms(results);
    };
    request();
  }, []);

  return <main></main>;
};
