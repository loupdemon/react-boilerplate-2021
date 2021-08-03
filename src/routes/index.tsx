import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { defaultQueryFn } from "../api/request";
import theme from "../assets/theme";
import { NotFound } from "../views";

const Home = lazy(() => import("../views/Home/Home"));

export const siteMap = {
  HomePage: {
    title: "Home",
    path: "/",
    description: "My home page",
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});

const IndexRouter: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router basename={window.location.pathname || ""}>
          <Suspense fallback={<p>Loading...</p>}>
            <Switch>
              <Route exact path={siteMap.HomePage.path} component={Home} />
              <Route component={NotFound} />
            </Switch>
          </Suspense>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default IndexRouter;
