"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Navigation from "../../component/Navigation";

function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [account, setAccount] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  // Redirect if already logged in
  React.useEffect(() => {
    if (session) {
      // Redirect to the space page instead of homepage to avoid loops
      const space = window.location.pathname.split('/')[1];
      if (space && space !== 'login') {
        router.push(`/${space}`);
      } else {
        router.push("/");
      }
    }
  }, [session, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        username: account,
        password: password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials. Please try again.");
      } else if (result?.ok) {
        // Redirect to the space page instead of homepage
        const space = window.location.pathname.split('/')[1];
        if (space && space !== 'login') {
          router.push(`/${space}`);
        } else {
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (status === "loading") {
    return (
      <>
        <Navigation
          title="Log In"
          left=""
          right=""
          session={{}}
          myStyle={{
            color: "black",
            backgroundColor: "white",
            marginTop: "2rem",
          }}
          space=""
        />
        <main>
          <div className="login">
            <div>Loading...</div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navigation
        title="Log In"
        left=""
        right=""
        session={{}}
        myStyle={{
          color: "black",
          backgroundColor: "white",
          marginTop: "2rem",
        }}
        space=""
      />
      <main>
        <div className="login">
          <form onSubmit={handleSubmit}>
            {error && (
              <div style={{ color: "red", marginBottom: "1rem" }}>
                {error}
              </div>
            )}
            <input
              className="input"
              name="account"
              placeholder="account"
              id="account"
              type="text"
              value={account}
              onChange={(event) => {
                setAccount(event.target.value);
              }}
              required
            />
            <input
              name="password"
              className="input"
              placeholder="password"
              id="password"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
            />
            <button 
              className="button primary" 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </form>
          
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <p>Or sign in with:</p>
            <button
              onClick={() => {
                const space = window.location.pathname.split('/')[1];
                const callbackUrl = space && space !== 'login' ? `/${space}` : "/";
                signIn("github", { callbackUrl });
              }}
              style={{ margin: "0.5rem", padding: "0.5rem 1rem" }}
            >
              GitHub
            </button>
            <button
              onClick={() => {
                const space = window.location.pathname.split('/')[1];
                const callbackUrl = space && space !== 'login' ? `/${space}` : "/";
                signIn("google", { callbackUrl });
              }}
              style={{ margin: "0.5rem", padding: "0.5rem 1rem" }}
            >
              Google
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Login;
