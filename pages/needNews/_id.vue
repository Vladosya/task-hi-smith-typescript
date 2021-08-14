<template>
  <div class="container">
    <div v-for="it in item" :key="it.id" class="needNews">
      <div class="needNews-information">
        <div class="needNews-information__title">
          {{ it.title[0] }}
        </div>
        <div class="needNews-information__author">
          <div class="needNews-information__author_date">
            {{ it.pubDate[0] }}
          </div>
          <div
            v-if="typeof it.author === 'object'"
            class="needNews-information__author_authors"
          >
            {{ it.author[0] }}
          </div>
          <div
            v-if="typeof it.author === 'undefined'"
            class="needNews-information__author_no"
          >
            Без Автора
          </div>
        </div>
        <div class="needNews-information__description">
          <div class="needNews-information__description_title">Анонс</div>
          <div class="needNews-information__description_text">
            {{ it.description[0] }}
          </div>
        </div>
        <div class="needNews-information__link">
          <div class="needNews-information__link_text">Ссылка на оригинал:</div>
          <a
            href="https://www.rbc.ru/society/12/08/2021/5e2fe9459a79479d102bada6"
            class="needNews-information__link_link"
            >{{ it.link[0] }}</a
          >
        </div>
      </div>
      <div class="needNews-carousel">
        <div class="needNews-carousel-look">
          <el-tooltip
            class="item"
            effect="dark"
            content="Посмотреть фото"
            placement="bottom"
          >
            <el-image
              class="needNews-carousel__img"
              src="https://thumbs.dreamstime.com/b/%D0%B7%D0%BD%D0%B0%D1%87%D0%BE%D0%BA-%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D1%8B-47034500.jpg"
              :preview-src-list="srcList"
              @click="ddd"
            >
            </el-image>
          </el-tooltip>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { JsonType } from '../../types'

type NeedNewsIdType = {
  isOpenImages: boolean
  url: string
  srcList: string[]
}

export default Vue.extend({
  data(): NeedNewsIdType {
    return {
      isOpenImages: false as boolean,
      url: 'http://pics.rbc.ru/img/fp_v4/skin/img/v6-logo.png' as string,
      srcList: [] as string[],
    }
  },
  computed: {
    item(): JsonType {
      return this.$store.getters.item
    },
  },
  created(): void {
    if (this.$store.state.items.length === 0) {
      this.$store.commit('getContent')
    }
    this.$store.commit('getItemById', Number(this.$route.params.id))

    if (this.$store.state.item.length > 0) {
      if (typeof this.item[0].enclosure === 'object') {
        this.item[0].enclosure.forEach((i: any) => {
          this.srcList.push(i.$.url)
        })
      }
    }
  },
  methods: {
    ddd(): void {
      if (typeof this.item[0].enclosure === 'undefined') {
        this.$message({
          message: 'Извините, фотографий нет.',
          type: 'warning',
        })
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  max-width: 100%;
}

.needNews {
  display: grid;
  grid-template-columns: 40% 60%;
}

.needNews-information {
  padding: 0 20px;

  &__title {
    margin-top: 250px;
    font-size: 23px;
    text-align: center;
  }

  &__author {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-top: 10px;
  }

  &__author_authors {
    max-width: 250px;
  }

  &__description {
    margin-top: 20px;
    text-align: center;
  }

  &__description_title {
    font-size: 18px;
  }

  &__description_text {
    margin-top: 3px;
  }

  &__link {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 15px;
  }

  &__link_link {
    margin-left: 5px;
  }
}

.needNews-carousel {
  &__img {
    width: 100px;
    height: 100px;
  }
}

.needNews-carousel-look {
  display: flex;
  justify-content: center;
  margin-top: 300px;

  button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 84px;
    height: 84px;
  }

  i {
    font-size: 100px;
  }
}
</style>