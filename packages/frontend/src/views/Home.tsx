import React from "react";
import { useEffect } from "react";

export const Home: React.FC = () => {
  const testFetch = async () => {
    try {
      const res = await fetch("/api");
      const data = await res.text();

      console.log(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    testFetch();
  }, []);

  return <div>Home</div>;
};
