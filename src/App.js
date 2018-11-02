import React, {Component} from 'react';
import classNames from 'classnames';
import {AppTopbar} from './AppTopbar';
import {AppFooter} from './AppFooter';
import {AppMenu} from './AppMenu';
import {AppInlineProfile} from './AppInlineProfile';
import {Route,withRouter, Redirect} from 'react-router-dom';
import {Dashboard} from './components/Dashboard';
import {RecursoDigital} from './components/RecursoDigital';
import {ScrollPanel} from 'primereact/components/scrollpanel/ScrollPanel';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'fullcalendar/dist/fullcalendar.css';
import './layout/layout.css';
import './App.css';
import { EmptyPage } from './components/EmptyPage';
import PropTypes from 'prop-types'


class App extends Component {

    constructor() {
        super();
        this.state = {
            layoutMode: 'static',
            layoutColorMode: 'dark',
            staticMenuInactive: false,
            overlayMenuActive: false,
            mobileMenuActive: false,
            searchEtiqueta:''
        };

        this.onWrapperClick = this.onWrapperClick.bind(this);
        this.onToggleMenu = this.onToggleMenu.bind(this);
        this.onSidebarClick = this.onSidebarClick.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.updateInputSearch= this.updateInputSearch.bind(this);
        this.onHandleEventInputSearch=this.onHandleEventInputSearch.bind(this);
        this.createMenu();
        
    }

    onWrapperClick(event) {
        if (!this.menuClick) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            });
        }

        this.menuClick = false;
    }

    

     updateInputSearch(event) {
        this.setState({
            searchEtiqueta: event.target.value
        });
        }

        onHandleEventInputSearch(event) {
       
            const value = event.target.value;
            console.log('event.keyCode--->'+event.keyCode);
            console.log(this.props.history);
          
            if(event.keyCode===13){
           
                 if(value!==''){
                   // window.location = '#/recursos/?label='
                    const url='/recursos/';//+'?label='+value;
                   const pathNew=url+'?label='+value;
                
                    this.props.history.location.hash=value;
                    this.props.history.location.state={}
                    console.log(this.props.history.location);
                    if(url!==this.props.history.location.pathname ){ 
                        console.log('push');
                        this.props.history.push({pathname: url, state: {bar:'foo1'}, search: '?label='+value});
                    }else{
                        //window.location =  '?label='+value;
                        console.log('replace');
                        //this.props.history.push('?label='+value);
                       /* this.props.history.replace({
                            pathname: '/buscarecursos', 
                            state: {bar:'foo1'}, search: '?label=' + value
                        });*/
                        //this.props.history.push('/buscar/recursos/?label='+value);
                        this.props.history.push({pathname: '/buscar/recursos/', state: {bar:'foo2'}, search: '?label='+value});
                        //window.location.reload();
                        //this.props.history.block();
                    }
                    //this.props.history.push('/');
                   
                   // this.props.history.goForward(url);
                 
                    console.log('updateInputSearch-url--->'+url);
                }
            }
       //event.preventDefault();
        }

        

     

    onToggleMenu(event) {
        this.menuClick = true;

        if (this.isDesktop()) {
            if (this.state.layoutMode === 'overlay') {
                this.setState({
                    overlayMenuActive: !this.state.overlayMenuActive
                });
            }
            else if (this.state.layoutMode === 'static') {
                this.setState({
                    staticMenuInactive: !this.state.staticMenuInactive
                });
            }
        }
        else {
            const mobileMenuActive = this.state.mobileMenuActive;
            this.setState({
                mobileMenuActive: !mobileMenuActive
            });
        }
       
        event.preventDefault();
    }

    onSidebarClick(event) {
        this.menuClick = true;
        setTimeout(() => {this.layoutMenuScroller.moveBar(); }, 500);
    }

    onMenuItemClick(event) {
        if(!event.item.items) {
            this.setState({
                overlayMenuActive: false,
                mobileMenuActive: false
            })
        }
    }

    createMenu() {
        this.menu = [
            {label: 'Dashboard', icon: 'pi pi-fw pi-globe', command: () => {window.location = '#/'}},
            {
                label: 'Recursos', icon: 'pi pi-fw pi-globe',
                items: [
                    {label: 'Buscar Recursos', icon: 'pi pi-fw pi-star-o', command: () => {window.location = '#/recursos/?label='}}
                ]
            },
            {
                label: 'Menu Modes', icon: 'pi pi-fw pi-cog',
                items: [
                    {label: 'Static Menu', icon: 'pi pi-fw pi-bars',  command: () => this.setState({layoutMode: 'static'}) },
                    {label: 'Overlay Menu', icon: 'pi pi-fw pi-bars',  command: () => this.setState({layoutMode: 'overlay'}) }
                ]
            },
            {
                label: 'Menu Colors', icon: 'pi pi-fw pi-align-left',
                items: [
                    {label: 'Dark', icon: 'pi pi-fw pi-bars',  command: () => this.setState({layoutColorMode: 'dark'}) },
                    {label: 'Light', icon: 'pi pi-fw pi-bars',  command: () => this.setState({layoutColorMode: 'light'}) }
                ]
            }
        ];
    }

    addClass(element, className) {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    }

    removeClass(element, className) {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    componentDidUpdate() {
        if (this.state.mobileMenuActive)
            this.addClass(document.body, 'body-overflow-hidden');
        else
            this.removeClass(document.body, 'body-overflow-hidden');
    }

    render() {
        let logo = this.state.layoutColorMode === 'dark' ? 'assets/layout/images/logo-white.svg': 'assets/layout/images/logo.svg';

        let wrapperClass = classNames('layout-wrapper', {
            'layout-overlay': this.state.layoutMode === 'overlay',
            'layout-static': this.state.layoutMode === 'static',
            'layout-static-sidebar-inactive': this.state.staticMenuInactive && this.state.layoutMode === 'static',
            'layout-overlay-sidebar-active': this.state.overlayMenuActive && this.state.layoutMode === 'overlay',
            'layout-mobile-sidebar-active': this.state.mobileMenuActive
        });
        let sidebarClassName = classNames("layout-sidebar", {'layout-sidebar-dark': this.state.layoutColorMode === 'dark'});

        return (
            <div className={wrapperClass} onClick={this.onWrapperClick}>
                <AppTopbar onToggleMenu={this.onToggleMenu} 
                onBuscarRecursos={this.updateInputSearch} 
                valueSearch={this.state.searchEtiqueta}
                onEventBuscarRecursos={this.onHandleEventInputSearch}/>

                <div ref={(el) => this.sidebar = el} className={sidebarClassName} onClick={this.onSidebarClick}>

                    <ScrollPanel ref={(el) => this.layoutMenuScroller = el} style={{height:'100%'}}>
                        <div className="layout-sidebar-scroll-content" >
                            <div className="layout-logo">
                                <img alt="Logo" src={logo} />
                            </div>
                            <AppInlineProfile />
                            <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} />
                        </div>
                    </ScrollPanel>
                </div>

                <div className="layout-main">
				
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/recursos/" component={RecursoDigital}  />
                    <Route path="/detalle/recurso" component={EmptyPage} />
                    <Route path="/buscar/recursos/" component={RecursoDigital} />
                   

                   
                </div>

                <AppFooter />

                <div className="layout-mask"></div>
            </div>
        );
    }
}

//export default App;
export default withRouter(App)
