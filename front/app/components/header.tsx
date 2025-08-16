import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../hooks/use_auth';

export default function Header() {
  const { logout } = useAuth();

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">EcoTrace</Typography>
        <Button color="inherit" onClick={logout}>
          Sair
        </Button>
      </Toolbar>
    </AppBar>
  );
}