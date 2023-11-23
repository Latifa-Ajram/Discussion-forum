import { Component, OnInit } from '@angular/core';
import { ITopic } from './topic';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicService } from './topics.service';

@Component({
  selector: 'app-topics-component',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})

export class TopicsComponent implements OnInit {
  //Variables:
  viewTitle: string = 'Topic';
  roomId: number = -1;
  topics: ITopic[] = [];
  filteredTopics: ITopic[] = this.topics;
  private _listFilter: string = '';

  //Constructor to initialize imported services:
  constructor(
    private _router: Router,
    private _topicService: TopicService,
    private _route: ActivatedRoute) { }


  get listFilter(): string {
    return this._listFilter;
  }

  //The set-method of the list filter passes the current string provided by the user from the HTML-file.
  //This value is passed to the perform filter, where the outcome is passed back to the user.
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredTopics = this.performFilter(value);
  }

  //This method Takes in the passed topic, checks with the user that it still wants to delete it, then passes it on to the service, and we subscribe for a callback.
  //We then recive the response from the back - end, if accepted then the filter is updated, if not, then an error is logged.
  deleteTopic(topic: ITopic): void {
    const confirmDelete = confirm(`Are you sure you want to delete "${topic.TopicName}"?`);
    if (confirmDelete) {
      this._topicService.deleteTopic(topic.TopicId)
        .subscribe(
          (response) => {
            if (response.success) {
              console.log(response.message);
              this.filteredTopics = this.filteredTopics.filter(i => i !== topic);
            }
          },
          (error) => {
            console.error('Error deleting topic:', error);
          });
    }
  }

  //A method that invokes the get topics in service and subscribes for a callback.
  //When the callback is recived, we then set it in the view by populating the lists corresponding with the view.
  getTopics(): void {
    this._topicService.getTopics()
      .subscribe(data => {
        console.log('All', JSON.stringify(data));
        this.topics = data;
        this.filteredTopics = this.topics;
      }
      );
  }

  //Gets all the topics corresponding with the current roomId set. The service passes the methods name and id. We subscribe for a callback.
  //This data populates the list of topics we want to show.
  getTopicsByRoomId(roomId: number): void{
    this._topicService.getTopicsByRoomId(roomId).subscribe(data => {
      console.log('All', JSON.stringify(data));
      this.topics = data;
      this.filteredTopics = this.topics;
    });
  }

  //A method that returns a list of categories based on the passed string.
  performFilter(filterBy: string): ITopic[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.topics.filter((topic: ITopic) =>
      topic.TopicName.toLocaleLowerCase().includes(filterBy));
  }

  //Routing method that passes url, a string and an Id:
  navigateToTopicform() {
    this._router.navigate(['/topicform', 'create', this.roomId]);
  }

  //Routing method that takes in an Id. passes url, a string and two different Id`s:
  updateSelectedTopic(topicId: number) {
    this._router.navigate(['/topicform', 'edit', this.roomId, topicId]);
  }

  //On intialization of this class this method runs and checks the routing for the value of the data:
  //If it is equal to - 1, then "getTopics()" is invoked, if not, then "getTopicsByRoomId" is.
  ngOnInit(): void {
    this._route.params.subscribe(params => {
      if (params['id'] == -1) {
        console.log("KOMMER I IF STATEMENT");
        this.getTopics();
      }
      else {
        console.log("KOMMER I ELSE");
        this.getTopicsByRoomId(+params['id'])
        this.roomId = +params['id'];
      }
    });
    
  }
}
