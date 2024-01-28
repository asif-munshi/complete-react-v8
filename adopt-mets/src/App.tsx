import { useState } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import AdoptedPetContext from "./AdoptedPetContext";
import SearchParams from "./Search/SearchParams";
import Details from "./Details/Details";
import { IPet } from "./APIResponsesTypes";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  },
});

const App = () => {
  const adoptedPet = useState(null as IPet | null);

  return (
    <div
      className="m-0 p-0"
      style={{
        background: "url(http://pets-images.dev-apis.com/pets/wallpaperC.jpg)",
      }}
    >
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AdoptedPetContext.Provider value={adoptedPet}>
            <header className="mx-auto my-0 flex w-[1100px] justify-center">
              <Link
                to="/"
                className="my-[20px] mx-0 block h-[76px] w-[279px] overflow-hidden indent-[-9999px] text-[3px] font-bold text-[#333] no-underline brightness-150"
                style={{
                  background:
                    "url(http://static.frontendmasters.com/resources/2019-05-02-complete-intro-react-v5/image-logo.png)",
                }}
              >
                Adopt Me!
              </Link>
            </header>
            <Routes>
              <Route path="/details/:id" element={<Details />}></Route>
              <Route path="/" element={<SearchParams />}></Route>
            </Routes>
          </AdoptedPetContext.Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");

if (!container) {
  throw new Error("no container to render to");
}

const root = createRoot(container);
root.render(<App />);
