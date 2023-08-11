import { Container } from "@mui/material";

export default function NotFound() {
  return (
    <Container maxWidth="xl" sx={{ textAlign: 'center', fontSize: '2rem' }}>
      <div id="error-page">
        <h1>Oops!</h1>
        <p>Page not found.</p>
      </div>
    </Container>
    
  );
}