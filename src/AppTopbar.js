import React, {Component} from 'react';
import {InputText} from 'primereact/inputtext';
import PropTypes from 'prop-types';

export class AppTopbar extends Component {

    /*constructor() {
        super();
        this.state = {
            searchEtiqueta: 'hola'
        };
    }*/
    static defaultProps = {
        onToggleMenu: null,
        onBuscarRecursos:null,
        onEventBuscarRecursos:null,
        valueSearch:''
    }

    static propTypes = {
        onToggleMenu: PropTypes.func.isRequired,
        onBuscarRecursos: PropTypes.func.isRequired,
        onEventBuscarRecursos: PropTypes.func.isRequired,
        valueSearch: PropTypes.string.isRequired
    }

    render() {
        return (
            <div className="layout-topbar clearfix">
                <a className="layout-menu-button" onClick={this.props.onToggleMenu}>
                    <span className="pi pi-bars"/>
                </a>
                <div className="layout-topbar-icons">
                        <span className="layout-topbar-search" >
                        <InputText type="text" placeholder="Buscar Recursos" style={{width:'250px'}} 
                        onChange={this.props.onBuscarRecursos}
                        onKeyUp=  {this.props.onEventBuscarRecursos}                      
                        value={this.props.valueSearch}/>
                        <span className="layout-topbar-search-icon pi pi-search"/>
                    </span>
                    <a>
                        <span className="layout-topbar-item-text">User</span>
                        <span className="layout-topbar-icon pi pi-user"/>
                    </a>
                </div>
            </div>
        );
    }
}