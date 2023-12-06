import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CardContent from "@material-ui/core/CardContent";
import CloseIcon from "@mui/icons-material/Close";
import Card from "@material-ui/core/Card";
import { red } from "@material-ui/core/colors";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Form, Row, Col } from "react-bootstrap";
import SubmitButton from "../../Component/Button";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { addWalletBalance, getWalletData } from "../../actions/customerActions";
import { loadRequestData } from "../../actions/baseActions";
import { rtlTheme, ltrTheme } from "../../utils/helpers";
import { checkNumberAmount } from "../../utils/helpers";
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

const AddWalletDetails = (props) => {
  const { open, onHide, userData } = props;

  const { t } = useTranslation();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isRtl } = useSelector((state) => ({
    isRtl: state.isRtl,
  }));
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => {
    data.user_id = userData._id;
    data.getWalletType = getWalletType;
    dispatch(addWalletBalance(data, returnSuccess));
  };
  const returnSuccess = () => {
    var request = {};
    request.id = userData._id;
    dispatch(getWalletData(request, setWalletData));
    props.onHide(false);
  };

  const setWalletData = (item) => {
    dispatch(loadRequestData(item));
  };
  const [getWalletType, setWalletType] = useState("");
  const handleType = (event, value) => {
    setWalletType(value.label);
  };
  const typeWallet = [{ label: "CREDIT" }, { label: "DEBIT" }];
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
              {t("ADD_WALLET")}
            </BootstrapDialogTitle>

            <DialogContent dividers>
              <Card className={classes.root}>
                <CardContent>
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
                            label={t("WALLET_AMOUNT")}
                            variant="outlined"
                            fullWidth
                            onKeyDown={(event) => checkNumberAmount(event)}
                            className={!errors.amount ? classes.root : "w-100"}
                            error={errors.amount ? true : false}
                            name="amount"
                            inputRef={register({
                              required: t("WALLET_AMOUNT_REQUIRED"),
                              minLength: {
                                value: 1,
                                message: t("WALLET_MIN_LENGTH"),
                              },
                              maxLength: {
                                value: 5,
                                message: t("WALLET_MAX_LENGTH"),
                              },
                            })}
                            helperText={errors.amount && errors.amount.message}
                          />
                        </Form.Group>

                        <Form.Group controlId="formBasicCountry">
                          <Autocomplete
                            freeSolo
                            id="free-solo-2sc-demo"
                            disableClearable
                            options={typeWallet}
                            className="country-select"
                            getOptionLabel={(option) => option.label}
                            onChange={handleType}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label={t("WALLET_TYPE")}
                                margin="normal"
                                variant="outlined"
                                fullWidth
                                error={errors.type ? true : false}
                                name="type"
                                InputProps={{
                                  ...params.InputProps,
                                  type: "search",
                                }}
                                inputRef={register({
                                  required: t("WALLET_TYPE_REQUIRED"),
                                })}
                                helperText={errors.type && errors.type.message}
                              />
                            )}
                          />
                        </Form.Group>
                        <SubmitButton title={t("SUBMIT")} />
                      </Col>
                      <Col md={6}>
                        <Form.Group controlId="formBasicFirstName">
                          <TextField
                            required
                            id="outlined-first_name"
                            label={t("WALLET_DESCRIPTION")}
                            variant="outlined"
                            minRows="5"
                            multiline={true}
                            fullWidth
                            className={
                              !errors.description ? classes.root : "w-100"
                            }
                            error={errors.description ? true : false}
                            name="description"
                            inputRef={register({
                              required: t("WALLET_DESCRIPTION_REQUIRED"),
                            })}
                            helperText={
                              errors.description && errors.description.message
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </CardContent>
              </Card>
            </DialogContent>
          </BootstrapDialog>
        </ThemeProvider>
      </StylesProvider>
    </Fragment>
  );
};

export default AddWalletDetails;
