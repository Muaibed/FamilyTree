# Gosn | غصن

Gosn is a web application that provide visual representaions of family trees. Make it easy on you to keep track of your family members from their oldest to the youngest, with optional details like birth date, death date, and spouses.

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Screenshots](#screenshots)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Features

- Authentication & Authorization - Credintial-based login and RBAC.
- Email Verification - Resend is used to verify email addressess.
- Background job processing with QStash - When a name changes, QStash queues an update task to dynamically recalculate and propagate full names across all related ancestors/descendants without blocking user requests.
- Family records with root person - Create families, assign a root person, and fetch hierarchical family data. Supports multiple families per user.
- CRUD for person - Add, edit, and remove persons, including first name, gender, birth date.
- Parent, child, and spouse connections - Track relationships with relational integrity.
- Reusable searchable dropdowns - Search persons or families by name with dynamic filtering.
- Modular API routes - Endpoints for persons, families, and relationships.
- Request/approve workflow - Users can submit changes, and admins approve or reject them, to keep the family tree data consistent.
- Export Tree - export the generated tree as a SVG file.
- Compatible with both desktop and mobile devices.
- Dark/Light modes.

---

## Tech Stack

- **Frontend:** React, Next.js  
- **Backend:** Node.js
- **Database:** PostgreSQL  
- **Other Tools:** Prisma, Docker, RESEND, QStash, TailwindCSS

---

## Screenshots

Here are some screenshots of the project in action:

![Homepage Screenshot](path/to/homepage.png)  
*Homepage of the app showing main features*

![Feature Screenshot](path/to/feature.png)  
*Example of a specific feature or page*

---

## Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository  
2. Create a new branch for your feature or fix:  
   ```bash
   git checkout -b feature/YourFeature
3. Make your changes and commit them:
   ```bash
   git commit -m "Add some feature"
4. Push your branch to your forked repository:
   ```bash
   git push origin feature/YourFeature
5. Open a Pull Request on the main repository
   
---

## License

This project is licensed under the [MIT License](LICENSE).
