<template>
  <ClientOnly>
    <div class="news">
      <div class="news-block">
        <div v-for="item in visibleTodos" :key="item.id">
          <el-card class="box-card" shadow="hover">
            <div class="news__title">
              <nuxt-link :to="`/needNews/${item.id}`">
                {{ item.title[0] }}
              </nuxt-link>
            </div>
            <div class="news-information">
              <div class="news-information__info">
                <div class="news-information__info_title">Анонс:</div>
                <div class="news-information__info_text">
                  {{ item.description[0] }}
                </div>
              </div>
              <div class="news-information__authorInfo">
                <div>
                  <div class="news-information__authorInfo_img">
                    <img
                      v-if="typeof item.enclosure === 'object'"
                      :src="
                        item.enclosure[0].$.type === 'image/jpeg' ||
                        item.enclosure[0].$.type === 'image/png'
                          ? item.enclosure[0].$.url
                          : item.enclosure[1].$.type === 'image/jpeg' ||
                            item.enclosure[1].$.type === 'image/png'
                          ? item.enclosure[1].$.url
                          : ''
                      "
                      alt=""
                    />
                    <div
                      v-if="typeof item.enclosure === 'undefined'"
                      class="news-information__no_img"
                    >
                      <i class="el-icon-user"></i>
                    </div>
                  </div>
                  <div>
                    <div
                      v-if="typeof item.author === 'object'"
                      class="news-information__authorInfo_name"
                    >
                      {{ item.author[0] }}
                    </div>
                    <div
                      v-if="typeof item.author === 'undefined'"
                      class="news-information__authorInfo_name"
                    >
                      Без автора
                    </div>
                    <div class="news-information__authorInfo_date">
                      {{ item.pubDate[0] }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <Pagination
        :items="items"
        :current-page="currentPage"
        :page-size="pageSize"
        @page:update="updatePage"
      />
    </div>
  </ClientOnly>
</template>

<script lang="ts">
import Vue from 'vue'
import { JsonType } from '../types'
import Pagination from './Pagination.vue'

type NewsDataType = {
  currentPage: number
  pageSize: number
  visibleTodos: JsonType[]
}

export default Vue.extend({
  components: {
    Pagination,
  },
  data(): NewsDataType {
    return {
      currentPage: 1 as number,
      pageSize: 5 as number,
      visibleTodos: [] as JsonType[],
    }
  },
  computed: {
    items(): JsonType {
      return this.$store.getters.items
    },
  },
  created(): void {
    this.$store.commit('getContent')
  },
  beforeMount(): void {
    this.updateVisibleTodos()
  },
  beforeUpdate(): void {
    this.updateVisibleTodos()
  },
  methods: {
    updatePage(pageNumber: number): void {
      this.currentPage = pageNumber
      this.updateVisibleTodos()
    },
    updateVisibleTodos(): void {
      this.visibleTodos = this.items.slice(
        (this.currentPage - 1) * this.pageSize,
        (this.currentPage - 1) * this.pageSize + this.pageSize
      )

      if (this.visibleTodos.length === 0 && this.currentPage > 0) {
        this.updatePage(this.currentPage - 1)
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.news {
  margin: 0 auto;
  padding-top: 20px;
  max-width: 900px;

  &__btn {
    float: right;
    padding: 3px 0;
  }

  &__title {
    font-size: 15px;
    text-align: center;

    a {
      color: #000;
    }
  }
}

.news-block > div:not(:last-child) {
  margin-bottom: 20px;
}

.news-information {
  display: grid;
  align-items: center;
  grid-template-columns: 60% 40%;
  margin-top: 10px;

  &__info {
    margin: 0 auto;
  }

  &__info_title {
    font-weight: 600;
    font-size: 18px;
    text-align: center;
  }

  &__info_text {
    margin-top: 3px;
    padding: 0 20px;
    text-align: center;
  }

  &__authorInfo > div {
    display: flex;
    align-items: center;
  }

  &__authorInfo_name {
    margin-left: 20px;
    width: 150px;
    font-size: 14px;
  }

  &__authorInfo_date {
    margin: 5px 0 0 20px;
  }

  &__authorInfo_img {
    img {
      border-radius: 100%;
      width: 80px;
      height: 80px;
    }
  }

  &__no_img {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #000;
    border-radius: 100%;
    width: 80px;
    height: 80px;

    i {
      font-size: 44px;
    }
  }
}
</style>