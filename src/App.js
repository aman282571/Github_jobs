import React, { useEffect, useState } from "react";
import ShowJobs from "./components/ShowJobs";
import "./cssfiles/app.css";
import Loader from "./components/Loader";
export let DataContext = React.createContext();
function App() {
  const [allJobs, changejobs] = useState([]);
  const [process, changeprocess] = useState({ loading: true, error: false });

  useEffect(() => {
    let temp = [];
    var k = 1;

    for (var i = 1; i <= 6; i++) {
      fetch(
        `https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions.json?page=${i}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          temp = [...temp, ...data];
          k++;

          if (k === 7) {
            changejobs((prevjobs) => [...prevjobs, ...temp]);
            changeprocess({ loading: false, error: false });
          }
        })
        .catch((err) => {
          changeprocess({ loading: false, error: true });
        });
    }
  }, []);
  return (
    <div className="App">
      {process.loading ? (
        <Loader />
      ) : process.error ? (
        <p>
          <a href="https://cors-anywhere.herokuapp.com/corsdemo">click me</a>{" "}
          and after clicking on "Request temporary access to the demo server"
          come back to this website.
        </p>
      ) : (
        <DataContext.Provider value={allJobs}>
          <ShowJobs />
        </DataContext.Provider>
      )}
    </div>
  );
}

export default App;
