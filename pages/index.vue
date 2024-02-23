<template>
  <v-container>
    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        max-width="600px"
      >
        <v-card max-height="593">
          <v-textarea
            v-model="postItem"
            rows="8"
            required
            solo
            no-resize
            post-item
          />
          <v-card-actions>
            <v-btn
              color="blue darken-1"
              text
              @click="postCreate"
            >
              Gönder
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row>
      <v-col>
        <v-card
          min-height="270"
          max-width="225"
          class="mt-4 justify-start elevation-0 card-border fill-width"
        >
          <v-avatar class="profile-image" size="68">
            <v-img
              :src="$store.state.auth.user.profile_photo"
            />
          </v-avatar>
          <v-img
            :src="$store.state.auth.user.banner_photo"
            class="background-image"
          />
          <v-card-title class="mt-8 align-center justify-center" style="font-size: 16px">
            {{ $store.state.auth.user.first_name }} {{ $store.state.auth.user.last_name }}
          </v-card-title>

          <v-card-subtitle class="text-center" style="font-size: 12px">
            {{ $store.state.auth.user.biography }}
          </v-card-subtitle>
          <v-divider />
          <v-card-text style="font-size: 12px">
            Profilini görüntüleyenler<br>
            Bağlantı
          </v-card-text>
        </v-card>
      </v-col>

      <v-col>
        <v-card
          class="mb-2 mt-4 justify-start elevation-0 card-border"
          width="555"
        >
          <v-col>
            <v-row>
              <v-avatar class="mt-3 ml-4" size="48">
                <v-img
                  :src="$store.state.auth?.user.profile_photo"
                />
              </v-avatar>
              <v-btn
                class="mt-3 ml-2"
                outlined
                width="480"
                height="48"
                rounded
                color="rgba(102, 102, 102, 0.60)"
                @click="dialog = true"
              >
                <v-card-subtitle
                  style="margin-left: -80%;font-weight: 400;color: Gray;text-transform: none"
                  class="text-no-wrap"
                >
                  Gönderi başlat
                </v-card-subtitle>
              </v-btn>
            </v-row>

            <v-row>
              <v-col
                v-for="(item,i) in postItems"
                :key="i"
              >
                <v-btn
                  text
                  class="ml-6"
                >
                  <v-icon
                    :color="item.color"
                  >
                    {{ item.icon }}
                  </v-icon>
                  <v-card-text
                    style="color:rgba(102, 102, 102, 0.60)"
                    class="text-capitalize pa-0 ml-1"
                  >
                    {{ item.text }}
                  </v-card-text>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-card>

        <v-divider class="mb-2" />

        <v-card
          v-for="(item,i) in posts"
          :key="i"
          class="elevation-0 card-border mb-2"
        >
          <div class="d-flex align-center">
            <v-avatar class="mt-3 ml-4" size="48">
              <v-img :src="item.user.profile_photo" />
            </v-avatar>
            <v-card-title style="font-size: 16px">
              {{ item.user.first_name }} {{ item.user.last_name }}
            </v-card-title>
          </div>
          <v-card-text style="color:black">
            {{ item.text }}
          </v-card-text>

          <v-divider class="mb-2" />

          <v-btn
            text
            class="ml-6 mb-2"
            @click="postLike(item)"
          >
            <v-icon
              :color="item.liked ? 'blue' : 'grey'"
            >
              mdi-thumb-up-outline
            </v-icon>
            <v-card-text
              style="color:rgba(102, 102, 102, 0.60)"
              class="text-capitalize pa-0 ml-1"
            >
              Beğen
            </v-card-text>
          </v-btn>
          <v-btn
            text
            class="ml-6 mb-2"
            @click="showComments(item)"
          >
            <v-icon
              color="grey"
            >
              mdi-message-text-outline
            </v-icon>
            <v-card-text
              style="color:rgba(102, 102, 102, 0.60)"
              class="text-capitalize pa-0 ml-1"
            >
              Yorum Yap
            </v-card-text>
          </v-btn>
          <v-btn
            v-for="(bar,a) in likeBar"
            :key="a"
            text
            class="ml-6 mb-2"
          >
            <v-icon
              :color="bar.color"
            >
              {{ bar.icon }}
            </v-icon>
            <v-card-text
              style="color:rgba(102, 102, 102, 0.60)"
              class="text-capitalize pa-0 ml-1"
            >
              {{ bar.text }}
            </v-card-text>
          </v-btn>

          <v-card v-if="item.commentVisible">
            <v-text-field v-model="newComment" @keydown.enter="commentSend(item,newComment)" />
            <v-btn @click="commentSend(item, newComment)">
              GÖNDER
            </v-btn>
          </v-card>

          <v-card v-if="item.comments && item.comments.length > 0">
            <v-card-title v-for="(comment, index) in item.comments" :key="index">
              {{ comment.text }}
            </v-card-title>
          </v-card>
        </v-card>
      </v-col>

      <v-col>
        <v-card
          min-height="268"
          class="mt-4 mr-4 justify-start elevation-0 card-border"
          width="300"
        >
          footer kısmı
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import authControl from '@/middleware/authControl'

