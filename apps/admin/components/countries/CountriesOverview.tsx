import { getAllCountries } from "@cooked/db";
import GeneralViewCard from "../shared/GeneralViewCard";
export default async function CountriesOverview() {
  const countries = await getAllCountries();

  return (
    <div className="w-full grid grid-cols-3 2xl:grid-cols-4 px-7 2xl:px-12 gap-x-5">
      {countries.map((country) => (
        <GeneralViewCard
          key={country.countryID}
          name={country.countryName}
          id={country.countryID}
          imgUrl={country.imageUrl}
        />
      ))}
    </div>
  );
}
