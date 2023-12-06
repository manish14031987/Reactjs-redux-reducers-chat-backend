import React, { useEffect, Fragment } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Button from "../../../Component/Button";
import { useForm } from "react-hook-form";
import { forgotPasswordEmail } from "../../../actions/userActions";
import logo from "../../../assets/images/logo.svg";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import Alert from "../../../Component/Alert";
import SelectLang from "../../../Component/LangSelector";
import { useTranslation } from "react-i18next";
import { rtlTheme, ltrTheme } from "../../../utils/helpers";
import { create } from "jss";
import rtl from "jss-rtl";
import {
  StylesProvider,
  jssPreset,
  ThemeProvider,
} from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#0f4f7c",
    },
    "& .Mui-focused": {
      color: "#0f4f7c",
    },
  },
});
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const Index = (props) => {
  const { title } = props;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { superUserParams, isRtl, language } = useSelector((state) => ({
    superUserParams: state.superUserParams,
    isRtl: state.isRtl,
    language: state.language,
  }));
  const classes = useStyles();
  const { push } = useHistory();
  const { register, errors, handleSubmit } = useForm({
    defaultValues: superUserParams,
  });
  useEffect(() => {
    document.title = t(title);
  }, [title, t]);

  const onSubmit = (data) => {
    let params = data;
    dispatch(forgotPasswordEmail(params, push, language));
  };

  return (
    <Fragment>
      <Alert />
      <StylesProvider jss={jss}>
        <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
          <div className="auth-wrapper aut-bg-img">
            <div className="auth-content">
              <div className="card">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  noValidate
                  autoComplete="off"
                >
                  <div className="card-body text-center">
                    <div className="language-choose">
                      <SelectLang />
                    </div>
                    <div className="mb-5">
                      <img src={logo} alt="logo" className="auth_logo" />
                    </div>
                    <div className="input-group mb-3">
                      <TextField
                        required
                        id="outlined-email"
                        label={t("EMAIL")}
                        variant="outlined"
                        autoFocus={true}
                        fullWidth
                        className={!errors.email ? classes.root : "w-100"}
                        error={errors.email ? true : false}
                        name="email"
                        inputRef={register({
                          required: t("EMAIL_REQUIRED"),
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: t("EMAIL_PATTERN"),
                          },
                          maxLength: {
                            value: 50,
                            message: t("EMAIL_MAX_LENGTH"),
                          },
                        })}
                        helperText={errors.email && errors.email.message}
                      />
                    </div>
                    <Button title={t("SUBMIT")} />
                    <div className="pt-2">
                      <span className="redHint">{t("FIELDS_MANDATORY")}</span>
                    </div>
                    <br />
                    <p className="mb-2 text-muted">
                      {t("ALREADY_LOGIN")}
                      <NavLink to={`/${language}`}>
                        {t("CLICK_TO_LOGIN")}
                      </NavLink>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </StylesProvider>
    </Fragment>
  );
};

export default Index;
