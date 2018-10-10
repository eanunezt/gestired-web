import React, {Component} from 'react';
import {Dialog} from 'primereact/dialog';
//import {Panel} from 'primereact/panel';
import {RecursoService} from '../service/RecursoService';
import {DataView, DataViewLayoutOptions} from "primereact/dataview";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {InputText} from 'primereact/inputtext';
import {Card} from 'primereact/card';

export class RecursoDigital extends Component {
    constructor() {
        super();
        this.state = { 
            recursos: [],
            recursos2: [],
            layout: 'grid',
            selectedRecurso: null, 
            visible: false,
            sortKey: null,
            sortOrder: null
        };
        this.recursoService = new RecursoService();
        this.itemTemplate = this.itemTemplate.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
    }
    componentDidMount() {
        this.recursoService.getRecursosLarge().then(data => this.setState({recursos: data}));
        this.recursoService.getRecursos().then(data => this.setState({recursos2: data}));
    }

    onSortChange(event) {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            this.setState({
                sortOrder: -1, 
                sortField: value.substring(1, value.length), 
                sortKey: value
            });
        }
        else {
            this.setState({
                sortOrder: 1, 
                sortField: value, 
                sortKey: value
            });
        }
    }

    renderListItem(recurso) {
        if (!recurso) {
            return;
        }
        let srcImg = "assets/demo/images/recurso/" + recurso.brand + ".png";
        return (
            <div className="p-col-12" style={{padding: '2em', borderBottom: '1px solid #d9d9d9'}}>
                <div className="p-col-12 p-md-3">
                    <img src={srcImg} alt={recurso.brand}/>
                </div>
                <div className="p-col-12 p-md-8 recurso-details">
                    <div className="p-grid">
                        <div className="p-col-2 p-sm-6">Vin:</div>
                        <div className="p-col-10 p-sm-6">{recurso.vin}</div>

                        <div className="p-col-2 p-sm-6">Year:</div>
                        <div className="p-col-10 p-sm-6">{recurso.year}</div>

                        <div className="p-col-2 p-sm-6">Brand:</div>
                        <div className="p-col-10 p-sm-6">{recurso.brand}</div>

                        <div className="p-col-2 p-sm-6">Color:</div>
                        <div className="p-col-10 p-sm-6">{recurso.color}</div>
                    </div>
                </div>

                <div className="p-col-12 p-md-1 search-icon" style={{marginTop:'40px'}}>
                    <Button icon="pi pi-search" onClick={(e) => this.setState({ selectedRecurso: recurso, visible: true })}></Button>
                </div>
            </div>
        );
    }

    renderGridItem(recurso) {
        if (!recurso) {
            return;
        }
       
        return (
            <div style={{ padding: '.5em' }} className="p-col-12 p-md-3">

              <Card title={recurso.vin} subTitle={recurso.brand} style={{ textAlign: 'center' }}>
                <div className="recurso-detail">{recurso.year} - {recurso.color}</div>
                    <hr className="ui-widget-content" style={{ borderTop: 0 }} />
                  
                    <a onClick={(e) => this.setState({ selectedRecurso: recurso, visible: true })} style={{ cursor: 'pointer'}}>
                    
                        <span className="pi pi-search"/>
                    </a>
            </Card>
               
            </div>
        );
    }

    itemTemplate(recurso, layout) {
        if (!recurso) {
            return;
        }

        if (layout === 'list')
            return this.renderListItem(recurso);
        else if (layout === 'grid')
            return this.renderGridItem(recurso);
    }

    renderRecursoDialogContent() {
              
        if (this.state.selectedRecurso) {

          //  let srcImg = "assets/demo/images/recurso/" + this.state.selectedRecurso.brand + ".png";
            return (


                <Card title={this.state.selectedRecurso.vin} subTitle={this.state.selectedRecurso.brand} style={{ textAlign: 'center' }}>
                <div className="recurso-detail">
                {this.state.selectedRecurso.year} - {this.state.selectedRecurso.color}
                </div>
                    <hr className="ui-widget-content" style={{ borderTop: 0 }} />
                  
                   
            </Card>
               
            );
        }
        else {
            return null;
        }
    }

    renderHeader() {
        const sortOptions = [
            {label: 'Newest First', value: '!year'},
            {label: 'Oldest First', value: 'year'},
            {label: 'Brand', value: 'brand'}
        ];

        return (
            <div className="p-g">            
            <div className="p-g-6 p-md-4 filter-container">
                    <div style={{position:'relative'}}>
                        <InputText placeholder="Buscar por Etiqueta" onKeyUp={e => this.onSortChange} />
                       <Button icon="pi pi-search" ></Button>
                    </div>
                    
                </div> 
                <div className="p-g-6 p-md-4 filter-container">
                    <div className="p-col-6" style={{textAlign: 'left'}}>
                    <Dropdown options={sortOptions} value={this.state.sortKey} placeholder="Ordenar por" onChange={this.onSortChange} />
                    </div>
                </div>
               
                
            </div>

            
            
        );
    }

    render() {
        const header = this.renderHeader();

        return (
            <div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>Recursos</h1>
                        <p>Formulario de búsqueda de recurso.</p>
                    </div>
                </div>

                <div className="content-section implementation">
                    <DataView value={this.state.recursos} layout={this.state.layout} header={header} 
                            itemTemplate={this.itemTemplate} paginatorPosition={'both'} paginator={true} rows={20} 
                            sortOrder={this.state.sortOrder} sortField={this.state.sortField} />

                    <Dialog header="Recurso Details" visible={this.state.visible} width="225px" modal={true} onHide={() => this.setState({visible: false})}>
                        {this.renderRecursoDialogContent()}
                    </Dialog>
                </div>
            </div>
        );
    }
}

