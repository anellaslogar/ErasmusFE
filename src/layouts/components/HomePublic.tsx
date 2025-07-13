import React from "react";
import { Link } from "react-router-dom";

const HomePublic: React.FC = () => {
  return (
    <div className="flex-grow-1 header position-relative">
      <div className="dark-overlay">
        <div
          className="container d-flex flex-column justify-content-center align-items-center text-center"
          style={{ height: "100%" }}
        >
          <h1
            className="text-white"
            style={{
              fontSize: "3rem",
              fontWeight: "bold",
              textShadow: "2px 2px 5px rgba(0, 0, 0, 0.7)",
            }}
          >
            Dobrodošli u Erasmus MEV
          </h1>
          <p
            className="text-white mt-4"
            style={{
              fontSize: "1.2rem",
              maxWidth: "600px",
              lineHeight: "1.8",
              textShadow: "1px 1px 3px rgba(0, 0, 0, 0.5)",
            }}
          >
            Program Erasmus MEV osnažuje studente da istražuju nove kulture, proširuju svoje akademske horizonte i stvaraju nezaboravna sjećanja. Pridružite nam se u izgradnji svjetlije budućnosti kroz obrazovanje i suradnju.
          </p>
          <Link to="/register">
          <button
            className="btn btn-light mt-4"
            style={{
              backgroundColor: "var(--mainYellow)",
              color: "black",
              fontWeight: "bold",
              fontSize: "1.1rem",
              padding: "10px 20px",
              borderRadius: "25px",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            Saznaj više
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePublic;
