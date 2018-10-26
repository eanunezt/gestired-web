import React, {Component} from 'react';
import {Dialog} from 'primereact/dialog';
import {RecursoService} from '../service/RecursoService';
import {DataView} from "primereact/dataview";
import {Button} from "primereact/button";
import {Dropdown} from "primereact/dropdown";
import {InputText} from 'primereact/inputtext';
import {Card} from 'primereact/card';
import { withRouter } from 'react-router-dom'
import queryString from 'query-string';



export class RecursoDigital extends Component {
    constructor() {
        super();
        this.state = { 
            recursos: [],
            layout: 'grid',
            searchEtiqueta: '',
            selectedRecurso: null, 
            visible: false,
            sortKey: null,
            sortOrder: null
        }
        this.recursoService = new RecursoService();
        this.itemTemplate = this.itemTemplate.bind(this);
        this.onSortChange = this.onSortChange.bind(this);
        this.updateInputSearch= this.updateInputSearch.bind(this);
        this.handleClickFiltro =this.handleClickFiltro.bind(this);
    }

    componentDidMount() {

    console.log(this.props);
    console.log(this.props.location.search);

    let params = queryString.parse(this.props.location.search)
    // console.log(params);
    console.log(params.etiqueta);

    this.setState({searchEtiqueta:params.etiqueta});

    if(/*this.state.searchEtiqueta*/params.etiqueta!==""){
        this.recursoService.getRecursosEtiquetas(/*this.state.searchEtiqueta*/params.etiqueta).then(
            res => { 
            const data = res;
            console.log(data);
            this.setState({recursos: data}); 
            }
        );
        console.log('The link was clicked -> getRecursosEtiquetas');
    }else {
        this.setState({recursos: []});    
    }

  /*    this.recursoService.getRecursos().then(res => {       
        const data = res;
        if(res!==null && res!==undefined){
            console.log(data);
        this.setState({recursos: data});                
        
      }else{
        this.setState({recursos: []}); 
      }
     } );*/
    }
    

    handleClickFiltro(e) {
        e.preventDefault();       
        console.log("----->"+this.state.searchEtiqueta);
        
        if(this.state.searchEtiqueta!==""){
            this.recursoService.getRecursosEtiquetas(this.state.searchEtiqueta).then(
            res => { 
                const data = res;
                console.log(data);
                this.setState({recursos: data}); 
              }
        );
        console.log('The link was clicked -> getRecursosEtiquetas');
            }else {
                this.setState({recursos: []});    
            }
      }

      
      updateInputSearch(event) {
        //const value = event.value;
        console.log(event.target.value);
        this.setState({searchEtiqueta:event.target.value});
    
    }
    /*onBuscarRecursos(e) {
        console.log("----->RecursoDigital.onBuscarRecursos");
        //this.handleClickFiltro(e);
     }*/
 

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
            return <div/>;
        }
        let srcImg = "assets/demo/images/recurso/" + recurso.nombre + ".png";
        return (
            <div className="p-col-12" style={{padding: '2em', borderBottom: '1px solid #d9d9d9'}}>
                <div className="p-col-12 p-md-3">
                    <img src={srcImg} alt={recurso.nombre}/>
                </div>
                <div className="p-col-12 p-md-8 recurso-details">
                    <div className="p-grid">
                        <div className="p-col-2 p-sm-6">Vin:</div>
                        <div className="p-col-10 p-sm-6">{recurso.tipoRecurso}</div>

                        <div className="p-col-2 p-sm-6">Year:</div>
                        <div className="p-col-10 p-sm-6">{recurso.fechaRegistro}</div>

                        <div className="p-col-2 p-sm-6">Brand:</div>
                        <div className="p-col-10 p-sm-6">{recurso.nombre}</div>

                        <div className="p-col-2 p-sm-6">Color:</div>
                        <div className="p-col-10 p-sm-6">{recurso.url}</div>
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
            return <div/>;
        }
       
        return (
            <div style={{ padding: '.5em' }} className="p-col-12 p-md-3">

              <Card title={recurso.tipoRecurso} subTitle={recurso.nombre} style={{ textAlign: 'center', margin: 'auto' }}>
              <div style={{ width: '100%' }} className="p-col-12 p-md-3">
                    <img src={recurso.url} alt={recurso.nombre} height="42" width="42"  />
                </div>
                <div className="recurso-detail" style={{ textAlign: 'center', margin: 'auto' }}>
               
                {new Intl.DateTimeFormat().format(new Date(recurso.fechaRegistro))}
               
                </div>
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
            return <div/>;
        }

        if (layout === 'list')
            return this.renderListItem(recurso);
        else if (layout === 'grid')
            return this.renderGridItem(recurso);
    }

    renderRecursoDialogContent() {
              
        if (this.state.selectedRecurso) {

          //  let srcImg = "assets/demo/images/recurso/" + this.state.selectedRecurso.nombre + ".png";
            return (


                <Card title={this.state.selectedRecurso.tipoRecurso} subTitle={this.state.selectedRecurso.nombre} style={{ textAlign: 'center' }}>
                <div className="recurso-detail"> 
                {new Intl.DateTimeFormat().format(new Date(this.state.selectedRecurso.fechaRegistro))}
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
            {label: 'Nombre', value: 'nombre'},
            {label: 'Tipo', value: 'tipoRecurso'},
            {label: 'Fecha ascendente', value: 'fechaRegistro'},
            {label: 'Fecha descendiente ', value: '!fechaRegistro'}
        ];

        return (
            <div className="p-g">            
            <div className="p-g-6 p-md-4 filter-container">
                    <div style={{position:'relative'}}>
                        <InputText placeholder="Buscar por Etiqueta" value={this.state.searchEtiqueta}  onChange={this.updateInputSearch} />
                       <Button icon="pi pi-search" onClick={this.handleClickFiltro}></Button>
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
        const row=10;
        var isPaginatorActive=false;
        
        
        if(this.state.recursos!==null 
            && this.state.recursos!== undefined)
        {
            var sizeALt=this.state.recursos.length; 
            isPaginatorActive=sizeALt>(row);

        }
        const sizeRow=row;
        const isPag=isPaginatorActive;
        
       
        return ( 
            <div>
                <div className="content-section introduction">
                    <div className="feature-intro">
                        <h1>Recursos</h1>
                        <p>Formulario de búsqueda de recurso.</p>
                    </div>
                </div>

                <div className="content-section implementation">
                    <DataView value={this.state.recursos} 
                     layout={this.state.layout} header={header} 
                            itemTemplate={this.itemTemplate} paginatorPosition={'both'} paginator={isPag} rows={sizeRow} 
                            sortOrder={this.state.sortOrder} sortField={this.state.sortField}
                            pageLinks={sizeRow} />

                    <Dialog header="Recurso Details" visible={this.state.visible} width="225px" modal={true} onHide={() => this.setState({visible: false})}>
                        {this.renderRecursoDialogContent()}
                    </Dialog>
                </div>
            </div>
           );
        
    }
}

export default withRouter(RecursoDigital);

