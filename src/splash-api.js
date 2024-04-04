import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://api.unsplash.com',
  headers: {
    common: {
      Authorization: 'Client-ID A4eplQbkB0euKwNBTP19eiBat5fhE44v0gr8knE1Hjo',
    },
  },
});

async function splashRequest(page, query) {
  const searchParams = {
    per_page: 15,
    orientation: 'landscape',
    page: page,
    query: query,
  };
  const { data } = await axiosInstance.get('/search/photos', {
    params: searchParams,
  });
  return data;
}

export default splashRequest;
