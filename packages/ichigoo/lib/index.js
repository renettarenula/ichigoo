import React from "react";

const ALL_ROUTES = [];

/**
 * HoC to record all of the links on the main project. Useful for recording dynamic URLs.
 * This allows us to generate static HTML based on the routes listed here.
 * Everytime IchigooLink is used, it will capture the props and store it
 * in an array. This array will be used in order to generate static HTML.
 */
const IchigooLink = (Component) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.props = props;

      if (ALL_ROUTES.indexOf(this.props.to) === -1) {
        ALL_ROUTES.push(this.props.to);
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  };
};

export { IchigooLink, ALL_ROUTES };
