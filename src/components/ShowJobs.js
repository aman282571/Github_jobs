import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../App";
import $ from "jquery";
import { FaAngleUp } from "react-icons/fa";

function ShowJobs() {
  const allJobs = useContext(DataContext);
  const [title, changeTitle] = useState("");
  const [location, changeLocation] = useState("");
  const [type, changeType] = useState("");
  const [page, changePage] = useState(1);

  const [showData, changeShowData] = useState([]);

  function calcDate(created_at) {
    let date = new Date(Date.parse(created_at));
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }
  function changebgc() {
    $(`#num${page}`).css("background-color", "yellow");

    $(`#num${page}`).siblings().css("background-color", "aqua");
  }
  function countPages() {
    let arr = [];
    if (Math.ceil(showData.length / 30) === 1) return [];
    for (let j = 1; j <= Math.ceil(showData.length / 30); j++) {
      arr.push(
        <p
          key={j}
          id={`num${j}`}
          onClick={(e) => {
            document.documentElement.scrollTo(0, 0);
            changePage(j);
          }}
        >
          {" "}
          {j}
        </p>
      );
    }

    return arr;
  }
  useEffect(() => {
    // changeshowdata(allJobs);
    changeShowData(
      allJobs
        .filter((job) => {
          return (
            job.title.toLowerCase().indexOf(title.toLowerCase()) !== -1 &&
            job.location.toLowerCase().indexOf(location.toLowerCase()) !== -1 &&
            job.type.toLowerCase().indexOf(type.toLowerCase()) !== -1
          );
        })
        .map((job, index) => {
          return (
            <div id="indi-job" key={index}>
              <p id="role">
                {job.title}{" "}
                <a
                  href={job.company_url}
                  target="_blank"
                  rel="noreferrer"
                  id="company"
                >
                  ({job.company})
                </a>
              </p>

              <p id="time">
                Job created on <span>{calcDate(job.created_at)}</span>
              </p>
              <div id="labels">
                <p>{job.location}</p>
                <p>{job.type}</p>
              </div>

              <a id="job_info" href={job.url} rel="noreferrer" target="_blank">
                View job details
              </a>
              {job.company_logo ? (
                <img src={job.company_logo} alt="loading" />
              ) : (
                ""
              )}
            </div>
          );
        })
    );
    changePage(1);
  }, [allJobs, title, location, type]);

  function titleChange(e) {
    changeTitle(e.target.value);
  }
  function locationChange(e) {
    changeLocation(e.target.value);
  }
  function typeChange(e) {
    changeType(e.target.value);
  }

  return (
    <div id="container">
      <div id="search">
        <div id="title">
          <p>Title :</p>
          <input
            type="text"
            placeholder="search by title"
            onChange={titleChange}
          />
        </div>
        <div id="location">
          <p>Location :</p>
          <input
            type="text"
            placeholder="search by location"
            onChange={locationChange}
          />
        </div>
        <select id="type" onChange={typeChange}>
          <option value=""> Select</option>
          <option value="Full Time"> Full Time</option>
          <option value="Part Time"> Part Time</option>
        </select>
      </div>
      {/* ----------------jobs portion ------------*/}
      <div id="jobs">
        <p id="found">{showData.length} results found</p>
        {showData.length ? (
          showData.slice((page - 1) * 30, page * 30)
        ) : (
          <p id="no_data">No Data Found</p>
        )}
      </div>

      <div id="pageNum">{countPages()}</div>
      {changebgc()}
      <p id="goTop" onClick={() => document.documentElement.scrollTo(0, 0)}>
        <FaAngleUp id="arrow" />
      </p>
      <p id="end">Built and Designed with ❤️ </p>
    </div>
  );
}

export default ShowJobs;
