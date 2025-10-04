export const getAnimeStaff = async (id) => {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/staff`);
    const data = await res.json();
    return data.data;
  } catch (err) {
    console.log(`Error fetching anime staff: ${err}`);
  }
};
