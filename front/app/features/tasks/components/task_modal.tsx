import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import TaskForm, { type TaskFormData } from './task_form';
import { tasksService, type Task } from '../services/task_service';
import Snackbar from '@mui/material/Snackbar';
import { useState } from 'react';

interface TaskModalProps {
  open: boolean;
  modalType: 'add' | 'edit';
  task: Task | null;
  onClose: () => void;
  onSaved: (task: Task, type: 'add' | 'edit') => void;
}

export default function TaskModal({
  open,
  modalType,
  task,
  onClose,
  onSaved,
}: TaskModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getModalTitle = () => {
    return modalType === 'add' ? 'Adicionar Nova Tarefa' : 'Editar Tarefa';
  };

  const handleSubmit = async (data: TaskFormData) => {
    try {
      setLoading(true);
      if (modalType === 'add') {
        handleSave(data);
      } else if (modalType === 'edit' && task) {
        handleUpdate(data);
      }
    } catch (err) {
      setError('Erro ao salvar a tarefa');      
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: TaskFormData) => {
    const newTask = await tasksService.createTask(data);
    onSaved({ ...newTask, userId: newTask.userId || data.user_id }, 'add');
  }

  const handleUpdate = async (data: TaskFormData) => {
    const updatedTask = await tasksService.updateTask(task!.id, data);
    onSaved({ ...updatedTask, userId: updatedTask.userId || data.user_id }, 'edit');
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {error && <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError(null)} message={error} />}
      <DialogTitle>{getModalTitle()}</DialogTitle>
      <DialogContent>
        <TaskForm
          defaultValues={
            task
              ? {
                  title: task.title,
                  description: task.description,
                  user_id: task.userId || '',
                  completed: task.completed,
                }
              : {
                  title: '',
                  description: '',
                  user_id: '',
                  completed: false,
                }
          }
          onSubmit={handleSubmit}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Cancelar
        </Button>
        <Button
          type="submit"
          form="form-task"
          variant="contained"
          disabled={loading}
        >
          {modalType === 'add' ? 'Adicionar' : 'Salvar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
