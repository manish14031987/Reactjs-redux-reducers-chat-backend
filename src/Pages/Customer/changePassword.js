import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Card, Form } from "react-bootstrap";
import { updatePasswordData } from "../../actions/customerActions";
import Aux from "../../hoc/_Aux";
import { useForm } from "react-hook-form";
import SubmitButton from "../../Component/Button";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { formLabelsTheme } from "../../utils/helpers";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import BackButton from "../../Component/BackButton";
import { useTranslation } from "react-i18next";
import { rtlTheme, ltrTheme } from "../../utils/helpers";
import rtl from "jss-rtl";
import { create } from "jss";
import {
  StylesProvider,
  jssPreset,
  ThemeProvider,
} from "@material-ui/core/styles";
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });
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

const Index = (props) => {
  const { title } = props;
  const { t } = useTranslation();
  const { requestParams, isRtl } = useSelector((state) => ({
    requestParams: state.requestParams,
    isRtl: state.isRtl,
  }));
  let history = useHistory();
  const goToPreviousPath = () => {
    history.goBack();
  };
  const dispatch = useDispatch();
  const { register, errors, handleSubmit, watch } = useForm({
    defaultValues: requestParams,
  });
  const classes = useStyles();
  useEffect(() => {
    document.title = title;
  }, [title]);

  const onSubmit = (data) => {
    dispatch(updatePasswordData(data, goToPreviousPath));
  };

  const [values, setValues] = useState({
    password: false,
    password_confirmation: false,
  });

  const handleClickShowPasswordNew = () => {
    setValues({ ...values, password: !values.password });
  };

  const handleClickShowPasswordCon = () => {
    setValues({
      ...values,
      password_confirmation: !values.password_confirmation,
    });
  };

  const password = useRef({});
  password.current = watch("password", "");

  return (
    <>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
          <Aux>
            <Row>
              <Col>
                <Row>
                  <Col md={12}>
                    <Card>
                      <Card.Header>
                        <Card.Title as="h5">{title}</Card.Title>
                        <br />
                        <br />
                        <span className="redHint">
                          {t("FIELDS_MARK_MANDATORY")}
                        </span>
                      </Card.Header>
                      <Card.Body>
                        <Row>
                          <Col md={6}>
                            <MuiThemeProvider theme={formLabelsTheme}>
                              <Form
                                onSubmit={handleSubmit(onSubmit)}
                                noValidate
                                autoComplete="off"
                              >
                                <Form.Control
                                  type="hidden"
                                  name="id"
                                  defaultValue={requestParams._id}
                                  ref={register({})}
                                />

                                <Form.Group controlId="formBasicPassword">
                                  <TextField
                                    id="outlined-password"
                                    required
                                    label={t("CUSTOMER_PASSWORD")}
                                    type={values.password ? "text" : "password"}
                                    variant="outlined"
                                    fullWidth
                                    className={
                                      !errors.password ? classes.root : "w-100"
                                    }
                                    error={errors.password ? true : false}
                                    name="password"
                                    autoFocus={true}
                                    inputRef={register({
                                      required: true,
                                      minLength: 6,
                                      pattern: {
                                        value:
                                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})/,
                                      },
                                    })}
                                    helperText={
                                      errors.password &&
                                      errors.password.type === "required"
                                        ? t("CUSTOMER_PASSWORD_REQUIRED")
                                        : errors.password &&
                                          errors.password.type === "minLength"
                                        ? t("CUSTOMER_PASSWORD_MIN_LENGTH")
                                        : errors.password &&
                                          errors.password.type === "pattern" &&
                                          t("CUSTOMER_PASSWORD_PATTERN")
                                    }
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment>
                                          <IconButton
                                            onClick={handleClickShowPasswordNew}
                                          >
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
                                </Form.Group>

                                <Form.Group controlId="formBasicConfirmation">
                                  <TextField
                                    id="outlined-password_confirmation"
                                    required
                                    label={t("CUSTOMER_CONFIRM_PASSWORD")}
                                    type={
                                      values.password_confirmation
                                        ? "text"
                                        : "password"
                                    }
                                    variant="outlined"
                                    fullWidth
                                    className={
                                      !errors.password_confirmation
                                        ? classes.root
                                        : "w-100"
                                    }
                                    error={
                                      errors.password_confirmation
                                        ? true
                                        : false
                                    }
                                    name="password_confirmation"
                                    inputRef={register({
                                      required: t("CUSTOMER_CONFIRM_REQUIRED"),
                                      validate: (value) =>
                                        value === password.current ||
                                        t(
                                          "CUSTOMER_CONFIRM_PASSWORD_NOT_MATCH"
                                        ),
                                    })}
                                    helperText={
                                      errors.password_confirmation &&
                                      errors.password_confirmation.message
                                    }
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <IconButton
                                            onClick={handleClickShowPasswordCon}
                                          >
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
                                </Form.Group>

                                <Row>
                                  <Col xs={2} md={3} xl={3} xxl={1}>
                                    <SubmitButton title={t("UPDATE")} />
                                  </Col>
                                  <Col xs={2} md={3} xl={3} xxl={1}>
                                    <BackButton
                                      onClick={() => goToPreviousPath()}
                                    />
                                  </Col>
                                </Row>
                              </Form>
                            </MuiThemeProvider>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Aux>
        </ThemeProvider>
      </StylesProvider>
    </>
  );
};

export default Index;
