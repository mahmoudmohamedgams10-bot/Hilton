# FILE_REPLACEMENT_MAP.md

| الملف الجديد | الملف الأصلي | الإجراء | الحماية |
|---|---|---|---|
| screens/HomeScreen.tsx | app/(app)/index.tsx | استبدال المحتوى | غير محمي |
| screens/ReportsScreen.tsx | app/(app)/tasks/index.tsx | استبدال المحتوى | غير محمي |
| screens/ReportDetailsScreen.tsx | app/(app)/tasks/[id].tsx | استبدال المحتوى | غير محمي |
| screens/ArchiveScreen.tsx | لا يوجد | إضافة | غير محمي |
| screens/TeamScreen.tsx | لا يوجد | إضافة | غير محمي |
| screens/NotificationsScreen.tsx | app/(app)/notifications.tsx | استبدال المحتوى | غير محمي |
| theme/theme.ts | src/lib/theme.ts | إضافة (لا يحل محل) | لا تلمس الأصل |
| components/* | src/components/ui.tsx | إضافة | لا تلمس الأصل |
| utils/* | src/lib/labels.ts | إضافة | لا تلمس الأصل |

## ملفات محمية (لم تُمس)
supabase/migrations/0001_init.sql، supabase/functions/*، src/lib/supabase.ts، src/state/AuthContext.tsx، app/_layout.tsx، app/(auth)/*، src/utils/validation.ts، src/lib/i18n-rtl.ts.
