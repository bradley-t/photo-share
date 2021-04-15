<template>
<div class="photo">
  <div class ="photo-wrapper">
    <div class="photoInfo mm">
      <p class="photoTitle">{{photo.title}}</p>
      <p class="photoName">{{photo.user.firstName}} {{photo.user.lastName}}</p>
    </div>
    <div class="photoSmallInfo">
      <p class="photo-description">{{photo.description}}</p>
      <p class="photo-date">{{formatDate(photo.created)}}</p>
    </div>
    <img :src="photo.path"/>
    <div class="comments mm">
        <p class="title la">Comments</p>
        <div v-if="containsComments" class="comment-list-container la">
          <div class="comment-container" v-for="comment in commentList" :key="comment._id">
            <p class="commentText">{{comment.comment}}</p>
            <div class="comment-info">
              <p class="commentName"> -- {{comment.user.firstName}} {{comment.user.lastName}}</p>
              <p class="commentDate">{{formatDate(comment.created)}}</p>
            </div>
          </div>
        </div>
        <p v-else>No comments yet!</p>
      <div v-if="user" class="comment-form">
        <p class="title">Add a Comment</p>
        <textarea class="pure-input-1-2"
          placeholder="Add your opinion"
          v-model="newComment"
          rows="5"
          cols="50"></textarea>
        <button
            @click="uploadComment"
            class="add pure-button pure-button-primary">
          Add
        </button>
      </div>
      <p v-else>Log in to add a comment</p>
    </div>
  </div>
  <p v-if="error">{{error}}</p>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'photo',
  data() {
    return{
      photo: null,
      newComment: '',
      commentList: [],
      error: ''
    }
  },
  created() {
    this.getPhoto();
    this.getComments();
  },
  methods: {
    async getPhoto() {
      try {
        let response = await axios.get(
          "/api/photos/" + this.$route.params.id
        );
        this.photo = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async getComments() {
      try {
        let response = await axios.get(
          "/api/comments/" + this.$route.params.id
        );
        this.commentList = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    async uploadComment() {
      try {
        const formData = new FormData();
        formData.append('comment', this.newComment)
        await axios.post(
          "/api/comments/" + this.$route.params.id, {
            comment: this.newComment
          });
        this.newComment = '';
        this.getComments();
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
    containsComments() {
      if(this.commentList){
        return this.commentList[0];
      } else{
        return false;
      }
    }
  }
}
</script>

<style scoped>
  .comments{
    padding-top: 20px;
    color: #333;
  }
  img {
    max-width: 100%;
    max-height: 680px;
    margin-top: 5px;
  }
  .commentText{
    font-size: 1.5em;
    margin-block-end: 0;
  }
  .comment-info {
    display: flex;
    margin: 0px;
    justify-content: space-between;
    padding-bottom: 20px;
    font-size: 0.9em;
    width: 100%;
  }
  .add{
    margin-top: 5px;
    margin-bottom: 100px;
    max-width: 100px;
  }
  .comments{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .comment-form{
    display: flex;
    flex-direction: column;
  }
  .photo{
    padding-top: 20px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }
  .photo-wrapper{
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: center;
  }
  .photoInfo {
    display: flex;
    justify-content: space-between;
    padding-top: 95px;
    font-size: 1.7em;
    width: 100%;
  }
  .photoSmallInfo{
    display: flex;
    justify-content: space-between;
    font-size: 0.85em;
    width: 100%;
  }
  .photoSmallInfo p {
    margin: 1px;
  }
  .photoInfo p {
    margin: 1px;
  }
  .title {
    font-size: 1.7em;
    font-weight: bold;
  }

  .la {
    width: 95%;
    max-width: 465px;
  }
</style>
