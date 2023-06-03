export async function checkSession() {
  try {
    const response = await fetch("http://localhost:3000/auth/session", {
      method: "GET",
    });
    if (!response.ok) {
      console.log("RUNNING");
      throw new Error("Failed to fetch data from the endpoint");
    } else if (response) {
      const session = await response.json();
      // Handle the retrieved data here

      console.log("SESSION", session.session.user);
      return session.session.user;
    }
  } catch (error) {
    // Handle the error here
    console.error(error);
  }
}
