# My Professional Portfolio

Full Stack Developer portfolio showcasing AI-powered projects, web apps, and modern tech stack including React, Angular, Node.js, MongoDB, and Tailwind CSS.

## Projects
- **CareOS**: AI Hospital Management System with Grok AI integration and real-time features.
- **EstateIQ**: AI real estate platform for Pakistan and Middle East markets.
- **Nexus AI**: AI Project Planning Platform with task breakdowns and workflow management.

## Tech Stack
React, Angular, Node.js, MongoDB, TypeScript, Tailwind CSS, AWS, Docker

## Contact
Email: intikhabkhursheed@gmail.com

## Visitor notifications

Netlify sends a Resend email for eligible portfolio visits. Set these environment variables in Netlify (and in your local Netlify CLI environment):

- `RESEND_API_KEY`: API key for Resend.
- `NOTIFY_TO_EMAIL`: email address that should receive alerts.

Share links with a `?ref=` value, such as `https://your-domain.example/?ref=professor-name`, to see which link was used. Visit with `?owner=1` in each browser you use to permanently exclude it; the flag is stored in that browser's local storage.

To try it locally, configure both variables and run `netlify dev` from the project directory, then open the local site. Localhost is intentionally excluded from automatic notifications, so test the function directly with a POST to `http://localhost:8888/.netlify/functions/notify-visit` and a JSON body. For a production smoke test, send a POST to `https://your-domain.example/.netlify/functions/notify-visit` with `Content-Type: application/json` and a body such as `{"path":"/","referrer":"","ref":"manual-test","language":"en","screen":"1440x900","tz":"Asia/Karachi"}`. Avoid including personal visitor data in manual test requests.
