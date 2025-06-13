import { FC } from 'react'
import { Typography, Container, Button, Paper, Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const SupportPage: FC = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" align="center" color="primary" gutterBottom 
        sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
        {t('support.title')}
      </Typography>

      <Stack spacing={4}>
        {/* Sección de Contacto */}
        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default' }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {t('support.contact.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {t('support.contact.technical')}
          </Typography>
          <Typography variant="h6">
            {t('support.contact.phone')}
          </Typography>
        </Paper>

        {/* Sección de Acciones */}
        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default' }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {t('support.actions.title')}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/support/report')}
            sx={{ textTransform: 'none' }}
          >
            {t('support.actions.reportProblem')}
          </Button>
        </Paper>

        {/* Sección FAQ */}
        <Paper elevation={0} sx={{ p: 3, bgcolor: 'background.default' }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {t('support.faq.title')}
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ color: 'primary.main', mb: 2 }}>
            {t('support.faq.guide.title')}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
            {t('support.faq.guide.content')}
          </Typography>
        </Paper>
      </Stack>
    </Container>
  )
}

export default SupportPage
