import { redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { authenticate } from "../utils/http";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;

  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw new Response({ message: "Unsupported mode" }, { status: 422 });
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const token = await authenticate(authData, mode);

  localStorage.setItem("token", token);
  const expiration = new Date();

  expiration.setHours(expiration.getHours() + 1);
  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/");
}
