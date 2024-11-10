import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * ErrorPage component that renders an error message and a button to navigate to the home page.
 *
 * @return {JSX.Element} The ErrorPage component.
 */
export function ErrorPage() {
  const navigate = useNavigate();

  return (
    <>
      <Container>
        <Typography variant="h3">Please come home</Typography>

        <Button variant="contained" onClick={() => navigate("/home")}>Home</Button>
      </Container>
    </>
  );
}
