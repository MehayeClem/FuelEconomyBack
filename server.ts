import app from "./src";

try {
  app.listen(8081, () => {
    console.log(`Server is running on http://localhost:8081`);
  });
} catch (error) {
  console.error(error);
}
