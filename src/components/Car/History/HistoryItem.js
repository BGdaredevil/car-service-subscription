import ClickButton from "../../UI/ClickButton.js";

function HistoryItem({ item }) {
  if (item.service === null) {
    item.service = item.legacyService;
  }

  return (
    <div className="history-item">
      <h4>
        Did {`${item.service.name}`} at {`${item.vendor.name}`} for {`${item.service.price}`} USD at{" "}
        {`${item.odometer}`} km on the odometer
      </h4>
      {item.feedback ? "" : <ClickButton label="feedback" />}
    </div>
  );
}

export default HistoryItem;
