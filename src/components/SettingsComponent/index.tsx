import React, { MouseEvent, useCallback, useEffect, useState } from "react";
// import './pages/strategy'
import { Settings } from "@mui/icons-material";
import {
  Box,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Menu,
  MenuItem,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useOptionStore } from "../../store/OptionStore";
import { Languages } from "../../models/Options";

const SettingsComponent = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { options, updateOption } = useOptionStore();

  const [selectedLanguage, setSelectedLanguage] = useState<Languages>(
    Languages.KR,
  );

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

  const onClickChangeLanguageToggle = useCallback(
    (event: MouseEvent<HTMLElement>, newLanguage: Languages) => {
      setSelectedLanguage(newLanguage);
      updateOption({ ...options, language: newLanguage });
    },
    [selectedLanguage, updateOption, options],
  );

  const onClickMuteAllToggle = useCallback(() => {
    updateOption({ ...options, muteAll: !options.muteAll });
  }, [options, updateOption]);

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
          <MenuItem>
            <FormControlLabel
              control={
                <Switch
                  name="showSpells"
                  checked={options.showSpells}
                  onChange={onChangeOptionSwitch}
                />
              }
              // labelPlacement="end"
              label="Show Spells"></FormControlLabel>
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              control={
                <Switch
                  name="showPositions"
                  checked={options.showPositions}
                  onChange={onChangeOptionSwitch}
                />
              }
              // labelPlacement="end"
              label="Show Positions"></FormControlLabel>
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              control={
                <Switch
                  name="alarmSound"
                  checked={options.alarmSound}
                  onChange={onChangeOptionSwitch}
                />
              }
              // labelPlacement="end"
              label="Alarm Sound"></FormControlLabel>
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              control={
                <Switch
                  name="minimapAlertSound"
                  checked={options.minimapAlertSound}
                  onChange={onChangeOptionSwitch}
                />
              }
              // labelPlacement="end"
              label="Minimap Check Sound"></FormControlLabel>
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              control={
                <Switch
                  name="newWaveCreationSound"
                  checked={options.newWaveCreationSound}
                  onChange={onChangeOptionSwitch}
                />
              }
              // labelPlacement="end"
              label="New Wave Creation Alert Sound"></FormControlLabel>
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              control={
                <Switch
                  name="gameReminderAlertSound"
                  checked={options.gameReminderAlertSound}
                  onChange={onChangeOptionSwitch}
                />
              }
              // labelPlacement="end"
              label="Game Reminder Alert Sound"></FormControlLabel>
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              control={
                <Switch
                  name="testMode"
                  checked={options.testMode}
                  onChange={onChangeOptionSwitch}
                />
              }
              // labelPlacement="end"
              label="Test mode"></FormControlLabel>
          </MenuItem>
          <MenuItem>
            <FormControlLabel
              control={
                <Switch
                  name="darkMode"
                  checked={options.darkMode}
                  onChange={onChangeOptionSwitch}
                />
              }
              // labelPlacement="end"
              label="Dark mode"></FormControlLabel>
          </MenuItem>
        </FormGroup>
        <Divider variant="middle" />
        <Box sx={{ my: 1, display: "flex", justifyContent: "center" }}>
          <ToggleButtonGroup
            value={selectedLanguage}
            exclusive
            onChange={onClickChangeLanguageToggle}
            aria-label="change language">
            <ToggleButton
              color="primary"
              value={Languages.KR}
              aria-label="korean">
              KOREAN
            </ToggleButton>
            <ToggleButton
              color="primary"
              value={Languages.EN}
              aria-label="english">
              ENGLISH
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
        <Divider variant="middle" />
        <Box sx={{ my: 1, display: "flex", justifyContent: "center" }}>
          {/* <ToggleButtonGroup
            value={options.muteAll}
            // selected={options.muteAll}
            exclusive
            onChange={onClickMuteAllToggle}
            aria-label="mute-all"> */}
          <ToggleButton
            color="primary"
            sx={{ width: "80%" }}
            value={options.muteAll}
            selected={options.muteAll}
            //  exclusive
            onChange={onClickMuteAllToggle}
            // value={options.muteAll}
            aria-label="mute-all">
            MUTE ALL
          </ToggleButton>

          {/* </ToggleButtonGroup> */}
        </Box>
      </Menu>
    </>
  );
};

export default SettingsComponent;
