# EcoVolt — Smart Energy Saving System

Next.js (App Router) + Tailwind CSS + Firebase (Auth, Firestore, RTDB) website
for the EcoVolt / Smart Energy Saving System FYP project.

## 1. Setup

```bash
npm install
```

Copy `.env.local.example` to `.env.local` and fill in your Firebase project
config values (Firebase Console → Project Settings → General → Your apps →
Web app → SDK setup and configuration).

```bash
cp .env.local.example .env.local
```

Run locally:

```bash
npm run dev
```

Open http://localhost:3000

## 2. Firebase structure this site expects

### Firestore
- `appliances/{id}` — fields: `name` (string), `type` (string: "light" | "fan" | "socket"), `watt` (number)
- `config/tariff` — field: `ratePerKwh` (number) — currently read as a fallback default (0.218) in the Consumption page; wire this up to read live if you want it dynamic
- `consumption/{id}` — fields: `name` (string), `hours` (number, this month), `kwh` (number, this month)

### Realtime Database
```
switches/
  light1: false
  light2: false
  fan: false
  socket1: false
  socket2: false
occupancy/
  count: 0
lux/
  average: 0
device/
  online: true   <-- set this true on ESP32 connect, and use
                      Firebase.RTDB.setBool with onDisconnect()
                      to auto-flip to false when it drops
```

## 3. Pages
- `/` — landing page (company info, project synopsis, media, contact)
- `/login` — email/password login + forgot password (Firebase reset email)
- `/dashboard` — 2x2 feature grid: Consumption, Switches, Occupancy, Lux
- `/dashboard/consumption` — composed chart (bar + line) + table + total bill
- `/dashboard/switches` — appliance toggles pulled from Firestore, live state from RTDB

## 4. Still to wire up (marked in code / left as an exercise)
- Toast notifications for unusual consumption spikes (needs a consumption
  threshold check, e.g. in a Cloud Function or client-side comparison)
- Admin-only tariff rate editing (not exposed to customers — do this via
  Firebase Console directly, or build a separate admin-only route later)
- Actual images/video in the Media section (currently placeholders with borders)
- Deploying to Vercel with custom domain `ecovolt.net.my`

## 5. Deploying
1. Push this project to a GitHub repo
2. Import into Vercel
3. Add the same `.env.local` variables under Vercel → Project → Settings → Environment Variables
4. Add `ecovolt.net.my` under Vercel → Project → Settings → Domains, and point its DNS (via your MYNIC registrar) to Vercel's records
