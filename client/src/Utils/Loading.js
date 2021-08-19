import React from "react";

//importing visual assets
import loading from '../Assets/loading-buffering.svg';

function LoadingUserDetails(props) {
  // Renders the loading spinner until
  // database served data has been rendered
  const Loading = props.Loading;
  if (Loading) {
    return (
      <div>
        <img src={loading} className="loading spinner" alt="loading..." />
      </div>
    );
  }
  else return <div></div> ;
}
	
export default LoadingUserDetails;