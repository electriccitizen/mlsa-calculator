import React, { useState, useEffect } from "react";

const Planets = () => {
  const [hasError, setErrors] = useState(false);
  const [planets, setPlanets] = useState({});

  useEffect(() =>
    fetch("https://mlsa-calc.netlify.app/.netlify/functions/node-fetch")
      .then(res => res.json())
      .then(res => this.setState({ planets: res }))
      .catch(() => this.setState({ hasErrors: true }))
  );

  return <div>{JSON.stringify(planets)}</div>;
};
export default Planets;