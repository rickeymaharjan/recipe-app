import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

const WithAuthRedirect = (Component, redirectPath) => {
  const WrappedComponent = (props) => {
    const isAuth = useSelector((state) => state.auth.isAuthenticated)

    // Redirect to the specified path if authenticated
    if (isAuth && redirectPath) {
      return <Navigate to={redirectPath} />
    }

    // Redirect to login if not authenticated
    if (!isAuth && !redirectPath) {
      return <Navigate to="/login" />
    }

    // Render the component if no redirection is needed
    return <Component {...props} />
  }

  WrappedComponent.displayName = `WithAuthRedirect(${
    Component.displayName || Component.name || "Component"
  })`

  return WrappedComponent
}

export default WithAuthRedirect
