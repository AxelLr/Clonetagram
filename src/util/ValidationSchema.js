import * as Yup from 'yup'

const email = Yup.string().email('E-mail inválido').required('Coloca tu Correo electrónico')
const password = Yup.string().required('Contraseña Requerida')
const confirmPassword = Yup.string().oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir').required('Las contraseñas deben coincidir')

export const registerSchema = Yup.object({
    email,
    password,
    confirmPassword,
    username: Yup.string().required('Coloca tu nombre').min(3, 'El nombre es demasiado corto').max(20, 'El nombre es demasiado largo')
})

export const loginSchema = Yup.object({
    email,
    password
})

export const emailCheckSchema = Yup.object({
    email
})

export const resetPassword = Yup.object({
    password,
    confirmPassword
})
