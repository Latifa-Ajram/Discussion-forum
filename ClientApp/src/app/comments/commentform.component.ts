import { Component } from "@angular/core";
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from './comments.service';
import { PostService } from '../posts/posts.service';
import { idValidator } from '../services/IDValidator';




@Component({
  selector: "app-comments-commentform",
  templateUrl: "./commentform.component.html",
  styleUrls: ['./comments.component.css']
})
export class CommentformComponent {

  commentForm: FormGroup;
  isEditMode: boolean = false;
  commentId: number = -1;
  postId: number = -1;

  constructor(
    private _formbuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _commentService: CommentService,
    private _postService: PostService
  ) {
    this.commentForm = _formbuilder.group({
      commentDescription: ['', Validators.required],
      postId: [-1, [idValidator()]]
    });
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      if (params['mode'] === 'create') {
        this.isEditMode = false; // Create mode
        this.postId = +params['postId'];
        this.commentForm.patchValue({
          postId: this.postId
        });
      }
      else if (params['mode'] === 'edit') {
        this.isEditMode = true; // Edit mode
        this.postId = +params['postId'];
        this.commentId = +params['commentId']; // Convert to number
        this.loadCommentForEdit(this.commentId);
      }
    });
  }

  loadCommentForEdit(commentId: number) {
    this._commentService.getCommentById(commentId)
      .subscribe(
        (comment: any) => {
          console.log('retrived comment: ', comment);
          this.commentForm.patchValue({
            commentDescription: comment.CommentDescription,
            postId: comment.PostId
          });
        },
        (error: any) => {
          console.error('Error loading comment for edit:', error);
        }
      );
  }

  onSubmit() {
    console.log("CommentCreate form submitted:");
    console.log(this.commentForm);
    const newComment = this.commentForm.value;
    if (this.isEditMode) {
      this._commentService.updateComment(this.commentId, newComment)
        .subscribe(response => {
          if (response.success) {
            console.log(response.message);
            this._router.navigate(['/comments', this.postId]);
          }
          else {
            console.log('Comment update failed');
          }
        });
    }
    else {
      this._commentService.createComment(newComment)
        .subscribe(response => {
          if (response.success) {
            console.log(response.message);
            this._router.navigate(['/comments', this.postId]);
          }
          else {
            console.log('Comment creation failed');
          }
        });
    }
  }

  backToComments() {
    this._router.navigate(['/comments', this.postId]);
  }


}


