import { NgModule } from "@angular/core";
import { MatFormFieldModule } from '@angular/material/form-field';

const myModules: any = [
    MatFormFieldModule
];

@NgModule({
    imports:[...myModules],
    exports:[...myModules],
})

export class MaterialModule {}