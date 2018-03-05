import Link from "next/link";
import "isomorphic-unfetch";
import Head from "../components/head";
import Nav from "../components/nav";

export default class IndexPage extends React.Component {
    static async getInitialProps() {
        const res = await fetch("http://localhost:3001/birds");
        const json = await res.json();
        return {
            name: json.data[0].name,
            species: json.data[0].species
        };
    }

    render() {
        return (
            <div>
                <Head title="Home" />
                <Nav />

                <h1>Healthy Feeding guidelines for Infants</h1>
                <div id="intro">
                    &nbsp &nbsp &nbsp Your baby will go on an amazing food
                    journey during the first year of life. At the start of the
                    journey, breast milk or formula will be all that your baby
                    will need. Along the way, your baby will pass by several
                    “developmental milestones” — common stages at which babies
                    can do new things, including trying new foods and textures.
                    Like most parents, you will have lots of questions about
                    what to feed your baby and when to begin. Look inside the
                    “Great Eating Adventure” to see what’s ahead for your baby.
                    As your baby approaches each stage, we’ll send you more
                    detailed information, including ideas for new foods to try,
                    tips for picky eaters and advice on how to wean your baby
                    from breast milk or formula.
                </div>

                <div>
                    <p>Example fetch of data from API: </p>
                    <p>{this.props.name}</p>
                    <p>{this.props.species}</p>
                </div>

                <table id="stages">
                    <tr>
                        <td className="devStage">
                            Newborn
                            <br />(0-1 month)
                        </td>
                        <td className="devStage">
                            Head Up
                            <br />(1-6 months)
                        </td>
                        <td className="devStage">
                            Supported Sitter
                            <br />(~6 months)
                        </td>
                        <td className="devStage">
                            Independent Sitter
                            <br />(6-8 months)
                        </td>
                        <td className="devStage">
                            Crawler
                            <br />(8-10 months)
                        </td>
                        <td className="devStage">
                            Begining to Walk
                            <br />(10-12 months)
                        </td>
                        <td className="devStage">
                            Indepentent Toddler
                            <br />(12-24 months)
                        </td>
                    </tr>
                </table>

                <style jsx>{`
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
                `}</style>
            </div>
        );
    }
}
