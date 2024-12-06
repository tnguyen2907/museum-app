import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

import DropDownCheckbox from "../components/DropDownCheckbox";

const Main = () => {
  // List of attributes to be used for checkboxes
  const checkboxAttributesList = [
    "departments",
    "cultures",
    "periods",
    "classifications",
    "acquisitionMethods",
  ];

  const [checkboxAttributes, setCheckboxAttributes] = useState({
    departments: [],
    selected_departments: [],
    cultures: [],
    selected_cultures: [],
    periods: [],
    selected_periods: [],
    classifications: [],
    selected_classifications: [],
    acquisitionMethods: [],
    selected_acquisitionMethods: [],
  });

  // Keywords for search on AccesionNumber, ArtistName, Title, ObjectName, Dated, Description, Materials, CreditLine, eMuseumLabelText
  const [keywords, setKeywords] = useState("");

  // State to show invalid input alert
  const [invalidInput, setInvalidInput] = useState(false);

  // Fetch unique values for each attribute to populate dropdown menu
  useEffect(() => {
    checkboxAttributesList.map((attribute) => {
      axios
        .get(`http://localhost:3000/get_unique_${attribute}`)
        .then((response) => {
          setCheckboxAttributes((prev) => {
            return { ...prev, [attribute]: response.data };
          });
        })
        .catch((error) => {
          console.error("Error fetch data from backend", error);
        });
    });
  }, []);

  const handleCheckboxChange = (attribute, value) => {
    setCheckboxAttributes((prev) => ({
      ...prev,
      [`selected_${attribute}`]: prev[`selected_${attribute}`].includes(value)
        ? prev[`selected_${attribute}`].filter((item) => item != value)
        : [...prev[`selected_${attribute}`], value],
    }));
  };

  const navigate = useNavigate();

  // Fetch objects based on selected attributes and keywords
  const fetchObjects = () => {
    axios
      .post("http://localhost:3000/query", {
        departments: checkboxAttributes["selected_departments"],
        cultures: checkboxAttributes["selected_cultures"],
        periods: checkboxAttributes["selected_periods"],
        classifications: checkboxAttributes["selected_classifications"],
        acquisitionMethods: checkboxAttributes["selected_acquisitionMethods"],
        keywords: keywords,
      })
      .then((response) => {
        navigate("/results", { state: { objects: response.data } });  // Go to results page
      })
      .catch((error) => {
        if (error.response.status == 400) {
          setInvalidInput(true);
        }
        else {
          console.error("Error fetch data from backend", error);
        }
      });
  };

  // Render the main page
  return (
    <div className="container">
      <h1>Allen Memorial Art Museum</h1>
      <h5>Search for objects</h5>
      {invalidInput && (
        <div className="alert alert-danger alert-dismissible" role="alert">
          Invalid input
          <button type="button" className="btn-close" onClick={() => setInvalidInput(false)} ></button>
        </div>
      )}
      <div className="row">
        <div className="col">
          <input
            type="text"
            className="form-control"
            placeholder="Search by keywords for accession number, title, artist, description, materials, etc."
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
        </div>
      </div>
      <div className="row mt-3">
        {checkboxAttributesList.map((attribute) => (
          <div key={attribute} className="col">
            <DropDownCheckbox
              key={attribute}
              attribute={attribute}
              options={checkboxAttributes[attribute]}
              selectedOptions={checkboxAttributes[`selected_` + attribute]}
              onChange={handleCheckboxChange}
            />
          </div>
        ))}
      </div>
      <div className="row mt-5">
        <div className="col">
          <button onClick={fetchObjects} className="btn btn-primary">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
