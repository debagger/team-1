import * as React from 'react'
import * as Yup from 'yup'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Box, IconButton, TextField, InputAdornment, Stack, Button, Paper, TextFieldProps, ToggleButtonGroup, ToggleButton, FormControl, SelectChangeEvent, Select, MenuItem, InputLabel } from '@mui/material'

import styled from '@emotion/styled'
import { ArrowLeft } from '@mui/icons-material'
import { ICoreClientApi } from 'core'
import Title from '../dashboard/title'
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { PlanEntity } from 'core/dist/domain/plan/plan.entity'
import { Form, FormikProvider, useFormik } from 'formik'

const RootStyle = styled('div')({
    background: 'rgb(249, 250, 251)',
    // height: '100vh',
    display: 'grid',
    placeItems: 'center',
})

const ContentStyle = styled(Box)({
    maxWidth: 480,
    padding: 25,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    background: '#fff',
})

type Props = { api: ICoreClientApi }



const PlanEntityEdit: React.FC<Props> = ({ api }) => {


    const params = useParams()
    const location = useLocation()
    const from = location.state?.from?.pathname || '/plan'
    const navigate = useNavigate()

    // let [entity, setEntity] = React.useState<PlanEntity>({
    //     id: 0,
    //     budget_id: 0,
    //     type: 'consumption',
    //     name: '',
    //     amount: 0,
    //     date: new Date(),
    //     repeat: 'none',

    // });

    const ProfileSchema = Yup.object().shape({
        name: Yup.string().max(50, 'Слишком длинное').required('Укажите название'),
    })

    const formik = useFormik({
        initialValues: {
            id: 0,
            budget_id: 0,
            type: 'consumption',
            name: '',
            amount: 0,
            date: new Date(),
            repeat: 'none',
        },
        validationSchema: ProfileSchema,
        onSubmit: async (fields) => {
            if (params.id) {
                // изменение записи 
                await api.plan.updateEntity({
                    id: +params.id,
                    budget_id: fields.budget_id,
                    // type: fields.type,
                    type: type,
                    name: fields.name,
                    amount: fields.amount,
                    // date: fields.date,
                    date: date,
                    repeat: fields.repeat,
                })
            } else {
                // создание записи 
                await api.plan.addEntity({
                    id: 0,
                    budget_id: fields.budget_id,
                    // type: fields.type,
                    type: type,
                    name: fields.name,
                    amount: fields.amount,
                    // date: fields.date,
                    date: date,
                    repeat: fields.repeat,
                })
            }
            navigate(from)
        },
    })


    React.useEffect(() => {
        if (params.id) {
            api.plan.getEntity({ id: +params.id }).then(async (data) => {
                data.mapRight((plan) => {
                    formik.setValues(plan)
                    setType(plan.type)
                    setDate(plan.date)
                })
            })
        }

        api.budget.getBudgets().then(async (b) => {
            b.isRight() ? setBudgets(b.value) : console.log(b.value)
        })

    }, [])

    const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik

    // тип: расход / доход   
    const [type, setType] = React.useState('consumption');

    const handleChangeType = (
        event: React.MouseEvent<HTMLElement>,
        newType: string,
    ) => {
        if (newType) {
            setType(newType);
        }
    };

    // // название   
    // let [name, setName] = React.useState(entity.name);

    // // сумма  
    // const [amount, setAmount] = React.useState(entity.amount);

    // Дата 
    const [date, setDate] = React.useState<Date>(new Date());

    // режим повторения  
    // const [repeat, setRepeat] = React.useState(entity.repeat);

    // const handleChangeRepeat = (event: SelectChangeEvent) => {
    //     setRepeat(event.target.value);
    // };

    // бюджет  
    // const [budgetId, setBudgetId] = React.useState(entity.budget_id);

    // const handleChangeBudgetId = (event: SelectChangeEvent) => {        
    //     setBudgetId(+event.target.value);
    // };

    // // сохранение записи      
    // const handleAddEntity = () => {
    //     api.plan.addEntity({
    //         id: 0,
    //         budget_id: budgetId,
    //         type: type,
    //         name: name,
    //         amount: amount,
    //         date: date,
    //         repeat: repeat,
    //     }) //.then(updatePlan)
    //     navigate(from)
    // }

    // const updatePlan = () => {
    // }


    const [budgets, setBudgets] = React.useState<any[]>([])


    return (
        <div>
            <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                    <Paper
                        sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Title>
                            <IconButton onClick={() => navigate(from)}>
                                <ArrowLeft />
                            </IconButton>
                            {params.id ? `Изменение записи ${params.id}` : `Добавление записи в план`}
                        </Title>

                        <Stack spacing={2}>

                            <Stack direction="row" spacing={2}>

                                <ToggleButtonGroup
                                    color={type == 'consumption' ? 'error' : 'success'}
                                    value={type}
                                    exclusive
                                    onChange={handleChangeType}
                                    aria-label="Platform"
                                >
                                    <ToggleButton value='consumption'>Расход</ToggleButton>
                                    <ToggleButton value='income'>Доход</ToggleButton>
                                </ToggleButtonGroup>

                                <TextField
                                    id="outlined-read-only-input"
                                    label="Наименование"
                                    // onChange={(e) => setName(e.currentTarget.value)}
                                    {...getFieldProps('name')}
                                    error={Boolean(touched.name && errors.name)}
                                    helperText={touched.name && errors.name}
                                    fullWidth
                                />

                                <TextField
                                    sx={{ width: 300 }}
                                    id="outlined-read-only-input"
                                    label="Сумма"
                                    // onChange={(e) => setAmount(+e.currentTarget.value)}
                                    type="number"
                                    color={type == 'consumption' ? 'error' : 'success'}
                                    {...getFieldProps('amount')}
                                    error={Boolean(touched.amount && errors.amount)}
                                    helperText={touched.amount && errors.amount}
                                    focused
                                />
                                <FormControl sx={{ width: 400 }}>
                                    <InputLabel id="demo-simple-select-label">Бюджет</InputLabel>
                                    <Select
                                        label="Бюджет"
                                        // onChange={handleChangeBudgetId}
                                        {...getFieldProps('budget_id')}
                                    >
                                        {budgets.map((b) => (
                                            <MenuItem value={b.id}>{b.name}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Stack>
 
                            <Stack direction="row" spacing={2}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DesktopDatePicker
                                        label="Дата"
                                        inputFormat="DD.MM.YYYY"
                                        value={date}
                                        onChange={(newValue) => { newValue && setDate(newValue) }}
                                        // {...getFieldProps('date')}
                                        renderInput={(params: JSX.IntrinsicAttributes & TextFieldProps) => <TextField {...params} />}
                                    />
                                </LocalizationProvider>

                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Периодичность</InputLabel>
                                    <Select
                                        // value={repeat}
                                        // onChange={handleChangeRepeat}
                                        {...getFieldProps('repeat')}
                                        label="Периодичность"
                                    >
                                        <MenuItem value='none'>Не повторять</MenuItem>
                                        <MenuItem value='daily'>Ежедневно</MenuItem>
                                        <MenuItem value='weekly'>Еженедельно</MenuItem>
                                        <MenuItem value='monthly'>Ежемесячно</MenuItem>
                                        <MenuItem value='annually'>Ежегодно </MenuItem>
                                    </Select>
                                </FormControl>
                            </Stack>

                            <Stack direction="row">
                                <Button variant="contained" type="submit"
                                // onClick={() => handleAddEntity()}
                                >
                                    Сохранить
                                </Button>
                            </Stack>

                        </Stack>
                    </Paper>
                </Form>
            </FormikProvider>
        </div >
    )
}

export default PlanEntityEdit
