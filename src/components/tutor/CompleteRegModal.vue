 <template>
    <div class="complete_reg">
        <div class="text">
            {{ text }}
        </div>
        <div class="become_tutor_btn_wrapper">
            <ButtonPlainText
                buttonText="Become Tutor"
                @buttonAction="gotobecometutor()"
            />
        </div>
    </div>
</template>
<script>
import { defineComponent } from "@vue/runtime-core";
import ButtonPlainText from "../buttons/ButtonPlainText.vue";

export default defineComponent({
    name: 'complete-reg',
    components: { ButtonPlainText },
    props: ['text'],
    methods: {
        gotobecometutor() {
            this.$router.push('/become-tutor');
        }
    }
})
</script>
<style scoped>
    .complete_reg {
        width: 60%;
        margin: 0 auto;
        text-align: center;
    }
    .text {
        font-size: 160%;
        color: var(--paper-grey-400);
        font-weight: 600;
    }
    .become_tutor_btn_wrapper {
        height: 50px;
        width: 30%;
        margin: 2% auto 0;
    }
    .become_tutor_btn_wrapper button {
        border-radius: 5px;
        border: none;
        color: white;
        background: var(--burgundy-200);
    }
</style>