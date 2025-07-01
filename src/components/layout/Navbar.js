import React, { useState } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "../../TranslationContext";
import UserProfile from "./UserProfile";
import logo from "../../logo.svg";

const languageOptions = [
  { key: "en", value: "en", text: "English" },
  { key: "es", value: "es", text: "Spanish" },
  { key: "hi", value: "hi", text: "हिन्दी" },
  { key: "te", value: "te", text: "తెలుగు" },
  { key: "ta", value: "ta", text: "தமிழ்" },
  { key: "ml", value: "ml", text: "മലയാളം" },
  { key: "kn", value: "kn", text: "ಕನ್ನಡ" },
  { key: "ur", value: "ur", text: "اردو" },
  { key: "bn", value: "bn", text: "বাংলা" },
  { key: "ne", value: "ne", text: "नेपाली" },
];

function Navbar() {
  const { t, language, setLanguage } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const handleLanguageChange = (e, { value }) => {
    setSelectedLanguage(value);
    setLanguage(value);
  };

  return (
    <Menu borderless fixed="top">
      <Menu.Item>
        <Menu.Header style={{ marginRight: "25px" }}>
          <img src={logo} alt="logo" />
        </Menu.Header>
      </Menu.Item>
      <Menu.Item as={Link} to="/" content={t("home")} />
      <Menu.Item as={NavLink} to="/recipes" content={t("recipes")} />
      <Menu.Item as={NavLink} to="/submit" content={t("addRecipe")} />
      <Menu.Menu position="right">
        <Dropdown
          selection
          options={languageOptions}
          value={selectedLanguage}
          onChange={handleLanguageChange}
          compact
          style={{ marginTop: "10px", marginRight: "10px" }}
        />
        <UserProfile />
      </Menu.Menu>
    </Menu>
  );
}

export default Navbar;
