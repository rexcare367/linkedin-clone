<template>
  <v-container>
    <v-row>
      <v-dialog
        v-model="dialog"
        max-width="744"
      >
        <v-card class="elevation-0" min-height="593">
          <div class="d-flex">
            <v-avatar size="60" class="ml-8 mt-8">
              <v-img :src="$store.state.auth?.user?.profile_photo" />
            </v-avatar>
            <v-card-title class="mt-2">
              {{ $store.state.auth?.user?.first_name }} {{ $store.state.auth?.user?.last_name }}
            </v-card-title>
          </div>

          <v-textarea
            v-model="postItem"
            class="mt-2"
            rows="12"
            required
            placeholder="Ne hakkında konuşmak istiyorsunuz?"
            no-resize
            solo
            flat
          />
          <v-img v-if="postImage" class="justify-end" :src="postImage" />
          <input ref="fileInput" type="file" accept="image/*" style="display: none" @change="onFileChange">
          <v-btn
            class="mx-2"
            fab
            color="#F0F0F0"
            @click="openFileInput"
          >
            <v-icon>
              mdi-image-outline
            </v-icon>
          </v-btn>
          <v-divider />
          <v-card-actions class="d-flex justify-end">
            <v-spacer />
            <v-btn
              style="color:white;background-color: #0A66C2"
              class="text-capitalize "
              rounded
              :disabled="!postItem"
              @click="postCreate"
            >
              Gönderi
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row>
      <v-spacer />
      <v-col
        id="my-col"
        style="max-width: 225px;max-height: 270px"
        class="d-flex child-flex mr-5 align-center mt-6"
      >
        <v-card
          min-height="270"
          max-width="225"
          class="mt-4 justify-start elevation-0 card-border"
        >
          <v-avatar
            class="profile-image pointer"
            size="68"
            @click="redirectProfile"
          >
            <v-img
              :src="$store.state.auth?.user.profile_photo"
            />
          </v-avatar>
          <v-img
            :src="$store.state.auth?.user.banner_photo"
            class="background-image"
          />
          <v-card-title
            class="mt-8 align-center justify-center pointer"
            style="font-size: 16px"
            @click="redirectProfile"
          >
            {{ $store.state.auth?.user.first_name }} {{ $store.state.auth?.user.last_name }}
          </v-card-title>

          <v-card-subtitle class="text-center" style="font-size: 12px">
            {{ $store.state.auth?.user.title }}
          </v-card-subtitle>
          <v-divider />
          <v-card-text style="font-size: 12px">
            <div class="d-flex flex-column">
              <div class="d-flex justify-space-between">
                <span>Profili görüntüleyenler</span>
                <span class="font-weight-bold" style="color:#0A66C2">190</span>
              </div>
              <div class="d-flex justify-space-between">
                <span>Bağlantı</span>
                <span class="font-weight-bold" style="color:#0A66C2">800</span>
              </div>
            </div>
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
              <v-avatar
                class="mt-3 ml-4"
                size="48"
              >
                <v-img
                  :src="$store.state.auth?.user?.profile_photo"
                />
              </v-avatar>
              <v-btn
                class="mt-3 ml-2"
                outlined
                width="459"
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
                  @click="dialog=true"
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
          <v-row>
            <v-col cols="1" class="mr-2 mt-2">
              <v-avatar class="mt-3 ml-4" size="48">
                <v-img :src="item.user.profile_photo" />
              </v-avatar>
            </v-col>
            <v-col>
              <v-card-title style="font-size: 16px">
                {{ item.user.first_name }} {{ item.user.last_name }}
              </v-card-title>
              <v-card-subtitle>{{ showDateTime(item.created_at) }}</v-card-subtitle>
            </v-col>
          </v-row>
          <v-card-text style="color:black">
            {{ item.text }}
          </v-card-text>
          <v-img
            v-if="item.media_file"
            :src="item.media_file"
            max-width="555"
          />
          <v-card-subtitle v-if="item.liked_by_count" class="pa-0 d-flex justify-space-between">
            <div class="d-flex align-center mb-2">
              <v-icon color="blue" size="15" class="ml-2">
                mdi-thumb-up
              </v-icon>
              {{ item.liked_by_count }} kişi
            </div>
            <div class="mb-2">
              <v-card-text v-if="item.comment_count">
                {{ item.comment_count }} yorum
              </v-card-text>
            </div>
          </v-card-subtitle>

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

          <v-card v-if="item.commentVisible" class="elevation-0">
            <div class="d-flex align-center">
              <v-avatar class="ml-4" size="40">
                <v-img :src="$store.state.auth?.user?.profile_photo" />
              </v-avatar>
              <v-text-field
                v-model="newComment"
                class="mt-6 mr-3 ml-3"
                rounded
                outlined
                dense
                @keydown.enter="commentSend(item, newComment)"
              />
            </div>
            <v-btn
              v-if="newComment"
              class="text-capitalize mb-4 ml-16"
              rounded
              min-height="23"
              max-height="23"
              style="color:white;background-color: #0A66C2"
              @click="commentSend(item, newComment)"
            >
              Yayınla
            </v-btn>
          </v-card>

          <v-card
            v-if="item.comments && item.comments.length > 0"
            class="elevation-0"
          >
            <v-card
              v-for="(comment, index) in item.comments"
              :key="index"
              class="elevation-0"
            >
              <div class="d-flex align-center">
                <v-avatar
                  class="ml-4"
                  size="40"
                >
                  <v-img :src="comment.user?.profile_photo" />
                </v-avatar>
                <v-card
                  width="479"
                  class="ml-2 mr-2 mt-5 mb-3 elevation-0"
                  color="#F2F2F2"
                >
                  <v-card-title style="font-size: 14px">
                    {{ comment.user?.first_name }} {{ comment.user?.last_name }}
                  </v-card-title>
                  <v-card-text
                    style="line-height: 20px;color: rgba(0, 0, 0, 0.9)"
                  >
                    {{ comment.text }}
                  </v-card-text>
                </v-card>
              </div>
              <div class="d-flex align-center">
                <p
                  class="ml-6 mb-2 pointer"
                  @click="commentLike(comment)"
                >
                  <v-card-text style="font-size: 12px" class="text-capitalize pa-0 ml-1">
                    Beğen
                  </v-card-text>
                </p>
                <v-card-subtitle v-if="comment.liked_by_count" class="mb-2">
                  {{ comment.liked_by_count }}
                </v-card-subtitle>|
                <p
                  class="ml-6 mb-2 pointer"
                  @click="commentParent(comment,item)"
                >
                  <v-card-text style="font-size: 12px" class="text-capitalize pa-0 ml-1">
                    Yorum Yap
                  </v-card-text>
                </p>
              </div>
            </v-card>
          </v-card>
        </v-card>
      </v-col>

      <v-col>
        <v-card
          min-height="268"
          class="mt-4 mr-4 justify-start elevation-0 footer-background py-0 text-center "
          width="300"
        >
          <div class="mb-3">
            <span class="mr-3 pointer">Hakkında</span>
            <span class="mr-3 pointer">Erişilebilirlik</span>
            <span class="pointer">Yardım Merkezi</span>
          </div>
          <div class="mb-3">
            <span class="mr-3 pointer">Gizlilik ve Koşullar</span>
            <span class="pointer">Reklam Tercihleri</span>
          </div>
          <div class="mb-3">
            <span class="mr-3 pointer">Reklam</span>
            <span class="pointer">Ticari Hizmetler</span>
          </div>
          <div>
            <span class="mr-3 pointer">LinkedIn uygulamasını yükle</span>
            <span class="pointer">Daha Fazla</span>
          </div>
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
      disableSend: true,
      dialog: false,
      postItem: '',
      posts: [],
      postImage: null,
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
      const params = {
        page_size: 50
      }
      this.$axios.$get(process.env.POSTS_URL, { params })
        .then((response) => {
          this.posts = response.results.map(post => ({
            ...post,
            commentVisible: false,
            comments: null
          }))
        })
    },
    postCreate () {
      const formData = new FormData()
      formData.append('text', this.postItem)
      if (this.media_file) {
        formData.append('media_file', this.media_file)
      }
      this.$axios.$post('/api/pages/post/', formData)
        .then(() => {
          this.postGet()
        })
      this.postItem = ''
      this.media_file = null
      this.dialog = false
      this.postImage = null
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
    commentLike (item) {
      item.liked = !item.liked
      if (item.liked === true) {
        this.$axios.post(process.env.COMMENT_LIKE_URL.replace('{uuid}', item.uuid))
        return item.liked
      } else {
        this.$axios.post(process.env.COMMENT_UNLIKE_URL.replace('{uuid}', item.uuid))
      }
    },
    redirectProfile () {
      this.$router.push('/profile')
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
    },
    commentParent (comment, item) {
      const params = {
        post: item.uuid,
        parent: comment.uuid,
        text: 'deniyom'
      }
      this.$axios.$post('/api/pages/comment/', params)
        .then((res) => {
          item.comments.push(res)
          this.newComment = ''
        })
    },
    openFileInput () {
      this.$refs.fileInput.click()
    },
    onFileChange (event) {
      // Dosya seçildiğinde bu method çalışacak
      this.media_file = event.target.files[0]
      this.postImage = URL.createObjectURL(this.media_file)
    },
    showDateTime (createdAt) {
      const dateObject = new Date(createdAt)
      const now = new Date()

      const diffMs = now - dateObject
      const diffHours = Math.round(diffMs / (1000 * 60 * 60))

      if (diffHours < 24) {
        if (diffHours < 1) {
          const diffMinutes = Math.round(diffMs / (1000 * 60))
          return `${diffMinutes} dakika önce`
        } else {
          return `${diffHours} saat önce`
        }
      } else {
        return dateObject.toLocaleDateString('tr-TR')
      }
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
    border: 3px solid #fff;
}
.card-border{
  border-radius: 8px;
  border: 1px solid rgba(224, 224, 224, 0.60)
}
.footer-background{
  background-color:#F3F2EFFF;
  align-items: center;
  flex-wrap: wrap;
  text-decoration: none;
  color: rgba(0,0,0,0.6);
  font-size: 12px;
  line-height: 16px;
}
.pointer{
  cursor: pointer;
}
</style>
