import React, { Component } from "react";

import Loader from "../components/Loader";

const WithLoading = WrappedComponent => {
  return class WithLoadingComponent extends Component {
    render() {
      return Boolean(this.props.isFetching) ? (
        <Loader />
      ) : (
        <WrappedComponent {...this.props} />
      );
    }
  };
};

export default WithLoading;
