import useSWR, { mutate } from "swr"
import { TodoListItem } from "./components"
import { List, Stack, Typography, TextField, Button } from '@mui/material'
import { useState } from "react";
import { POSTMethod, DeleteMethod, ChangeCheckboxMethod } from "./hooks/fetcher";

const fetcher = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

type TodoType = {
    id?: string
    name?: string
    state?: string
}

const Todo = () => {
    const URL = "https://todolist-team1.deno.dev/api/todo/"
    const { data, error } = useSWR(URL, fetcher);
    const [ todoText, setTodoText ] = useState<string>("")

    const onChangeTodoText = (event: any) => {
        setTodoText(event.target.value)
    }
 
    const onClickAdd = async() => {
        const url = `https://todolist-team1.deno.dev/api/todo/`;
        const createdTask = await POSTMethod(url, todoText)
        console.log(createdTask)
        await mutate(url, [...data, createdTask], true)
        setTodoText("")
    };

    const onClickDelete = async(id: string) => {
        console.log(id)
        await DeleteMethod(id)
        await mutate(URL, [...data])
    };

    const onClickCheckBox = async(todo: TodoType) => {
        const id = todo.id
        const state = todo.state
        console.log(state)
        const isChecked = state === "done" ? {state: "open"} : {state: "done"}
        ChangeCheckboxMethod(id, isChecked)
    }

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>

    return (
        <>
            <Stack sx={{ textAlign: 'center', position: 'relative' }}>
                <Typography sx={{ m: 2 }} variant="h4">New Todo</Typography>
                <Stack sx={{ display: 'flex', flexDirection: 'initial', alignItems: 'center', justifyContent: 'center' }}>
                    <TextField sx={{ width: "60%" }} label="your todo" value={todoText} onChange={onChangeTodoText} />
                    <Button onClick={onClickAdd}>追加</Button>
                </Stack>
                <List component="nav" aria-label="mailbox folders" sx={{ width: "60%", margin: 'auto' }}>
                    {data.map((todo: { name: string; state: string, id: string }) => (
                        <TodoListItem name={todo.name} key={todo.id} checked={todo.state === "done" ? true : false} onClickDelete={() => onClickDelete(todo.id)} onClickCheckBox={() =>onClickCheckBox(todo)} />
                    ))}
                </List>
            </Stack>
        </>
    )
}

export default Todo
