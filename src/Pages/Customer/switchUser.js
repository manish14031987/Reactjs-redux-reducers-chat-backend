import React, { useState } from "react";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
const Index = (props) => {
  const { item, type, status } = props;

  const IOSSwitch = withStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: 0,
    },
    switchBase: {
      padding: 1,
      "&$checked": {
        transform: "translateX(16px)",
        color: theme.palette.common.white,
        "& + $track": {
          backgroundColor: "#0f4f7c",
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: "#0f4f7c",
        border: "6px solid #0f4f7c",
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.error.dark[400]}`,
      backgroundColor: theme.palette.error.dark[50],
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Switch
        focusVisibleClassName={classes.focusVisible}
        disableRipple
        classes={{
          root: classes.root,
          switchBase: classes.switchBase,
          thumb: classes.thumb,
          track: classes.track,
          checked: classes.checked,
        }}
        {...props}
      />
    );
  });
  const [getSwitchStatus, setSwitchStatus] = useState(status);
  const handleChange = (event) => {
    var params = item;
    params.status = event.target.checked;
    params.statusTitle = event.target.name;
    params.type = type;
    setSwitchStatus(event.target.checked);
    props.onChange(params);
  };

  return (
    <FormControlLabel
      control={
        <IOSSwitch
          checked={getSwitchStatus}
          onChange={handleChange}
          name="status"
        />
      }
    />
  );
};

export default Index;
