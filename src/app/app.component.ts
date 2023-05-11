import {AfterViewInit, Component} from '@angular/core';
import {CadacThree} from "ngx-cadac-three-viewer";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'cad-viewer-host';
  public cadacThreeHandler: CadacThree = new CadacThree();


  ngAfterViewInit(): void {
    this.cadacThreeHandler.createScene();

    this.cadacThreeHandler.toggleOrbitControls(true);
    this.cadacThreeHandler.setAmbientLight();
    this.cadacThreeHandler.setAxisHelper(30);
    const light = this.cadacThreeHandler.setMainDirectionalLight();
    light.position.set(0, 50, 55);
    this.cadacThreeHandler.setGridHelper(30, 30);

    const cube = this.cadacThreeHandler.createCube(
      15, 15, 15, '#f8f8f8', true);

    const sphere = this.cadacThreeHandler.createSphere(
      8, '#eec63e', true);


  }
}
