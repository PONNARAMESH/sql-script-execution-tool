import "./page.css";
import "./globals.css";

import "regenerator-runtime/runtime";
// import { Timer } from "./components/timer";
import { CustomSqlQueryEditor } from "../components/sqlQueryEditor";

const Home = () => {
  return (
    <div className="app">
      {/* <Timer /> */}
      <CustomSqlQueryEditor />
    </div>
  );
};
export default Home;
