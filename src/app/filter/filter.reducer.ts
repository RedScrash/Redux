import * as fromFiltro from './filter.actions';

const estadoInicial: fromFiltro.filtrosValidos = 'all';


export function filtroReducer(state = estadoInicial, action: fromFiltro.Acciones): fromFiltro.filtrosValidos {
    switch (action.type) {
        case fromFiltro.SET_FILTER:
            return action.filtro;
        default:
            return state;
    }
}
