# INTEGRATION_GUIDE.md

## الغرض
حزمة واجهات داخلية معاد تصميمها (frontend-only) لتطبيق Hilton Maintenance، بنمط داكن + عربي + RTL، دون أي تغيير في قاعدة البيانات أو المصادقة.

## البنية
- theme/theme.ts        رموز ألوان دلالية فوق اللوحة الأصلية
- utils/labels.ts       ترجمات عربية (حالات/أولويات/أقسام/أدوار)
- utils/classify.ts     تصنيف عاجل/عادي من Priority الموجود
- utils/format.ts       تنسيق تواريخ (Intl / Hermes)
- components/           Badges, SectionHeader, ReportCard, States
- screens/              Home, Reports, ReportDetails, Archive, Team, Notifications
- index.ts              الصادرات

## التبعيات
لا تبعيات جديدة. يعاد استخدام: expo-router، react-native، @/services/api، @/lib/types، @/lib/theme، @/state/AuthContext، @/components/ui.

## الربط بالواجهة الأصلية (بعد الموافقة فقط)
1. app/(app)/index.tsx  ->  <HomeScreen />
2. app/(app)/tasks/index.tsx -> <ReportsScreen />
3. app/(app)/tasks/[id].tsx -> <ReportDetailsScreen id={...} />
4. أضف Archive / Team / Notifications كمسارات أو تبويبات.

## محظور تغييره
supabase/migrations، supabase/functions، src/lib/supabase.ts، src/state/AuthContext.tsx، app/_layout.tsx، app/(auth)/*، src/utils/validation.ts.

## قيود معروفة
- 'البلاغات' و'المهام' يقرآن من جدول tasks نفسه.
- لا يوجد نموذج 'طلبات الضيوف' مستقل (يتطلب موافقة باك-إند).
- الفريق يعرض username + role فقط (لا مسمى وظيفي/قسم منفصل في البيانات الحالية).

## ميزات تتطلب موافقة باك-إند منفصلة
- كيان 'طلبات الضيوف' المستقل.
- أي حقول جديدة (مسمى وظيفي، قسم مستقل، حالات إضافية).
