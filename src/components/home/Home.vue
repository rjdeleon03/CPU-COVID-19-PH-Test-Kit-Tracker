<template>
  <div>
    <div id="app2">
      <v-app id="inspire">
        <v-toolbar dark color="primary" fixed>
          <v-toolbar-title class="white--text">Nutrition</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-menu offset-y :nudge-left="170" :close-on-content-click="false">
            <v-btn icon slot="activator">
              <v-icon>more_vert</v-icon>
            </v-btn>
            <v-list>
              <v-list-tile
                v-for="(item) in headers"
                :key="item.value"
                @click="changeSort(item.value)"
              >
                <v-list-tile-title>
                  {{ item.text }}
                  <v-icon
                    v-if="pagination.sortBy === item.value"
                  >{{pagination.descending ? 'arrow_downward':'arrow_upward'}}</v-icon>
                </v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </v-toolbar>
        <v-layout v-resize="onResize" column style="padding-top:56px">
          <v-data-table
            :headers="headers"
            :items="desserts"
            :search="search"
            :pagination.sync="pagination"
            :hide-headers="isMobile"
            :class="{mobile: isMobile}"
          >
            <template slot="items" slot-scope="props">
              <tr v-if="!isMobile">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item.calories }}</td>
                <td class="text-xs-right">{{ props.item.fat }}</td>
                <td class="text-xs-right">{{ props.item.carbs }}</td>
                <td class="text-xs-right">{{ props.item.protein }}</td>
                <td class="text-xs-right">{{ props.item.iron }}</td>
              </tr>
              <tr v-else>
                <td>
                  <ul class="flex-content">
                    <li class="flex-item" data-label="Name">{{ props.item.name }}</li>
                    <li class="flex-item" data-label="Calories">{{ props.item.calories }}</li>
                    <li class="flex-item" data-label="Fat (g)">{{ props.item.fat }}</li>
                    <li class="flex-item" data-label="Carbs (g)">{{ props.item.carbs }}</li>
                    <li class="flex-item" data-label="Protein (g)">{{ props.item.protein }}</li>
                    <li class="flex-item" data-label="Iron (%)">{{ props.item.iron }}</li>
                  </ul>
                </td>
              </tr>
            </template>
            <v-alert
              slot="no-results"
              :value="true"
              color="error"
              icon="warning"
            >Your search for "{{ search }}" found no results.</v-alert>
          </v-data-table>
        </v-layout>
      </v-app>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data: () => ({
    pagination: {
      sortBy: "name"
    },
    selected: [],
    search: "",
    isMobile: false,
    headers: [
      {
        text: "Dessert (100g serving)",
        align: "left",
        value: "name"
      },
      {
        text: "Calories",
        value: "calories"
      },
      {
        text: "Fat (g)",
        value: "fat"
      },
      {
        text: "Carbs (g)",
        value: "carbs"
      },
      {
        text: "Protein (g)",
        value: "protein"
      },
      {
        text: "Iron (%)",
        value: "iron"
      }
    ],
    desserts: [
      {
        value: false,
        name: "Frozen Yogurt",
        calories: 159,
        fat: 6.0,
        carbs: 24,
        protein: 4.0,
        iron: "1%"
      },
      {
        value: false,
        name: "Ice cream sandwich",
        calories: 237,
        fat: 9.0,
        carbs: 37,
        protein: 4.3,
        iron: "1%"
      },
      {
        value: false,
        name: "Eclair",
        calories: 262,
        fat: 16.0,
        carbs: 23,
        protein: 6.0,
        iron: "7%"
      },
      {
        value: false,
        name: "Cupcake",
        calories: 305,
        fat: 3.7,
        carbs: 67,
        protein: 4.3,
        iron: "8%"
      },
      {
        value: false,
        name: "Gingerbread",
        calories: 356,
        fat: 16.0,
        carbs: 49,
        protein: 3.9,
        iron: "16%"
      },
      {
        value: false,
        name: "Jelly bean",
        calories: 375,
        fat: 0.0,
        carbs: 94,
        protein: 0.0,
        iron: "0%"
      },
      {
        value: false,
        name: "Lollipop",
        calories: 392,
        fat: 0.2,
        carbs: 98,
        protein: 0,
        iron: "2%"
      },
      {
        value: false,
        name: "Honeycomb",
        calories: 408,
        fat: 3.2,
        carbs: 87,
        protein: 6.5,
        iron: "45%"
      },
      {
        value: false,
        name: "Donut",
        calories: 452,
        fat: 25.0,
        carbs: 51,
        protein: 4.9,
        iron: "22%"
      },
      {
        value: false,
        name: "KitKat",
        calories: 518,
        fat: 26.0,
        carbs: 65,
        protein: 7,
        iron: "6%"
      }
    ]
  }),

  methods: {
    onResize() {
      if (window.innerWidth < 769) this.isMobile = true;
      else this.isMobile = false;
    },
    toggleAll() {
      if (this.selected.length) this.selected = [];
      else this.selected = this.desserts.slice();
    },
    changeSort(column) {
      console.log(column);
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    }
  }
};
</script>

<style>
.mobile {
  color: #333;
}

@media screen and (max-width: 768px) {
  .mobile table.v-table tr {
    max-width: 100%;
    position: relative;
    display: block;
  }

  .mobile table.v-table tr:nth-child(odd) {
    border-left: 6px solid deeppink;
  }

  .mobile table.v-table tr:nth-child(even) {
    border-left: 6px solid cyan;
  }

  .mobile table.v-table tr td {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #f5f5f5;
    height: auto;
    padding: 10px;
  }

  .mobile table.v-table tr td ul li:before {
    content: attr(data-label);
    padding-right: 0.5em;
    text-align: left;
    display: block;
    color: #999;
  }
  .v-datatable__actions__select {
    width: 50%;
    margin: 0px;
    justify-content: flex-start;
  }
  .mobile .theme--light.v-table tbody tr:hover:not(.v-datatable__expand-row) {
    background: transparent;
  }
}
.flex-content {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.flex-item {
  padding: 5px;
  width: 50%;
  height: 40px;
  font-weight: bold;
}
</style>