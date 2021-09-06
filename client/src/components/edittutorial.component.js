import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function EditTutorial(props) {
  const url = "http://localhost:8080/tutorial";
  // const [tId, setTid] = useState();
  const [tName, setTname] = useState();
  const [tDesc, setTdesc] = useState();
  const [tStatus, setTstatus] = useState();
  const history = useHistory();

  const loadData = () => {
    let id = props.match.params.id;
    console.log(id);
    axios.get(url + "/" + id).then((res) => {
      let tutorial = res.data;
      console.log(tutorial);
      // setTid(tutorial.id);
      setTname(tutorial.tName);
      setTdesc(tutorial.tDesc);
      setTstatus(tutorial.tStatus);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    // const tid = document.getElementById("tutorial_id").value;
    const tname = document.getElementById("tutorial_name").value;
    const tdesc = document.getElementById("tutorial_desc").value;
    const tstatus = document.getElementById("tutorial_status");
    const tstatusV = tstatus.options[tstatus.selectedIndex].value;
    console.log(tstatusV);
    // setTid(tid);
    setTname(tname);
    setTdesc(tdesc);
    setTstatus(tstatusV);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let id = props.match.params.id;
    console.log("update clicked", id);
    axios
      .put(url + "/" + id, {
        // tId: tId,
        tName: tName,
        tDesc: tDesc,
        tStatus: tStatus,
      })
      .then((res) => {
        // alert("Update Tutorial");
        console.log("Updated");
        history.push("/home");
      });
  };

  const handleCancel = () => {
    history.push("/home");
  };

  return (
    <>
      <div className="col-md-12">
        <div className="card card-container">
          <h3 className="text-center">Edit Tutorial</h3>
          <form onSubmit={handleSubmit}>
            {/* <div className="form-group">
              <label htmlFor="tutorial_id">Tutorial Id</label>
              <input
                type="text"
                className="form-control"
                id="tutorial_id"
                name="tutorial_id"
                value={tId}
                onChange={handleChange}
                placeholder="Id"
                disabled
              />
            </div> */}
            <div className="form-group">
              <label htmlFor="tutorial_name">Tutorial Name</label>
              <input
                type="text"
                className="form-control"
                id="tutorial_name"
                name="tutorial_name"
                value={tName}
                onChange={handleChange}
                placeholder="Tutorial Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="tutorial_desc">Tutorial Description</label>
              <input
                type="text"
                className="form-control"
                id="tutorial_desc"
                name="tutorial_desc"
                value={tDesc}
                onChange={handleChange}
                placeholder="Tutorial Description"
              />
            </div>
            <div className="form-group">
              <label htmlFor="tutorial_status">Status</label>
              <select
                id="tutorial_status"
                className="form-select form-control"
                onChange={handleChange}
              >
                <option value="Published">Published</option>
                <option value="UnPublished">UnPublished</option>
              </select>
            </div>

            <div className="form-group d-flex justify-content-around">
              <button type="submit" className="btn btn-primary">
                Update
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default EditTutorial;
