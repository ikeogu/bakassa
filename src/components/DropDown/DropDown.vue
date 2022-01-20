<template>
    <div class="select" >
        <div
            v-if="!isOptionsVisible || !enableSearch"
            tabindex=0
            :class="{
                display: true,
                hide_border: hideBorder,
                open_border: isOptionsVisible
            }"
            @click="$emit('show-options', dropdownIndex)"
            @keypress.enter="$emit('show-options', dropdownIndex)"
        >
            <div class="placeholder-option" v-if="placeholder!=undefined && !selected">{{placeholder}}</div>
            <div class="selected-option" v-if="placeholder!=undefined && selected">{{options[selectedIndex].display_name}}</div>
            <div class="selected-option" v-if="placeholder==undefined && selected">{{options[selectedIndex].display_name}}</div>
            <div class="icon" v-if="!hideIcon">
                <font-awesome-icon :icon="['fas', 'caret-down']" v-if="!isOptionsVisible"/>
                <font-awesome-icon :icon="['fas', 'caret-up']" v-if="isOptionsVisible"/>
            </div>
        </div>

        <input
            v-if="isOptionsVisible && enableSearch"
            placeholder="Search Options"
            class="open_border"
            :type="this.searchModel.type"
            v-model="this.searchModel.value"
            @keyup="searchOption()"
            autofocus
        />

        <div 
            class="options"
            :style="{ 'z-index': raiseBy }" 
            v-if="isOptionsVisible"
        >
            <div 
                tabindex=1
                class="option" 
                v-for="(option, index) in allOptions" 
                :key="option.value" 
                @click="optionSelected(index)"
                @keypress.enter="optionSelected(index)"
            > 
                {{ option.display_name }}
            </div>

            <div 
                class="no_option"
                v-if="allOptions.length === 0"
            > No Option Found </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'Drop-Down',
    props: [
        'placeholder', 
        'enableSearch',
        'options',
        'isOptionsVisible',
        'selected',
        'selectedIndex',
        'hideIcon',
        'hideBorder',
        'dropdownIndex',
        'raiseBy',
    ],
    data(){
        return {
            allOptions: this.options,
            searchModel: {
                type: 'text',
                value: ''
            }
        }
    },
    methods: {
        searchOption() {
            if(this.searchModel.value == '') this.allOptions = this.options
            else {
                this.allOptions = this.options.filter(option => {
                    // if(typeof(option.value) == 'string') {
                        return option.value.toString().toLowerCase().search(this.searchModel.value.toString().toLowerCase()) != -1;
                    // } else {
                    //     return option.value.search(this.searchModel.value) != -1;
                    // }
                });
            }
        },
        optionSelected (index){
            var mainIndex = 0;

            for(var i=0; i < this.options.length; i++) {
                if(this.allOptions[index].value == this.options[i].value) {
                    mainIndex = i;
                    break;
                }

            }

            this.$emit('option-select', { 
                    dropdownIndex: this.dropdownIndex, 
                    optionIndex: mainIndex 
                });
        }
    }
});
</script>

<style scoped>
    .select {
        height: 100%;
        width: 100%;
        cursor: pointer;
        position: relative;
    }
    .select *::selection {
        background: none;
    }
    .display {
        height: 100%;
        padding: 0% 6%;
        display: flex;
        text-align: start;
        border: 1px solid lightgrey;
        border-radius: 5px;
        text-transform: capitalize;
        font-size: 105%;
        color: rgb(83, 83, 83);
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .display:focus {
        outline-color: var(--paper-light-blue-500);
    }
    .hide_border {
        border: none;
    }
    .open_border {
        border-radius: 5px 5px 0px 0px;
    }
    .display > div {
        display: flex;
        align-items: center;
    }
    .display div.selected-option, div.display div.placeholder-option {
        width: 90%;
        margin: auto 0;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        line-clamp: 1;
        -webkit-box-orient: vertical;
    }
    .display div.placeholder-option {
        color: rgba(146, 146, 146, 0.705);
    }
    .icon {
        width: 10%;
        justify-content: center;
    }

    input {
        outline: none;
        width: 87.5%;
        height: 100%;
        padding: 0% 6%;
        display: flex;
        text-align: start;
        border: 1px solid lightgrey;
        border-radius: 5px;
        text-transform: capitalize;
        font-size: 105%;
        color: rgb(83, 83, 83);
        font-weight: 400;
    }
    input::placeholder {
        color: var(--paper-grey-300);
    }

    .options {
        border: 1px solid lightgrey;
        background: white;
        position: absolute;
        width: 99.6%;
        max-height: 35vh;
        overflow-y: auto;
        left: 0;
        top: 103%;
        padding: 2% 0%;
        border-radius: 0 0 5px 5px;
    }
    div.option {
        display: flex;
        align-items: center;
        text-align: start;
        color: grey;
        padding: 3% 6%;
        text-transform: capitalize;
    }
    div.option:hover {
        background: rgb(216, 216, 216);
    }
    .no_option {
        margin: 0 auto;
        width: max-content;
        color: grey;
    }
</style>