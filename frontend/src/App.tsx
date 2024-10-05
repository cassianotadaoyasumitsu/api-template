import { useEffect, useState } from 'react';
import './App.css';
import axios  from 'axios';


// Define a User type
interface User {
    email: string;
}

function App() {
    // Initialize state with a proper type
    const [user, setUser] = useState<User | null>(null); // User can be null initially

    // Declare constants with types
    const client_id: string = import.meta.env.VITE_CLIENT_ID as string;
    const client_secret: string = import.meta.env.VITE_CLIENT_SECRET as string;

    // Use useEffect to trigger login on component mount
    useEffect(() => {
        login();
    }, []);

    // Add return type to the function
    const login = async (): Promise<void> => {
        const data = {
            grant_type: "password", // Add the correct grant type no change
            email: "email@email.com", // Add the correct email
            password: "123456", // Add the correct password
            client_id: client_id,
            client_secret: client_secret,
        };

        try {
            const response = await axios.post(
                "http://localhost:3000/v1/users/oauth/token",
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
            );
            setUser(response.data.user);
            console.log(response);
        } catch (error) {
            // Check if it's an AxiosError
            if (axios.isAxiosError(error)) {
                // Axios-specific error handling
                console.error("Axios error message:", error.message);
                if (error.response) {
                    console.log("Response data:", error.response.data);
                    console.log("Response status:", error.response.status);
                }
            } else {
                // Generic error handling for other types of errors
                console.error("Unknown error:", error);
            }
        }
    };

    return (
        <div className="App">
            <h1>The API</h1>
            <h3>Current User: {user ? user.email : 'No user logged in'}</h3>
        </div>
    );
}

export default App;
