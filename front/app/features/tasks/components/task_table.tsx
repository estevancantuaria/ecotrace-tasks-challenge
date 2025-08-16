import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Chip,
    Tooltip,
    Typography
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { Task, User } from '../services/task_service';
import { getStatusColor, getStatusLabel, formatDate } from '../utils/tasks_utils';

interface TaskTableProps {
    tasks: Task[];
    users: User[];
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
}

export const TaskTable: React.FC<TaskTableProps> = ({ tasks, users, onEdit, onDelete }) => {

    const getUserNameById = (users: User[], userId: string) =>
        users.find(u => u.id === userId)?.name || 'Usuário não encontrado';

    if (tasks.length === 0) {
        return (
            <Typography align="center" sx={{ py: 3 }}>
                Nenhuma tarefa encontrada. Adicione a primeira tarefa!
            </Typography>
        );
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Título</strong></TableCell>
                        <TableCell><strong>Usuário</strong></TableCell>
                        <TableCell><strong>Status</strong></TableCell>
                        <TableCell><strong>Data Criação</strong></TableCell>
                        <TableCell align="center"><strong>Ações</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map(task => (
                        <TableRow key={task.id} hover>
                            <TableCell>{task.title}</TableCell>
                            <TableCell>{getUserNameById(users, task.userId || '')}</TableCell>
                            <TableCell>
                                <Chip label={getStatusLabel(task.completed)} color={getStatusColor(task.completed)} size="small" />
                            </TableCell>
                            <TableCell>{formatDate(task.createdAt)}</TableCell>
                            <TableCell align="center">
                                <Tooltip title="Editar">
                                    <IconButton size="small" color="primary" onClick={() => onEdit(task)}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Deletar">
                                    <IconButton size="small" color="error" onClick={() => onDelete(task.id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
