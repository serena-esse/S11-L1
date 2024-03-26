export const ADD_TO_FAVOURITES = "ADD_TO_FAVOURITES";
export const DELETE_FROM_FAVOURITES = "DELETE_FROM_FAVOURITES";
export const GET_JOBS = "GET_JOBS";

// ora rimpiazziamo le actions sparse per i vari componenti con degli ACTION CREATORS
// un ACTION CREATOR è una FUNZIONE che RITORNA L'AZIONE. Così scriviamo la action una volta sola!
export const addToFavouritesAction = (jobData) => {
  return {
    type: ADD_TO_FAVOURITES,
    payload: jobData,
  };
};

// non siamo obbligati ad utilizzare le funzioni freccia
export const deleteFromFavouritesAction = function (i) {
  return {
    type: DELETE_FROM_FAVOURITES,
    payload: i,
  };
};

// andiamo a creare un action creator che non si occuperà solamente di ritornare un'azione,
// ma che gestirà interamente la logica delle operazioni asincrone nel flow di Redux
export const getJobActions = (companyName) => {
  return async (dispatch) => {
    const baseEndpoint = "https://strive-benchmark.herokuapp.com/api/jobs?company=";
    try {
      const response = await fetch(baseEndpoint + companyName);
      if (response.ok) {
        const fetchedJobs = await response.json();
        dispatch({
          type: GET_JOBS,
          payload: fetchedJobs,
        });
      } else {
        throw new Error("Errore nel recupero dei lavori");
      }
    } catch (error) {
      console.error("ERRORE", error);
      // dispatch di un'azione di errore, se necessario
    }
  };
};
