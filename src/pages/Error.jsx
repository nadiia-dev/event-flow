import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";

const Error = () => {
  const error = useRouteError();
  let title = "An error occurred";
  let message = "Something went wrong!";

  if (error.status === 500) {
    message = JSON.parse(error.data).message;
  }

  if (error.status === 404) {
    title = "Not found";
    message = "Could not find rosourse or page";
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
};

export default Error;
