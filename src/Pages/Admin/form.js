import React, { useState, Fragment, useRef, useEffect } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { submitSubAdmin, createSubAdmin } from "../../actions/subAdminActions";
import { loadToasterData, loadSelectData } from "../../actions/baseActions";
import { useForm } from "react-hook-form";
import SubmitButton from "../../Component/Button";
import { useHistory } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { MuiThemeProvider } from "@material-ui/core/styles";
import {
  formLabelsTheme,
  checkSpace,
  checkMobileNumber,
  ValidateAlpha,
} from "../../utils/helpers";
import { makeStyles } from "@material-ui/core/styles";
import BackButton from "../../Component/BackButton";
import { DropzoneArea } from "material-ui-dropzone";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useSelector, useDispatch } from "react-redux";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

const rolePermission = [
  {
    id: 1,
    title: "Dashboard",
    children: [],
    group: "Manage Dashboard",
    p_id: false,
    sideMenu: true,
    p_object: {},
    object: {
      order: 1,
      id: "dashboard",
      title: "Dashboard",
      type: "item",
      url: "/dashboard",
      icon: "feather icon-home",
    },
  },
  {
    id: 2,
    title: "Order",
    children: [],
    group: "Manage Order",
    p_id: true,
    p_object: {
      order: 2,
      id: "order",
      title: "Orders Management",
      type: "collapse",
      icon: "fas fa-cart-arrow-down",
      children: [],
    },
    sideMenu: true,
    object: {
      order: 2,
      id: "order-listing",
      p_id: "order",
      title: "Order List",
      type: "item",
      url: "/order/listing",
    },
  },
  {
    id: 3,
    title: "Return Request",
    children: [],
    group: "Manage Order",
    p_id: true,
    p_object: {
      order: 2,
      id: "order",
      title: "Orders Management",
      type: "collapse",
      icon: "fas fa-cart-arrow-down",
      children: [],
    },
    sideMenu: true,
    object: {
      order: 2,
      id: "returnRequest",
      p_id: "order",
      title: "Return Request",
      type: "item",
      url: "/order/return-return",
    },
  },
  {
    id: 4,
    title: "Post Item",
    children: [],
    group: "Manage Post Item",
    p_id: false,
    p_object: {},
    sideMenu: true,
    object: {
      order: 4,
      id: "post-item",
      title: "Post Item",
      type: "item",
      url: "/post-item",
      icon: "fas fa-people-carry",
    },
  },
  {
    id: 5,
    title: "Sub Admins",
    children: [],
    group: "Manage sub admins",
    p_id: false,
    p_object: {},
    sideMenu: true,
    object: {
      order: 5,
      id: "sub-admin",
      title: "Sub Admins",
      type: "item",
      url: "/sub-admin",
      icon: "fas fa-briefcase",
    },
  },
  {
    id: 6,
    title: "Create admin",
    children: [],
    group: "Manage sub admins",
    p_id: false,
    p_object: {},
    object: {},
    sideMenu: false,
  },
  {
    id: 7,
    title: "Edit admin",
    children: [],
    group: "Manage sub admins",
    p_id: false,
    p_object: {},
    object: {},
    sideMenu: false,
  },
  {
    id: 8,
    title: "Delete admin",
    children: [],
    group: "Manage sub admins",
    p_id: false,
    p_object: {},
    object: {},
    sideMenu: false,
  },
  {
    id: 9,
    title: "Change Password",
    children: [],
    group: "Manage sub admins",
    p_id: false,
    p_object: {},
    object: {},
    sideMenu: false,
  },
  {
    id: 10,
    title: "Manage Settings",
    children: [],
    group: "Platform settings",
    p_id: false,
    p_object: {},
    sideMenu: true,
    object: {
      order: 10,
      id: "settings",
      title: "Platform Settings",
      type: "item",
      url: "/setting",
      icon: "fas fa-tools",
    },
  },
  {
    id: 11,
    title: "Manage Send Notification",
    children: [],
    group: "Notification",
    p_id: false,
    p_object: {},
    sideMenu: true,
    object: {
      order: 11,
      id: "notification",
      title: "Send Notification",
      type: "item",
      url: "/send-notification",
      icon: "fa fa-bell",
    },
  },
  {
    id: 12,
    title: "Manage Subscriptions",
    children: [],
    group: "Subscriptions",
    p_id: false,
    p_object: {},
    sideMenu: true,
    object: {
      order: 12,
      id: "subscription",
      title: "Subscription Plan",
      type: "item",
      url: "/subscription",
      icon: "fa fa-list",
    },
  },
  {
    id: 13,
    title: "Manage Coupon & Gift Vouchers",
    children: [],
    group: "Gift Vouchers",
    p_id: false,
    p_object: {},
    sideMenu: true,
    object: {
      order: 13,
      id: "coupon",
      title: "Coupons & Gift Vouchers",
      type: "item",
      url: "/coupon",
      icon: "fas fa-gift",
    },
  },
  {
    id: 14,
    title: "Create Voucher",
    children: [],
    group: "Gift Vouchers",
    p_id: false,
    p_object: {},
    object: {},
    sideMenu: false,
  },
  {
    id: 15,
    title: "Edit Voucher",
    children: [],
    group: "Gift Vouchers",
    p_id: false,
    p_object: {},
    object: {},
    sideMenu: false,
  },
  {
    id: 16,
    title: "Delete Voucher",
    children: [],
    group: "Gift Vouchers",
    p_id: false,
    p_object: {},
    object: {},
    sideMenu: false,
  },
  {
    id: 17,
    title: "View Voucher",
    children: [],
    group: "Gift Vouchers",
    p_id: false,
    p_object: {},
    object: {},
    sideMenu: false,
  },
  {
    id: 18,
    title: "Security Alert",
    children: [],
    group: "Send Security Alert",
    p_id: false,
    p_object: {},
    object: {},
    sideMenu: false,
  },
];

