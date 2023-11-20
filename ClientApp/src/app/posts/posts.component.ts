import { Component, OnInit } from '@angular/core';
import { IPost } from './post';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from './posts.service';


@Component({
    selector: 'app-posts-component',
    templateUrl: './posts.component.html',
    styleUrls: ['./posts.component.css']
})

export class PostsComponent implements OnInit {
    viewTitle: string = 'Post';
    private _listfilter: string = "";

    posts: IPost[] = [];
    
    constructor(
        private _router: Router,
        private _roomService: PostService,
        private _route: ActivatedRoute
    ) { }

    get listFilter(): string {
        return this._listfilter;
    }


    getPosts(): void {
       
    }


    ngOnInit(): void {
        console.log('PoatComponent created');
        this.getPosts();
    }
}
