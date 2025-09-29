import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AnimeCard from "../components/AnimeCard";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAnimeSearch } from "../api/animeAPI";
import { BannerSection } from "../components/Home/BannerSection";
import { getBannerById } from "../api/animeAPI";

function Home() {
  const [response, setResponse] = useState({});
  // Here we define our query as a multi-line string
  // Storing it in a separate .graphql/.gql file is also possible
  var query = `query Query($sort: [MediaSort], $seasonYear: Int, $season: MediaSeason, $perPage: Int) {
  Page(perPage: $perPage) {
    media(sort: $sort, seasonYear: $seasonYear, season: $season) {
    title {
      english
      native
      romaji
    }
      bannerImage
    }
  }
}
`;

  // Define our query variables and values that will be used in the query request
  var variables = {
    sort: ["POPULARITY_DESC"],
    seasonYear: 2025,
    season: "SUMMER",
    perPage: 10,
  };

  // Define the config we'll need for our Api request
  var url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

  // Make the HTTP Api request
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url, options);
      if (!res.ok) {
        console.log("There's an error");
      }
      const data = await res.json();
      // console.log(data);
    };

    fetchData();
  }, []);

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }
  getBannerById([1, 2, 3]);
  return (
    <>
      <BannerSection />
    </>
  );
}

export default Home;
