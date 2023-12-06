import React, { useEffect, useState, Fragment, useRef } from "react";
import { NavLink } from "react-router-dom";
import Button from "../../../Component/Button";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import {
  updatePasswordWithOTP,
  resendOTPEmail,
} from "../../../actions/userActions";
import logo from "../../../assets/images/logo.svg";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useHistory } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";
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
  const { register, errors, handleSubmit, watch } = useForm({
    defaultValues: superUserParams,
  });

  useEffect(() => {
    document.title = t(title);
  }, [title, t]);

  const onSubmit = (data) => {
    dispatch(updatePasswordWithOTP(data, push, language));
  };
  const [values, setValues] = useState({
    password: false,
    password_confirmation: false,
  });
  const handleClickShowPasswordNew = () => {
    setValues({ ...values, password: !values.password });
  };
  const handleClickResendOTP = (e) => {
    e.preventDefault();
    const params = {};
    params.email = superUserParams.email;
    setCounter(59);
    dispatch(resendOTPEmail(params));
  };
  const handleClickShowPasswordCon = () => {
    setValues({
      ...values,
      password_confirmation: !values.password_confirmation,
    });
  };
  const [counter, setCounter] = useState(59);
  const password = useRef({});
  password.current = watch("password", "");

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <Fragment>
      <Alert />
      <StylesProvider jss={jss}>
        <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
          <div className="auth-wrapper aut-bg-img">
            <div className="auth-content">
              <div className="card">
                <div className="card-body text-center">
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
                    <div className="input-group mb-4">
                      <TextField
                        id="outlined-otp"
                        required
                        label={t("OTP")}
                        variant="outlined"
                        type="tel"
                        autoFocus={true}
                        fullWidth
                        className={!errors.otp ? classes.root : "w-100"}
                        error={errors.otp ? true : false}
                        name="otp"
                        inputRef={register({
                          required: t("OTP_REQUIRED"),
                          minLength: {
                            value: 6,
                            message: t("OTP_MIN"),
                          },
                          maxLength: {
                            value: 6,
                            message: t("OTP_MAX"),
                          },
                          pattern: {
                            value: /^[0-9\b]+$/,
                            message: t("OTP_PATTERN"),
                          },
                        })}
                        helperText={errors.otp && errors.otp.message}
                      />
                    </div>
                    <div className="input-group mb-4">
                      <TextField
                        id="outlined-password"
                        required
                        label={t("NEW_PASSWORD")}
                        type={values.password ? "text" : "password"}
                        variant="outlined"
                        fullWidth
                        className={!errors.password ? classes.root : "w-100"}
                        error={errors.password ? true : false}
                        name="password"
                        inputRef={register({
                          required: t("PASSWORD_REQUIRED"),
                          minLength: {
                            value: 6,
                            message: t("PASSWORD_MIN"),
                          },
                          pattern: {
                            value:
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})/,
                            message: t("PASSWORD_PATTERN"),
                          },
                        })}
                        helperText={errors.password && errors.password.message}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleClickShowPasswordNew}>
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
                    <div className="input-group mb-4">
                      <TextField
                        id="outlined-password_confirmation"
                        required
                        label={t("CONFIRM_PASSWORD")}
                        type={
                          values.password_confirmation ? "text" : "password"
                        }
                        variant="outlined"
                        fullWidth
                        className={
                          !errors.password_confirmation ? classes.root : "w-100"
                        }
                        error={errors.password_confirmation ? true : false}
                        name="password_confirmation"
                        inputRef={register({
                          validate: (value) =>
                            value === password.current ||
                            t("PASSWORD_NOT_MATCH"),
                        })}
                        helperText={
                          errors.password_confirmation &&
                          errors.password_confirmation.message
                        }
                        InputProps={{
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton onClick={handleClickShowPasswordCon}>
                                {values.password_confirmation ? (
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
                    <Button title={t("SUBMIT")} />
                    <div className="pt-2">
                      <span className="redHint">{t("FIELDS_MANDATORY")}</span>
                    </div>
                    {counter !== 0 && (
                      <Box mt={1}>
                        <Typography
                          fontWeight={500}
                          align="center"
                          color="textSecondary"
                        >
                          {t("RESEND_OTP_IN")}&nbsp;
                          <span style={{ color: "green", fontWeight: "bold" }}>
                            00:{counter}
                          </span>
                        </Typography>
                      </Box>
                    )}
                    {counter === 0 && (
                      <Link href="#" onClick={(e) => handleClickResendOTP(e)}>
                        {t("RESEND_OTP")}
                      </Link>
                    )}
                    <p className="mb-2 text-muted">
                      <br />
                      <NavLink to={`/${language}/`}>
                        {t("BACK_TO_LOGIN")}
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
