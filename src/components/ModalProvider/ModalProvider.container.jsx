// @flow
/* eslint-disable react/no-unused-state */
import * as React from 'react';

const ModalContext = React.createContext({
  component: null,
  props: {},
  showModal: () => {},
  hideModal: () => {},
});

type Props = {
  children: React.Node,
};
type State = {
  component: React.Node,
  props: *,
  showModal: Function,
  hideModal: Function,
};

export class ModalProvider extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      component: null,
      props: {},
      showModal: this.showModal,
      hideModal: this.hideModal,
    };
  }

  showModal = (component: React.Node, props: $PropertyType<State, 'props'> = {}) => {
    this.setState({
      component,
      props,
    });
  };

  hideModal = () => this.setState({
    component: null,
    props: {},
  });

  render() {
    const { children } = this.props;
    return (
      <ModalContext.Provider value={this.state}>
        { children }
      </ModalContext.Provider>
    );
  }
}

export const ModalConsumer = ModalContext.Consumer;
