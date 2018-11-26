import React, { Component } from 'react';
import Header from './../../components/Header/header'
import './layout.css';
import Footer from './../../components/footer/footer'

class Layout extends Component {
    state = {
        showNav: false
    }

    toggleSidenav = (action) =>
    {
        this.setState({
            showNav:action
        })
    }

    render() {
        return (
            <div>
                <Header
                    showNav = {this.state.showNav}
                    onHideNav = {()=>this.toggleSidenav(false)}
                    onOpenNav = {()=>this.toggleSidenav(true)}
                />
                {this.props.children}
                <Footer/>
            </div>
        );
    }
}

export default Layout;
//14th