import { useRouteError } from "react-router-dom";

interface AppErrors {
    message: string;
    status?: number;
    statusText?: string;
}

const Errors = () => {
    const error = (useRouteError() as AppErrors)
    // console.error(error);
  return (
    <div id="error-page">
    <h1>Oops!</h1>
    <p>Sorry, an unexpected error has occurred.</p>
    <p>
      <i>{error.statusText || error.message}</i>
    </p>
  </div>
  )
}

export default Errors