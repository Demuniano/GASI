import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../Components/Auth/AuthContext';

const useAuth = () => {
  const { auth } = useContext(AuthContext);
  return auth;
};

// Wrap your utility functions in a React component or hook
export const fetchRequests = async (orderPapers, setRequests) => {
  const auth = useAuth(); // Get the auth token
  const fetchedRequests = {};
  for (const orderPaper of orderPapers) {
    const orderPaperRequests = [];
    for (const requestId of orderPaper.requests) {
      const request = await fetchRequest(requestId, auth);
      if (request) {
        orderPaperRequests.push(request);
      }
    }
    fetchedRequests[orderPaper.id] = orderPaperRequests;
  }
  setRequests(fetchedRequests);
};

export const fetchRequest = async (idRequest, auth) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/request/${idRequest}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching request:', error);
  }
};

export const addRecommendation = async (idDetail, recommendation, auth) => {
  try {
    const url = `http://localhost:8080/api/recommendation/newRecommendation/${idDetail}`;
    await axios.post(url, { description: recommendation }, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    });
  } catch (error) {
    console.error('Error creating recommendation:', error);
  }
};

export const addDetailOrderPaper = async (idOrderPaper, idRequest, recommendations, auth) => {
  try {
    const url = `http://localhost:8080/api/detailOrderPaper/newDetailOrderPaper/${idOrderPaper}/${idRequest}`;
    const response = await axios.post(url, {}, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    });
    for (const recoIdRequest in recommendations) {
      console.log(recoIdRequest, "recoIdRequest", idRequest, "idRequest");
      if (recoIdRequest == idRequest) {
        addRecommendation(response.data.idDetailOrderPaper, recommendations[recoIdRequest][0], auth);
      }
    }
  } catch (error) {
    console.error('Error creating detailOrderPaper:', error);
  }
};

export const deleteRecommendation = (requestId) => {
  setRecommendations((prevState) => {
    const newState = { ...prevState };
    delete newState[requestId];
    return newState;
  });
};

export const getCurrentDateTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const currentDate = `${year}-${month}-${day}`;
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const currentTime = `${hours}:${minutes}`;
  return { currentDate, currentTime };
};

export const detectIndicator = async (idRequest, auth) => {
  try {
    const url = `http://localhost:8080/api/request/typeRequest/${idRequest}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    });
    return response.data.typeRequestName === "Convenio SUMA";
  } catch (error) {
    console.error('Error fetching indicator:', error);
    return false;
  }
};
