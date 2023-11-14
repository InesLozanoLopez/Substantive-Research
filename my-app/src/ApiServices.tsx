import axios from 'axios';

export const fetchDataApi = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: 'https://substantive.pythonanywhere.com/',
    });

    if (response.data) {
      return response.data.interactions;
    }
    console.log('Error from fetchDataApi', response.status);
    throw new Error();
  } catch (error) {
    console.log('Error from apiServices', error);
    throw new Error();
  }
};
