import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import useMeta from "../hooks/useMeta";

import { useAuth } from "../context/AuthContext";

export default function Login() {
    useMeta({
        title: "Login | Tan's Stash",
        description: "Admin login page",
    });

    const { login } = useAuth();

    // const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const currentYear = new Date().getFullYear();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setLoading(true);
        setError(null);

        try {
            await login(username, password);
        } catch (err: any) {
            setError("Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "117px" }}>
            <form className="form-signin" onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="uname"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label htmlFor="uname">User Name</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="password"
                        className="form-control"
                        id="pass"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="pass">Password</label>
                </div>

                {error && (
                    <div className="text-danger mb-3">
                        {error}
                    </div>
                )}

                <button
                    className="btn btn-primary w-100 py-2"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Signing in..." : "Sign in"}
                </button>

                <p className="mt-5 mb-3 text-body-secondary text-center">
                    &copy; 2023–{currentYear}
                </p>
            </form>
        </div>
    );
}