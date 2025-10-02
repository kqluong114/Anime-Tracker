export const getAnimeById = async ({ id }) => {
  const res = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }
  return res.json();
};

export const getAnimeSearch = async ({
  unapproved = false,
  page = "",
  limit = "",
  q = "",
  type = "",
  score = "",
  min_score = "",
  max_score = "",
  status = "",
  rating = "",
  sfw = false,
  genres = "",
  genres_exclude = "",
  order_by = "",
  sort = "",
  letter = "",
  producers = "",
  start_date = "",
  end_date = "",
} = {}) => {
  const baseUrl = "https://api.jikan.moe/v4/anime";
  let params = new URLSearchParams();

  const filters = {
    unapproved,
    page,
    limit,
    q,
    type,
    score,
    min_score,
    max_score,
    status,
    rating,
    sfw,
    genres,
    genres_exclude,
    order_by,
    sort,
    letter,
    producers,
    start_date,
    end_date,
  };

  Object.entries(filters).forEach(([param, value]) => {
    if (value && value !== "" && value !== undefined) {
      params.append(param, value);
    }
  });

  const res = await fetch(`${baseUrl}?${params.toString()}`);
  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }
  const data = await res.json();
  console.log(data);
  console.log(`${baseUrl}?${params.toString()}`);
  return data;
};

export const getBannerById = async (idList) => {
  const fields = `
    idMal
    title {
      english
      native
      romaji
    }
    bannerImage
  `;
  const queryBody = idList
    .map((id) => {
      return `anime${id}: Media(idMal: ${id}) {${fields}}`;
    })
    .join("\n");

  const query = `
    query {
      ${queryBody}
    }
  `;

  let url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    // console.log(data.data);
    return data.data;
  } catch (error) {
    console.log(`There's an error: ${error}`);
  }
};

export const getPopularBanners = async () => {
  const query = `
    query {
      Page(perPage: 5) {
        media(season: SUMMER, seasonYear: 2025, type: ANIME, sort: POPULARITY_DESC) {
          idMal
          title {
            romaji
            english
          }
          bannerImage
          coverImage {
            large
          }
        }
      }
    }
  `;

  let url = "https://graphql.anilist.co",
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    };

  try {
    const res = await fetch(url, options);
    const data = await res.json();
    // console.log(data.data);
    return data.data;
  } catch (error) {
    console.log(`There's an error: ${error}`);
  }
};
