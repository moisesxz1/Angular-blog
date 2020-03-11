//Modules
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '../services/user.guard';



//Components
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';

const panelRoutes: Routes = [

    {
        path: 'panel',
        component: MainComponent,
        canActivate: [UserGuard],
        children: [
            {path: '', component: ListComponent},
            {path: 'listado', component: ListComponent},
            {path: 'crear', component: AddComponent},
            {path: 'editar/:id', component: EditComponent}
        ]
    }
];

@NgModule({//Indicar metapropiedades

    imports: [ //cargar el modulo principal del router
        RouterModule.forChild(panelRoutes)//cargar rutas a nivel del route
    ],
    exports: [
        RouterModule
    ]
})

export class PanelRoutingModule {}
