import React, { useState, useEffect, Fragment } from "react";
import { NavLink } from "react-router-dom";
import Button from "../../../Component/Button";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { userLoginData } from "../../../actions/userActions";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import logo from "../../../assets/images/logo.svg";
import { makeStyles } from "@material-ui/core/styles";
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
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = useStyles();
  const { title } = props;

  const { superUserParams, isRtl, language } = useSelector((state) => ({
    superUserParams: state.superUserParams,
    isRtl: state.isRtl,
    language: state.language,
  }));
  const { register, errors, handleSubmit } = useForm({
    defaultValues: superUserParams,
  });
  const onSubmit = (data) => {
    let params = data;
    params.role_id = 1;
    dispatch(userLoginData(params));
  };
  const [values, setValues] = useState({
    password: false,
  });
  const handleClickShowPassword = () => {
    setValues({ ...values, password: !values.password });
  };
  useEffect(() => {
    document.title = t("LOGIN");
  }, [title, t]);

  return (
    <Fragment>
      <Alert />
      <StylesProvider jss={jss}>
        <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
          <div className="auth-wrapper aut-bg-img">
            <div className="auth-content">
              <div className="card">
                <div className="card-body text-center login-box">
                  <div className="language-choose">
                    <SelectLang />
                  </div>
                  <div className="mb-5">
                    <img src={logo} alt="logo" className="auth_logo" />
                  </div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    autoComplete="off"
                  >
                    <div className="input-group mb-3 w-100">
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
                    <div className="input-group mb-4">
                      <TextField
                        id="outlined-password"
                        required
                        label={t("PASSWORD")}
                        type={values.password ? "text" : "password"}
                        variant="outlined"
                        fullWidth
                        className={!errors.password ? classes.root : "w-100"}
                        error={errors.password ? true : false}
                        name="password"
                        inputRef={register({
                          required: t("PASSWORD_REQUEST"),
                        })}
                        helperText={errors.password && errors.password.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleClickShowPassword}>
                                {values.password ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </div>
                    <div className="form-group text-left">
                      <div className="checkbox checkbox-fill d-inline">
                        <input
                          type="checkbox"
                          label={t("REMEMBER")}
                          name="remember_me"
                          ref={register}
                          id="checkbox-fill-a1"
                        />
                        <label htmlFor="checkbox-fill-a1" className="cr">
                          {t("REMEMBER")}
                        </label>
                      </div>
                    </div>
                    <div className="w-100">
                      <Button title={t("SUBMIT")} />
                    </div>
                    <div className="pt-2">
                      <span className="redHint">{t("FIELDS_MANDATORY")}</span>
                    </div>
                    <br />
                    <p className="mb-2 text-muted">
                      {t("FORGOT_PASSWORD")}&nbsp;
                      <NavLink to={`/${language}/forgot-password`}>
                        {t("CLICK_HERE")}
                      </NavLink>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </ThemeProvider>
      </StylesProvider>
    </Fragment>
  );
};

export default Index;
