import http from "./httpservices";

export async function getImageservice(page = 1) {
  const { data } = await http.get(
    `https://api.unsplash.com/photos/?client_id=a4PQVG6BjsGW9XhRw3_-MNvuN_dv_W35Kl0Bp97ZXpw&page=${page}`
  );
  return data;
}

export async function searchImages(name, page=1) {
  const { data } = await http.get(
    `https://api.unsplash.com/search/photos?page=${page}&query=${name}&client_id=a4PQVG6BjsGW9XhRw3_-MNvuN_dv_W35Kl0Bp97ZXpw`
  );
  return data;
}

export default {
  getImageservice,
  searchImages,
};
