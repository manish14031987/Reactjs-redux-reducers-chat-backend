import React from "react";
import { Link } from "react-router-dom";
const Index = (props) => {
  const { title } = props;
  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="page-header-title float-left">
                <h5 className="m-b-10">{title} </h5>
              </div>
              <ul className="breadcrumb float-right">
                <li className="breadcrumb-item">
                  <Link to="/">Dashboard</Link>
                </li>
                {title !== "Dashboard" && (
                  <li className="breadcrumb-item">
                    <a href={"#!"} onClick={handleClick}>
                      {title}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
