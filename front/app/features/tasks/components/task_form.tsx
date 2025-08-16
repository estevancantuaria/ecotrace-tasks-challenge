import { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  FormHelperText,
  Snackbar,
} from '@mui/material';
import { useForm, Controller, type Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { tasksService, type User } from '../services/task_service';
import { taskFormSchema } from '../validators/task_form_schema';
import { ERROR_MESSAGES } from '../constants/error_messages';

export interface TaskFormData {
  title: string;
  description: string;
  user_id: string;
  completed: boolean;
}

interface TaskFormProps {
  defaultValues: TaskFormData;
  onSubmit: (data: TaskFormData) => void;
}

export default function TaskForm({ defaultValues, onSubmit }: TaskFormProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    defaultValues,
    resolver: yupResolver(taskFormSchema) as Resolver<TaskFormData>,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await tasksService.getUsers();
        setUsers(usersData);
      } catch (error) {
        setError(ERROR_MESSAGES.LOAD_USERS);
      } finally {
        setLoadingUsers(false);
      }
    };
    loadUsers();
  }, []);

  return (
    <Box
      sx={{ pt: 2 }}
      component="form"
      id="form-task"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="title"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Título da Tarefa"
            margin="normal"
            error={!!errors.title}
            helperText={errors.title?.message}
            required
          />
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            fullWidth
            label="Descrição"
            margin="normal"
            multiline
            rows={3}
          />
        )}
      />

      <FormControl fullWidth margin="normal" required error={!!errors.user_id}>
        <InputLabel id="user-select-label">Responsável</InputLabel>
        <Controller
          name="user_id"
          control={control}
          render={({ field }) => (
            <Select
              {...field}
              labelId="user-select-label"
              label="Responsável"
              disabled={loadingUsers}
            >
              {loadingUsers ? (
                <MenuItem disabled>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Carregando usuários...
                </MenuItem>
              ) : (
                users.map((user) => (
                  <MenuItem key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </MenuItem>
                ))
              )}
            </Select>
          )}
        />
        <FormHelperText>{errors.user_id?.message}</FormHelperText>
      </FormControl>

      <Controller
        name="completed"
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} checked={field.value} />}
            label="Tarefa Concluída"
            sx={{ mt: 2 }}
          />
        )}
      />
      {error && <Snackbar open={!!error} autoHideDuration={3000} onClose={() => setError(null)} message={error} />}
    </Box>
  );
}
