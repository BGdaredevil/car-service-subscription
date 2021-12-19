import { faSpinner, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./StarsRating.css";

const oneStar = 24; //width of one star

function Stars({ rating }) {
  const style = {
    width: `${rating * oneStar}px`,
  };

  return (
    <div className="rating">
      <div className="stars" style={style}>
        <FontAwesomeIcon icon={faStar} size="lg" className="star" />
        <FontAwesomeIcon icon={faStar} size="lg" className="star" />
        <FontAwesomeIcon icon={faStar} size="lg" className="star" />
        <FontAwesomeIcon icon={faStar} size="lg" className="star" />
        <FontAwesomeIcon icon={faStar} size="lg" className="star" />
        <FontAwesomeIcon icon={faStar} size="lg" className="star" />
        <FontAwesomeIcon icon={faStar} size="lg" className="star" />
        <FontAwesomeIcon icon={faStar} size="lg" className="star" />
        <FontAwesomeIcon icon={faStar} size="lg" className="star" />
        <FontAwesomeIcon icon={faStar} size="lg" className="star" />
      </div>
    </div>
  );
}

export default Stars;
