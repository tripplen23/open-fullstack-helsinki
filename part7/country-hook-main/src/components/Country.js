import React from "react";

const Country = ({ country }) => {
  if (!country) {
    return <div>not found...</div>;
  }

  if (!country.found) {
    return <div>Country not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name?.official}</h3>
      <div>capital {country.data.capital?.[0]}</div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flags?.svg}
        height="100"
        alt={`flag of ${country.data.name?.common}`}
      />
    </div>
  );
};

export default Country;
