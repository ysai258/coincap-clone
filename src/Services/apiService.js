const apiService = {
  fetchData(limit=50,offset=0) {
    return fetch(`https://api.coincap.io/v2/assets?limit=${limit}&offset=${offset}`)
      .then((response) => response.json())
      .then((data) => data);
  },

};

export default apiService;

