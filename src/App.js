import React, { Component } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import HomeContainer from "./containers/HomeContainer";
import CreatePageContainer from "./containers/CreatePageContainer";
import NewsPageContainer from "./containers/NewsPageContainer";
import ProtectedRoute from "./hoc/ProtectedRoute";
import Header from "./components/Header";
import NotFound from "./components/NotFound";

import { initAPI } from "./actions/authActions";

class App extends Component {
  componentDidMount() {
    this.props.initAPI();
  }

  render() {
    return (
      <div className="App">
        <Header />
        <main className="main">
          <div className="container">
            {!this.props.isLoggedIn && (
              <p className="message">
                Чтобы писать и редактировать новости нужно авторизоваться
              </p>
            )}
            <Switch>
              <Route path="/" exact component={HomeContainer} />
              <ProtectedRoute
                isAuth={this.props.isLoggedIn}
                path="/news/create"
                component={CreatePageContainer}
              />
              <Route path="/news/:id" component={NewsPageContainer} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </main>

        <footer className="footer">
          <div className="container">
            <div className="links">
              <a href="https://vk.com/maxpfrontend?w=wall-151851243_883">
                Обучение "Без Воды" - Тестовое задание #3
              </a>
              <a href="https://github.com/ZackFox/">Aвтор: ZackFox</a>
              <a href="mailto:sergshirayev@gmail.com">sergshirayev@gmail.com</a>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      isLoggedIn: state.authReducer.isLoggedIn,
    }),
    { initAPI },
  )(App),
);
