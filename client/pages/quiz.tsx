import * as React from 'react';
import Button from 'material-ui/Button';
import fetch from 'isomorphic-unfetch';
import withAuth, { PUBLIC } from '../utils/auth/withAuth';
import withRoot from '../utils/material-ui/withRoot';
import Nav from '../components/Nav';
import { initStore } from '../store';
import withRedux from 'next-redux-wrapper';



class QuizPage extends React.Component {
	static async getInitialProps(): Promise:<any>{
			try{
				const quizzes: any = await fetch
				(`http://localhost:3001/api/quizzes/${json.guid}`,
				{
					method: 'GET',
					headers: {
						Accept: 'application/json'
					}
				});
				const json: any = await quizzes.json();
				return {json};
			}
			const questions: any = await fetch
				('http://localhost:3001/api/questions',
				{
					method: 'GET',
					headers: {
						Accept: 'application/json'
					}
				});
				const json: any = await questions.json()[0];
				return {json};
			}
			catch(err{
				console.log(err)
			}
	}

	render(){
		const {json} = this.props;
		return	(
		<head>Test your Knowledge!	</head>
		<div>
			<div>
				<div>Question 1:  </div>
					{Object.keys{this.props.result}.map{key=> return(<div>{key}</div>
					<button>answer</button>)}}
			</div>
			<div>
				<div>Question 2:  </div>
					{Object.keys{this.props.result}.map{key=><div>{key}</div}}
				</div>
			<div>
				<div>Question 3:  </div>
					{Object.keys{this.props.result}.map{key=><div>{key}</div}}
				</div>
			<div>
				<div>Question 4:  </div>
					{Object.keys{this.props.result}.map{key=><div>{key}</div}}
				</div>
			<div>
				<div>Question 5:  </div>
					{Object.keys{this.props.result}.map{key=><div>{key}</div}}
			</div>
			<Button type="submit"> Submit Quiz Here </Button>
		</div>
		)
		
	}

}
export default compose<any>(
    withRoot(),
    withRedux(initStore),
    withAuth([PUBLIC]),
)(QuizPage);