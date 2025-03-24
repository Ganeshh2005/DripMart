import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Paper, Typography, Button, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const RegistrationSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/');
    }
  }, [email, navigate]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CheckCircleOutlineIcon
              sx={{ fontSize: 64, color: 'success.main', mb: 2 }}
            />
          </motion.div>
          
          <Typography component="h1" variant="h5" align="center" gutterBottom>
            Registration Successful!
          </Typography>
          
          {email && (
            <Typography variant="body1" align="center" color="text.secondary" gutterBottom>
              Your account {email} has been created successfully.
            </Typography>
          )}
          
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
            You can now access all features of our platform.
          </Typography>

          <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2, width: '100%' }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate('/profile')}
            >
              Go to Profile
            </Button>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => navigate('/')}
            >
              Return to Home
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default RegistrationSuccess;