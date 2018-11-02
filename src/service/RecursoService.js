import axios from 'axios';

const urlBase = "http://127.0.0.1:8000/gestired";

export class RecursoService {
    
    getRecursosSmall() {
        return axios.get('assets/demo/data/cars-small.json')
                .then(res => res.data.data);
    }

    getRecursosMedium() {
        return axios.get('assets/demo/data/cars-medium.json')
                .then(res => res.data.data);
    }

    getRecursosLarge() {
        return axios.get('assets/demo/data/cars-large.json')
                .then(res => res.data.data);
    }

    getRecursos(onComplete, onError) {
        const url = urlBase+"/resource/";
    
        return  axios.get(url)
     .then(onComplete ? onComplete : res=>res.data.objects)
     .catch(onError ? onError : (error) => console.log(error));
    }

    getRecursosLabels(label, onComplete, onError) {
        const  url = urlBase+"/resource/?labels__contains="+label;
     return  axios.get(url)
     .then(onComplete ? onComplete : res => res.data.objects)
    .catch(onError ? onError : (error) => console.log(error));
    }
}