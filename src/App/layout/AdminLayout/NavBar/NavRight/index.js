import React, { useEffect, useState, Fragment } from "react";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../../../../../actions/userActions";
import * as notificationActions from "../../../../../actions/notificationActions";
import Aux from "../../../../../hoc/_Aux";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Badge from "@material-ui/core/Badge";
import NotificationsIcon from "@material-ui/icons/Notifications";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import { useHistory, useLocation } from "react-router-dom";
import English from "../../../../../assets/images/english.svg";
import Arabic from "../../../../../assets/images/arabic.svg";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useTranslation } from "react-i18next";
import { checkPermission } from "../../../../../utils/helpers";
import { SETTING } from "../../../../../utils/permission";
import { useDispatch } from "react-redux";
import { setRtl, setLanguage } from "../../../../../actions/baseActions";
const { REACT_APP_APP_NAME } = process.env;

const NavRight = (props) => {
  const { superUserInfo, actions, notificationCount, language } = props;
  let history = useHistory();
  const { i18n } = useTranslation();
  const { pathname } = useLocation();
  const [dialog, setDialog] = useState(false);
  const handleLogoutClick = (e) => {
    e.preventDefault();
    setDialog(true);
  };

  const handleClose = (action) => {
    if (action) {
      actions.userLogout(history);
    }
    setDialog(action);
  };

  useEffect(() => {
    actions.getNotification();
    actions.getLanguage();
  }, [actions]);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const changeLanguage = (event) => {
    setAnchorEl(null);
    var lng = event;
    i18n.changeLanguage(lng);
    var str = pathname;
    if (str.search("en") === 1) {
      const newUrl = pathname.replace("en", "ar");
      window.location.href = `/admin${newUrl}`;
    } else if (str.search("ar") === 1) {
      const newUrl = pathname.replace("ar", "en");
      window.location.href = `/admin${newUrl}`;
    } else if (str.search("en") === -1) {
      var url = lng + pathname;
      window.location.href = `/admin/${url}`;
    }
    document.documentElement.setAttribute("lang", lng);
    // if (lng === "ar") {
    //   document.getElementsByTagName("HTML")[0].setAttribute("dir", "rtl");
    //   document.getElementsByTagName("HTML")[0].classList.add("arabic");
    // } else {
    //   document.getElementsByTagName("HTML")[0].setAttribute("dir", "ltr");
    //   document.getElementsByTagName("HTML")[0].classList.remove("arabic");
    // }
  };
  const dispatch = useDispatch();
  const { REACT_APP_DEFAULT_LANG } = process.env;

  useEffect(() => {
    const lang = pathname.split("/")[1];
    if (lang === "en" || lang === "ar") {
      i18n.changeLanguage(lang);
      dispatch(setLanguage(lang));
    } else {
      dispatch(setRtl(false));
      i18n.changeLanguage(REACT_APP_DEFAULT_LANG);
      dispatch(setLanguage(REACT_APP_DEFAULT_LANG));
    }
    if (lang === "ar") {
      dispatch(setRtl(true));
      //document.getElementsByTagName("HTML")[0].setAttribute("dir", "rtl");
      //document.getElementsByTagName("HTML")[0].classList.add("arabic");
    } else {
      dispatch(setRtl(false));
      //document.getElementsByTagName("HTML")[0].setAttribute("dir", "ltr");
      //document.getElementsByTagName("HTML")[0].classList.remove("arabic");
    }
  }, [pathname, i18n, dispatch, REACT_APP_DEFAULT_LANG]);

  return (
    <>
      <Aux>
        <ul className="navbar-nav ml-auto">
          <li className="user_detail_outer">
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              {language === "ar" ? (
                <Fragment>
                  <img src={Arabic} alt="Arabic" />
                </Fragment>
              ) : (
                <Fragment>
                  <img src={English} alt="English" /> &nbsp;
                </Fragment>
              )}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => changeLanguage("en")}>
                <img src={English} alt="English" />
                &nbsp;English
              </MenuItem>
              <MenuItem onClick={() => changeLanguage("ar")}>
                <img src={Arabic} alt="Arabic" />
                &nbsp;Arabic
              </MenuItem>
            </Menu>
          </li>
          <li>
            <Link to="/notification">
              <Badge badgeContent={notificationCount} color="error">
                <NotificationsIcon />
              </Badge>
            </Link>
          </li>

          <li className="user_detail_outer">
            <Dropdown className="drp-user">
              <Dropdown.Toggle variant={"link"} id="dropdown-basic">
                <Avatar
                  alt={superUserInfo.first_name}
                  src={superUserInfo.image}
                />
                <figcaption className="user_detail">
                  {superUserInfo.first_name && (
                    <strong>
                      {superUserInfo.first_name.charAt(0).toUpperCase() +
                        superUserInfo.first_name.slice(1) +
                        " " +
                        superUserInfo.last_name.charAt(0).toUpperCase() +
                        superUserInfo.last_name.slice(1)}
                    </strong>
                  )}
                  <small>Welcome in {REACT_APP_APP_NAME}</small>
                </figcaption>
              </Dropdown.Toggle>
              <Dropdown.Menu alignRight className="profile-notification">
                <ul className="pro-body">
                  {checkPermission(superUserInfo, SETTING) && (
                    <li>
                      <Link
                        to="/setting"
                        title="setting"
                        className="dropdown-item"
                      >
                        <i className="feather icon-settings" /> Settings
                      </Link>
                    </li>
                  )}
                  <li>
                    <Link
                      to="/account/profile"
                      title="setting"
                      className="dropdown-item"
                    >
                      <i className="feather icon-user" /> Account
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      title="setting"
                      className="dropdown-item"
                      onClick={handleLogoutClick}
                    >
                      <i className="feather icon-lock" /> Logout
                    </Link>
                  </li>
                </ul>
              </Dropdown.Menu>
            </Dropdown>
          </li>
        </ul>
      </Aux>
      <div>
        <Dialog
          open={dialog}
          onClose={handleClose}
          fullWidth={true}
          maxWidth={"xs"}
        >
          <DialogTitle id="alert-dialog-title">Account Logout</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure, you want to logout?
            </DialogContentText>
          </DialogContent>
          <DialogActions className="pr-3">
            <Button
              onClick={() => handleClose(true)}
              color="primary"
              autoFocus
              variant="contained"
            >
              Yes
            </Button>
            <Button onClick={() => handleClose(false)} variant="contained">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    superUserInfo: state.superUserInfo,
    notificationCount: state.notificationCount,
    language: state.language,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      Object.assign(userActions, notificationActions),
      dispatch
    ),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(NavRight);
