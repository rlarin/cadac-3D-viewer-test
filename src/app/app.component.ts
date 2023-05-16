import {AfterViewInit, Component} from '@angular/core';
import {
  Vector3,
} from 'three';
import {CadacThree, CadacCSGOperation} from 'ngx-cadac-viewer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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

    const cube = this.cadacThreeHandler.createCube(8, 8, 8, '#f8f8f8', false);

    const sphere = this.cadacThreeHandler.createSphere(5.2, '#eec63e', false);

    const sub = this.cadacThreeHandler.csgSubtract(
      {mesh: cube, position: new Vector3(10, 0, 0)},
      {mesh: sphere, position: new Vector3(10, 0, 0)},
      CadacCSGOperation.SUBTRACT,
      '#09ff00'
    );
    const subtractionText = this.cadacThreeHandler.createText(
      'Subtraction',
      1,
      new Vector3(-3, 6, 0),
      '#09ff00'
    );
    sub.add(subtractionText);

    const int = this.cadacThreeHandler.csgIntersect(
      {mesh: cube, position: new Vector3(0, 10, 0)},
      {mesh: sphere, position: new Vector3(0, 10, 0)},
      CadacCSGOperation.INTERSECT,
      '#ff0000'
    );
    const intersectionText = this.cadacThreeHandler.createText(
      'Intersection',
      1,
      new Vector3(-2, 6, 3),
      '#ff0000'
    );
    intersectionText.rotateY(Math.PI / 4);
    int.add(intersectionText);

    const union = this.cadacThreeHandler.csgUnion(
      {mesh: cube, position: new Vector3(0, 0, 10)},
      {mesh: sphere, position: new Vector3(0, 0, 10)},
      CadacCSGOperation.UNION,
      '#e3b107'
    );
    const unionText = this.cadacThreeHandler.createText(
      'Union',
      1,
      new Vector3(0, 7, 2),
      '#e3b107'
    );
    unionText.rotateY(Math.PI / 2);
    union.add(unionText);
  }
}
