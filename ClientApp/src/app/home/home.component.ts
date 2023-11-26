import { Component, OnInit } from '@angular/core';
import { PostService } from '../posts/posts.service';
import { IPost } from '../posts/post';
import { ICategory } from '../categories/category';
import { Categorieservice } from '../categories/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: IPost[] = [];
  categories: ICategory[] = [];

  constructor(private postService: PostService, private categoryService: Categorieservice) { }

  ngOnInit(): void {
    // Hent alle kategorier
    this.categoryService.getCategories().subscribe((categoryData: ICategory[]) => {
      console.log('Received categories:', categoryData);
      this.categories = categoryData;
    });

    this.postService.getPosts().subscribe(data => {
      console.log('Received posts:', data);

      // Sort posts based on creation time in descending order (newest first)
      this.posts = data.sort((a, b) => new Date(b.PostTime).getTime() - new Date(a.PostTime).getTime())
        .slice(0, 7) // Take the first 6 posts
        .map(post => ({
          ...post,
          formattedTime: this.formatTime(post.PostTime)
        }));
    });
  }

  private formatTime(postTime: Date): string {
    const timeDifference = new Date().getTime() - new Date(postTime).getTime();

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days >= 1) {
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (hours >= 1) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (minutes >= 1) {
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else {
      return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }
  }
}
