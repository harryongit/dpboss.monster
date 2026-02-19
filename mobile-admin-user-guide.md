# React Native Mobile App Guide — Admin & User Dashboards (Same API)

This guide explains how to build two React Native dashboards (Admin and User) that use the same backend API already used by this website, without changing any API endpoints. It maps existing endpoints, roles, and flows from the web project and provides implementation steps for React Native, including in‑app notifications built on the same data.

## Overview
- Two roles: admin and user, each with its own dashboard
- Use the existing API base URL and endpoints
- Shared auth/context model for role separation
- TanStack Query for data fetching and caching
- Axios client configured with the same base URL
- In‑app notifications derived from user game status and result updates (no backend changes required)

## API Base
- Base URL comes from `VITE_API_URL` or defaults to `https://spdpbossbackend.net`. See [http.ts](file:///c:/Users/raman/Pictures/spdpboss_website/src/lib/http.ts#L3-L9).

```ts
// React Native axios setup (identical baseURL)
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? 'https://spdpbossbackend.net',
  headers: { 'Content-Type': 'application/json' },
});
```

## Roles and Routing (Reference)
- Web distinguishes Admin vs User via a protected route and an AuthContext. See [ProtectedRoute.tsx](file:///c:/Users/raman/Pictures/spdpboss_website/src/components/ProtectedRoute.tsx) and [AuthContext.tsx](file:///c:/Users/raman/Pictures/spdpboss_website/src/contexts/AuthContext.tsx).
- Mobile will mimic this using React Navigation + a shared AuthContext:
  - Store admin session in `localStorage` equivalent (SecureStore/AsyncStorage)
  - Store user session likewise
  - Gate admin screens by `isAuthenticated`
  - Gate user screens by `isUserAuthenticated`

## Endpoints Map
Below is the key set of endpoints used in the web app and how they map to Admin or User flows. Each call requires JSON bodies as shown in the hooks.

### Auth
- Admin login: `POST /admin/auth/login` [auth.ts](file:///c:/Users/raman/Pictures/spdpboss_website/src/services/auth.ts#L28-L43)
- User login: `POST /user/auth/login` [auth.ts](file:///c:/Users/raman/Pictures/spdpboss_website/src/services/auth.ts#L50-L64)

### Admin — Dashboard and Management
- Dashboard stats: `POST /admin/get/dashboard-stats` [useDashboardStats](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useDashboardStats.ts#L33-L41)
- Markets list: `POST /admin/list/markets` [useListMarkets](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useListMarkets.ts#L28-L36)
- Market details: `POST /admin/get/market` [useGetMarketDetails](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useGetMarketDetails.ts#L31-L39)
- Create market: `POST /admin/create/market` [useCreateMarket](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useCreateMarket.ts#L27-L35)
- Update market: `PUT /admin/update/market` [useUpdateMarket] (present in hooks folder)
- Delete market: `DELETE /admin/delete/market` [useDeleteMarket](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useDeleteMarket.ts#L15-L23)
- List users: `POST /admin/list/users` [useListUsers](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useListUsers.ts#L28-L36)
- Create user: `POST /admin/create/user` [useCreateUser](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useCreateUser.ts#L17-L25)
- Get user details: `POST /admin/get/user` [useGetUserDetails](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useGetUserDetails.ts#L23-L31)
- Update user: `PUT /admin/update/user` [useUpdateUser](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useUpdateUser.ts#L15-L23)
- Update user status: `PUT /admin/update/user-status` [useUpdateUserStatus](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useUpdateUserStatus.ts#L15-L23)
- Delete user: `DELETE /admin/delete/user` [useDeleteUser](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useDeleteUser.ts#L15-L23)
- Assign market to user: `POST /admin/create/user-market` [useCreateUserMarket](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useCreateUserMarket.ts#L17-L25)
- List user-market assignments: `POST /admin/list/user-markets` [useListUserMarkets](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useListUserMarkets.ts#L23-L31)
- Delete assignment: `DELETE /admin/delete/user-market` [useDeleteUserMarket](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useDeleteUserMarket.ts#L15-L23)
- Market holidays: `POST /admin/list/market-holidays` [useListMarketHolidays](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useListMarketHolidays.ts#L22-L30)
- Update holiday: `PUT /admin/update/market-holiday` [useUpdateMarketHoliday] (present in hooks folder)
- Results list: `POST /admin/list/results` [useListResults](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useListResults.ts#L23-L31)
- Create result: `POST /admin/create/result` [useCreateResult](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useCreateResult.ts#L48-L54)
- Delete result: `DELETE /admin/delete/result` [useDeleteResult] (present in hooks folder)
- Final Ank list: `POST /admin/list/final-ank` [useListFinalAnk](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useListFinalAnk.ts#L17-L25)
- Create Final Ank: `POST /admin/create/final-ank` [useCreateFinalAnk](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useCreateFinalAnk.ts#L17-L25)
- Delete Final Ank: `DELETE /admin/delete/final-ank` [useDeleteFinalAnk] (present in hooks folder)
- Free Fix list: `POST /admin/list/free-fix` [useListFreeFix](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useListFreeFix.ts#L23-L31)
- Create Free Fix: `POST /admin/create/free-fix` [useCreateFreeFix](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useCreateFreeFix.ts#L19-L27)
- Delete Free Fix: `DELETE /admin/delete/free-fix` [useDeleteFreeFix] (present in hooks folder)
- Common all users list (for selection): `POST /common/all_user_list` [useAllUsers](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/common/useAllUsers.ts#L23-L31)
- Common all markets list: `GET /common/all_markets` [useAllMarkets] (present in hooks/common)

### User — Dashboard and Results
- Assigned markets: `POST /user/dashboard/markets` [useUserAssignedMarkets](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/user/useUserAssignedMarkets.ts#L23-L31)
- Game status (notifications data): `POST /user/game/status` [useUserGameStatus](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/user/useUserGameStatus.ts#L24-L32)
- Results markets: `POST https://matkabooking.pro/user/results/list` [useUserResultMarkets](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/user/useUserResultMarkets.ts#L20-L28)
- Submit result: `POST https://matkabooking.pro/user/results` [useSubmitUserResult](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/user/useSubmitUserResult.ts#L16-L24)
- Public live results: `GET /website/live-results` [useMainWebsite](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/main/useMainWebsite.ts#L33-L41)

Note: Some user result endpoints use a different absolute host (`matkabooking.pro`). Keep those hosts unchanged to match the current behavior.

## Mobile App Architecture
Use Expo (recommended) or bare React Native. The structure below assumes Expo:

- App entry sets up:
  - TanStack Query client
  - Theme provider (if needed)
  - AuthContext (admin and user)
  - Navigation container

- Navigation:
  - Auth stack (AdminLogin, UserLogin)
  - Admin stack (Dashboard, Markets, Users, Assignments, Holidays, Results, FinalAnk, FreeFix, Settings)
  - User stack (Dashboard, UploadResult, FreeFix)
  - Role switcher bottom tabs or segmented control on the login screen

```tsx
// Example navigation skeleton
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Auth screens */}
        <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
        <Stack.Screen name="UserLogin" component={UserLoginScreen} />
        {/* Admin area */}
        <Stack.Screen name="Admin" component={AdminTabs} />
        {/* User area */}
        <Stack.Screen name="User" component={UserTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```

## AuthContext (Mobile)
Replicate web logic to store sessions and gate screens. See web references: [AuthContext.tsx](file:///c:/Users/raman/Pictures/spdpboss_website/src/contexts/AuthContext.tsx), [ProtectedRoute.tsx](file:///c:/Users/raman/Pictures/spdpboss_website/src/components/ProtectedRoute.tsx).

```ts
// Pseudo-code for mobile auth context
type AdminUser = { id: number };
type NormalUser = { id: number; username: string; mobile: string; email: string; status: number };

function setAdminSession(user: AdminUser) {
  // AsyncStorage.setItem('admin', JSON.stringify(user));
  // set isAuthenticated = true
}
function setUserSession(user: NormalUser) {
  // AsyncStorage.setItem('user', JSON.stringify(user));
  // set isUserAuthenticated = true
}
function logout() {
  // clear both sessions
}
```

## Screens and Data Flows
Map each web screen to a mobile screen. The web routes are listed in [App.tsx](file:///c:/Users/raman/Pictures/spdpboss_website/src/App.tsx#L1-L196).

### Admin
- Dashboard: fetch [dashboard stats](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useDashboardStats.ts#L33-L41).
- Markets:
  - List markets [useListMarkets](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useListMarkets.ts#L28-L36)
  - Market detail [useGetMarketDetails](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useGetMarketDetails.ts#L31-L39)
  - Create/Update/Delete [useCreateMarket](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useCreateMarket.ts#L27-L35), [useUpdateMarket], [useDeleteMarket](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useDeleteMarket.ts#L15-L23)
- Users:
  - List users [useListUsers](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useListUsers.ts#L28-L36)
  - Create user [useCreateUser](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useCreateUser.ts#L17-L25)
  - Edit user [useGetUserDetails](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useGetUserDetails.ts#L23-L31), [useUpdateUser](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useUpdateUser.ts#L15-L23)
  - Activate/Deactivate [useUpdateUserStatus](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useUpdateUserStatus.ts#L15-L23)
  - Delete user [useDeleteUser](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useDeleteUser.ts#L15-L23)
- Assignments:
  - Create [useCreateUserMarket](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useCreateUserMarket.ts#L17-L25)
  - List [useListUserMarkets](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useListUserMarkets.ts#L23-L31)
  - Delete [useDeleteUserMarket](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useDeleteUserMarket.ts#L15-L23)
- Holidays:
  - List [useListMarketHolidays](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useListMarketHolidays.ts#L22-L30)
  - Update [useUpdateMarketHoliday]
- Results:
  - List [useListResults](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useListResults.ts#L23-L31)
  - Create [useCreateResult](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useCreateResult.ts#L48-L54)
  - Delete [useDeleteResult]
- Final Ank:
  - List [useListFinalAnk](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useListFinalAnk.ts#L17-L25)
  - Create [useCreateFinalAnk](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useCreateFinalAnk.ts#L17-L25)
  - Delete [useDeleteFinalAnk]
- Free Fix:
  - List [useListFreeFix](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useListFreeFix.ts#L23-L31)
  - Create [useCreateFreeFix](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useCreateFreeFix.ts#L19-L27)
  - Delete [useDeleteFreeFix]

### User
- Dashboard:
  - Assigned markets [useUserAssignedMarkets](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/user/useUserAssignedMarkets.ts#L23-L31)
  - Game status (as notification items) [useUserGameStatus](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/user/useUserGameStatus.ts#L24-L32)
  - Public live results [useMainWebsite](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/main/useMainWebsite.ts#L33-L41)
- Upload Result:
  - List result markets [useUserResultMarkets](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/user/useUserResultMarkets.ts#L20-L28)
  - Submit result [useSubmitUserResult](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/user/useSubmitUserResult.ts#L16-L24)
- Free Fix (read-only): consume admin-provided data via the same list endpoint or a user‑side equivalent if available.

## Data Layer (TanStack Query)
TanStack Query works in React Native the same way as web.

```ts
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { api } from './api';

const qc = new QueryClient();

export function AppProviders({ children }) {
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}

// Example: Admin dashboard stats
function useDashboardStats(admin_id: number) {
  return useQuery({
    queryKey: ['admin', 'dashboard-stats', admin_id],
    queryFn: async () => (await api.post('/admin/get/dashboard-stats', { admin_id })).data,
  });
}
```

## Notifications (No API Changes)
We reuse existing endpoints to derive notifications, primarily `/user/game/status` and `/website/live-results`.

### In‑App Notifications (Guaranteed no backend changes)
- Poll user game status every N seconds/minutes using TanStack Query `refetchInterval`.
- Compare previous vs current data to detect noteworthy changes (new warnings, lock/expired states, etc.).
- Show local notifications inside the app UI (cards, badges, toasts).
- Reference web implementations: [TopBar.tsx](file:///c:/Users/raman/Pictures/spdpboss_website/src/components/layout/TopBar.tsx#L1-L152), [UserDashboard.tsx](file:///c:/Users/raman/Pictures/spdpboss_website/src/pages/User/UserDashboard.tsx#L1-L100).

```ts
// Pseudo: polling user status in RN
function useUserStatusNotifications(user_id: number) {
  return useQuery({
    queryKey: ['user', 'gameStatus', user_id],
    queryFn: async () => (await api.post('/user/game/status', { user_id })).data,
    refetchInterval: 30_000, // 30 seconds
  });
}
```

### Optional OS Notifications (Minimal client-only)
- Use Expo Notifications or react-native-push-notification to display local notifications when polling detects changes. This does not require new backend endpoints.
- For true push (server‑initiated) you need a server to send to FCM/APNs; since we cannot change the API, keep OS notifications local and event‑driven on polling.

## Error Handling and UX
- Follow web patterns for messaging and validation. Web uses SweetAlert and Toasts; mobile can use in‑app banners or Snackbar equivalents.
- Extract messages from API safely as done in [useCreateResult.ts](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin/useCreateResult.ts#L19-L43).

## Security
- Do not log secrets or tokens.
- Use HTTPS endpoints only.
- Store sessions in secure storage (e.g., Expo SecureStore) if possible.
- Respect role gates: Admin screens must require admin session; User screens require user session.

## Environment
- Expose `EXPO_PUBLIC_API_URL` to override base URL at runtime (mirrors web `VITE_API_URL`).
- Leave hardcoded `matkabooking.pro` endpoints for result flows as is (to match current behavior).

## Minimal Dependency List (Expo)
- expo
- @react-navigation/native, @react-navigation/native-stack, @react-navigation/bottom-tabs
- @tanstack/react-query
- axios
- expo-notifications (optional, for local notifications)
- expo-secure-store or @react-native-async-storage/async-storage

## Implementation Checklist
1. Initialize Expo app and install the libraries above.
2. Create axios `api` instance with same base URL.
3. Implement AuthContext with admin and user sessions.
4. Build Admin screens:
   - Dashboard, Markets CRUD, Users CRUD, Assignments CRUD, Holidays, Results CRUD, Final Ank CRUD, Free Fix CRUD, Settings.
5. Build User screens:
   - Dashboard (assigned markets, game status, live results), Upload Result, Free Fix.
6. Implement polling for in‑app notifications using `/user/game/status` and show local toasts/banners.
7. Test flows using same API bodies as in web hooks.

## Screen Specs (Summaries)
- Admin Dashboard: show counters and recent activity based on `/admin/get/dashboard-stats`.
- Markets: searchable list; detail edit modal; create form; delete with confirm.
- Users: list with edit modal; create form; toggle status; delete with confirm.
- Assignments: list with user and market; create entry; delete entry.
- Holidays: list and toggle `is_holiday`.
- Results: list by date/market; create result; delete result.
- Final Ank: list/create/delete by date/market.
- Free Fix: list/create/delete by market and date.
- User Dashboard: assigned markets cards; status notifications; live results ticker.
- Upload Result: market selection + result form; post to `matkabooking.pro`.

## Reference Files
- App routes: [App.tsx](file:///c:/Users/raman/Pictures/spdpboss_website/src/App.tsx)
- Auth: [AuthContext.tsx](file:///c:/Users/raman/Pictures/spdpboss_website/src/contexts/AuthContext.tsx), [ProtectedRoute.tsx](file:///c:/Users/raman/Pictures/spdpboss_website/src/components/ProtectedRoute.tsx)
- HTTP: [http.ts](file:///c:/Users/raman/Pictures/spdpboss_website/src/lib/http.ts)
- Admin hooks: see [hooks/admin](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/admin)
- User hooks: see [hooks/user](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/user)
- Main site data: [useMainWebsite.ts](file:///c:/Users/raman/Pictures/spdpboss_website/src/hooks/main/useMainWebsite.ts)

