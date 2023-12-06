import React, { useState } from "react";
import { Tooltip, Zoom, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { date } from "../../utils/helpers";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import LockOpenSharpIcon from "@material-ui/icons/LockOpenSharp";
import Switch from "../../Component/Switch";
import { checkPermission } from "../../utils/helpers";
import {
  subAdminEdit,
  subAdminChangePassword,
  subAdminDelete,
} from "../../utils/permission";
import { useSelector } from "react-redux";

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
  const { superUserInfo } = useSelector((state) => ({
    superUserInfo: state.superUserInfo,
  }));
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

  return (
    <>
      <tr key={state} className="itemListing">
        <td>{item.first_name + " " + item.last_name}</td>
        <td>{item.email}</td>
        <td>{date(item.created_at)}</td>
        <td>
          {checkPermission(superUserInfo, subAdminEdit) && (
            <>
              <Switch item={item} onChange={handleChange} />
              <Tooltip
                title="Edit"
                arrow
                placement="top"
                TransitionComponent={Zoom}
                onClick={() => handleClick(item, true)}
              >
                <Fab variant="extended" size="small" className={classes.margin}>
                  <EditIcon fontSize="small" />
                </Fab>
              </Tooltip>
            </>
          )}
          {checkPermission(superUserInfo, subAdminChangePassword) && (
            <Tooltip
              title="Change Password"
              arrow
              placement="top"
              TransitionComponent={Zoom}
              onClick={() => handleChangePasswordClick(item, true)}
            >
              <Fab variant="extended" size="small" className={classes.margin}>
                <LockOpenSharpIcon fontSize="small" />
              </Fab>
            </Tooltip>
          )}
          {checkPermission(superUserInfo, subAdminDelete) && (
            <Tooltip
              title="Delete"
              arrow
              placement="top"
              TransitionComponent={Zoom}
              onClick={handleDeleteClick}
            >
              <Fab variant="extended" size="small" className={classes.margin}>
                <DeleteIcon fontSize="small" />
              </Fab>
            </Tooltip>
          )}
        </td>
      </tr>
    </>
  );
};

export default List;
