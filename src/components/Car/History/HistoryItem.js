import { useState } from "react";

import ClickButton from "../../UI/ClickButton.js";
import { del, get } from "../../../services/apiService.js";
import { endpoints } from "../../../config/apiConfig.js";

function HistoryItem({ item, state, cleanRejectedService, handleFeedback }) {
  if (item.service === null) {
    item.service = item.legacyService;
  }

  const [showFeedback, setShowFeedback] = useState(false);

  const feedbackHandler = (keyWord) => {
    get(`${endpoints.shopApi}/voting/${keyWord}/${item._id}/${item.vendor._id}`)
      .then((r) => handleFeedback(r))
      .catch((e) => console.log(e));
  };
  const delHandler = () => {
    del(`${endpoints.bookingApi}/${item._id}`)
      .then((r) => cleanRejectedService(r))
      .catch((e) => console.log(e));
  };

  const selector = {
    pending: (
      <div className="history-item">
        <h4>
          Service {`${item.service.name}`} at {`${item.vendor.name}`} is pending completion.
        </h4>
      </div>
    ),
    rejected: (
      <div className="history-item">
        <h4>
          Service {`${item.service.name}`} at {`${item.vendor.name}`} is canceled.
        </h4>
        <ClickButton label="ok delete" onClick={delHandler} />
      </div>
    ),
    complete: (
      <div className="history-item">
        <h4>
          Did {`${item.service.name}`} at {`${item.vendor.name}`} for {`${item.service.price}`} USD
          at {`${item.odometer}`} km on the odometer
        </h4>
        {item.feedback ? (
          ""
        ) : showFeedback ? (
          <div className="feedback">
            <ClickButton label="like" onClick={() => feedbackHandler("upvote")} />
            <ClickButton label="dislike" onClick={() => feedbackHandler("downvote")} />
            <ClickButton label="cancel" onClick={() => setShowFeedback(false)} />
          </div>
        ) : (
          <ClickButton label="feedback" onClick={() => setShowFeedback(true)} />
        )}
      </div>
    ),
  };

  return selector[state];
}

export default HistoryItem;
