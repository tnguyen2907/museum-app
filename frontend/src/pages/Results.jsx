import { useLocation, useNavigate } from "react-router-dom";


const Results = () => {
  const location = useLocation();
  const objects  = location.state?.objects || [];

  const navigate = useNavigate();

  const handleClick = (object) => {
    navigate(`/details`, { state: { object } });    // Go to details page for the selected object
  }

  return (
    <div>
      <h1>Results</h1>
      {objects.length === 0 ? (
        <p>No objects found</p> 
      ) : (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Object ID</th>
              <th>Accession Number</th>
              <th>Title</th>
              <th>Artist</th>
              <th>Dated</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {objects.map((object) => (
              <tr key={object.ObjectID} onClick={() => handleClick(object)} style={{ cursor: 'pointer' }}>
                <td>{object.ObjectID}</td>
                <td>{object.AccessionNumber}</td>
                <td>{object.Title}</td>
                <td>{object.ArtistName}</td>
                <td>{object.Dated}</td>
                <td>{object.DepartmentName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p><i>Note: Only the first 100 rows are retrieved</i></p>
      <button
        onClick={() => navigate("/")}
        className="btn btn-primary mb-3"
      >Back to Home</button>
    </div>
  );
};

export default Results;
