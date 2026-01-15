\# \*\*App Name\*\*: ResponseConnect



\## Core Features:



\- SOS Button: A prominent 'SOS' button for requesters to signal an emergency.

\- Volunteer Dashboard: Displays active emergency alerts nearby and allows volunteers to toggle their availability.

\- Real-time Location Tracking: Uses Google Maps to display the requester's location to the volunteer, updated in real time via Firebase Realtime Database.

\- Alert System: Firestore database triggers a Cloud Function that identifies nearby available volunteers (within 2km using Geo-hashing) and sends high-priority FCM notifications. Track nearby volunteers responding to an alert.

\- Role-Based Authentication: Supports 'Requester' and 'Volunteer' roles with different app modes. Includes user profile details such as name, phone, skills, and location saved to Firestore.

\- Real-time Chat and Voice Notes: Enables requesters and volunteers to communicate via text chat and exchange voice notes.



\## Style Guidelines:



\- Primary color: Urgent red (#FF4136) for main actions and alerts.

\- Background color: Soft white (#F0F0F0) to ensure readability and a sense of calm.

\- Accent color: Muted blue (#0074D9) for interactive elements and secondary information to complement the urgent red without causing visual noise.

\- Headline font: 'Space Grotesk' sans-serif, for headlines. Body font: 'Inter' sans-serif, for body. Ensure clarity and legibility.

\- Use simple, universally recognizable icons for alerts and actions.

\- Prioritize clarity and ease of use, especially in emergency situations.

\- Subtle animations to guide user interaction and provide feedback, but avoid distracting or unnecessary animations.

