import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import {
  BottomNavigation,
  BottomNavigationAction,
  Container,
  Paper,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Layout({ children }) {
  const [currentUser, setCurrentUser] = useState({});

  const navigate = useNavigate();

  return (
    <Container>
      {children}
      <Paper
        sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <BottomNavigation showLabels>
          <BottomNavigationAction
            label="Home"
            icon={<HomeIcon />}
            onClick={() => {
              navigate("/");
            }}
          />
          <BottomNavigationAction
            label="Favorites"
            icon={<FavoriteIcon />}
            onClick={() => {
              navigate("/favorites");
            }}
          />
          <BottomNavigationAction
            label={currentUser === null ? "Account" : "User"}
            icon={currentUser === null ? <AccountBoxIcon /> : <PersonIcon />}
            onClick={() => {
              navigate(currentUser === null ? "accounts" : "auth/login");
            }}
          />
        </BottomNavigation>
      </Paper>
    </Container>
  );
}
