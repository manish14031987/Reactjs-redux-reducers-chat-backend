import React, { useState } from "react";
import { Tooltip, Zoom, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { date } from "../../utils/helpers";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import LockOpenSharpIcon from "@material-ui/icons/LockOpenSharp";
import Switch from "../../Component/Switch";
import { Stack, Typography, Box, Avatar, Chip } from "@mui/material";
import PreviewIcon from "@material-ui/icons/Visibility";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import SecurityUpdateWarningIcon from "@mui/icons-material/SecurityUpdateWarning";
import NotesIcon from "@mui/icons-material/Notes";
import { useTranslation } from "react-i18next";
const { REACT_APP_COUNTRY_CODE } = process.env;

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const List = (props) => {
  const { item } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  const handleClick = (item, action) => {
    props.handleFormClick(item, action);
  };
  const handleChangePasswordClick = (item, action) => {
    props.handlePasswordClick(item, action);
  };
  const [state, setState] = useState({
    status: item.status,
  });

  const handleChange = (params) => {
    props.handleSwitchClick(params);
    setState({
      ...props.item.status,
      [params.name]: params.status,
    });
  };
  const handleDeleteClick = () => {
    props.handleDeleteClick(item);
  };

  const handleViewClick = () => {
    props.handleViewClick(item);
  };

  const handleViewWalletClick = () => {
    props.handleViewWalletClick(item);
  };

  const handleClickSecurity = () => {
    props.handleClickSecurity(item);
  };
  const handleViewUserNotes = () => {
    props.handleViewUserNotes(item);
  };

  return (
    <>
      <tr key={state} className="itemListing">
        <td className="cursor-pointer" onChange={handleChange}>
          <Box sx={{ pr: 1, display: "flex" }}>
            <Avatar variant="rounded" src={item.image} />
            <Stack sx={{ pl: 1 }}>
              <Typography
                fontWeight={700}
              >{`${item.first_name} ${item.last_name}`}</Typography>
            </Stack>
          </Box>
        </td>
        <td>
          {t("U")}
          {item.userId}
        </td>
        <td>{item.email}</td>
        <td>
          {REACT_APP_COUNTRY_CODE}-{item.mobile_number}
        </td>
        <td>{item.dob ? date(item.dob) : "N/A"}</td>
        <td>{date(item.created_at)}</td>
        <td className="userLabel">
          <Chip
            label={item.status ? t("PUBLISHED") : t("BLOCKED")}
            color={item.status ? t("DOFFO_SUCCESS") : t("DOFFO_ERROR")}
            size="small"
          />
        </td>
        <td>
          <Switch item={item} onChange={handleChange} />
          <Tooltip
            title={t("CUSTOMER_VIEW_BUTTON_TITLE")}
            arrow
            placement="top"
            TransitionComponent={Zoom}
            onClick={handleViewClick}
          >
            <Fab variant="extended" size="small" className={classes.margin}>
              <PreviewIcon fontSize="small" />
            </Fab>
          </Tooltip>
          <Tooltip
            title={t("CUSTOMER_WALLET_BUTTON_TITLE")}
            arrow
            placement="top"
            TransitionComponent={Zoom}
            onClick={handleViewWalletClick}
          >
            <Fab variant="extended" size="small" className={classes.margin}>
              <AccountBalanceWalletIcon fontSize="small" />
            </Fab>
          </Tooltip>
          <Tooltip
            title={t("CUSTOMER_EDIT_BUTTON_TITLE")}
            arrow
            placement="top"
            TransitionComponent={Zoom}
            onClick={() => handleClick(item, true)}
          >
            <Fab variant="extended" size="small" className={classes.margin}>
              <EditIcon fontSize="small" />
            </Fab>
          </Tooltip>
          <Tooltip
            title={t("CUSTOMER_CHANGE_PASSWORD_BUTTON_TITLE")}
            arrow
            placement="top"
            TransitionComponent={Zoom}
            onClick={() => handleChangePasswordClick(item, true)}
          >
            <Fab variant="extended" size="small" className={classes.margin}>
              <LockOpenSharpIcon fontSize="small" />
            </Fab>
          </Tooltip>
          <Tooltip
            title={t("CUSTOMER_DELETE_BUTTON_TITLE")}
            arrow
            placement="top"
            TransitionComponent={Zoom}
            onClick={handleDeleteClick}
          >
            <Fab variant="extended" size="small" className={classes.margin}>
              <DeleteIcon fontSize="small" />
            </Fab>
          </Tooltip>
          <Tooltip
            title={t("CUSTOMER_WARNING_BUTTON_TITLE")}
            arrow
            placement="top"
            TransitionComponent={Zoom}
            onClick={handleClickSecurity}
          >
            <Fab variant="extended" size="small" className={classes.margin}>
              <SecurityUpdateWarningIcon fontSize="small" />
            </Fab>
          </Tooltip>
          <Tooltip
            title="Warning"
            arrow
            placement="top"
            TransitionComponent={Zoom}
            onClick={handleViewUserNotes}
          >
            <Fab variant="extended" size="small" className={classes.margin}>
              <NotesIcon fontSize="small" />
            </Fab>
          </Tooltip>
        </td>
      </tr>
    </>
  );
};

export default List;
