import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicService } from './topics.service';

@Component({
  selector: "app-topics-topicform",
  templateUrl: "./topicform.component.html"
})
export class TopicformComponent {

  topicForm: FormGroup;
  isEditMode: boolean = false;
  topicId: number = -1;

  constructor(
    private _formbuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _topicService: TopicService
  )
  {
    this.topicForm = _formbuilder.group({
      topicName: ['', Validators.required]
     
    });
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
            this._router.navigate(['/topics']);
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
            this._router.navigate(['/topics']);
          }
          else {
            console.log('Topic creation failed');
          }
        });
    }
  }


  backToTopics() {
    this._router.navigate(['/topics']);
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      if (params['mode'] === 'create') {
        this.isEditMode = false; // Create mode
      } else if (params['mode'] === 'edit') {
        this.isEditMode = true; // Edit mode
        this.topicId = +params['id']; // Convert to number
        this.loadItemForEdit(this.topicId);
      }
    });
  }

  loadItemForEdit(topicId: number) {
    this._topicService.getItemById(topicId)
      .subscribe(
        (topic: any) => {
          console.log('retrived topic: ', topic);
          this.topicForm.patchValue({
            topicName: topic.TopicName
           
          });
        },
        (error: any) => {
          console.error('Error loading item for edit:', error);
        }
      );
  }
}

