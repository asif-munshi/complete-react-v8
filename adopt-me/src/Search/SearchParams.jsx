import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";

import { Results } from "./Results";
import { useBreedList } from "./useBreedList";
import { fetchSearch } from "./fetchSearch";
import { AdoptedPetContext } from "../AdoptedPetContext";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

export const SearchParams = () => {
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });

  const [animal, setAnimal] = useState("");
  const [breeds] = useBreedList(animal);
  const [adoptedPet] = useContext(AdoptedPetContext);

  const results = useQuery(["search", requestParams], fetchSearch);
  const pets = results?.data?.pets ?? [];

  return (
    <div className="my-0 mx-auto w-11/12">
      <form
        className="mb-10 flex flex-col items-center justify-center rounded-lg bg-gray-200 p-10 shadow-lg"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.target);
          const obj = {
            location: formData.get("location") ?? "",
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        {adoptedPet ? (
          <div className="block overflow-hidden my-[25px] mx-0 border-b-2 border-[#333] w-[100px] h-[100px] float-left mt-0 mr-[20px] mb-0 ml-[10px]" style={{ clipPath: "circle(50% at 50% 50%)" }}>
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} className='w-full min-h-[100px]' />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input
            type="text"
            id="location"
            className="search-input"
            name="location"
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            className="search-input"
            value={animal}
            onChange={(e) => {
              setAnimal(e.target.value);
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            className="search-input grayed-out-disabled"
            name="breed"
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button className="rounded border-none bg-blue-500 px-6 py-2 text-white hover:opacity-70">
          Submit
        </button>
      </form>
      <Results pets={pets} />
    </div>
  );
};
