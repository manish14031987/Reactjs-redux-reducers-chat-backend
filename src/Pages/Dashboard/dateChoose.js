import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import { Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateRangeIcon from "@material-ui/icons/DateRange";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import DateFnsUtils from "@date-io/date-fns";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import { useLocation } from "react-router-dom";
const queryString = require("query-string");

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
  root: {
    background: "linear-gradient(45deg, #0f4f7c 20%, #33a7cc 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
  },
  label: {
    textTransform: "capitalize",
  },
}));

const DateFilter = (props) => {
  const { open, handleClose, onSearch } = props;
  const classes = useStyles();
  const { handleSubmit } = useForm();
  const [fromDate, handleFromDateChange] = useState(null);
  const [toDate, handleToDateChange] = useState(null);
  const location = useLocation();

  const handleCloseAction = () => {
    handleClose(false);
  };

  const onSubmit = () => {
    const params = {};
    if (fromDate) {
      params.from = fromDate;
    }
    if (toDate) {
      params.to = toDate;
    }
    var size = Object.keys(params).length;
    if (size === 0) {
      return false;
    }

    params.search = true;
    onSearch(params);
  };

  const handleClickDate = (date, type) => {
    if (type === "from") {
      handleFromDateChange(date);
    } else if (type === "to") {
      handleToDateChange(date);
    }
  };

  const renderInputFromDate = (props) => (
    <TextField
      type="text"
      onClick={props.onClick}
      value={props.value}
      className="w-100"
      id="outlined-formDate"
      label="Created From"
      variant="outlined"
      size={"small"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            {fromDate && (
              <IconButton onClick={() => handleFromDateChange(null)}>
                <HighlightOffIcon />
              </IconButton>
            )}
            <IconButton onClick={props.onClick}>
              <DateRangeIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );

  const renderInputToDate = (props) => (
    <TextField
      type="text"
      onClick={props.onClick}
      value={props.value}
      onChange={props.onChange}
      className="w-100"
      id="outlined-ToDate"
      label="Created To"
      variant="outlined"
      size={"small"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            {toDate && (
              <IconButton onClick={() => handleToDateChange(null)}>
                <HighlightOffIcon />
              </IconButton>
            )}
            <IconButton onClick={props.onClick}>
              <DateRangeIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryStringParsed = queryString.parse(location.search);

    if (params.get("from")) {
      var from = queryStringParsed["from"];
      handleFromDateChange(from);
    }
    if (params.get("to")) {
      var to = queryStringParsed["to"];
      handleToDateChange(to);
    }
  }, [location]);

  return (
    <Fragment>
      <BootstrapDialog
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth={"md"}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleCloseAction}
        >
          Choose Date Filter
        </BootstrapDialogTitle>

        <DialogContent dividers>
          <Form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <Row className="dashboard_row_change">
              <Col md={4} className="mb-2">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    autoOk
                    clearable={fromDate ? true : false}
                    disableFuture
                    format="yyyy-MM-dd"
                    id="date-picker-inline"
                    className="w-100"
                    value={fromDate}
                    size={"small"}
                    onChange={(date) =>
                      handleClickDate(
                        date
                          ? moment(new Date(date)).format("YYYY-MM-DD")
                          : null,
                        "from"
                      )
                    }
                    TextFieldComponent={renderInputFromDate}
                  />
                </MuiPickersUtilsProvider>
              </Col>
              <Col md={4} className="mb-2">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    autoOk
                    clearable={toDate ? true : false}
                    disableFuture
                    format="yyyy-MM-dd"
                    id="date-picker-inline"
                    className="w-100"
                    label="To (Created  At)"
                    value={toDate}
                    size={"small"}
                    onChange={(date) =>
                      handleClickDate(
                        date
                          ? moment(new Date(date)).format("YYYY-MM-DD")
                          : null,
                        "to"
                      )
                    }
                    TextFieldComponent={renderInputToDate}
                  />
                </MuiPickersUtilsProvider>
              </Col>
              <Col md={3} className="mb-2">
                <Button
                  variant="contained"
                  color="default"
                  className="mr-3"
                  classes={{
                    root: classes.root,
                    label: classes.label,
                  }}
                  type="submit"
                  startIcon={<SearchIcon />}
                >
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </DialogContent>
      </BootstrapDialog>
    </Fragment>
  );
};

export default DateFilter;
