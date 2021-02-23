import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Observable, Subscription} from "rxjs";
import {AuthService, UserData} from "../../../shared/services/auth.service";
import {Post, PostService} from "../../../shared/services/post.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, OnDestroy {
  posts: any[] = []
  subs: Subscription[] = []
  user: UserData
  form: FormGroup

  constructor(private postS: PostService,private auth: AuthService) {
    this.form = new FormGroup({
      post: new FormControl('',[Validators.maxLength(100)])
    })
  }

  ngOnInit(): void {

    this.subs.push(this.postS.getAllPosts().subscribe((posts) => {
      this.posts = posts
    }))

    console.log(this.posts)

    this.subs.push(this.auth.CurrentUser().subscribe(user => {
      this.user = user;
      console.log(user);
    }))

  }

  ngOnDestroy() {
    this.subs.map(sub => sub.unsubscribe())
  }

  Submit() {
    if(this.form.valid) {
      const {post} = this.form.value

      this.auth.CurrentUser().subscribe(res => {
        this.postS.postMessage(post,res.firstName)
      })

      this.form.reset()
    }
  }
}
