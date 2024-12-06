import { useLocation, useNavigate } from "react-router-dom";

const Details = () => {
  const location = useLocation()
  const object = location.state?.object || {}
  const navigate = useNavigate()
  return (
    <div>
      <h1>Object details</h1>
      <table className="table">
        <tbody>
          <tr>
            <th>Title</th>
            <td>{object.Title}</td>
          </tr>
          <tr>
            <th>Artist</th>
            <td>{object.ArtistName}</td>
          </tr>
          <tr>
            <th>Dated</th>
            <td>{object.Dated}</td>
          </tr>
          <tr>
            <th>Department</th>
            <td>{object.DepartmentName}</td>
          </tr>
          <tr>
            <th>Culture</th>
            <td>{object.CultureName}</td>
          </tr>
          <tr>
            <th>Period</th>
            <td>{object.PeriodName}</td>
          </tr>
          <tr>
            <th>Object Name</th>
            <td>{object.ObjectName}</td>
          </tr>
          <tr>
            <th>Object Status</th>
            <td>{object.ObjectStatus}</td>
          </tr>
          <tr>
            <th>Classification</th>
            <td>{object.Classification}</td>
          </tr>
          <tr>
            <th>Materials</th>
            <td>{object.Materials}</td>
          </tr>
          <tr>
            <th>Dimensions</th>
            <td>{object.Dimensions}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{object.Description}</td>
          </tr>
          <tr>
            <th>eMuseum Label Text</th>
            <td dangerouslySetInnerHTML={{ __html: object.eMuseumLabelText }}></td>
          </tr>
          <tr>
            <th>Year Obtained</th>
            <td>{object.YearObtained}</td>
          </tr>
          <tr>
            <th>Acquisition Method</th>
            <td>{object.AcquisitionMethodName}</td>
          </tr>
          <tr>
            <th>Credit Line</th>
            <td>{object.CreditLine}</td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={() => navigate(-1)}
        className="btn btn-primary mb-3"
      >Back to Results</button>
      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <button
        onClick={() => navigate("/")}
        className="btn btn-primary mb-3"
      >Back to Home</button>
    </div>
  )
}

export default Details