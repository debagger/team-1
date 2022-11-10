import * as Yup from 'yup'
import { useState, useEffect } from 'react'
import { useFormik, Form, FormikProvider } from 'formik'
import { useNavigate } from 'react-router-dom'
import { Stack, Box, TextField, IconButton, InputAdornment, Avatar } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { Icon } from '@iconify/react'
import { motion } from 'framer-motion'
import { ICoreClientApi } from 'core'

import { Link } from 'react-router-dom'

/////////////////////////////////////////////////////////////
let easing = [0.6, -0.05, 0.01, 0.99]
const animate = {
    opacity: 1,
    y: 0,
    transition: {
        duration: 0.6,
        ease: easing,
        delay: 0.16,
    },
}

const ProfileForm = ({ setAuth, api }: { setAuth: any; api: ICoreClientApi }) => {
    function stringToColor(string: string) {
        let hash = 0
        let i

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash)
        }

        let color = '#'

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff
            color += `00${value.toString(16)}`.slice(-2)
        }
        /* eslint-enable no-bitwise */

        return color
    }

    function stringAvatar(name: string) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        }
    }

    const [initialValues, setinitialValues] = useState()

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)

    const ProfileSchema = Yup.object().shape({
        firstName: Yup.string().min(2, 'Слишком короткое имя').max(50, 'Слишком длинное имя').required('Укажите имя'),
        lastName: Yup.string()
            .min(2, 'Слишком короткая фамилия')
            .max(50, 'Слишком длинная фамилия')
            .required('Укажите фамилию'),
        email: Yup.string()
            .email('Электронная почта должна быть действительным адресом')
            .required('Укажите адрес электронной почты'),
        password: Yup.string().required('Укажите пароль'),
    })

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            avatar: '',
        },
        validationSchema: ProfileSchema,
        onSubmit: async (fields) => {
            const { email, ...data } = fields
            const result = await api.users.updateUser({ email, data })
            if (result.isRight()) {
                // setAuth(true);
                navigate('/dashboard', { replace: true })
            } else {
                console.log(result.value)
            }
        },
    })

    useEffect(() => {
        api.users.getCurrent().then((data) => {
            data.mapRight((user) => {
                const u = { ...user, password: '' }
                formik.setValues(u)
            })
        })
    }, [])

    const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik

    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    <Stack spacing={2}>
                        <Avatar
                            {...stringAvatar(getFieldProps('firstName').value + ' ' + getFieldProps('lastName').value)}
                        />
                        {/* <TextField value={getFieldProps('firstName').value + ' ' + getFieldProps('lastName').value} /> */}
                        {/* <Avatar src={getFieldProps('avatar').value} alt="avatar" sx={{ width: 128, height: 128 }} />
                        <TextField
                            fullWidth
                            label="url"
                            {...getFieldProps('avatar')}
                            error={Boolean(touched.avatar && errors.avatar)}
                            helperText={touched.avatar && errors.avatar}
                        /> */}
                    </Stack>
                    <Stack
                        component={motion.div}
                        initial={{ opacity: 0, y: 60 }}
                        animate={animate}
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                    >
                        <TextField
                            fullWidth
                            label="Имя"
                            {...getFieldProps('firstName')}
                            error={Boolean(touched.firstName && errors.firstName)}
                            helperText={touched.firstName && errors.firstName}
                        />

                        <TextField
                            fullWidth
                            label="Фамилия"
                            {...getFieldProps('lastName')}
                            error={Boolean(touched.lastName && errors.lastName)}
                            helperText={touched.lastName && errors.lastName}
                        />
                    </Stack>

                    <Stack spacing={3} component={motion.div} initial={{ opacity: 0, y: 40 }} animate={animate}>
                        <TextField
                            fullWidth
                            autoComplete="username"
                            type="email"
                            label="Электронная почта"
                            {...getFieldProps('email')}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                        />

                        <TextField
                            fullWidth
                            autoComplete="current-password"
                            type={showPassword ? 'text' : 'password'}
                            label="Пароль"
                            {...getFieldProps('password')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                                            <Icon icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            error={Boolean(touched.password && errors.password)}
                            helperText={touched.password && errors.password}
                        />
                    </Stack>

                    <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={animate}>
                        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                            Сохранить
                        </LoadingButton>
                    </Box>
                </Stack>
            </Form>
        </FormikProvider>
    )
}

export default ProfileForm
