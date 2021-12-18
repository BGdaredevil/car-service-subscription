import HistoryItem from "./HistoryItem.js";

import "./History.css";

function HistoryList({ list, cleanRejectedService, handleFeedback }) {
  const hasList = Boolean(list && list.length > 0);

  let completeList;
  let pendingList;
  let rejectedList;

  if (hasList) {
    completeList = list.filter((x) => x.state === "complete");
    pendingList = list.filter((x) => x.state === "pending");
    rejectedList = list.filter((x) => x.state === "rejected");
  } else {
    return <h1 className="history-item no-history">no service history yet</h1>;
  }

  const completed = (
    <div className="history-list">
      {completeList.length > 0 ? (
        <>
          <h1>Service history:</h1>
          {completeList
            .sort((a, b) => a.odometer - b.odometer)
            .map((item) => (
              <HistoryItem
                key={item._id}
                item={item}
                state="complete"
                handleFeedback={handleFeedback}
              />
            ))}
        </>
      ) : (
        <h1 className="history-item no-history">no service history yet</h1>
      )}
    </div>
  );

  const pending = (
    <div className="history-list">
      {pendingList.length > 0 ? (
        <>
          <h1>Pending services:</h1>
          {pendingList.map((item) => (
            <HistoryItem key={item._id} item={item} state="pending" />
          ))}
        </>
      ) : (
        <h1 className="history-item no-history">no pending services</h1>
      )}
    </div>
  );

  const rejected = (
    <div className="history-list">
      {rejectedList.length > 0 ? (
        <>
          <h1>Canceled services:</h1>
          {rejectedList.map((item) => (
            <HistoryItem
              key={item._id}
              item={item}
              state="rejected"
              cleanRejectedService={cleanRejectedService}
            />
          ))}
        </>
      ) : (
        ""
      )}
    </div>
  );

  return (
    <>
      {completed}
      {pending}
      {rejected}
    </>
  );
}

export default HistoryList;
