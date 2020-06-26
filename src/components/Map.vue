<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                color="deep-purple accent-4"
                app
                left
        >
            <v-list dense>
                <v-list-item link>
                    <v-list-item-action>
                        <v-icon class="white--text">mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title class="white--text">Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item link>
                    <v-list-item-action>
                        <v-icon class="white--text">mdi-map</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                        <v-list-item-title class="white--text">Map</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                app
                color="deep-purple accent-4"
                dense
                dark
                right
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>HomeBow</v-toolbar-title>

            <v-menu
                left
                bottom
            ></v-menu>

            <v-spacer></v-spacer>

        </v-app-bar>

        <v-main>
            <v-container
                    class="fill-height"
                    fluid
            >

                    <v-card
                            class="mx-auto"
                            max-width="500"
                    >
                        <v-card-text>
                            <div>Your coordinates:</div>

                            <div class="text--primary">
                                <div> Latitude: {{ myCoordinates.lat }} </div>
                                <div> Longitude: {{ myCoordinates.lng }} </div>
                            </div>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn
                                    text
                                    color="deep-purple accent-4"
                            >
                                Learn More
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                <v-card
                        class="mx-auto"
                >
                    <v-card-text>
                        <div>Map coordinates:</div>

                        <div class="text--primary">
                            <div> Latitude: {{ mapCoordinates.lat }} </div>
                            <div> Longitude: {{ mapCoordinates.lng }} </div>
                        </div>
                        <GmapMap
                                :center="myCoordinates"
                                :zoom="zoom"
                                style="width:640px; height:360px; margin: 32px auto;"
                                ref="mapRef"
                                @dragend="handleDrag"
                        ></GmapMap>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                                text
                                color="deep-purple accent-4"
                        >
                            Learn More
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <v-row
                        align="center"
                        justify="center"
                >
                    <v-col class="text-center">
                        <v-tooltip left>
                            <span>Source</span>
                        </v-tooltip>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>

        <v-footer
                color="deep-purple accent-4"
                app
        >
            <v-spacer></v-spacer>

            <span class="white--text">&copy; HomeBow LLC, 2020</span>
        </v-footer>
    </v-app>
</template>

<script>
    export default {
        props: {
            source: String,
        },
        data() {
            return {
                address: '',
                map: null,
                drawer: null,
                myCoordinates: {
                    lat: 0,
                    lng: 0
                },
                zoom: 7
            }
        },
        created() {
            // does the user have a saved center? use it instead of the default
            if(localStorage.center) {
                this.myCoordinates = JSON.parse(localStorage.center);
            } else {
                // get user's coordinates from browser request
                this.$getLocation({})
                    .then(coordinates => {
                        this.myCoordinates = coordinates;
                    })
                    .catch(error => alert(error));
            }
            // does the user have a saved zoom? use it instead of the default
            if(localStorage.zoom) {
                this.zoom = parseInt(localStorage.zoom);
            }
        },
        mounted() {
            // To demonstrate functionality of exposed component functions
            // Here we make focus on the user input

            // add the map to a data object
            this.$refs.mapRef.$mapPromise.then(map => this.map = map);

        },
        methods: {
            getAddressData: function (addressData) {
                this.address = addressData;
            },
            handleDrag() {
                // get center and zoom level, store in localstorage
                let center = {
                    lat: this.map.getCenter().lat(),
                    lng: this.map.getCenter().lng()
                };
                let zoom = this.map.getZoom();
                localStorage.center = JSON.stringify(center);
                localStorage.zoom = zoom;
            }
        },
        computed: {
            mapCoordinates() {
                if(!this.map) {
                    return {
                        lat: 0,
                        lng: 0
                    };
                }
                return {
                    lat: this.map.getCenter().lat().toFixed(4),
                    lng: this.map.getCenter().lng().toFixed(4)
                }
            }
        }
    }
</script>
