import React, { useCallback, useEffect, useState } from "react";
// import './pages/strategy'
import { Settings } from "@mui/icons-material";
import {
  FormControlLabel,
  FormGroup,
  IconButton,
  Menu,
  MenuItem,
  Switch,
} from "@mui/material";
import { useOptionStore } from "../../store/OptionStore";

const SettingsComponent = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { options, updateOption } = useOptionStore();

  const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const onChangeOptionSwitch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      updateOption({ ...options, [event.target.name]: event.target.checked });
    },
    [updateOption, options],
  );

  return (
    <>
      <IconButton
        aria-label="settings-button"
        aria-controls={open ? "settings-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClickMenu}>
        <Settings />
      </IconButton>
      <Menu
        id="settings-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleCloseMenu}
        MenuListProps={{
          "aria-labelledby": "settings-button",
        }}>
        <FormGroup>
          <MenuItem>
            <FormControlLabel
              control={
                <Switch
                  name="minimumView"
                  checked={options.minimumView}
                  onChange={onChangeOptionSwitch}
                />
              }
              // labelPlacement="end"
              label="Minimum View"></FormControlLabel>
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              control={
                <Switch
                  name="showSkillDetails"
                  checked={options.showSkillDetails}
                  onChange={onChangeOptionSwitch}
                />
              }
              // labelPlacement="end"
              label="Skill Details"></FormControlLabel>
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              control={
                <Switch
                  name="showMyTeam"
                  checked={options.showMyTeam}
                  onChange={onChangeOptionSwitch}
                />
              }
              // labelPlacement="end"
              label="Show MyTeam"></FormControlLabel>
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              control={
                <Switch
                  name="showOpponent"
                  checked={options.showOpponent}
                  onChange={onChangeOptionSwitch}
                />
              }
              // labelPlacement="end"
              label="Show Opponent"></FormControlLabel>
          </MenuItem>
        </FormGroup>
      </Menu>
    </>
  );
};

export default SettingsComponent;
