import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./ViewEnq.css";
import {
  getAEnquiry,
  resetState,
  updateAEnquiry,
} from "../../features/enquiry/enquirySlice";
import { BiArrowBack } from "react-icons/bi";

const ViewEnq = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getEnqId = location.pathname.split("/")[3];
  const enqState = useSelector((state) => state.enquiry);
  const { enqName, enqMobile, enqEmail, enqComment, enqStatus } = enqState;

  useEffect(() => {
    dispatch(getAEnquiry(getEnqId));
  }, [getEnqId]);
  const goBack = () => {
    navigate(-1);
  };
  const setEnquiryStatus = (e, i) => {
    console.log(e, i);
    const data = { id: i, enqData: e };
    dispatch(updateAEnquiry(data));
    dispatch(resetState());
    setTimeout(() => {
      dispatch(getAEnquiry(getEnqId));
    }, 100);
  };
  return (
    <div>
    <div className="view-enq-div-1">
      <h3 className="enq-h3">View Enquiry</h3>
      <button
      className="view-enq-button-1"
      onClick={goBack}
      >
     <BiArrowBack className="icon-viewEnq" /> Go Back
      </button>
    </div>
    <div className="view-enq-div-2">
    <div className="view-enq-div-3">
        <h6 className="h6andp-viewenq" >Mobile</h6>
        <p  className="h6andp-viewenq" >
        <a href={`tel:+92${enqMobile}`}>{enqMobile}</a>
        </p>
    </div>
    <div className="view-enq-div-3">
          <h6  className="h6andp-viewenq" >Email:</h6>
          <p className="h6andp-viewenq" >
            <a href={`mailto:${enqEmail}`}>{enqEmail}</a>
          </p>
        </div>
        <div className="view-enq-div-3">
          <h6  className="h6andp-viewenq" >Comment:</h6>
          <p  className="h6andp-viewenq" >{enqComment}</p>
        </div>
        <div className="view-enq-div-3">
          <h6 className="h6andp-viewenq" >Status:</h6>
          <p  className="h6andp-viewenq" >{enqStatus}</p>
        </div>
        <div className="view-enq-div-3">
          <h6  className="h6andp-viewenq" >Change Status:</h6>
          <div>
            <select
              name=""
              defaultValue={enqStatus ? enqStatus : "Submitted"}
              className="form-control-viewEnq form-select-viewEnq"
              id=""
              onChange={(e) => setEnquiryStatus(e.target.value, getEnqId)}
            >
              <option value="Submitted">Submitted</option>
              <option value="Contacted">Contacted</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
    </div>
    </div>
  );
};

export default ViewEnq;
