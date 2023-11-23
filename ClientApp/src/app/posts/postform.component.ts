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

  postForm: FormGroup;
  isEditMode: boolean = false;
  postId: number = -1;
  topicId: number = -1;
  topics: ITopic[] = [];

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

  backToPosts() {
    this._router.navigate(['/posts', this.topicId]);
  }

  ngOnInit(): void {
    this.fetchTopics();

    this._route.params.subscribe(params => {
        if (params['mode'] === 'create') {
          this.isEditMode = false; // Create mode
          this.topicId = +params['topicId'];
          this.postForm.patchValue({
            topicId: this.topicId
          });
        }
        else if (params['mode'] === 'edit') {
          this.isEditMode = true; // Edit mode
          this.topicId = +params['topicId'];
          this.postId = +params['postId']; // Convert to number
          this.loadPostForEdit(this.postId);
        }
    });
    
  }

  fetchTopics(): void {
    this._topicService.getTopics().subscribe(topics => {
      this.topics = topics;
    });
  }

  onTopicChange(event: any) {
    const selectedTopicId = event.target.value;
    this.postForm.get('topicId')?.setValue(selectedTopicId);
  }

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

