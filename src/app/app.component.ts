import { Component, NgZone  } from '@angular/core';
import  { NgForm } from '@angular/forms';
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular';
  submitted = false;
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
  queue: HTMLAudioElement[] = [];
  private _observableList: BehaviorSubject<HTMLAudioElement[]> = new BehaviorSubject([])
 get sounds_queue(): Observable<HTMLAudioElement[]> { return this._observableList.asObservable()  };
  is_playing = false;


  constructor(
        private zone: NgZone,

      )
  {}


  PlayAudio(recursive=false) {
    console.log("Queue length: " + this.queue.length);
    const audio = this.queue.pop();
    if(!recursive && this.is_playing)
    {
      return;
    }

    if (audio !== undefined) {
        this.zone.runOutsideAngular(() => {

          console.log("queue", this.queue.map(function(a) { return a.src }))
          audio.load();
          this.is_playing = true;
          setTimeout(function(){
            audio.play();
          },1000);


          audio.addEventListener('ended', () => {
            if (this.queue.length > 0) {
              console.log("play ended");
              this.PlayAudio(recursive=true);
            } else {
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

    for (const key in form.value) {
        let val = form.value[key];
        console.log("------val---", val);
        if(val) {
          let p = key.replace("_", "");
          const audio = new Audio();
          audio.src = this.sounds[p];
          console.log('--key/src ', key, audio.src);
          this.queue.push(audio);
          this._observableList.next(this.queue);
          console.log(this.queue);
        }
    }

    this.PlayAudio();
  }
  

}
