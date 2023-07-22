import { useSelector } from "react-redux";
import CustomRoutes from "./router/custom-routes";

const App = () => {
  // eslint-disable-next-line
  const currentLang = useSelector((state) => state.locale.lang);

  return (
    <>
      <CustomRoutes />
    </>
  );
};

export default App;
