import withRedux from 'next-redux-wrapper';
import React, { Component } from 'react';
import { compose } from 'redux';

import Head from '../components/Head';
import Nav from '../components/Nav';
import { initStore, login } from '../store';
import withRoot from '../utils/material-ui/withRoot';

class Login extends Component {
    state = {
        username: '',
        password: '',
        errorMessage: '',
    };

    handleOnChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    handleLoginSubmit = e => {
        e.preventDefault();
        const { dispatch }: any = this.props;
        const payload = {
            user: {
                username: this.state.username,
                password: this.state.password,
            },
        };
        dispatch(login(payload)).catch(err => {
            this.setState({ errorMessage: err.response.data.message });
        });
    };

    render() {
        const { user }: any = this.props;
        return (
            <div>
                <Head title="Login" />
                <Nav user={user} />

                <form onSubmit={this.handleLoginSubmit}>
                    <div>
                        <label>Username</label>
                        <input
                            type="text"
                            name="username"
                            onChange={this.handleOnChange}
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={this.handleOnChange}
                        />
                    </div>
                    <div>
                        <button>Login</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default compose<any>(withRoot(), withRedux(initStore))(Login);
