import { useState, useEffect } from "react";
import axios from "axios";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await axios.get(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        );
        const [countryData] = response.data;
        setCountry({ found: true, data: countryData });
      } catch (error) {
        setCountry({ found: false });
      }
    };

    if (name) {
      fetchCountry();
    } else {
      setCountry(null);
    }
  }, [name]);

  return country;
};
