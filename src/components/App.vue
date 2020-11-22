<template>
    <Page @loaded="onLoaded">
        <ActionBar>
            <GridLayout width="100%" columns="auto, *">
                <Label text="MENU" @tap="$refs.drawer.nativeView.showDrawer()" col="0"/>
                <Label class="title" text="Welcome to NativeScript-Vue!"  col="1"/>
            </GridLayout>
        </ActionBar>

        <RadSideDrawer ref="drawer">
            <StackLayout ~drawerContent backgroundColor="#ffffff">
                <Label class="drawer-header" text="Drawer"/>

                <Label class="drawer-item" text="Register on Blockbrain" @tap="onRegister()" />
                <Label class="drawer-item" text="Item 2"/>
                <Label class="drawer-item" text="Item 3"/>
            </StackLayout>

            <GridLayout ~mainContent columns="*" rows="2*, auto">

<!--                <component v-for="component in viewsArray" v-show="component === currentView" :key="component" :ref="component" :is="component" row="0" col="0" colSpan="*" />
<!-                <Button text="Button" @tap="onTest" />-->

                <ViewMain ref="ViewMain" v-show="currentView === 'Main'" />
                <ViewRegistration ref="ViewRegistration" v-show="currentView === 'Registration'" :capture="false" />
            </GridLayout>
        </RadSideDrawer>
    </Page>
</template>

<script >
const blockbrain = require('~/user-module/blockbrain');

export default {
    data() {
        return {
            currentView: 'Main', 
        }
    }, 
    methods: {
        onLoaded: function() {
            blockbrain.start();
            console.log("Loaded!");
            this.navigate('Registration');
            this.$refs.ViewRegistration.capture = false;
        }, 
        onTest: function() {
            this.navigate('Registration');
        }, 

        onRegister: function() {
            this.navigate('Registration');
            this.$refs.ViewRegistration.capture = true;
        }, 

        navigate: function(view) {
            this.currentView = view;
            this.$refs.drawer.nativeView.closeDrawer();
        }
    }
}
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .title {
        text-align: left;
        padding-left: 16;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }

    .drawer-header {
        padding: 50 16 16 16;
        margin-bottom: 16;
        background-color: #53ba82;
        color: #ffffff;
        font-size: 24;
    }

    .drawer-item {
        padding: 8 16;
        color: #333333;
        font-size: 16;
    }
</style>
