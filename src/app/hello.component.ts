import { Component, Input } from '@angular/core';
import  { NgForm } from '@angular/forms';


@Component({
  selector: 'hello',
  template: `<h3>This application play audio files from queue. It allows to add files to queue while playing</h3>`,
  styles: [`h1 { font-family: Lato; }`]
})
export class HelloComponent  {
  @Input() name: string;

}
