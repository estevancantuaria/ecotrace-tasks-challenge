export const getStatusColor = (completed: boolean) => completed ? 'success' : 'warning';

export const getStatusLabel = (completed: boolean) => completed ? 'Concluída' : 'Aberta';

export const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
