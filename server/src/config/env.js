export const validateEnv = () => {
  const required = ["GROQ_API_KEY", "MONGODB_URI"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error(
      `\n❌ Missing required environment variables:\n   ${missing.join(", ")}\n\n` +
        `   Please copy server/.env.example to server/.env and fill in all values.\n`
    );
    process.exit(1);
  }
};
