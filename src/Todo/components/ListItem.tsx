import React from 'react'
import { ListItem, ListItemText, Button, Divider } from '@mui/material'
import ControlledCheckbox from "./CheckBox";

type TodoListItemProps = {
    name: string;
    onClickCheckBox?: () => void
    onClickDelete?: () => void
    checked: boolean
}

const TodoListItem: React.FC<TodoListItemProps> = (props) => {
    const { name, onClickCheckBox, onClickDelete, checked } = props
    return (
        <>
            <ListItem>
                <ControlledCheckbox checked={checked} handleChange={onClickCheckBox} />
                <ListItemText primary={name} />
                <ListItemText sx={{textAlign: 'right'}}>
                    <Button onClick={onClickDelete}>削除</Button>
                </ListItemText>
            </ListItem>
            <Divider />
        </>
    )
}

export default TodoListItem