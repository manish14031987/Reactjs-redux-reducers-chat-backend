import React, { useState, Fragment, useRef, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  submitCustomerData,
  createCustomerData,
} from "../../actions/customerActions";
import { useForm } from "react-hook-form";
import SubmitButton from "../../Component/Button";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Autocomplete from "@mui/material/Autocomplete";
import {
  checkSpace,
  checkMobileNumber,
  ValidateAlpha,
} from "../../utils/helpers";
import { makeStyles } from "@material-ui/core/styles";
import BackButton from "../../Component/BackButton";
import { DropzoneArea } from "material-ui-dropzone";
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

const FormModal = (props) => {
  const { item } = props;
  const { t } = useTranslation();
  const { register, errors, handleSubmit, watch } = useForm();
  const [selectedFile, setSelectedFile] = useState("");
  const dispatch = useDispatch();
  const [PreferredLanguage, setPreferredLanguage] = useState();
  const classes = useStyles();
  const { languageList, isRtl } = useSelector((state) => ({
    languageList: state.languageList,
    isRtl: state.isRtl,
  }));

  let history = useHistory();
  const goToPreviousPath = () => {
    history.goBack();
  };
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("first_name", data.first_name);
    formData.append("id", data.id);
    formData.append("last_name", data.last_name);
    formData.append("mobile_number", data.mobile_number);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);
    formData.append("language", PreferredLanguage);
    if (selectedFile.name) {
      formData.append("image", selectedFile, selectedFile.name);
    }
    if (item._id) {
      dispatch(submitCustomerData(formData, goToPreviousPath));
    } else {
      dispatch(createCustomerData(formData, goToPreviousPath));
    }
  };

  const [values, setValues] = useState({
    password: false,
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

  const onChangePicture = (files) => {
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const defaultSelected = () => {
    if (item._id) {
      if (languageList.length > 0) {
        var index = languageList.findIndex(
          (document) => document.code === item.language
        );
        return languageList[index];
      }
    }
  };

  useEffect(() => {
    if (item.language) {
      setPreferredLanguage(item.language);
    }
  }, [item]);

  return (
    <Fragment>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            autoComplete="off"
            dir={isRtl ? "rtl" : "ltr"}
          >
            <Row>
              <Col md={6}>
                <Form.Group controlId="formBasicFirstName">
                  <TextField
                    required
                    id="outlined-first_name"
                    defaultValue={item.first_name}
                    label={t("CUSTOMER_FIRST_NAME")}
                    variant="outlined"
                    fullWidth
                    onKeyDown={(event) => ValidateAlpha(event)}
                    className={!errors.first_name ? classes.root : "w-100"}
                    error={errors.first_name ? true : false}
                    name="first_name"
                    inputRef={register({
                      required: t("CUSTOMER_FIRST_NAME_REQUIRED"),
                      minLength: {
                        value: 3,
                        message: t("CUSTOMER_FIRST_NAME_MIN_LENGTH"),
                      },
                      maxLength: {
                        value: 50,
                        message: t("CUSTOMER_FIRST_NAME_MAX_LENGTH"),
                      },
                    })}
                    helperText={errors.first_name && errors.first_name.message}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicLastName">
                  <TextField
                    id="outlined-last_name"
                    required
                    defaultValue={item.last_name}
                    label={t("CUSTOMER_LAST_NAME")}
                    variant="outlined"
                    fullWidth
                    onKeyDown={(event) => ValidateAlpha(event)}
                    className={!errors.last_name ? classes.root : "w-100"}
                    error={errors.last_name ? true : false}
                    name="last_name"
                    inputRef={register({
                      required: t("CUSTOMER_LAST_NAME_REQUIRED"),
                      minLength: {
                        value: 3,
                        message: t("CUSTOMER_LAST_NAME_MIN_LENGTH"),
                      },
                      maxLength: {
                        value: 50,
                        message: t("CUSTOMER_LAST_NAME_MAX_LENGTH"),
                      },
                    })}
                    helperText={errors.last_name && errors.last_name.message}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <TextField
                    id="outlined-email"
                    required
                    label={t("Email Address")}
                    variant="outlined"
                    defaultValue={item.email}
                    fullWidth
                    className={!errors.email ? classes.root : "w-100"}
                    error={errors.email ? true : false}
                    name="email"
                    inputRef={register({
                      required: t("CUSTOMER_EMAIL_REQUIRED"),
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: t("CUSTOMER_INVALID_EMAIL"),
                      },
                      maxLength: {
                        value: 50,
                        message: t("CUSTOMER_EMAIL_MAX_LENGTH"),
                      },
                      validate: {
                        isSpace: (value) =>
                          checkSpace(value) || t("CUSTOMER_EMAIL_REMOVE_SPACE"),
                      },
                    })}
                    helperText={errors.email && errors.email.message}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicNumber">
                  <TextField
                    id="outlined-number"
                    required
                    label={t("CUSTOMER_MOBILE_NUMBER")}
                    variant="outlined"
                    fullWidth
                    onKeyDown={(event) => checkMobileNumber(event)}
                    defaultValue={item.mobile_number}
                    className={!errors.mobile_number ? classes.root : "w-100"}
                    error={errors.mobile_number ? true : false}
                    name="mobile_number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">+966</InputAdornment>
                      ),
                    }}
                    inputRef={register({
                      required: t("CUSTOMER_MOBILE_NUMBER_REQUIRED"),
                      minLength: {
                        value: 7,
                        message: t("CUSTOMER_MOBILE_NUMBER_MIN_LENGTH"),
                      },
                      maxLength: {
                        value: 15,
                        message: t("CUSTOMER_MOBILE_NUMBER_MAX_LENGTH"),
                      },
                    })}
                    helperText={
                      errors.mobile_number && errors.mobile_number.message
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formBasicTime">
                  {languageList.length > 0 && (
                    <Autocomplete
                      id="size-small-standard"
                      options={languageList}
                      onChange={(event, newValue) => {
                        setPreferredLanguage(newValue.code);
                      }}
                      getOptionLabel={(option) => option.title}
                      value={defaultSelected()}
                      renderInput={(params) => (
                        <TextField
                          required
                          {...params}
                          label={t("CUSTOMER_NOTIFICATION")}
                          variant="outlined"
                          fullWidth
                          name="language_preferred"
                          error={errors.language_preferred ? true : false}
                          inputRef={register({
                            required: t("CUSTOMER_NOTIFICATION_REQUIRED"),
                          })}
                          helperText={
                            errors.language_preferred &&
                            errors.language_preferred.message
                          }
                        />
                      )}
                    />
                  )}
                </Form.Group>
              </Col>
              <Col md={6}>
                {!item._id && (
                  <Form.Group controlId="formBasicPassword">
                    <TextField
                      id="outlined-password"
                      required
                      label={t("CUSTOMER_PASSWORD")}
                      type={values.password ? "text" : "password"}
                      variant="outlined"
                      fullWidth
                      className={!errors.password ? classes.root : "w-100"}
                      error={errors.password ? true : false}
                      name="password"
                      inputRef={register({
                        required: t("CUSTOMER_PASSWORD_REQUIRED"),
                        minLength: {
                          value: 6,
                          message: t("CUSTOMER_PASSWORD_MIN_LENGTH"),
                        },
                        maxLength: {
                          value: 50,
                          message: t("CUSTOMER_PASSWORD_MAX_LENGTH"),
                        },
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})/,
                          message: t("CUSTOMER_PASSWORD_PATTERN"),
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
                  </Form.Group>
                )}
                {!item._id && (
                  <Form.Group controlId="formBasicConfirmation">
                    <TextField
                      id="outlined-password_confirmation"
                      required
                      label={t("CUSTOMER_CONFIRM_PASSWORD")}
                      type={values.password_confirmation ? "text" : "password"}
                      variant="outlined"
                      fullWidth
                      className={
                        !errors.password_confirmation ? classes.root : "w-100"
                      }
                      error={errors.password_confirmation ? true : false}
                      name="password_confirmation"
                      inputRef={register({
                        required: t("CUSTOMER_CONFIRM_REQUIRED"),
                        validate: (value) =>
                          value === password.current ||
                          t("CUSTOMER_CONFIRM_PASSWORD_NOT_MATCH"),
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
                  </Form.Group>
                )}
                <Form.Group controlId="formBasicImage" className="dropzoneArea">
                  <DropzoneArea
                    onChange={onChangePicture}
                    acceptedFiles={["image/jpeg", "image/png"]}
                    dropzoneText={t("CUSTOMER_IMAGE_TYPE_VALIDATION")}
                    filesLimit={1}
                    getDropRejectMessage={(fileObj) => {
                      if (fileObj.size > 10485760) {
                        return `${t("CUSTOMER_FILE")} ${fileObj.name} ${t(
                          "CUSTOMER_FILE_REJECTED"
                        )}`;
                      } else if (
                        fileObj.type !== "image/jpeg" ||
                        fileObj.type !== "image/png"
                      ) {
                        return `${t("CUSTOMER_FILE")} ${fileObj.name} ${t(
                          "CUSTOMER_FILE_TYPE_NOT_SUPPORTED"
                        )}}`;
                      }
                    }}
                    alertSnackbarProps={{
                      anchorOrigin: {
                        horizontal: "right",
                        vertical: "top",
                      },
                    }}
                    maxFileSize={10485760}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Control
              type="hidden"
              name="id"
              defaultValue={item._id}
              ref={register({})}
            />
            <Row>
              <Col xs={2} md={3} xl={2} xxl={1}>
                <SubmitButton title={item._id ? t("UPDATE") : t("SUBMIT")} />
              </Col>
              <Col xs={2} md={3} xl={2} xxl={1}>
                <BackButton onClick={() => goToPreviousPath()} />
              </Col>
            </Row>
          </Form>
        </ThemeProvider>
      </StylesProvider>
    </Fragment>
  );
};

export default FormModal;
