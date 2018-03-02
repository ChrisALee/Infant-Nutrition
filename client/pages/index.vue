<template>
    <div>
        <h1>Healthy Feeding guidelines for Infants</h1>
        <div id="intro">&nbsp; &nbsp; &nbsp; Your baby will go on an amazing food journey during the first year of life. At the start of the journey,
            breast milk or formula will be all that your baby will need. Along the way, your baby will pass by several “developmental
            milestones” — common stages at which babies can do new things, including trying new foods and textures. Like most parents,
            you will have lots of questions about what to feed your baby and when to begin. Look inside the “Great Eating Adventure”
            to see what’s ahead for your baby. As your baby approaches each stage, we’ll send you more detailed information, including
            ideas for new foods to try, tips for picky eaters and advice on how to wean your baby from breast milk or formula.
        </div>

        <p>{{ name }}</p>
        <p>{{ species }}</p>

        <table id="stages">
            <tr>
                <td class="devStage">Newborn
                    <br>(0-1 month)</td>
                <td class="devStage">Head Up
                    <br>(1-6 months)</td>
                <td class="devStage">Supported Sitter
                    <br>(~6 months)</td>
                <td class="devStage">Independent Sitter
                    <br>(6-8 months)</td>
                <td class="devStage">Crawler
                    <br>(8-10 months)</td>
                <td class="devStage">Begining to Walk
                    <br>(10-12 months)</td>
                <td class="devStage">Indepentent Toddler
                    <br>(12-24 months`)</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    async asyncData({ app }) {
        return app.$axios.get("birds").then(res => {
            return {
                species: res.data.data[0].species,
                name: res.data.data[0].name
            };
        });

        // TODO: need to figure out how to get async/await working
        // let { data: { data: result } } = await app.$axios.get("/birds");
        // console.log(result[0]);
        // return { result };
    }
};
</script>

<style>
h1 {
    text-align: center;
}

#intro {
    margin-top: 5%;
    width: 90%;
    margin-left: 5%;
    font-size: 18px;
}

#stages {
    margin-top: 5%;
    margin-left: 5%;
    width: 90%;
    height: 33%;
    position: absolute;
    border-color: red;
    border-style: dotted;
}

tr {
    border-color: green;
    border-style: dashed;
    margin-left: 5%;
    width: 90%;
    height: 85%;
}

.devStage {
    width: 12.5%;
    /*margin-left: 0;*/
    text-align: center;
    border-style: solid;
    border-color: blue;
    border-width: 2px;
    transition: width 0.75s, font-size 0.75s;
}

.devStage:hover {
    height: 100%;
    width: 17.5%;
    font-size: 22px;
    background-color: grey;
    color: white;
}
</style>
