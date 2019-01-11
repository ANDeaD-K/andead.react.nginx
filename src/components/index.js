import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import { Provider, connect } from 'react-redux';

import configureStore from '../store/configureStore';
import { checkAuthUser } from '../actions/authorize';
import VKAuth from './vk-auth';

class _Index extends Component {
    constructor(props) {
        super(props);

        this.cookies = new Cookies();
        this.cookiesName = 'access_token';
    }

    componentWillMount() {
        this.props.checkAuthUser(this.cookies.get(this.cookiesName));
    }

    render() {
        return (
            <>
                <VKAuth />
            </>
        );
    }
}

export const store = configureStore();

const mapDispatchToProps = (dispatch) => {
    return {
        checkAuthUser: (accessToken) => dispatch(checkAuthUser(accessToken))
    };
};

const Index = connect(null, mapDispatchToProps)(_Index);
export default Index;

ReactDOM.render(
    <Provider store={store}>
        <Index />
    </Provider>,
    document.getElementById('index')
);