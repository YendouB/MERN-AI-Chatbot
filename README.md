# AI ChatBot (MERN Stack, TypeScript, and GPT API Integration)

This web application is a conversational AI chatbot built with MERN (MongoDB, Express.js, React.js, Node.js) stack and TypeScript. It leverages the powerful OpenAI API to provide intelligent and natural language responses, enabling users to engage in conversations on various topics.

## Features

- **Natural Language Processing**: Utilizes advanced natural language processing capabilities powered by the GPT API, allowing users to communicate with the chatbot in a natural and intuitive manner.

- **Contextual Understanding**: The chatbot can maintain context throughout conversations, providing relevant and coherent responses based on the flow of the conversation.

- **Multilingual Support**: Supports multiple languages, allowing users from different regions to interact with the chatbot in their preferred language.

- **Interactive UI**: Features a modern and user-friendly interface built with React.js

- **Real-time Messaging**: Supports real-time messaging, allowing for dynamic and responsive conversations between users and the chatbot

- **Restfull API** : The backend is built on API architecture so that we have a scalable application
- **Authentication, Authorization (JWT, HTTP Only Cookie)**

## Technologies Used

- **FRONTEND:** TypeScript, React.js, Material UI, Vitejs
- **BACKEND :** TypeScript, Node.js, Express.js
- **DATABASE :** MongoDB, Mongoose

## Getting Started

### Prerequisites
You should install
    Node.js : v18.12.0 (minimum)
    MongoDB : V6.0.3 (minimum)

### Installation

1. Clone the repository:
git clone https://github.com/your-username/your-repository.git

2. Navigate to the project directory

3. Install dependencies for the backend
cd backend
npm install

4. Install dependencies for the frontend
cd frontend
npm install

### Environment Setup

1. Create a `.env` file in the `backend` directory and add the following environment variables:

    OPEN_AI_SECRET=

    OPENAI_ORGANISATION_ID=

    MONGODB_URL=

    JWT_SECRET=

    COOKIE_SECRET=

    BACKEND_PORT=

    DOMAIN= (your web domain, it can be localhost)

2. In the `frontend/src/main.tsx` file, modify the `axios.defaults.baseURL` to match your backend server URL:

```typescript
axios.defaults.baseURL = "http://localhost:5000/api/v1";
```

3. In the `backend/app.ts`, modify the cors configuration to match your frontend server URL:

```typescript
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
```

### Running the Application on dev environnement
1. Start the frontend server:
cd frontend  
npm run dev

2. Start the frontend server:
cd backend  
npm run dev

## Acknowledgements
This project is based on the youtube tutorial by Indian Coders available at https://www.youtube.com/watch?v=PX_YOfEdhRg  
Thank to his video I've learned so many things


## Contact
email : jpminlekibe@gmail.com  
LinkedIn : www.linkedin.com/in/jean-pierre-minlekibe-155a93164