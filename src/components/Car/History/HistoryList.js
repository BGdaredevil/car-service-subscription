import HistoryItem from "./HistoryItem.js";
import "./History.css";

function HistoryList({ list }) {
  return (
    <div className="history-list">
      {list && list.length > 0 ? (
        <>
          <h1>Service history:</h1>
          {list
            .sort((a, b) => a.odometer - b.odometer)
            .map((item) => (
              <HistoryItem key={item._id} item={item} />
            ))}
        </>
      ) : (
        <h1 className="history-item no-history">no service history yet</h1>
      )}
    </div>
  );
}

export default HistoryList;
