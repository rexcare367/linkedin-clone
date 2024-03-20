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
            </v-card-title><v-spacer />
            <v-card-actions class="d-flex justify-end mr-4 mb-6 pa-0">
              <v-btn icon @click="dialog = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-actions>
          </div>
          <v-card-subtitle style="margin-left: 11%;margin-top: -3%">
            Herhangi Biri
          </v-card-subtitle>
          <v-textarea
            v-model="postItem"
            class="mt-2 mr-2 search-field"
            style="font-size: 20px"
            rows="12"
            required
            placeholder="Ne hakkında konuşmak istiyorsunuz?"
            no-resize
            solo
            flat
          />
          <v-img v-if="postImage" class="justify-end" :src="postImage" />
          <input
            ref="fileInput"
            type="file"
            accept="image/*,video/*"
            style="display: none"
            @change="onFileChange"
          >
          <v-btn
            class="mx-4 mb-4 elevation-0"
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
      <v-col
        cols="3"
      >
        <v-card
          class="mt-4 justify-start elevation-0 card-border"
        >
          <v-avatar
            class="profile-image pointer"
            size="68"
            @click="redirectProfile($store.state.auth.user.uuid)"
          >
            <v-img
              :src="$store.state.auth?.user.profile_photo"
            />
          </v-avatar>
          <v-img
            :src="$store.state.auth?.user.banner_photo"
            class="background-image"
            style="border-top-left-radius: 10px;border-top-right-radius: 10px"
          />
          <v-card-title
            class="mt-8 align-center justify-center pointer"
            style="font-size: 16px"
            @click="redirectProfile($store.state.auth.user.uuid)"
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

      <v-col cols="6">
        <v-card class="rounded-lg mt-4" elevation="0">
          <v-card-text class="d-flex align-center">
            <v-avatar
              color="primary"
              size="45"
            >
              <v-img :src="$store.state.auth?.user.profile_photo" />
            </v-avatar>
            <v-spacer />
            <div style="width: calc(100% - 50px)">
              <v-btn
                block
                class="d-flex justify-start text-capitalize"
                style="border-radius: 500px;border: 1px solid darkgrey;font-size: 14px;font-style: normal;font-weight:500;color: rgba(0,0,0,0.6)"
                height="46"
                elevation="0"
                outlined
                @click="dialog=true"
              >
                Gönderiyi başlat
              </v-btn>
            </div>
          </v-card-text>
          <v-card-text class="pa-0 ma-0">
            <v-row>
              <v-col
                v-for="(item,i) in postItems"
                :key="i"
                class="d-flex justify-center"
              >
                <v-btn
                  text
                  class="text-capitalize"
                  @click="dialog=true"
                >
                  <v-icon :color="item.color" class="mr-2">
                    {{ item.icon }}
                  </v-icon>
                  <v-card-text
                    style="color:rgba(0, 0, 0, 0.60);font-size:14px;font-weight: 500;"
                    class="text-capitalize pa-0 ml-1"
                  >
                    {{ item.text }}
                  </v-card-text>
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>

        <v-divider class="mb-2 mt-6" />

        <v-card
          v-for="(item,i) in posts"
          :key="i"
          class="elevation-1 card-border mb-2"
        >
          <v-row>
            <v-col cols="1" class="mr-2 mt-2">
              <v-avatar
                class="mt-3 ml-4 pointer"
                size="48"
                @click="redirectProfile(item.user.uuid)"
              >
                <v-img :src="item.user.profile_photo" />
              </v-avatar>
            </v-col>
            <v-col>
              <v-card-title
                style="font-size: 16px"
                class="pointer"
                @click="redirectProfile(item.user.uuid)"
              >
                {{ item.user.first_name }} {{ item.user.last_name }}
              </v-card-title>
              <v-card-subtitle>{{ showDateTime(item.created_at) }}</v-card-subtitle>
            </v-col>
            <v-menu offset-y>
              <template #activator="{ on }">
                <v-btn icon class="mr-5 mt-4" v-on="on">
                  <v-icon>
                    mdi-dots-horizontal
                  </v-icon>
                </v-btn>
              </template>

              <v-list dense class="pa-0">
                <v-list-item v-if="showDeleteButton(item)" dense class="px-3 py-1" @click="deletePost(item)">
                  <v-icon class="red--text mr-2" small>
                    mdi-delete
                  </v-icon>
                  Sil
                </v-list-item>
              </v-list>
            </v-menu>
          </v-row>
          <v-card-text style="color:black">
            {{ truncateText(item.text) }}
          </v-card-text>
          <template v-if="showMoreVisible">
            <v-btn v-if="item.text.length > charLimit" style="font-size: 12px" depressed text @click="toggleShowText">
              Daha fazla göster
            </v-btn>
          </template>
          <div v-if="item.media_file">
            <v-img
              v-if="item.media_file.split('.')[item.media_file.split('.').length-1] !== 'mp4'"
              :src="item.media_file"
            />
            <video
              v-else
              :src="item.media_file"
            />
          </div>
          <v-card-subtitle v-if="item.liked_by_count||item.comment_count" class="pa-0 d-flex justify-space-between mt-2">
            <div class="d-flex align-center mb-2">
              <v-icon color="blue" size="15" class="ml-2 mr-1 mt-1">
                mdi-thumb-up
              </v-icon>
              {{ item.liked_by_count }} kişi
            </div>
            <div class="mb-2 d-flex">
              <v-card-text v-if="item.comment_count" class="pointer" @click="showComments(item)">
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

          <v-card v-if="item.commentVisible" class="elevation-0 d-flex flex-column">
            <div class="d-flex ma-0 pa-0">
              <v-avatar class="ml-4 mt-4" size="40">
                <v-img :src="$store.state.auth?.user?.profile_photo" />
              </v-avatar>
              <v-text-field
                v-model="newComment"
                class="mr-3 mt-4 ml-3 mb-3"
                hide-details
                rounded
                outlined
                dense
                placeholder="Yorum ekle..."
                @keydown.enter="commentSend(item, newComment)"
              >
                <template #append>
                  <v-btn icon>
                    <v-icon class="mb-2">
                      mdi-emoticon-happy-outline
                    </v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon class="mb-2">
                      mdi-image-outline
                    </v-icon>
                  </v-btn>
                </template>
              </v-text-field>
            </div>
            <v-btn
              v-if="newComment"
              class="text-capitalize mb-4 ml-16 mt-1 pa-0 elevation-0"
              rounded
              min-height="24"
              max-height="24"
              min-width="68"
              max-width="68"
              style="color:white;background-color: #0A66C2;"
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
              class="elevation-0 border"
            >
              <div class="d-flex">
                <v-avatar
                  class="ml-4 mt-5 pointer"
                  size="40"
                  @click="redirectProfile(comment.user.uuid)"
                >
                  <v-img :src="comment.user?.profile_photo" />
                </v-avatar>
                <v-card
                  width="479"
                  class="ml-2 mr-2 mt-5 mb-3 elevation-0"
                >
                  <v-card-title
                    style="font-size: 14px;background-color: #F2F2F2"
                    class="pointer"
                    @click="redirectProfile(item.user.uuid)"
                  >
                    {{ comment.user?.first_name }} {{ comment.user?.last_name }}
                  </v-card-title>
                  <v-card-text
                    style="line-height: 20px;color: rgba(0, 0, 0, 0.9);background-color: #F2F2F2"
                  >
                    {{ comment.text }}
                  </v-card-text>
                  <v-card-text class="pa-2 ma-0 d-flex">
                    <v-chip small color="transparent" @click="commentLike(comment)">
                      Beğen  {{ comment.liked_by_count }}
                    </v-chip>
                    <v-divider class="mx-3" vertical />
                    <v-chip small color="transparent" @click="comment.visible=true">
                      Yorum Yap
                    </v-chip>
                  </v-card-text>
                  <v-card v-if="comment.visible" class="elevation-0">
                    <div class="d-flex align-center">
                      <v-avatar class="ml-4 mt-6" size="40">
                        <v-img :src="$store.state.auth?.user?.profile_photo" />
                      </v-avatar>
                      <v-text-field
                        v-model="parentComment"
                        class="mt-6 mr-3 ml-3"
                        rounded
                        outlined
                        dense
                        hide-details
                        placeholder="Yorum yap..."
                        @keydown.enter="commentParent(item,comment, parentComment)"
                      />
                    </div>
                    <v-btn
                      v-if="parentComment"
                      class="text-capitalize mb-4 mt-2 ml-16"
                      rounded
                      min-height="23"
                      max-height="23"
                      style="color:white;background-color: #0A66C2;"
                      @click="commentParent(item, parentComment)"
                    >
                      Yayınla
                    </v-btn>
                  </v-card>
                  <v-card
                    v-if="comment.sub_comments"
                    class="elevation-0"
                  >
                    <v-card
                      v-for="(comments, a) in comment.sub_comments"
                      :key="a"
                      class="elevation-0"
                    >
                      <div class="d-flex align-center">
                        <v-avatar
                          class="ml-6 pointer"
                          size="40"
                          @click="redirectProfile(comments.user.uuid)"
                        >
                          <v-img :src="'http://localhost:8888'+comments.user.profile_photo" />
                        </v-avatar>
                        <v-card
                          width="435"
                          class="ml-5 mr-2 mt-5 mb-3 elevation-0"
                          color="#F2F2F2"
                        >
                          <v-card-title
                            style="font-size: 14px"
                            class="pointer"
                            @click="redirectProfile(item.user.uuid)"
                          >
                            {{ comments.user.first_name }} {{ comments.user.last_name }}
                          </v-card-title>
                          <v-card-text
                            style="line-height: 20px;color: rgba(0, 0, 0, 0.9)"
                          >
                            {{ comments.text }}
                          </v-card-text>
                        </v-card>
                      </div>
                    </v-card>
                  </v-card>
                </v-card>
              </div>
            </v-card>
          </v-card>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card
          class="mt-4 mr-4 justify-start elevation-0 footer-background py-0 text-center"
          style="position: sticky;top: 58px;"
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
      isFullTextVisible: true,
      postItem: '',
      posts: [],
      postImage: null,
      charLimit: 150,
      newComment: null,
      showFullText: false,
      showMoreVisible: true,
      media_file: null,
      commentVisible: false,
      parentComment: null,
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
          .then(() => {
            item.liked_by_count++
          })
        return item.liked
      } else {
        this.$axios.post(process.env.POST_UNLIKE_URL.replace('{uuid}', item.uuid))
          .then(() => {
            item.liked_by_count--
          })
      }
    },
    truncateText (text) {
      if (this.showFullText || text.length <= this.charLimit) {
        return text
      } else {
        return text.slice(0, this.charLimit) + '...'
      }
    },
    toggleShowText () {
      this.showFullText = !this.showFullText
      this.showMoreVisible = false
    },
    commentLike (item) {
      item.liked = !item.liked
      if (item.liked === true) {
        this.$axios.post(process.env.COMMENT_LIKE_URL.replace('{uuid}', item.uuid))
          .then(() => {
            item.liked_by_count++
          })
        return item.liked
      } else {
        this.$axios.post(process.env.COMMENT_UNLIKE_URL.replace('{uuid}', item.uuid))
          .then(() => {
            item.liked_by_count--
          })
      }
    },
    redirectProfile (uuid) {
      this.$router.push(`/profile/${uuid}`)
    },
    showDeleteButton (item) {
      return this.$store.state.auth?.user.uuid === item.user.uuid
    },
    deletePost (item) {
      this.$axios.$delete(process.env.DELETE_POST_URL.replace('{uuid}', item.uuid))
        .then(() => {
          this.postGet()
        })
    },
    showComments (item) {
      item.commentVisible = true
      const params = {
        post: item.uuid,
        no_parent: true
      }
      this.$axios.$get(process.env.POST_COMMENT_URL, { params })
        .then((response) => {
          item.comments = response.map((comment) => {
            return {
              ...comment,
              visible: false
            }
          })
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
          item.comment_count++
        })
    },
    commentParent (item, comment) {
      const params = {
        post: item.uuid,
        parent: comment.uuid,
        text: this.parentComment
      }
      this.$axios.$post('/api/pages/comment/', params)
        .then(() => {
          this.newComment = ''
        })
    },
    openFileInput () {
      this.$refs.fileInput.click()
    },
    onFileChange (event) {
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
