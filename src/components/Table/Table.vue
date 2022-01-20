<template>
    <div class="table">
        <div class="heading">
            <div
                v-for="(item, index) in tableHeadings"
                :key=index
                :class="{
                    table_heading_item_width_2: (tableHeadings.length == 2) ? true : false,
                    table_heading_item_width_3: (tableHeadings.length == 3) ? true : false,
                    table_heading_item_width_4: (tableHeadings.length == 4) ? true : false, 
                    table_heading_item_width_5: (tableHeadings.length == 5) ? true : false
                }"
            >
                {{ item }}
            </div>
        </div>
        <div class="body">
            <div class="row"
                v-for="(tableBodyRow, tableBodyRowindex) in tableBody"
                :key=tableBodyRowindex
            >
                <div 
                    class="column"
                    :class="{
                        table_heading_item_width_2: (tableHeadings.length == 2) ? true : false,
                        table_heading_item_width_3: (tableHeadings.length == 3) ? true : false,
                        table_heading_item_width_4: (tableHeadings.length == 4) ? true : false, 
                        table_heading_item_width_5: (tableHeadings.length == 5) ? true : false
                    }"
                    v-for="(tableColumn, tableColumnindex) in tableHeadings"
                    :key=tableColumnindex
                >
                    <div class="content">{{ tableBody[tableBodyRowindex][tableColumnindex] }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/runtime-core";

export default defineComponent({
    name: 'table',
    components: { },
    props: ['tableHeadings', 'tableBody']
});
</script>

<style scoped>
.table {
}
.table .heading {
    height: 50px;
    width: 100%;
    display: flex;
    background: var(--paper-grey-100);
    text-transform: capitalize;
}
.table .heading div {
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--paper-grey-700);
}
.table_heading_item_width_2 {
    width: calc(100% / 2);
}
.table_heading_item_width_3 {
    width: calc(100% / 3);
}
.table_heading_item_width_4 {
    width: calc(100% / 4);
}
.table_heading_item_width_5 {
    width: calc(100% / 5);
}
.table_heading_item_width_6 {
    width: calc(100% / 6);
}
.table .body {
    
}
.row {
    border-bottom: 1px solid var(--paper-grey-200);
    height: 40px;
    display: flex;
}
.column {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.content {
    text-transform: capitalize;
    font-size: 85%;
    width: 90%;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>