import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from './posts.service';
import { TopicService } from '../topics/topics.service';
import { ITopic } from "../topics/topic";

@Component({
  selector: "app-posts-postform",
  templateUrl: "./postform.component.html"
})
export class PostformComponent {

  postForm: FormGroup;
  isEditMode: boolean = false;
  postId: number = -1;
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
      topicId: [null, Validators.required]
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
            this._router.navigate(['/posts']);
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
            this._router.navigate(['/posts']);
          }
          else {
            console.log('Post creation failed');
          }
        });
    }
  }


  backToPosts() {
    this._router.navigate(['/posts']);
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      if (params['mode'] === 'create') {
        this.isEditMode = false; // Create mode
      } else if (params['mode'] === 'edit') {
        this.isEditMode = true; // Edit mode
        this.postId = +params['id']; // Convert to number
        this.loadPostForEdit(this.postId);
      }
    });
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

