import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  AppBar,
  Toolbar,
  Alert,
  CircularProgress
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useAuth } from '../../hooks/use_auth';
import { useTasks } from '../../features/tasks/hooks/useTasks';
import { TaskTable } from '../../features/tasks/components/task_table';
import TaskModal from '../../features/tasks/components/task_modal';
import { tasksService, type Task } from '../../features/tasks/services/task_service';
import { ERROR_MESSAGES } from '../../features/tasks/constants/error_messages';

export default function TasksBoard() {
  const { logout } = useAuth();
  const { tasks, setTasks, users, loading } = useTasks();

  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [alertMessage, setAlertMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const showAlertMessage = (message: string) => {
    setAlertMessage(message);
    setTimeout(() => setAlertMessage(''), 3000);
  };

  const handleOpenModal = (type: 'add' | 'edit', task?: Task) => {
    setModalType(type);
    setSelectedTask(task || null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedTask(null);
  };

  const handleTaskSaved = (task: Task, type: 'add' | 'edit') => {
    if (type === 'add') {
      setTasks([...tasks, task]);
      showAlertMessage('Tarefa criada com sucesso!');
    } else {
      setTasks(tasks.map(t => (t.id === task.id ? task : t)));
      showAlertMessage('Tarefa atualizada com sucesso!');
    }
    handleCloseModal();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Deseja deletar esta tarefa?')) {
      try {
        await tasksService.deleteTask(id);
        setTasks(tasks.filter(t => t.id !== id));
        showAlertMessage('Tarefa deletada com sucesso!');
      } catch (err) {
        setErrorMessage(ERROR_MESSAGES.DELETE_TASK);
      }
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6">EcoTrace</Typography>
          <Button color="inherit" onClick={logout}>Sair</Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {alertMessage && <Alert severity="success" sx={{ mb: 3 }}>{alertMessage}</Alert>}
        {errorMessage && <Alert severity="error" sx={{ mb: 3 }}>{errorMessage}</Alert>}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4">Gerenciar Tarefas</Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenModal('add')}
          >
            Adicionar Tarefa
          </Button>
        </Box>

        {loading ? (
          <CircularProgress />
        ) : (
          <TaskTable
            tasks={tasks}
            users={users}
            onEdit={(task) => handleOpenModal('edit', task)}
            onDelete={handleDelete}
          />
        )}

        <TaskModal
          open={openModal}
          modalType={modalType}
          task={selectedTask}
          onClose={handleCloseModal}
          onSaved={handleTaskSaved}
        />
      </Container>
    </>
  );
}
