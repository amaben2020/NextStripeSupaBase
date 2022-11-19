export default function Login({ handleLogin, handleLoginChange }) {
  return (
    <div>
      <div>
        <h1>Chattr</h1>
        <p>your chats, your way</p>
      </div>

      <form onSubmit={handleLogin}>
        <p>Enter your name to start:</p>
        <div>
          <input
            type='text'
            onChange={handleLoginChange}
            placeholder='your name'
          />
          <button>Sign in to get started </button>
        </div>
      </form>
    </div>
  );
}
