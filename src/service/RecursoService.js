import axios from 'axios';

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

    getRecursos() {
        return axios.get('assets/demo/data/cars-large.json')
                .then(res => res.data.objects);
    }
}