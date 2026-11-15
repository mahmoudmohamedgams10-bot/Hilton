import type { Category, Priority, TaskStatus, Role } from '@/lib/types';

export const statusLabels: Record<TaskStatus, string> = {
  'New': 'جديد',
  'In Progress': 'قيد التنفيذ',
  'Pending': 'في الانتظار',
  'Completed': 'مكتمل',
};

export const priorityLabels: Record<Priority, string> = {
  'Low': 'منخفضة',
  'Medium': 'متوسطة',
  'High': 'عالية',
  'Critical': 'حرجة',
};

export const categoryLabels: Record<Category, string> = {
  'HVAC': 'تكييف',
  'Electrical': 'كهرباء',
  'Plumbing': 'سباكة',
  'Cold Rooms': 'غرف تبريد',
  'Freezing Rooms': 'غرف تجميد',
  'Chillers': 'المبردات',
  'Refrigeration': 'تبريد',
  'General': 'عام',
};

export const roleLabels: Record<Role, string> = {
  admin: 'مدير',
  technician: 'فني',
};

export const sectionTitles = {
  urgentReports: 'البلاغات العاجلة',
  urgentSubtitle: 'تبليغ ريسبشن فقط',
  normalReports: 'البلاغات العادية',
  urgentTasks: 'المهام العاجلة',
  normalTasks: 'المهام العادية',
  emptyUrgent: 'لا توجد بلاغات عاجلة',
  emptyNormal: 'لا توجد بلاغات عادية',
  emptyTasks: 'لا توجد مهام',
};
