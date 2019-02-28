import { Component, NgZone  } from '@angular/core';
import  { NgForm } from '@angular/forms';
import {timer} from "rxjs";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  submitted = false;
  numbers = [];
  sounds = {
          "1": "/assets/msgs/1.mp3",
          "2": "/assets/msgs/2.mp3",
          "3": "/assets/msgs/3.mp3",
          "4": "/assets/msgs/4.mp3",
          "5": "/assets/msgs/5.mp3",
          "6": "/assets/msgs/6.mp3",
          "7": "/assets/msgs/7.mp3",
          "8": "/assets/msgs/8.mp3",
          "9": "/assets/msgs/9.mp3",
          "10": "/assets/msgs/10.mp3",
        }
  queue: Array<any> = []; // queue of number to play
  is_playing = false;  // playing state
  played: Array<string> = []; // array of played numbers

  constructor(
      private zone: NgZone,
      )
  {}


  PlayAudio(recursive=false): void {
      /* when this function calls it always check 'is_playing' variable and return if this variable is true,
       * 'is_playing' in true means audio started playing already
       * in case 'is_playing' are 'false' take first element from array 'this.queue'
       */
      if(this.is_playing) {
          if(!recursive) {
              // return if it not recursive call while is_playing === true
              return
          }
      }

    let obj = this.queue.shift();
    if(obj === undefined) { return }

    let audio = obj["audio"];
    let number = obj["number"];


    if (audio !== undefined) {
        this.zone.run(() => {
          console.log("queue", this.queue.map(function(a) { return a.number }))

          audio.load();
          this.is_playing = true;

          // start play audio
          let timeout = timer(1000);
          timeout.subscribe(() => audio.play())

          audio.addEventListener('ended', () => {
              // add number to "played" when audio playing ended
              this.played.push(number);
              console.log("---played audio---", audio.src);

            if (this.queue.length > 0) {

              this.PlayAudio(recursive=true);
            } else {
              console.log("---play ended");
              this.is_playing = false;
            }
          });
        });    
    
    } else {
      console.log("audio is undefined");
    }

    }
  

  submitForm(form: NgForm) {
    this.submitted = true;

    for (let key in form.value) {
        let val = form.value[key];

        // if checkbox is checked
        if(val) {
          let number = key.replace("_","");
          this.numbers.push(number);

          let obj = {};
          let audio = new Audio();
          audio.src = this.sounds[number];
          obj["audio"] = audio;
          obj["number"] = number;
          this.queue.push(obj);
          console.log("queue length", this.queue.length);

        }
    }

    let timer_ = timer(1000);
    timer_.subscribe(() => this.PlayAudio())

  }

  // this function using in the template to clean working arrays
  clear() {
      this.played.length = 0;
      this.numbers.length = 0;
  }

  // this function using in the template for adding "done" icon
  if_number_is_played(n: string) {
      for(let i = 0; i < this.played.length; i++) {
          if(this.played[i] === n) {
              return true
          }
      }
      return false
  }

}
