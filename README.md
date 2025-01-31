[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/n9JPUTT8)
[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=17972749)
## CS472 Final Project January 2025: Contacts Manager Application
Description: Create a contacts management app where users can store and manage their contacts. Use the Node filesystem to store contact details (name, phone, email, etc.) in JSON file.

## Features:
* Add, edit, and delete contacts. Store contacts in a JSON file using the Node filesystem.
  * Use the [`uuid`](https://www.npmjs.com/package/uuid) library to generate a unique `id`.
* View a list of all contacts with details.
* Add a feature to bookmark important contacts, that will always appear on top of the contacts list.
* Search contacts by name, implement a real-time search filter that updates the contact list as the user types (filter contacts at frontend).
* Create a fast-filter feature by the first letter of contact name, display all English alphabets on top, when clicked, filter the contacts accordingly.
* Enable users to export all contacts as `.vcf` files (vCard format) and download all exported `.vcf` files as a single compressed `.zip` file:
  * Use the [`vcf`](https://www.npmjs.com/package/vcf) library to create `.vcf` files.
  * Use the [`archiver`](https://www.npmjs.com/package/archiver) library to create `.zip` files.

## API Endpoints:
* `GET /contacts`: Fetch all contacts.
* `POST /contacts`: Add a new contact.
* `PATCH /contacts/:id`: Update an existing contact.
* `DELETE /contacts/:id`: Delete a contact.
* `GET /contacts/export`: Export all contacts as `.vcf` files, compress and download as a `.zip` file.

## File-Based Storage `contacts.json`:
```typescript
[
  {
    "id": "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed",
    "name": "Asaad Saad",
    "phone": "123-456-7890",
    "email": "asaad@miu.edu",
    "bookmarked": false
  }
]
```

## Tech Stack: 
React for the frontend, Express for the backend, and Node filesystem for data persistence.
* Use React Router for navigation between pages.
* Leverage TailwindCSS for quick and responsive styling.
* Use Express API endpoints to handle CRUD operations and interact with the filesystem.
* Validate user inputs on both the frontend and backend to ensure data integrity. (Use [`Zod`](https://www.npmjs.com/package/zod))

## Evaluation Criteria
* Does the application meet all specified requirements?
* Are all features implemented and working correctly?
* Is the code well-organized and easy to understand?
* Are best practices followed for both React and Express?
* Is the user interface intuitive and visually appealing?

### Notes
* A commit per feature is required, with a meaningful commit message.
* A daily push is required to track your code progress and measure your performance.
* You may only use and submit code to the repository provided by `maharishi-university` organization, do not submit code to your personal repository.
* Students are expected to be available on MS-Teams to receive calls and check on their progress every day from 10:00 AM to 12:00 PM, and 2:00 PM to 3:00 PM during the project.

## Need assistance?
Feel free to contact me any day between 10:00 AM to 12:00 PM, and 2:00 PM to 5:00 PM, except for Sunday. I’m available to assist all teams with all kinds of requests (system design, backend, frontend, fixing code bugs.. etc). The project is a learning experience and I want everyone to finish the project successfully and meet the course learning outcomes.

## Final Evaluation 
* The submission deadline is on Wednesday at 9:00 PM. Students are expected to submit a screen recorded video that demonstrate the project features, and how to use the system. Do not show or explain your code patterns. Please send me the video URL via a message on Teams. I might invite you to a meeting after the final exam to discuss your project if needed.
* It's advised that you submit your code on Wednesday morning, and prepare for your final exam.
* Your final exam will be on Thursday, from 10:00 AM to 12:00 PM, in the M115 classroom. Time management is key, finish your project early to allow time for exam preparation.

Good luck, and happy coding!

_Code Honor Submission Policy: Remember to respect the code honor submission policy. All written code must be original. You may not share any part of your code with other students. Code duplications will results to receiving NC for the final project. Presenting any code as one’s own work when it came from another source is plagiarism, which includes any matching patterns and code snippets, and will affect your grade. The use of AI is not permitted in this assignment. For more details, check the full course policies in the syllabus._
