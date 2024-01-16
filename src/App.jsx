import { useEffect, useState } from "react";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [region, setRegion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function fetchCountries() {
    try {
      setIsLoading(true);

      const res = await fetch(`https://restcountries.com/v3.1/all`);
      const data = await res.json();

      setCountries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(function () {
    fetchCountries();
  }, []);

  function filterCountries(regionFilter) {
    const filteredCountries = countries.filter(
      (country) => country.region === regionFilter
    );

    return filteredCountries;
  }

  return (
    <div>
      <nav className="nav">
        <button className="btn" onClick={() => setRegion("Europe")}>
          Europe
        </button>
        <button className="btn" onClick={() => setRegion("Asia")}>
          Asia
        </button>
        <button className="btn" onClick={() => setRegion("Americas")}>
          Americas
        </button>
        <button className="btn" onClick={() => setRegion("Africa")}>
          Africa
        </button>
      </nav>

      <div className="wrapper">
        {!region && !isLoading && (
          <p className="choose-region">Choose region 🌍⤴</p>
        )}
        {region && isLoading && <Loader />}
        {!isLoading &&
          region &&
          filterCountries(region)?.map((country) => (
            <div className="card" key={country.name.common}>
              <img className="img" src={country.flags.png} />
              <div className="text__box">
                <h3 className="country">{country.name.common}</h3>
                <p>
                  <strong>Capital: </strong>
                  {country.capital}
                </p>
                <p>
                  <strong>Population: </strong>
                  {country.population}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

function Loader() {
  return <p className="loader">Loading countries...</p>;
}
