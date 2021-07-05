<template>
  <div class="size-detail-msite">
    <div class="l-table"  v-if="pmethod === 'jumpsuits'">
        <div class="l-row">
            <div class="l-cell _left">1.{{ $t("label.waist") }}</div>
            <div class="l-cell _right">{{ $t("message.waist_note") }}</div>
        </div>
        <div class="l-row">
            <div class="l-cell _left">2.{{ $t("label.hip") }}</div>
            <div class="l-cell _right">{{ $t("message.hip_note") }}</div>
        </div>
    </div>

    <div class="l-table"  v-if="pmethod === 'dress'">
        <div class="l-row">
            <div class="l-cell _left">1.{{ $t("label.bust") }}</div>
            <div class="l-cell _right">{{ $t("message.bust_note") }}</div>
        </div>
        <div class="l-row">
            <div class="l-cell _left">2.{{ $t("label.waist") }}</div>
            <div class="l-cell _right">{{ $t("message.waist_note") }}</div>
        </div>
        <div class="l-row">
            <div class="l-cell _left">3.{{ $t("label.hip") }}</div>
            <div class="l-cell _right">{{ $t("message.hip_note") }}</div>
        </div>
    </div>

    <div class="l-table"  v-if="pmethod === 'shoes'">
        <div class="l-row">
            <div class="l-cell _left">1.{{ $t("label.length") }}</div>
            <div class="l-cell _right">{{ $t("message.length_note") }}</div>
        </div>
    </div>

    <div class="l-table"  v-if="pmethod === 'top'">
        <div class="l-row">
            <div class="l-cell _left">1.{{ $t("label.bust") }}</div>
            <div class="l-cell _right">{{ $t("message.bust_note") }}</div>
        </div>
        <div class="l-row">
            <div class="l-cell _left">2.{{ $t("label.waist") }}</div>
            <div class="l-cell _right">{{ $t("message.waist_note") }}</div>
        </div>
        <div class="l-row">
            <div class="l-cell _left">3.{{ $t("label.hip") }}</div>
            <div class="l-cell _right">{{ $t("message.hip_note") }}</div>
        </div>
    </div>

    <div class="l-table"  v-if="pmethod === 'underwear'">
        <div class="l-row">
            <div class="l-cell _left">1.{{ $t("label.bust") }}</div>
            <div class="l-cell _right">{{ $t("message.bust_note") }}</div>
        </div>
        <div class="l-row">
            <div class="l-cell _left">2.{{ $t("label.waist") }}</div>
            <div class="l-cell _right">{{ $t("message.waist_note") }}</div>
        </div>
        <div class="l-row">
            <div class="l-cell _left">3.{{ $t("label.hip") }}</div>
            <div class="l-cell _right">{{ $t("message.hip_note") }}</div>
        </div>
    </div>

    <div class="l-table"  v-if="pmethod === 'bathing'">
        <div class="l-row">
            <div class="l-cell _left">1.{{ $t("label.bust") }}</div>
            <div class="l-cell _right">{{ $t("message.bust_note") }}</div>
        </div>
        <div class="l-row">
            <div class="l-cell _left">2.{{ $t("label.hip") }}</div>
            <div class="l-cell _right">{{ $t("message.hip_note") }}</div>
        </div>
    </div>

    <div class="l-table"  v-if="pmethod === 'bottom'">
        <div class="l-row">
            <div class="l-cell _left">1.{{ $t("label.waist") }}</div>
            <div class="l-cell _right">{{ $t("message.waist_note") }}</div>
        </div>
        <div class="l-row">
            <div class="l-cell _left">2.{{ $t("label.hip") }}</div>
            <div class="l-cell _right">{{ $t("message.hip_note") }}</div>
        </div>
    </div>

    <div class="l-table"  v-if="pmethod === 'coat'">
        <div class="l-row">
            <div class="l-cell _left">1.{{ $t("label.bust") }}</div>
            <div class="l-cell _right">{{ $t("message.bust_note") }}</div>
        </div>
        <div class="l-row">
            <div class="l-cell _left">2.{{ $t("label.waist") }}</div>
            <div class="l-cell _right">{{ $t("message.waist_note") }}</div>
        </div>
        <div class="l-row">
            <div class="l-cell _left">3.{{ $t("label.hip") }}</div>
            <div class="l-cell _right">{{ $t("message.hip_note") }}</div>
        </div>
    </div>

    <div class="l-table"  v-if="pmethod === 'onepiece'">
        <div class="l-row">
            <div class="l-cell _left">1.{{ $t("label.bust") }}</div>
            <div class="l-cell _right">{{ $t("message.bust_note") }}</div>
        </div>
        <div class="l-row">
            <div class="l-cell _left">2.{{ $t("label.waist") }}</div>
            <div class="l-cell _right">{{ $t("message.waist_note") }}</div>
        </div>
        <div class="l-row">
            <div class="l-cell _left">3.{{ $t("label.hip") }}</div>
            <div class="l-cell _right">{{ $t("message.hip_note") }}</div>
        </div>
    </div>

    <div class="l-table"  v-if="pmethod === 'highheels'">
        <div class="l-row">
            <div class="l-cell _left">1.{{ $t("label.waist") }}</div>
            <div class="l-cell _right">{{ $t("message.waist_note") }}</div>
        </div>
        <div class="l-row">
            <div class="l-cell _left">2.{{ $t("label.hip") }}</div>
            <div class="l-cell _right">{{ $t("message.hip_note") }}</div>
        </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "SizeDetailMsite",
        props:{
            pmethod:{
                type:String,
                default:''
            }
        }
    };
</script>

<style lang="scss" scoped>
    .size-detail-msite{
        .l-table{
            display: table;
            width: 100%;

            .l-row{
                display: table-row;
                height: 45px;
            }

            .l-cell{
                display: table-cell;
            }

            ._left{
                font-family: SlatePro-Medium;
                font-size: 14px;
                color: #222222;
                width: 65px;
            }

            ._right{
                font-family: SlatePro;
                font-size: 13px;
                color: #222222;
            }
        }
    }
</style>