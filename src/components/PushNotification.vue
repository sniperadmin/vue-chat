<template>
    <div v-if="notificationsSupported" class="push">
        <v-btn @click="askPermission" class="timer__button" :disabled="disabled">{{ buttonMsg }}</v-btn>
    </div>
</template>

<script>
    export default {
        name: 'push-notification',
        props: {
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                notificationsSupported: false,
                buttonMsg: 'Enable Notifications',
            }
        },
        methods: {
            askPermission() {
                this.disabled = true
                this.buttonMsg = 'You have enabled the notifications'
                if (this.notificationsSupported) {
                    Notification.requestPermission(result => {
                        // console.log('result from permission question', result);
                        if (result !== 'granted') {
                            alert('You probably do not like notifications?!');
                        } else {
                            // console.log(
                            //     'A notification will be send from the service worker => This only works in production'
                            //     );
                            this.showNotification()
                        }
                    })
                }
            },
            showNotification() {
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.ready // returns a Promise, the active SW registration
                        .then(swreg => swreg.showNotification(`Notifications granted`, {
                            body: `Here is a first notification`,
                            icon: '/img/icons/android-chrome-192x192.png',
                            image: '/img/autumn-forest.png',
                            vibrate: [300, 200, 300],
                            badge: '/img/icons/plint-badge-96x96.png'
                        }))
                        .then(() => {

                         })
                       
                }
            },
        },
        created() {
            if ('Notification' in window && 'serviceWorker' in navigator) {
                this.notificationsSupported = true
            }
        },
    }
</script>

<style scoped>

</style>