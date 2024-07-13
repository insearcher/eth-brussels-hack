// src/app/login/page.tsx
export default function LoginPage() {
	return (
	  <div className="centered-content">
		<h1>Login Page</h1>
		<form>
		  <label>
			Username:
			<input type="text" name="username" />
		  </label>
		  <br />
		  <label>
			Password:
			<input type="password" name="password" />
		  </label>
		  <br />
		  <button type="submit">Login</button>
		</form>
	  </div>
	);
  }
  