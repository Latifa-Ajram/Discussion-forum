import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from './posts.service';
import { TopicService } from '../topics/topics.service';
import { ITopic } from "../topics/topic";
import { idValidator } from '../services/IDValidator';

@Component({
  selector: "app-posts-postform",
  templateUrl: "./postform.component.html",
  styleUrls: ['./posts.component.css']
})
export class PostformComponent {
  //Variables:
  postForm: FormGroup;
  isEditMode: boolean = false;
  postId: number = -1;
  topicId: number = -1;
  topics: ITopic[] = [];

  //Initilizing imported services and the form we are using inside the view in order to populate it:
  constructor(
      private _formbuilder: FormBuilder,
      private _router: Router,
      private _route: ActivatedRoute,
      private _postService: PostService,
      private _topicService: TopicService
  ) {
      this.postForm = _formbuilder.group({
        postTitle: ['', Validators.required],
        topicId: [-1, [idValidator()]],
        commentDescription: ['', Validators.required]
      });
  }

  //This method is invoked when the submit button is clicked via the eventcall from the form. The forms values are retrieved and set inside the newPost object.
  //If this was an edit of a existing post, then we invoke the updatePost method from the service and subscribe for a callback.
  //If not, then we invoke the createPost from the service and subscribe for the callback from it. If they succeed, then we are passed back to the list of all Posts:
  onSubmit() {
      console.log("PostCreate form submitted:");
      console.log(this.postForm);
      const newPost = this.postForm.value;
      if (this.isEditMode) {
          this._postService.updatePost(this.postId, newPost)
              .subscribe(response => {
                  if (response.success) {
                    console.log(response.message);
                    this._router.navigate(['/posts', this.topicId]);
                  }
                  else {
                      console.log('Post update failed');
                  }
              });
      }
      else {
          this._postService.createPost(newPost)
              .subscribe(response => {
                  if (response.success) {
                    console.log(response.message);
                    this._router.navigate(['/posts', this.topicId]);
                  }
                  else {
                      console.log('Post creation failed');
                  }
              });
      }
  }

  //A method connected to a button that routes us back to posts
  backToPosts() {
    this._router.navigate(['/posts', this.topicId]);
  }

  //A method invoked when the class is initialized. First we call for a method to fetch all topics to populate them in the selcet option
  //Depending on the params different data is set. If the mode is create we patch the topic Id to set the current topic we are trying create a post for.
  //If the parameters is like "edit", then we also set the data by getting the specific post:
  ngOnInit(): void {
    this.fetchTopics();

    this._route.params.subscribe(params => {
        if (params['mode'] === 'create') {// Create mode
          this.isEditMode = false; 
          this.topicId = +params['topicId']; //If the user came from a topic to create a new post, then the id is not -1 and the topic in the form is set by defualt, if not, it is -1.
          this.postForm.patchValue({
            topicId: this.topicId
          });
        }
        else if (params['mode'] === 'edit') {// Edit mode
          this.isEditMode = true; 
          this.topicId = +params['topicId'];// Convert to number
          this.postId = +params['postId']; // Convert to number
          this.loadPostForEdit(this.postId);
        }
    });
    
  }

  //Using the service to invoke the getTopics() and subscribe for a callback. When the topics are retrieved they are populated into the list:
  fetchTopics(): void {
    this._topicService.getTopics().subscribe(topics => {
      this.topics = topics;
    });
  }

  //A method invoked on event change in the HTML-page. We retrieve the current set value and set the text based on the id-value:
  onTopicChange(event: any) {
    const selectedTopicId = event.target.value;
    this.postForm.get('topicId')?.setValue(selectedTopicId);
  }

  //Method that takes in a post id, uses the service to invoke the getPostById and subscribes for the callback. When the data returns,
  //it is patched into the form, but if it fails, then data is logged instead:
  loadPostForEdit(postId: number) {
      this._postService.getPostById(postId)
          .subscribe(
              (post: any) => {
                  console.log('retrived post: ', post);
                  this.postForm.patchValue({
                      postTitle: post.PostTitle,
                      topicId: post.TopicId
                  });
              },
              (error: any) => {
                  console.error('Error loading post for edit:', error);
              }
          );
  }
}

