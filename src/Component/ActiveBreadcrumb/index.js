import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Index = (props) => {
  const { breadcrumb } = props;
  const { t } = useTranslation();
  const { isRtl } = useSelector((state) => ({
    isRtl: state.isRtl,
  }));
  const handleClick = (e) => {
    e.preventDefault();
  };

  return (
    <div
      role="presentation"
      className="breadcrumbsLinks"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <Breadcrumbs aria-label="breadcrumb" dir={isRtl ? "rtl" : "ltr"}>
        <Link className="breadcrumb-item" to="/" dir={isRtl ? "rtl" : "ltr"}>
          {t("DASHBOARD_BREADCRUMB")}
        </Link>
        {breadcrumb &&
          breadcrumb.map((item, key) =>
            item.action ? (
              <Link
                className={item.class ? item.class : ""}
                to={item.action}
                key={key}
                dir={isRtl ? "rtl" : "ltr"}
              >
                {item.title}
              </Link>
            ) : (
              <Link
                className={item.class ? item.class : ""}
                to="#!"
                onClick={handleClick}
                key={key}
                dir={isRtl ? "rtl" : "ltr"}
              >
                {item.title}
              </Link>
            )
          )}
      </Breadcrumbs>
    </div>
  );
};

export default Index;
