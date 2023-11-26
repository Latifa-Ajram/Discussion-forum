import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicService } from './topics.service';
import { RoomService } from '../rooms/rooms.service';
import { IRoom } from "../rooms/room";
import { idValidator } from '../services/IDValidator';

@Component({
  selector: "app-topics-topicform",
  templateUrl: "./topicform.component.html",
  styleUrls: ['./topics.component.css']
})
export class TopicformComponent {
  //Variables:
  topicForm: FormGroup;
  isEditMode: boolean = false;
  topicId: number = -1;
  roomId: number = -1;
  rooms: IRoom[] = [];

   //Initilizing imported services and the form we are using inside the view in order to populate it:
  constructor(
    private _formbuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _topicService: TopicService,
    private _roomService: RoomService
  )
  {
    this.topicForm = _formbuilder.group({
      topicName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(35)]],
      roomId: [-1, [idValidator()]]
    })
  }

  //This method is invoked when the submit button is clicked via the eventcall from the form. The forms values are retrieved and set inside the newTopic object.
  //If this was an edit of a existing topic, then we invoke the updateTopic method from the service and subscribe for a callback.
  //If not, then we invoke the createTopic from the service and subscribe for the callback from it. If they succeed, then we are passed back to the list of all topics:
  onSubmit() {
    console.log("TopicCreate form submitted:");
    console.log(this.topicForm);
    const newTopic = this.topicForm.value;
    if (this.isEditMode) {
      this._topicService.updateTopic(this.topicId, newTopic)
        .subscribe(response => {
          if (response.success) {
            console.log(response.message);
            this._router.navigate(['/topics', this.roomId]);
          }
          else {
            console.log('Topic update failed');
          }
        });
    }
    else {
      this._topicService.createTopic(newTopic)
        .subscribe(response => {
          if (response.success) {
            console.log(response.message);
            this._router.navigate(['/topics', this.roomId]);
          }
          else {
            console.log('Topic creation failed');
          }
        });
    }
  }

  //A method connected to a button that routes us back to topics
  backToTopics() {
    this._router.navigate(['/topics', this.roomId]);
  }


  //A method invoked when the class is initialized. First we call for a method to fetch all rooms to populate them in the selcet option
  //Depending on the params different data is set. If the mode is create we patch the room Id to set the current room we are trying create a topic inside.
  //If the parameters is like "edit", then we also set the data by getting the specific topic:
  ngOnInit(): void {
    this.fetchRooms();

    this._route.params.subscribe(params => {
      if (params['mode'] === 'create') {// Create mode
        this.isEditMode = false; 
        this.roomId = +params['roomId']; //If the user came from a room to create a new topic, then the id is not -1 and the room in the form is set by defualt, if not, it is -1.
        this.topicForm.patchValue({
          roomId: this.roomId
        });
      } else if (params['mode'] === 'edit') {// Edit mode
        this.isEditMode = true;
        this.roomId = +params['roomId'];// Convert to number
        this.topicId = +params['topicId']; // Convert to number
        this.loadTopicForEdit(this.topicId);
      }
    });
  }

  //Using the service to invoke the getRooms() and subscribe for a callback. When the rooms are retrieved they are populated into the list:
  fetchRooms(): void {
    this._roomService.getRooms().subscribe(rooms => {
      this.rooms = rooms;
    });
  }

  //A method invoked on event change in the HTML-page. We retrieve the current set value and set the text based on the id-value:
  onRoomChange(event: any) {
    const selectedRoomId = event.target.value;
    this.topicForm.get('roomId')?.setValue(selectedRoomId);
  }

  //Method that takes in a topic id, uses the service to invoke the getTopicById and subscribes for the callback. When the data returns,
  //it is patched into the form, but if it fails, then data is logged instead:
    loadTopicForEdit(topicId: number) {
    this._topicService.getTopicById(topicId)
      .subscribe(
        (topic: any) => {
          console.log('retrived topic: ', topic);
          this.topicForm.patchValue({
            topicName: topic.TopicName,
            roomId: topic.RoomId
          });
        },
        (error: any) => {
          console.error('Error loading topic for edit:', error);
        }
      );
  }

  //A method to create a custom error message for topic.
  get topicNameErrorMessage(): string {
    const userInput = this.topicForm.get('topicName');
    if (userInput) {
      if (userInput.hasError('required')) {
        return 'Topic name is required.';
      } else if (userInput.hasError('minlength')) {
        return 'Topic name must be at least 2 characters.';
      } else if (userInput.hasError('maxlength')) {
        return 'Topic name must have less than 35 characters.';
      }
    }
    return ''; //returns a empty string if there are no errors.
  }
}
