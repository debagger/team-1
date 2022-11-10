
import { Delete, Edit } from "@mui/icons-material";
import { Button, IconButton, Link, List, ListItem, ListItemText, Paper, Stack, TextField, Typography } from "@mui/material";
import { ICoreClientApi } from "core";
import { PlanEntity } from "core/dist/domain/plan/plan.entity";
import React from "react";
import { useNavigate } from "react-router-dom";
import Title from "../dashboard/title";
// import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';

type Props = { api: ICoreClientApi }

// type gridRow = {          
//     type: string,
//     amount: number,
//     name: string,
//     date: Date, 
//     repeat: string
// }

const Plan: React.FC<Props> = ({ api }) => {

    const navigate = useNavigate()

    const [plans, setPlans] = React.useState<PlanEntity[]>([])
    // const [grid, setGrid] = React.useState<gridRow[]>([])

    React.useEffect(() => {
        updatePlan()
    }, [])


    const handleDeletePlan = (id: number) => () => {
        api.plan.deleteEntity({ id: id }).then(updatePlan)
    }


    const updatePlan = () => {
        api.plan.getEntities().then(async (p) => {

            // if (p.isRight()) {
            //     setPlans(p.value.filter(e => e.id))
            //     setGrid(p.value.filter(e => e.id))
            // } else {
            //     console.log(p.value)
            // }            
            p.isRight() ? setPlans(p.value.filter(e => e.id)) : console.log(p.value)
            // p.isRight() ? setPlans(p.value) : console.log(p.value)
        })
    }


    //////////////////////////////////

    // const rows: GridRowsProp = [
    //     { id: 1, col1: 'Hello', col2: 'World' },
    //     { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    //     { id: 3, col1: 'MUI', col2: 'is Amazing' },
    // ];

    // const columns: GridColDef[] = [
    //     { field: 'type', headerName: 'Тип', width: 150 },
    //     { field: 'amount', headerName: 'Сумма', width: 150 },
    //     { field: 'name', headerName: 'Описание', width: 400 },
    //     { field: 'date', headerName: 'Дата', width: 150 }, 
    //     { field: 'repeat', headerName: 'Периодичность', width: 150 }, 
    // ];

    //////////////////////////////////    


    return (
        <div>

            <Paper
                sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                }}
            >

                <Title>Планируемые расходы/доходы</Title>
                <Stack spacing={2}>

                    <List>
                        {plans.map((p) => (
                            <ListItem key={p.id}>
                                <ListItemText
                                    primaryTypographyProps={{ style: { color: `${p.type == 'consumption' ? '#cc3333' : '#009900'}` } }}
                                    primary={`${p.name}: ${p.amount}`}
                                    // secondary={`Дата: ${p.date}, повтор: ${p.repeat}`}
                                    secondary={`Дата: ${p.date}, повтор: ${p.repeat}`}
                                />
                                <IconButton onClick={() => navigate({ pathname: `/plan/edit/${p.id}` })}>
                                    <Edit />
                                </IconButton>
                                <IconButton onClick={handleDeletePlan(p.id)}>
                                    <Delete />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>


                    {/* <div style={{ height: 300, width: '100%' }}>
                        <DataGrid rows={rows} columns={columns} />
                    </div> */}


                    <Stack direction="row" >
                        <Button variant="contained"
                            onClick={() => navigate({ pathname: `/plan/add` })}>
                            Добавить
                        </Button>
                    </Stack>

                </Stack>

            </Paper>

        </div>
    )
}

export default Plan