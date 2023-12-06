import React, { useEffect, useState, Fragment } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { red } from "@material-ui/core/colors";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Table } from "react-bootstrap";
import { date } from "../../utils/helpers";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Form, Row, Col } from "react-bootstrap";
import SubmitButton from "../../Component/Button";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { rtlTheme, ltrTheme } from "../../utils/helpers";
import {
  addNotes,
  loadNotesData,
  deleteNotes,
} from "../../actions/customerActions";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import rtl from "jss-rtl";
import { create } from "jss";
import {
  StylesProvider,
  jssPreset,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

const WalletDetails = (props) => {
  const { open, onHide, userData } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isRtl } = useSelector((state) => ({
    isRtl: state.isRtl,
  }));
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => {
    data.user_id = userData._id;
    data.getDriverType = getDriverType;
    dispatch(addNotes(data, returnSuccess));
  };
  const returnSuccess = () => {
    const request = { id: userData._id };
    dispatch(loadNotesData(request, returnNotes));
  };
  const classes = useStyles();
  const scales = [
    { label: "0" },
    { label: "1" },
    { label: "2" },
    { label: "3" },
    { label: "4" },
    { label: "5" },
  ];
  const [getDriverType, setDriverType] = useState("");
  const handleType = (event, value) => {
    setDriverType(value.label);
  };
  const handleDeleteNote = (e, id) => {
    const requests = { id: id };
    dispatch(deleteNotes(requests, returnSuccessDelete));
  };
  const returnSuccessDelete = () => {
    const request = { id: userData._id };
    dispatch(loadNotesData(request, returnNotes));
  };
  useEffect(() => {
    const request = { id: userData._id };
    dispatch(loadNotesData(request, returnNotes));
  }, [dispatch, userData._id]);
  const [getDataNotes, setNotesAllData] = useState([]);
  const returnNotes = (data) => {
    setNotesAllData(data);
  };

  return (
    <Fragment>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={isRtl ? rtlTheme : ltrTheme}>
          <BootstrapDialog
            aria-labelledby="customized-dialog-title"
            open={open}
            fullWidth={true}
            maxWidth={"lg"}
            dir={isRtl ? "rtl" : "ltr"}
          >
            <BootstrapDialogTitle
              id="customized-dialog-title"
              onClose={() => onHide(false)}
            >
              {t("CUSTOMER_NOTES")}
            </BootstrapDialogTitle>

            <DialogContent dividers>
              <Form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                autoComplete="off"
                dir={isRtl ? "rtl" : "ltr"}
              >
                <Row className="notes-class">
                  <Col md={6}>
                    <Form.Group controlId="formBasicFirstName">
                      <TextField
                        required
                        id="outlined-first_name"
                        label={t("NOTES_TITLE")}
                        variant="outlined"
                        fullWidth
                        className={!errors.title ? classes.root : "w-100"}
                        error={errors.title ? true : false}
                        name="title"
                        inputRef={register({
                          required: t("NOTES_REQUIRED"),
                          minLength: {
                            value: 3,
                            message: t("NOTES_MIN_LENGTH"),
                          },
                          maxLength: {
                            value: 50,
                            message: t("NOTES_MAX_LENGTH"),
                          },
                        })}
                        helperText={errors.title && errors.title.message}
                      />
                    </Form.Group>
                    <Form.Group controlId="formBasicCountry">
                      <Autocomplete
                        freeSolo
                        id="free-solo-2sc-demo"
                        disableClearable
                        options={scales}
                        className="country-select"
                        getOptionLabel={(option) => option.label}
                        onChange={handleType}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={t("NOTES_SCALE")}
                            margin="normal"
                            variant="outlined"
                            fullWidth
                            error={errors.scale ? true : false}
                            name="scale"
                            InputProps={{
                              ...params.InputProps,
                              type: "search",
                            }}
                            inputRef={register({
                              required: "Scale is required..",
                            })}
                            helperText={errors.scale && errors.scale.message}
                          />
                        )}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="formBasicFirstName">
                      <TextField
                        required
                        id="outlined-first_name"
                        label={t("NOTES_DESCRIPTION")}
                        variant="outlined"
                        minRows="5"
                        multiline={true}
                        fullWidth
                        className={!errors.description ? classes.root : "w-100"}
                        error={errors.description ? true : false}
                        name="description"
                        inputRef={register({
                          required: t("NOTES_DESCRIPTION_REQUIRED"),
                        })}
                        helperText={
                          errors.description && errors.description.message
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <SubmitButton title={t("SUBMIT")} />
                  </Col>
                </Row>
              </Form>
            </DialogContent>

            <DialogContent dividers>
              {getDataNotes.length > 0 && getDataNotes && (
                <Table striped hover responsive className="notes-get-cs">
                  <thead>
                    <tr>
                      <th style={{ width: "15%" }}>{t("NOTES_TITLE")}</th>
                      <th style={{ width: "10%" }}>{t("NOTES_SCALE_TITLE")}</th>
                      <th style={{ width: "50%" }}>{t("NOTES_DESCRIPTION")}</th>
                      <th style={{ width: "15%" }}>{t("NOTES_DATE")}</th>
                      <th style={{ width: "10%" }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getDataNotes.map((item, key) => (
                      <tr key={key}>
                        <td>{item.title}</td>
                        <td>{item.scale}</td>
                        <td>
                          <p>{item.description}</p>
                        </td>
                        <td>{date(item.created_at)}</td>
                        <td>
                          <DeleteForeverIcon
                            onClick={(e) => handleDeleteNote(e, item._id)}
                            className="delete-button-notes"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </DialogContent>
          </BootstrapDialog>
        </ThemeProvider>
      </StylesProvider>
    </Fragment>
  );
};

export default WalletDetails;
