import * as Yup from 'yup'

const email = Yup.string().email('Correo Electrónico inválido').required('Coloca tu Correo electrónico')

const registerPassword = Yup.string()
.required('Contraseña Requerida')
.min(6, 'Contraseña demasiado corta.')
.max(18, 'Contraseña demasiado larga')
.matches(/^\S*$/,('La contraseña no puede contener espacios'))
.matches(/[a-z]/, 'Debe contener al menos una letra minúscula')
.matches(/[A-Z]/, 'Debe contener al menos una letra mayúscula')

const password = Yup.string().required('Contraseña Requerida').min(6, 'Contraseña demasiado corta.').max(18, 'Contraseña demasiado larga')

const confirmPassword = Yup.string().oneOf([Yup.ref('registerPassword'), null], 'Las contraseñas deben coincidir').required('Las contraseñas deben coincidir')

export const registerSchema = Yup.object({
    email,
    registerPassword,
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
    registerPassword,
    confirmPassword
})