export default {
  middleware: authControl,
  data () {
    return {
      dialog: false,
      postItem: '',
      posts: [],
      newComment: null,
      media_file: null,
      commentVisible: false,
      likeBar: [
        {
          icon: 'mdi-sync',
          color: 'grey',
          text: 'Paylaş'
        },
        {
          icon: 'mdi-send-variant',
          color: 'grey',
          text: 'Gönder'
        }
      ],
      postItems: [
        {
          icon: 'mdi-image-outline',
          color: 'blue',
          text: 'Medya'
        },
        {
          icon: 'mdi-calendar-month-outline',
          color: 'orange',
          text: 'Etkinlik'
        },
        {
          icon: 'mdi-format-line-weight',
          color: '#F5987E',
          text: 'Yazı Yaz'
        }
      ]
    }
  },
  mounted () {
    this.postGet()
  },
  methods: {
    postGet () {
      this.$axios.$get(process.env.POSTS_URL)
        .then((response) => {
          this.posts = response.results.map(post => ({
            ...post,
            commentVisible: false,
            comments: null
          }))
        })
    },
    postCreate () {
      const params = {
        text: this.postItem,
        media_file: this.media_file
      }
      this.$axios.$post('/api/pages/post/', params)
      this.postItem = ''
      this.media_file = null
      this.dialog = false
    },
    postLike (item) {
      item.liked = !item.liked

      if (item.liked === true) {
        this.$axios.post(process.env.POST_LIKE_URL.replace('{uuid}', item.uuid))
        return item.liked
      } else {
        this.$axios.post(process.env.POST_UNLIKE_URL.replace('{uuid}', item.uuid))
      }
    },
    logout () {
      this.$auth.logout()
        .then(() => {
          this.$router.push('/auth/login')
        })
    },
    showComments (item) {
      item.commentVisible = true
      const params = {
        post: item.uuid
      }
      this.$axios.$get(process.env.POST_COMMENT_URL, { params })
        .then((response) => {
          item.comments = response
        })
    },
    commentSend (item, newComment) {
      const params = {
        post: item.uuid,
        text: newComment
      }
      this.$axios.$post('/api/pages/comment/', params)
        .then((res) => {
          item.comments.push(res)
          this.newComment = ''
        })
    }
  }
}
</script>

<style scoped>
.background-image {
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 56px;
  display: block;
}
.profile-image{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -170%);
    width: 200px;
    height: 100px;
    display: block;
    border-radius: 50%;
    z-index: 1;
}
.card-border{
  border-radius: 8px;
  border: 1px solid rgba(224, 224, 224, 0.60)
}
</style>
