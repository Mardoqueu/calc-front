import { Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

/**
 * A React component that displays a message informing the user that they must log in
 * before attempting to access the service. It includes a button that, when clicked,
 * navigates the user back to the home page.
 *
 * @return {JSX.Element} The UnprivilegedPage component.
 */
export function UnprivilegedPage() {
  const navigate = useNavigate();

  return (
    <>
      <Typography variant="h3">Unprivileged</Typography>

      <Container>
        <Typography variant="h3">Please log in before attempting to access the service</Typography>

        <Button variant="contained" onClick={() => navigate("/")}>Home</Button>
      </Container>
    </>
  );
}
