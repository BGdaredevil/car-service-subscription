import { useEffect } from "react";
import { withRouter } from "react-router-dom";

function ScrollToTop({ history, children }) {
  useEffect(() => {
    const scroll = history.listen(() => window.scrollTo(0, 0));
    return () => scroll();
  }, [history]);

  return <>{children}</>;
}

export default withRouter(ScrollToTop);
