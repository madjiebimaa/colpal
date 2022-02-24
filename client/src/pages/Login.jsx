import {
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [usernameOrEmail, setUsernameOrEmail] = useState("");

  const navigate = useNavigate();

  const handleFieldChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleLoginClick = async () => {
    try {
      if (usernameOrEmail.includes("@")) {
        setUser({ ...user, username: "" });
      } else {
        setUser({ ...user, email: "" });
      }

      const res = await axios({
        method: "GET",
        url: "http://localhost:8080/api/users",
        data: user,
      });
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Grid item container justifyContent="center" justifyItems="center">
        <Typography
          variant="h4"
          component="h2"
          textAlign="center"
          sx={{ mt: 3 }}
        >
          login
        </Typography>
        <Grid container justifyContent="center" sx={{ mt: 10 }}>
          <Grid item>
            <Stack direction="column" spacing={2} sx={{ m: 2 }}>
              <TextField
                type={usernameOrEmail.includes("@") ? "email" : "text"}
                name={usernameOrEmail.includes("@") ? "email" : "username"}
                label="username/email"
                required
                onChange={(e) => {
                  setUsernameOrEmail(e.target.value);
                  handleFieldChange(e);
                }}
              />
              <TextField
                type="password"
                name="password"
                label="password"
                required
                onChange={(e) => {
                  handleFieldChange(e);
                }}
              />
              <Button
                type="submit"
                size="small"
                onClick={() => handleLoginClick()}
              >
                login
              </Button>
              <Divider />
              <Grid container justifyContent="end">
                <Grid item>
                  <Button
                    size="small"
                    onClick={() => navigate("/auth/register")}
                  >
                    register
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
