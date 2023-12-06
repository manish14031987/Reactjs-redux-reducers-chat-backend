import React, { Suspense, useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import Loadable from "react-loadable";
import { useSelector, useDispatch } from "react-redux";
import { loadPathName, setLanguage } from "../actions/baseActions";
import "../../node_modules/font-awesome/scss/font-awesome.scss";
import "./../assets/scss/style.scss";
import "@fortawesome/fontawesome-free/css/all.css";
import Loader from "./layout/Loader";
import Aux from "../hoc/_Aux";
import ScrollToTop from "./layout/ScrollToTop";
import routes from "../Route/auth";
const { REACT_APP_DEFAULT_PATH, REACT_APP_DEFAULT_LANG } = process.env;

const AdminLayout = Loadable({
  loader: () => import("./layout/AdminLayout"),
  loading: Loader,
});
const App = () => {
  const dispatch = useDispatch();
  const { isSuperUserAuth, language } = useSelector((state) => ({
    isSuperUserAuth: state.isSuperUserAuth,
    language: state.language,
  }));
  const location = useLocation();
  const { pathname } = useLocation();

  useEffect(() => {
    const locationPath = location.pathname.split("/");
    dispatch(loadPathName(locationPath));
    const lang = pathname.split("/")[1];
    if (lang === "en" || lang === "ar") {
      dispatch(setLanguage(lang));
    } else {
      dispatch(setLanguage(REACT_APP_DEFAULT_LANG));
    }
  }, [location, dispatch, pathname]);

  const menu = routes.map((route, index) => {
    return route.component ? (
      <Route
        key={index}
        path={`/:locale(ar|en)?${route.path}`}
        exact={route.exact}
        name={route.name}
        render={(props) =>
          isSuperUserAuth === true ? (
            <Redirect to={`/${language}${REACT_APP_DEFAULT_PATH}`} />
          ) : (
            <route.component {...props} title={route.title} />
          )
        }
      />
    ) : null;
  });

  return (
    <Aux>
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Switch>
          {menu}
          <Route to={`/${language}/`} component={AdminLayout} />
        </Switch>
      </Suspense>
    </Aux>
  );
};

export default App;
