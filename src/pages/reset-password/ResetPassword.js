import React,{ useEffect, useState } from 'react'
// REDUX
import { useDispatch } from 'react-redux'
// ACTIONS
import { getUserByToken, updatePassword } from '../../redux/actions/AuthenticationActions'
// FORMIK
import { Formik, Form } from 'formik'
// MUI
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'
// COMPONENTS 
import LoadingAuthentication from '../../components/LoadingAuthentication'
// VALIDATION
import { resetPassword } from '../../util/ValidationSchema'

const useStyles = makeStyles(theme => ({
    textField: {
      marginBottom: 55,
      height: 40,
      fontSize: 2
  }
  }))

export default function ResetPassword(props) {

    const dispatch = useDispatch()
    const classes = useStyles()

    const [handleReset, setHandleReset] = useState({
        user: {},
        success: null,
        updated: null
    })

    useEffect(() => {
        dispatch(getUserByToken(props.match.params.token, setHandleReset, props.history))
    }, [])

    if(handleReset.success === false) return <h1>El token ha expirado, volviendo al inicio.</h1>

    return (
        <Formik
            initialValues={{ password: '', ConfirmPassword: '' }}
            validationSchema={resetPassword}
            onSubmit={(values, { setSubmitting }) => { 
                dispatch(updatePassword(values.password, handleReset,setHandleReset, setSubmitting, props.history))
            }}
        >
        {({ handleSubmit, isSubmitting, errors, values, touched, handleChange, handleBlur }) => (
        <div  className='form-container'>

          <Card style={{margin: 'auto',  padding: 40}} elevation={8}>
              <Form style={{ display: 'flex', flexDirection: 'column'}} >

                <Typography style={{margin: '5px 0px 25px 0px'}}  variant='h4'> Reestablecer Contraseña </Typography>

                <TextField
                    variant='outlined'
                    className={classes.textField}
                    error={(errors.password || touched.password) && errors.password}
                    id='password'
                    name='password'
                    type='password'
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    helperText={(errors.password || touched.password) && errors.password}
                    label='Contraseña'
                />            
                <TextField
                    className={classes.textField}
                    variant='outlined'
                    error={(errors.confirmPassword || touched.confirmPassword) && errors.confirmPassword}
                    id='confirmPassword'
                    name='confirmPassword'
                    type='password'
                    value={values.confirmPassword}
                    onChange={handleChange}
                    nBlur={handleBlur}
                    required
                    helperText={(errors.confirmPassword || touched.confirmPassword) && errors.confirmPassword}
                    label='Confirmar Contraseña'
                />                  
                {handleReset.updated && <h1> contraseña reestablecida exitosamente, volvioendo al inicio ...</h1>}
                <Button
                    disabled={isSubmitting}
                    type='submit'
                    onClick={handleSubmit}
                    variant='contained'
                    color='primary'
                    style={{marginTop: 5}}
                >
                 Reestablecer Contraseña
                </Button>
              </Form>
          </Card>
        { isSubmitting && <LoadingAuthentication /> }
        </div>  
        )}
</Formik>
    )
}