const FormModal = (props) => {
  const { item } = props;
  const { register, errors, handleSubmit, watch } = useForm();
  const [selectedFile, setSelectedFile] = useState("");
  const [checkbox, setCheckBox] = useState(true);
  const dispatch = useDispatch();
  const classes = useStyles();

  const { userSelectData } = useSelector((state) => ({
    userSelectData: state.userSelectData,
  }));

  let history = useHistory();
  const goToPreviousPath = () => {
    history.goBack();
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    if (selected.length === 0) {
      dispatch(
        loadToasterData("Please choose user permissions.", "error", true)
      );
      return false;
    }
    formData.append("email", data.email);
    formData.append("department", data.department);
    formData.append("permission", JSON.stringify(selected));
    formData.append("first_name", data.first_name);
    formData.append("id", data.id);
    formData.append("last_name", data.last_name);
    formData.append("mobile_number", data.mobile_number);
    formData.append("password", data.password);
    formData.append("password_confirmation", data.password_confirmation);
    if (selectedFile.name) {
      formData.append("image", selectedFile, selectedFile.name);
    }
    if (item._id) {
      dispatch(submitSubAdmin(formData, goToPreviousPath));
    } else {
      dispatch(createSubAdmin(formData, goToPreviousPath));
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

  const [selected, setSelected] = useState([]);
  const changeCheckboxAll = (e) => {
    var checked = e.target.checked;
    if (checked === true) {
      setCheckBox(true);
      var data_all = [];
      rolePermission.forEach((item) => {
        data_all.push(item);
      });
      setSelected(data_all);
      console.log("data_all ==>", data_all);
      dispatch(loadSelectData(data_all));
    } else {
      setCheckBox(false);
      dispatch(loadSelectData([]));
      setSelected([]);
    }
  };

  useEffect(() => {
    if (rolePermission.length > 0) {
      var data_all = [];
      if (item._id) {
        item.permission.forEach((roleItem) => {
          var index = rolePermission.findIndex(
            (item) => item.id === roleItem.id
          );
          if (index >= 0) {
            console.log(index);
            data_all.push(rolePermission[index]);
          }
        });
      } else {
        rolePermission.forEach((item) => {
          data_all.push(item);
        });
      }
      dispatch(loadSelectData(data_all));
      setSelected(data_all);
    }
  }, [item._id, dispatch, item.permission]);

  const setPermission = (value) => {
    setSelected(value);
    dispatch(loadSelectData(value));
    if (value.length === 0) {
      setSelected(value);
      setCheckBox(false);
    } else {
      setCheckBox(true);
    }
  };

  return (
    <Fragment>
      <MuiThemeProvider theme={formLabelsTheme}>
        <Form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
          <Row>
            <Col md={6}>
              <Form.Group controlId="formBasicFirstName">
                <TextField
                  required
                  id="outlined-first_name"
                  defaultValue={item.first_name}
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  onKeyDown={(event) => ValidateAlpha(event)}
                  className={!errors.first_name ? classes.root : "w-100"}
                  error={errors.first_name ? true : false}
                  name="first_name"
                  inputRef={register({
                    required: "Please enter your first name.",
                    minLength: {
                      value: 3,
                      message:
                        "First name should contain at least 3 characters.",
                    },
                    maxLength: {
                      value: 50,
                      message: "First name should not exceed 50 characters.",
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
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  onKeyDown={(event) => ValidateAlpha(event)}
                  className={!errors.last_name ? classes.root : "w-100"}
                  error={errors.last_name ? true : false}
                  name="last_name"
                  inputRef={register({
                    required: "Please enter your last name.",
                    minLength: {
                      value: 3,
                      message:
                        "Last name should contain at least 3 characters.",
                    },
                    maxLength: {
                      value: 50,
                      message: "last name should not exceed 50 characters.",
                    },
                  })}
                  helperText={errors.last_name && errors.last_name.message}
                />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                <TextField
                  id="outlined-email"
                  required
                  label="Email Address"
                  variant="outlined"
                  defaultValue={item.email}
                  fullWidth
                  className={!errors.email ? classes.root : "w-100"}
                  error={errors.email ? true : false}
                  name="email"
                  inputRef={register({
                    required: "Please enter your email address.",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address.",
                    },
                    maxLength: {
                      value: 50,
                      message: "Email should not exceed 50 characters.",
                    },
                    validate: {
                      isSpace: (value) =>
                        checkSpace(value) ||
                        "Remove trailing spaces from email.",
                    },
                  })}
                  helperText={errors.email && errors.email.message}
                />
              </Form.Group>
              <Form.Group controlId="formBasicNumber">
                <TextField
                  id="outlined-number"
                  required
                  label="Mobile number (123456789)"
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
                    required: "Please enter your mobile number.",
                    minLength: {
                      value: 7,
                      message:
                        "Mobile number should contain at least 7 digits.",
                    },
                    maxLength: {
                      value: 15,
                      message: "Mobile number should not exceed 15 digits.",
                    },
                  })}
                  helperText={
                    errors.mobile_number && errors.mobile_number.message
                  }
                />
              </Form.Group>
              <Form.Group controlId="formBasicLastName">
                <TextField
                  id="outlined-department"
                  required
                  defaultValue={item.department}
                  label="Department name"
                  variant="outlined"
                  fullWidth
                  className={!errors.department ? classes.root : "w-100"}
                  error={errors.department ? true : false}
                  name="department"
                  inputRef={register({
                    required: "Please enter department name.",
                    minLength: {
                      value: 3,
                      message:
                        "Department name should contain at least 3 characters.",
                    },
                    maxLength: {
                      value: 50,
                      message:
                        "Department name should not exceed 50 characters.",
                    },
                  })}
                  helperText={errors.department && errors.department.message}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              {!item._id && (
                <Form.Group controlId="formBasicPassword">
                  <TextField
                    id="outlined-password"
                    required
                    label="Password"
                    type={values.password ? "text" : "password"}
                    variant="outlined"
                    fullWidth
                    className={!errors.password ? classes.root : "w-100"}
                    error={errors.password ? true : false}
                    name="password"
                    inputRef={register({
                      required: "Please enter your password.",
                      minLength: {
                        value: 6,
                        message:
                          "Password should contain at least 6 characters.",
                      },
                      maxLength: {
                        value: 50,
                        message: "Password should not exceed 50 characters.",
                      },
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#/$%/^&/*])(?=.{8,})/,
                        message:
                          "Password should contain at least 1 Uppercase,1 Lowercase,1 Numeric and 1 special character.",
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
                    label="Confirm Password"
                    type={values.password_confirmation ? "text" : "password"}
                    variant="outlined"
                    fullWidth
                    className={
                      !errors.password_confirmation ? classes.root : "w-100"
                    }
                    error={errors.password_confirmation ? true : false}
                    name="password_confirmation"
                    inputRef={register({
                      required: "Please enter confirm password.",
                      validate: (value) =>
                        value === password.current ||
                        "New password and Confirm password do not match.",
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
                  dropzoneText={
                    "Make sure to upload a JPG/JPEG/PNG file. File size limit is 10MB."
                  }
                  filesLimit={1}
                  getDropRejectMessage={(fileObj) => {
                    if (fileObj.size > 10485760) {
                      return `File ${fileObj.name} was rejected. File is too big. Size limit is 10 MB.`;
                    } else if (
                      fileObj.type !== "image/jpeg" ||
                      fileObj.type !== "image/png"
                    ) {
                      return `File ${fileObj.name} was rejected. File type is not supported.`;
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

            <Col md={6}>
              {item._id ? (
                <Form.Group controlId="formBasicLastName">
                  <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    onChange={(event, value) => setPermission(value)}
                    value={userSelectData}
                    limitTags={5}
                    options={rolePermission}
                    groupBy={(option) => option.group}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.title}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.title}
                      </React.Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        variant="outlined"
                        label="Choose Permission"
                        placeholder="Permission"
                        name="permission"
                        value={(option) => option.id}
                      />
                    )}
                  />
                </Form.Group>
              ) : (
                <Form.Group controlId="formBasicLastName">
                  <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    onChange={(event, value) => setPermission(value)}
                    limitTags={5}
                    value={userSelectData}
                    options={rolePermission}
                    groupBy={(option) => option.group}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option.title}
                    renderOption={(option, { selected }) => (
                      <React.Fragment>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.title}
                      </React.Fragment>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        required
                        variant="outlined"
                        label="Choose Permission"
                        placeholder="Permission"
                        name="permission"
                        value={(option) => option.id}
                      />
                    )}
                  />
                </Form.Group>
              )}
            </Col>
            <Col xs={4} md={4} xl={4} xxl={4}>
              <FormControlLabel
                control={
                  <Checkbox checked={checkbox} onChange={changeCheckboxAll} />
                }
                label="Check/Uncheck All"
                labelPlacement="end"
              />
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
              <SubmitButton title={item._id ? "Update" : "Submit"} />
            </Col>
            <Col xs={2} md={3} xl={2} xxl={1}>
              <BackButton onClick={() => goToPreviousPath()} />
            </Col>
          </Row>
        </Form>
      </MuiThemeProvider>
    </Fragment>
  );
};

export default FormModal;
