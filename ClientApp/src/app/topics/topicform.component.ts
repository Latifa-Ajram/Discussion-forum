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

  topicForm: FormGroup;
  isEditMode: boolean = false;
  topicId: number = -1;
  roomId: number = -1;
  rooms: IRoom[] = [];

  constructor(
    private _formbuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _topicService: TopicService,
    private _roomService: RoomService
  )
  {
    this.topicForm = _formbuilder.group({
      topicName: ['', Validators.required],
      roomId: [-1, [idValidator()]]
    })
  }

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

  backToTopics() {
    this._router.navigate(['/topics', this.roomId]);
  }

  ngOnInit(): void {
    this.fetchRooms();

    this._route.params.subscribe(params => {
      if (params['mode'] === 'create') {
        this.isEditMode = false; // Create mode
        this.roomId = +params['roomId'];
        this.topicForm.patchValue({
          roomId: this.roomId
        });
      } else if (params['mode'] === 'edit') {
        this.isEditMode = true; // Edit mode
        this.roomId = +params['roomId'];
        this.topicId = +params['topicId']; // Convert to number
        this.loadTopicForEdit(this.topicId);
      }
    });
  }

  fetchRooms(): void {
    this._roomService.getRooms().subscribe(rooms => {
      this.rooms = rooms;
    });
  }

  onRoomChange(event: any) {
    const selectedRoomId = event.target.value;
    this.topicForm.get('roomId')?.setValue(selectedRoomId);
  }

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
}
