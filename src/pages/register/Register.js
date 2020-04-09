import React from 'react'
// FORMIK
import { Formik, Form } from 'formik'
// ROUTER 
import { Link } from 'react-router-dom'
// REDUX
import { registerUser } from '../../redux/actions/AuthenticationActions'
import { useDispatch } from 'react-redux'
// MUI
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
// YUP
import { registerSchema } from '../../util/ValidationSchema'
// IMAGE
import landingImage from '../../util/images/landing-image.jpg'
// COMPONENTS 
import LoadingAuthentication from '../../components/LoadingAuthentication'
// STYLES
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  textField: {
    marginBottom: 55,
    height: 40,
    fontSize: 2
}
}))

export default function Register(props) {

  const classes = useStyles()
  const dispatch = useDispatch()

  return (
      <Formik
              enableReinitialize
              initialValues={{ email: '', password: '', confirmPassword: '', username: '' }}
              validationSchema={registerSchema}
              onSubmit={(values, { setSubmitting }) => {
                dispatch(registerUser(values, props.history, setSubmitting))
              }}
            >
              {({ handleSubmit, isSubmitting, errors, values, touched, handleChange, handleBlur }) => (
              <div className='form-container'>
                <Card className='form-card' elevation={8}>

                    <Form className='form'>

                      <Typography style={{margin: '5px 0px 25px 0px'}} variant='h4'> Regístrate! </Typography>

                      <TextField
                          className={classes.textField}
                          variant='outlined'
                          error={errors.email && touched.email}
                          id='email'
                          name='email'
                          type='email'
                          value={values.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          helperText={(errors.email && touched.email) && errors.email}
                          label='Correo Electrónico'
                      />
                      <TextField
                        className={classes.textField}
                          variant='outlined'
                          error={errors.password && touched.password}
                          id='password'
                          name='password'
                          type='password'
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          helperText={(errors.password && touched.password) && errors.password}
                          label='Contraseña'
                      />
                      <TextField
                        className={classes.textField}
                          variant='outlined'
                          error={errors.confirmPassword && touched.confirmPassword}
                          id='confirmPassword'
                          name='confirmPassword'
                          type='password'
                          value={values.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          helperText={(errors.confirmPassword && touched.confirmPassword) && errors.confirmPassword}
                          label='Confirmar Contraseña'
                      />                 
                      <TextField
                        className={classes.textField}
                          variant='outlined'
                          error={errors.username && touched.username}
                          id='username'
                          name='username'
                          type='username'
                          value={values.username}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          required
                          helperText={(errors.username && touched.username) ? errors.username : 'Todos veran tu nombre*'}
                          label='Nombre completo'
                      />
                      <Button
                          disabled={isSubmitting}
                          type="submit"
                          onClick={handleSubmit}
                          variant="contained"
                          color="primary"
                          style={{marginTop: 5}}
                      >
                      Registrarse
                      </Button>

                      <p className='auth-p' > Ya tienes una cuenta?
                        <Link 
                          style={{textDecoration: 'none', color: '#046B86'}} 
                          to="/"> Iniciar sesión
                        </Link>
                      </p>
                    </Form>
                    <img src={landingImage} alt='landing' className='auth-image' />
                </Card>
              { isSubmitting && <LoadingAuthentication /> }
              </div>  
              )}
      </Formik>
  )    
} 
