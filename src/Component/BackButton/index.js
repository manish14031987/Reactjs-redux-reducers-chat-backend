import React from "react";
import Button from "@material-ui/core/Button";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { useTranslation } from "react-i18next";

const Index = (props) => {
  const { t } = useTranslation();
  const handleClick = () => {
    props.onClick();
  };
  return (
    <Button
      size="large"
      variant="contained"
      fullWidth
      onClick={() => handleClick()}
      startIcon={<ArrowBackIcon />}
    >
      {t("BACK")}
    </Button>
  );
};
export default Index;
