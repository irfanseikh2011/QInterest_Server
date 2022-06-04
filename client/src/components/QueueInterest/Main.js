import { FilterList } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import Questions from "./Questions";
import "./css/Main.css";

const Main = ({ questions }) => {
  return (
    <div className="main">
      <div className="main-container">
        <div className="main-top">
          <h2>All Questions</h2>
          <Link to="/add-question">
            <button>Ask Question</button>
          </Link>
        </div>

        <div className="main-desc">
          <p>{questions && questions.length} Questions</p>
          <div className="main-filter">
            <div className="main-tabs">
              <div className="main-tab">
                <Link to="/">Newest</Link>
              </div>
              <div className="main-tab">
                <Link to="/">Active</Link>
              </div>
              <div className="main-tab">
                <Link to="/">More</Link>
              </div>
            </div>
            <div className="main-filter-item">
              <FilterList />
              <p>Filter</p>
            </div>
          </div>
        </div>
        <div className="questions">

          {questions.map((_q, index) => (
            <>
              <div className="question" key={index}>
                <Questions question={_q} />
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
