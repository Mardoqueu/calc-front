import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { createUser } from "../../services/api";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";

import { styled } from "@mui/material/styles";

/**
 * A styled component based on MuiCard, customized with theme-specific styles.
 *
 * The Card is designed to be center-aligned with a flexible layout and adjusts its
 * width and shadow based on the screen size and color mode.
 *
 * The component includes the following styles:
 * - Flexbox layout with vertical column direction
 * - Center-aligned horizontally
 * - Full width within its container
 * - Padding and gap defined by the theme spacing
 * - Centered margin
 * - A multi-layered, subtle shadow
 * - Specific width when on small screens or larger, defined by theme breakpoints
 * - Different shadow styling for dark mode, applied according to theme settings
 *
 * @type {StyledComponent<'div', Theme>}
 */
const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

/**
 * SignUpContainer is a styled component utilizing the Stack component from Material-UI.
 * It is designed to handle the layout and styling of a sign-up form or related container section.
 *
 * The styles dynamically adjust based on the given theme and breakpoints for responsive design.
 *
 * Properties:
 * - height: Calculated based on a CSS variable `--template-frame-height` and viewport height.
 * - minHeight: Ensures a minimum height of 100%.
 * - padding: Responsive padding that changes from `theme.spacing(2)` to `theme.spacing(4)` at "sm" breakpoints and up.
 * - Background: Uses a radial gradient as a background image, with styles varying for light and dark modes.
 */
const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage:
        "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

/**
 * This component renders a signup form with fields for username and password.
 * It includes validation for the inputs. Submitting the form will attempt to
 * create a new user and navigate to the home page on success.
 *
 * @return {JSX.Element} The rendered signup form component.
 */
export function SignUp() {
  const [userNameError, setUserNameError] = useState(false);
  const [userNameErrorMessage, setUserNameErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const navigate = useNavigate();

  const validateInputs = () => {
    const userName = document.getElementById("username") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;

    let isValid = true;

    if (!userName.value) {
      setUserNameError(true);
      setUserNameErrorMessage("Please enter a valid username.");
      isValid = false;
    } else {
      setUserNameError(false);
      setUserNameErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userNameError || passwordError) {
      return;
    }
    const data = new FormData(event.currentTarget);

    const user = {
      userName: data.get("username"),
      password: data.get("password"),
    };

    try {
      await createUser(user);
      navigate("/");
      
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl style={{ textAlign: "initial" }}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField
                required
                fullWidth
                id="username"
                placeholder="username"
                name="username"
                autoComplete="username"
                variant="outlined"
                error={userNameError}
                helperText={userNameErrorMessage}
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <FormControl style={{ textAlign: "initial" }}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="new-password"
                variant="outlined"
                error={passwordError}
                helperText={passwordErrorMessage}
                color={passwordError ? "error" : "primary"}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign up
            </Button>
            <Typography sx={{ textAlign: "center" }}>
              Already have an account?{" "}
              <span>
                <Link to={"/"}>Sign in</Link>
              </span>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </>
  );
}
